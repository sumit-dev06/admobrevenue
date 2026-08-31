import React, { useState, useEffect, useMemo, startTransition, Suspense, lazy } from "react";
import {
  CurrencyCode,
  AdSenseInputs,
  AdMobInputs,
} from "./types";
import { SupportedLanguage } from "./i18n/types";
import { LanguageProvider, useTranslation } from "./i18n/LanguageContext";
import { calculateAdSenseRevenue, calculateAdMobRevenue } from "./utils/adCalculations";
import { copyShareableLink } from "./utils/export";
import { Navbar } from "./components/Navbar";
import { AdMobCalculator } from "./components/AdMobCalculator";
import { AdSenseCalculator } from "./components/AdSenseCalculator";
import { RevenueSummaryCard } from "./components/RevenueSummaryCard";
import { OptimizationTips } from "./components/OptimizationTips";
import { FormulaDeepDive } from "./components/FormulaDeepDive";
import { EditorialSeoSection } from "./components/EditorialSeoSection";
import { SeoFaqSection } from "./components/SeoFaqSection";
import { ComprehensiveGuide } from "./components/ComprehensiveGuide";
import { GlossarySection } from "./components/GlossarySection";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { PwaInstallBanner } from "./components/PwaInstallBanner";
import { Footer } from "./components/Footer";

// Lazy load heavy components to drastically reduce initial bundle size and speed up TBT
const RevenueCharts = lazy(() => import("./components/RevenueCharts").then(m => ({ default: m.RevenueCharts })));
const EmbedWidgetModal = lazy(() => import("./components/EmbedWidgetModal").then(m => ({ default: m.EmbedWidgetModal })));
const ExportReportModal = lazy(() => import("./components/ExportReportModal").then(m => ({ default: m.ExportReportModal })));
const AboutPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.DisclaimerPage })));

import {
  CheckCircle2,
  Smartphone,
  Globe,
} from "lucide-react";

const DEFAULT_ADMOB_INPUTS: AdMobInputs = {
  mode: "quick",
  dau: 1000,
  categoryId: "hypercasual-games",
  accountCountry: "IN",
  targetCountry: "IN",
  geoDistribution: { tier1: 0, tier2: 0, tier3: 100 },
  platformSplit: { ios: 30, android: 70 },
  sessionsPerUserPerDay: 3.5,
  sessionDurationMinutes: 5.0,
  adFormats: {
    rewardedVideo: { enabled: true, impressionsPerUserPerDay: 2.0 },
    interstitial: { enabled: false, impressionsPerUserPerSession: 1.0 },
    appOpen: { enabled: false, impressionsPerUserPerDay: 1.0 },
    rewardedInterstitial: { enabled: false, impressionsPerUserPerDay: 0.5 },
    native: { enabled: false, impressionsPerUserPerDay: 0 },
    banner: { enabled: false, refreshIntervalSeconds: 30, showPerSessionMinutes: 4.0 },
  },
  hasMediation: false,
  fillRate: 95,
  selectedMonth: new Date().getMonth(),
  useSeasonality: true,
};

const DEFAULT_ADSENSE_INPUTS: AdSenseInputs = {
  mode: "quick",
  monthlyPageviews: 50000,
  pagesPerVisit: 1.8,
  categoryId: "tech-software-ai",
  accountCountry: "US",
  targetCountry: "ALL",
  geoDistribution: { tier1: 60, tier2: 25, tier3: 15 },
  deviceDistribution: { mobile: 65, desktop: 30, tablet: 5 },
  selectedUnits: {
    leaderboard: 1,
    inArticle: 2,
    sidebar: 1,
    anchorAd: true,
    vignetteAd: true,
    multiplexAd: 1,
  },
  adBlockerRate: 25,
  viewabilityRate: 75,
  selectedMonth: new Date().getMonth(),
  useSeasonality: true,
};

interface AppContentProps {
  initialPlatform?: "admob" | "adsense" | "about" | "contact" | "privacy" | "terms" | "disclaimer";
}

