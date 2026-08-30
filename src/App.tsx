import React, { useState, useEffect, useMemo } from "react";
import {
  CurrencyCode,
  AdSenseInputs,
  AdMobInputs,
} from "./types";
import { calculateAdSenseRevenue, calculateAdMobRevenue } from "./utils/adCalculations";
import { copyShareableLink } from "./utils/export";
import { Navbar } from "./components/Navbar";
import { AdMobCalculator } from "./components/AdMobCalculator";
import { AdSenseCalculator } from "./components/AdSenseCalculator";
import { RevenueSummaryCard } from "./components/RevenueSummaryCard";
import { RevenueCharts } from "./components/RevenueCharts";
import { OptimizationTips } from "./components/OptimizationTips";
import { FormulaDeepDive } from "./components/FormulaDeepDive";
import { SeoFaqSection } from "./components/SeoFaqSection";
import { ComprehensiveGuide } from "./components/ComprehensiveGuide";
import { GlossarySection } from "./components/GlossarySection";
import { EmbedWidgetModal } from "./components/EmbedWidgetModal";
import { ExportReportModal } from "./components/ExportReportModal";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { Footer } from "./components/Footer";
import {
  CheckCircle2,
  Smartphone,
  Globe,
  Zap,
} from "lucide-react";

export function App() {
  // Theme state: defaults to clean light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_theme");
      if (saved) return saved === "dark";
      return false;
    }
    return false;
  });

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  // Dedicated 2-Page Mode: "admob" (Apps) or "adsense" (Websites)
  const [activePlatform, setActivePlatform] = useState<"admob" | "adsense">("admob");

  // Modals
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AdMob Inputs (Page 1)
  const [adMobInputs, setAdMobInputs] = useState<AdMobInputs>({
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
  });

  // AdSense Inputs (Page 2)
  const [adSenseInputs, setAdSenseInputs] = useState<AdSenseInputs>({
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
  });

  // Apply dark mode class to html root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("adrev_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("adrev_theme", "light");
    }
  }, [isDarkMode]);

  // Sync URL parameters & history
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page") as "admob" | "adsense";
      if (pageParam === "admob" || pageParam === "adsense") {
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

  const handlePlatformChange = (p: "admob" | "adsense") => {
    setActivePlatform(p);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", p);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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

      {/* Top Header */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenEmbed={() => setIsEmbedOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onShare={handleShare}
        activePlatform={activePlatform}
        onPlatformChange={handlePlatformChange}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28 lg:pb-8">
        {/* Page Banner */}
        <section className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {activePlatform === "admob" ? (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-dashed border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                    Mobile App Monetization
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-dashed border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10">
                    Website & Blog Monetization
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                {activePlatform === "admob" ? (
                  <>
                    Google AdMob <span className="text-emerald-500">Revenue Calculator</span>
                  </>
                ) : (
                  <>
                    Google AdSense <span className="text-blue-500">Revenue Calculator</span>
                  </>
                )}
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                {activePlatform === "admob"
                  ? "Forecast app ARPDAU and eCPMs across Rewarded, Interstitial, and App Open ads."
                  : "Forecast website Page RPM across 26 niches, ad placements, and audience locations."}
              </p>
            </div>

            {/* Quick Switch Button */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => handlePlatformChange(activePlatform === "admob" ? "adsense" : "admob")}
                className="px-3 py-1.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors bg-white dark:bg-neutral-900"
              >
                {activePlatform === "admob" ? (
                  <>
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <span>Switch to AdSense</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Switch to AdMob</span>
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
              platform={activePlatform}
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
                  rateMetricLabel="ARPDAU"
                  rateMetricValue={`$${admobResults.arpdau}`}
                  secondaryRateLabel="Blended eCPM"
                  secondaryRateValue={`$${admobResults.blendedEcpm}`}
                  impressions={admobResults.monthlyImpressions}
                  mediationLiftRevenue={admobResults.mediationLiftRevenue}
                  onExportCSV={() => setIsExportOpen(true)}
                />
                <RevenueCharts
                  formatBreakdown={admobResults.formatBreakdown}
                  monthlyForecast={admobResults.monthlyForecast}
                  currency={currency}
                />
              </>
            ) : (
              <>
                <RevenueSummaryCard
                  type="adsense"
                  currency={currency}
                  dailyRevenue={adSenseResults.dailyRevenue}
                  monthlyRevenue={adSenseResults.monthlyRevenue}
                  annualRevenue={adSenseResults.annualRevenue}
                  rateMetricLabel="Page RPM"
                  rateMetricValue={`$${adSenseResults.pageRpm}`}
                  secondaryRateLabel="Impression RPM"
                  secondaryRateValue={`$${adSenseResults.impressionRpm}`}
                  impressions={adSenseResults.monthlyImpressions}
                  adBlockLossRevenue={adSenseResults.adBlockLossRevenue}
                  onExportCSV={() => setIsExportOpen(true)}
                />
                <RevenueCharts
                  formatBreakdown={adSenseResults.formatBreakdown}
                  monthlyForecast={adSenseResults.monthlyForecast}
                  deviceBreakdown={adSenseResults.deviceBreakdown}
                  currency={currency}
                />
              </>
            )}
          </div>
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
      </main>

      {/* Modals */}
      <EmbedWidgetModal isOpen={isEmbedOpen} onClose={() => setIsEmbedOpen(false)} />
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        platform={activePlatform}
        currency={currency}
        adSenseInputs={adSenseInputs}
        adSenseResults={adSenseResults}
        adMobInputs={adMobInputs}
        adMobResults={admobResults}
      />

      {/* Mobile Floating Sticky Bar */}
      <MobileStickyBar
        activeMode={activePlatform}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