function MainAppContent({ initialPlatform }: AppContentProps) {
  const { t } = useTranslation();

  // Currency (persisted)
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_currency") as CurrencyCode;
      if (saved) return saved;
    }
    return "USD";
  });

  // Dedicated Mode: "admob" (Apps) or "adsense" (Websites) or trust pages
  const [activePlatform, setActivePlatform] = useState<string>(() => {
    if (initialPlatform) return initialPlatform;
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page");
      if (pageParam && ["admob", "adsense", "about", "contact", "privacy", "terms", "disclaimer"].includes(pageParam)) {
        return pageParam;
      }
      const saved = localStorage.getItem("adrev_platform");
      if (saved && ["admob", "adsense"].includes(saved)) return saved;
    }
    return "admob";
  });

  // Modals
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AdMob Inputs (Page 1) (persisted)
  const [adMobInputs, setAdMobInputs] = useState<AdMobInputs>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("adrev_admob_inputs");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_ADMOB_INPUTS,
            ...parsed,
            adFormats: {
              ...DEFAULT_ADMOB_INPUTS.adFormats,
              ...(parsed?.adFormats || {}),
              rewardedVideo: { ...DEFAULT_ADMOB_INPUTS.adFormats.rewardedVideo, ...(parsed?.adFormats?.rewardedVideo || {}) },
              interstitial: { ...DEFAULT_ADMOB_INPUTS.adFormats.interstitial, ...(parsed?.adFormats?.interstitial || {}) },
              appOpen: { ...DEFAULT_ADMOB_INPUTS.adFormats.appOpen, ...(parsed?.adFormats?.appOpen || {}) },
              rewardedInterstitial: { ...DEFAULT_ADMOB_INPUTS.adFormats.rewardedInterstitial, ...(parsed?.adFormats?.rewardedInterstitial || {}) },
              native: { ...DEFAULT_ADMOB_INPUTS.adFormats.native, ...(parsed?.adFormats?.native || {}) },
              banner: { ...DEFAULT_ADMOB_INPUTS.adFormats.banner, ...(parsed?.adFormats?.banner || {}) },
            },
            geoDistribution: { ...DEFAULT_ADMOB_INPUTS.geoDistribution, ...(parsed?.geoDistribution || {}) },
            platformSplit: { ...DEFAULT_ADMOB_INPUTS.platformSplit, ...(parsed?.platformSplit || {}) },
          };
        }
      } catch (e) {
        console.error("Failed to load saved AdMob inputs", e);
      }
    }
    return DEFAULT_ADMOB_INPUTS;
  });

  // AdSense Inputs (Page 2) (persisted)
  const [adSenseInputs, setAdSenseInputs] = useState<AdSenseInputs>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("adrev_adsense_inputs");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_ADSENSE_INPUTS,
            ...parsed,
            selectedUnits: {
              ...DEFAULT_ADSENSE_INPUTS.selectedUnits,
              ...(parsed?.selectedUnits || {}),
            },
            geoDistribution: { ...DEFAULT_ADSENSE_INPUTS.geoDistribution, ...(parsed?.geoDistribution || {}) },
            deviceDistribution: { ...DEFAULT_ADSENSE_INPUTS.deviceDistribution, ...(parsed?.deviceDistribution || {}) },
          };
        }
      } catch (e) {
        console.error("Failed to load saved AdSense inputs", e);
      }
    }
    return DEFAULT_ADSENSE_INPUTS;
  });

  // Persist platform, currency, and inputs to localStorage whenever changed
  useEffect(() => {
    if (typeof window !== "undefined" && ["admob", "adsense"].includes(activePlatform)) {
      localStorage.setItem("adrev_platform", activePlatform);
    }
  }, [activePlatform]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_currency", currency);
    }
  }, [currency]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_admob_inputs", JSON.stringify(adMobInputs));
    }
  }, [adMobInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_adsense_inputs", JSON.stringify(adSenseInputs));
    }
  }, [adSenseInputs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync URL parameters & history
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page");
      if (pageParam) {
        setActivePlatform(pageParam);
      }
      const calcParam = searchParams.get("calc");
      if (calcParam) {
        try {
          const parsed = JSON.parse(atob(calcParam));
          if (parsed.adSenseInputs) setAdSenseInputs(parsed.adSenseInputs);
          if (parsed.adMobInputs) setAdMobInputs(parsed.adMobInputs);
          if (parsed.activePlatform) setActivePlatform(parsed.activePlatform);
          showToast("Configuration loaded from link!");
        } catch (e) {
          console.error("Failed to parse URL config", e);
        }
      }
    }
  }, []);

  const handlePlatformChange = (p: string) => {
    startTransition(() => setActivePlatform(p));
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", p);
      window.history.replaceState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = () => {
    const success = copyShareableLink({
      activePlatform,
      adSenseInputs,
      adMobInputs,
    });
    if (success) {
      showToast("Link copied to clipboard!");
    }
  };

  // Calculations
  const admobResults = useMemo(() => calculateAdMobRevenue(adMobInputs), [adMobInputs]);
  const adSenseResults = useMemo(() => calculateAdSenseRevenue(adSenseInputs), [adSenseInputs]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 font-sans transition-colors duration-150">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-4 py-2.5 rounded-xl border border-dashed border-neutral-700 dark:border-neutral-300 text-xs font-mono font-semibold shadow-xl">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PWA Install Notification Banner */}
      <PwaInstallBanner />

      {/* Top Header with Language Dropdown */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenEmbed={() => setIsEmbedOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onShare={handleShare}
        activePlatform={activePlatform}
        onPlatformChange={handlePlatformChange}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28 lg:pb-8 overflow-x-hidden">
        {activePlatform === "about" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <AboutPage />
          </Suspense>
        )}
        {activePlatform === "contact" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <ContactPage />
          </Suspense>
        )}
        {activePlatform === "privacy" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <PrivacyPage />
          </Suspense>
        )}
        {activePlatform === "terms" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <TermsPage />
          </Suspense>
        )}
        {activePlatform === "disclaimer" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <DisclaimerPage />
          </Suspense>
        )}
        
        {(activePlatform === "admob" || activePlatform === "adsense") && (
          <>
            {/* Page Hero Banner */}
            <section className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {activePlatform === "admob" ? (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-dashed border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                        {t.hero.admobBadge}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-dashed border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10">
                        {t.hero.adsenseBadge}
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                    {activePlatform === "admob" ? (
                      <span className="text-emerald-600 dark:text-emerald-400">{t.hero.admobTitle}</span>
                    ) : (
                      <span className="text-blue-600 dark:text-blue-400">{t.hero.adsenseTitle}</span>
                    )}
                  </h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                    {activePlatform === "admob"
                      ? t.hero.admobSubtitle
                      : t.hero.adsenseSubtitle}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    aria-label={t.hero.reset}
                    onClick={() => {
                      if (activePlatform === "admob") {
                        setAdMobInputs(DEFAULT_ADMOB_INPUTS);
                        localStorage.removeItem("adrev_admob_inputs");
                      } else {
                        setAdSenseInputs(DEFAULT_ADSENSE_INPUTS);
                        localStorage.removeItem("adrev_adsense_inputs");
                      }
                      showToast("Reset to defaults!");
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-rose-500 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 transition-colors bg-white dark:bg-neutral-900 text-[11px] cursor-pointer"
                    title={t.hero.reset}
                  >
                    {t.hero.reset}
                  </button>

                  <button
                    type="button"
                    aria-label={activePlatform === "admob" ? t.hero.switchToAdSense : t.hero.switchToAdMob}
                    onClick={() => handlePlatformChange(activePlatform === "admob" ? "adsense" : "admob")}
                    className="px-3 py-1.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors bg-white dark:bg-neutral-900 cursor-pointer"
                  >
                    {activePlatform === "admob" ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                        <span>{t.hero.switchToAdSense}</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        <span>{t.hero.switchToAdMob}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* 2-Column Calculator Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Interactive Input Form */}
              <div className="lg:col-span-7 space-y-4">
                {activePlatform === "admob" ? (
                  <AdMobCalculator
                    inputs={adMobInputs}
                    onChange={setAdMobInputs}
                    currency={currency}
                  />
                ) : (
                  <AdSenseCalculator
                    inputs={adSenseInputs}
                    onChange={setAdSenseInputs}
                    currency={currency}
                  />
                )}

                {/* Optimization Recommendations */}
                <OptimizationTips
                  platform={activePlatform as "admob" | "adsense"}
                  adSenseInputs={adSenseInputs}
                  adMobInputs={adMobInputs}
                />
              </div>

              {/* Right: Revenue Dashboard & Visualizers */}
              <div className="lg:col-span-5 space-y-4 sticky top-18">
                {activePlatform === "admob" ? (
                  <>
                    <RevenueSummaryCard
                      type="admob"
                      currency={currency}
                      dailyRevenue={admobResults.dailyRevenue}
                      monthlyRevenue={admobResults.monthlyRevenue}
                      annualRevenue={admobResults.annualRevenue}
                      rateMetricLabel={t.summary.arpdau}
                      rateMetricValue={`$${admobResults.arpdau}`}
                      secondaryRateLabel={t.summary.blendedEcpm}
                      secondaryRateValue={`$${admobResults.blendedEcpm}`}
                      impressions={admobResults.monthlyImpressions}
                      mediationLiftRevenue={admobResults.mediationLiftRevenue}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-neutral-100">
                              {t.summary.visualBreakdown}
                            </span>
                          </div>
                          <div className="h-56 w-full flex items-center justify-center text-xs font-mono text-neutral-400">
                            Loading charts...
                          </div>
                        </div>
                      }
                    >
                      <RevenueCharts
                        formatBreakdown={admobResults.formatBreakdown}
                        monthlyForecast={admobResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                ) : (
                  <>
                    <RevenueSummaryCard
                      type="adsense"
                      currency={currency}
                      dailyRevenue={adSenseResults.dailyRevenue}
                      monthlyRevenue={adSenseResults.monthlyRevenue}
                      annualRevenue={adSenseResults.annualRevenue}
                      rateMetricLabel={t.summary.pageRpm}
                      rateMetricValue={`$${adSenseResults.pageRpm}`}
                      secondaryRateLabel={t.summary.impressionRpm}
                      secondaryRateValue={`$${adSenseResults.impressionRpm}`}
                      impressions={adSenseResults.monthlyImpressions}
                      adBlockLossRevenue={adSenseResults.adBlockLossRevenue}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-neutral-100">
                              {t.summary.visualBreakdown}
                            </span>
                          </div>
                          <div className="h-56 w-full flex items-center justify-center text-xs font-mono text-neutral-400">
                            Loading charts...
                          </div>
                        </div>
                      }
                    >
                      <RevenueCharts
                        formatBreakdown={adSenseResults.formatBreakdown}
                        monthlyForecast={adSenseResults.monthlyForecast}
                        deviceBreakdown={adSenseResults.deviceBreakdown}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}
              </div>
            </section>

            {/* Keyword-Rich Editorial SEO Section */}
            <section>
              <EditorialSeoSection />
            </section>

            {/* Mathematical Formulas */}
            <section>
              <FormulaDeepDive />
            </section>

            {/* Publisher Guide */}
            <section>
              <ComprehensiveGuide />
            </section>

            {/* Glossary */}
            <section>
              <GlossarySection />
            </section>

            {/* SEO FAQs */}
            <section>
              <SeoFaqSection />
            </section>
          </>
        )}
      </main>

      {/* Modals */}
      {isEmbedOpen && (
        <Suspense fallback={null}>
          <EmbedWidgetModal isOpen={isEmbedOpen} onClose={() => setIsEmbedOpen(false)} />
        </Suspense>
      )}
      {isExportOpen && (
        <Suspense fallback={null}>
          <ExportReportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            platform={activePlatform as "admob" | "adsense"}
            currency={currency}
            adSenseInputs={adSenseInputs}
            adSenseResults={adSenseResults}
            adMobInputs={adMobInputs}
            adMobResults={admobResults}
          />
        </Suspense>
      )}

      {/* Mobile Floating Sticky Bar */}
      {(activePlatform === "admob" || activePlatform === "adsense") && (
        <MobileStickyBar
          activeMode={activePlatform as "admob" | "adsense"}
          currency={currency}
          monthlyRevenue={
            activePlatform === "admob" ? admobResults.monthlyRevenue : adSenseResults.monthlyRevenue
          }
          rateLabel={activePlatform === "admob" ? "ARPDAU" : "Page RPM"}
          rateValue={
            activePlatform === "admob"
              ? `$${admobResults.arpdau}`
              : `$${adSenseResults.pageRpm}`
          }
          onOpenExport={() => setIsExportOpen(true)}
          onOpenEmbed={() => setIsEmbedOpen(true)}
          onShare={handleShare}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App({
  initialPlatform,
  initialLanguage,
}: {
  initialPlatform?: "admob" | "adsense" | "about" | "contact" | "privacy" | "terms" | "disclaimer";
  initialLanguage?: SupportedLanguage;
} = {}) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <MainAppContent initialPlatform={initialPlatform} />
    </LanguageProvider>
  );
}

export default App;
