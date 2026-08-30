import React, { useState, useEffect, useMemo } from "react";
import {
  PlatformMode,
  CurrencyCode,
  AdSenseInputs,
  AdMobInputs,
} from "./types";
import { calculateAdSenseRevenue, calculateAdMobRevenue } from "./utils/adCalculations";
import { QUICK_PRESETS } from "./data/presets";
import { copyShareableLink } from "./utils/export";
import { Navbar } from "./components/Navbar";
import { ModeSelector } from "./components/ModeSelector";
import { AdMobCalculator } from "./components/AdMobCalculator";
import { AdSenseCalculator } from "./components/AdSenseCalculator";
import { PortfolioCalculator } from "./components/PortfolioCalculator";
import { ReverseGoalCalculator } from "./components/ReverseGoalCalculator";
import { ScenarioComparator } from "./components/ScenarioComparator";
import { BenchmarksExplorer } from "./components/BenchmarksExplorer";
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
  Zap,
} from "lucide-react";

export function App() {
  // Theme state (Defaults to clean light mode, persists toggle)
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

  // Mode (Default to AdMob)
  const [activeMode, setActiveMode] = useState<PlatformMode>("admob");

  // Modals
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AdMob Inputs (Default Primary)
  const [adMobInputs, setAdMobInputs] = useState<AdMobInputs>({
    mode: "quick",
    dau: 25000,
    categoryId: "hypercasual-games",
    geoDistribution: { tier1: 55, tier2: 30, tier3: 15 },
    platformSplit: { ios: 45, android: 55 },
    sessionsPerUserPerDay: 4.0,
    sessionDurationMinutes: 5.5,
    adFormats: {
      rewardedVideo: { enabled: true, impressionsPerUserPerDay: 2.0 },
      interstitial: { enabled: true, impressionsPerUserPerSession: 1.2 },
      appOpen: { enabled: true, impressionsPerUserPerDay: 1.5 },
      rewardedInterstitial: { enabled: true, impressionsPerUserPerDay: 0.5 },
      native: { enabled: false, impressionsPerUserPerDay: 0 },
      banner: { enabled: true, refreshIntervalSeconds: 30, showPerSessionMinutes: 4.0 },
    },
    hasMediation: true,
    fillRate: 95,
    selectedMonth: new Date().getMonth(),
    useSeasonality: true,
  });

  // AdSense Inputs
  const [adSenseInputs, setAdSenseInputs] = useState<AdSenseInputs>({
    mode: "quick",
    monthlyPageviews: 100000,
    pagesPerVisit: 1.8,
    categoryId: "tech-software-ai",
    geoDistribution: { tier1: 70, tier2: 20, tier3: 10 },
    deviceDistribution: { mobile: 60, desktop: 35, tablet: 5 },
    selectedUnits: {
      leaderboard: 1,
      inArticle: 3,
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

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("adrev_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("adrev_theme", "light");
    }
  }, [isDarkMode]);

  // URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const calcParam = searchParams.get("calc");
      const modeParam = searchParams.get("mode") as PlatformMode;
      if (modeParam && ["adsense", "admob", "portfolio", "goal", "compare", "benchmarks"].includes(modeParam)) {
        setActiveMode(modeParam);
      }
      if (calcParam) {
        try {
          const parsed = JSON.parse(atob(calcParam));
          if (parsed.adSenseInputs) setAdSenseInputs(parsed.adSenseInputs);
          if (parsed.adMobInputs) setAdMobInputs(parsed.adMobInputs);
          if (parsed.activeMode) setActiveMode(parsed.activeMode);
          showToast("Shared calculation configuration loaded!");
        } catch (e) {
          console.error("Failed to parse shared URL parameters", e);
        }
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    const success = copyShareableLink({
      activeMode,
      adSenseInputs,
      adMobInputs,
    });
    if (success) {
      showToast("Link copied to clipboard! Share your calculation anywhere.");
    }
  };

  // Calculations
  const admobResults = useMemo(() => calculateAdMobRevenue(adMobInputs), [adMobInputs]);
  const adSenseResults = useMemo(() => calculateAdSenseRevenue(adSenseInputs), [adSenseInputs]);

  const applyPreset = (preset: (typeof QUICK_PRESETS)[0]) => {
    if (preset.type === "adsense") {
      setActiveMode("adsense");
      setAdSenseInputs((prev) => ({
        ...prev,
        ...preset.params,
      }));
    } else {
      setActiveMode("admob");
      setAdMobInputs((prev) => ({
        ...prev,
        ...preset.params,
      }));
    }
    showToast(`Loaded preset: ${preset.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 font-sans transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-xl border border-dashed border-neutral-700 text-xs font-mono font-semibold shadow-xl animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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
        activePlatform={activeMode}
        onPlatformChange={setActiveMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28 lg:pb-8">
        {/* Top Minimalist Header */}
        <section className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                AdMob & AdSense <span className="text-emerald-500">Revenue Engine</span>
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Deterministic programmatic eCPM & Page RPM forecaster based on 2025–2026 auction rates.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> Presets:
              </span>
              {QUICK_PRESETS.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className="px-2 py-1 text-[10px] font-medium rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white bg-white dark:bg-neutral-900 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Selector */}
          <ModeSelector activeMode={activeMode} onSelectMode={setActiveMode} />
        </section>

        {/* Dynamic Calculator Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-4">
            {activeMode === "admob" && (
              <AdMobCalculator
                inputs={adMobInputs}
                onChange={setAdMobInputs}
                currency={currency}
              />
            )}

            {activeMode === "adsense" && (
              <AdSenseCalculator
                inputs={adSenseInputs}
                onChange={setAdSenseInputs}
                currency={currency}
              />
            )}

            {activeMode === "portfolio" && (
              <PortfolioCalculator
                adsenseResults={adSenseResults}
                admobResults={admobResults}
                currency={currency}
              />
            )}

            {activeMode === "goal" && (
              <ReverseGoalCalculator currency={currency} />
            )}

            {activeMode === "compare" && (
              <ScenarioComparator currency={currency} />
            )}

            {activeMode === "benchmarks" && (
              <BenchmarksExplorer />
            )}

            {/* Optimization Tips */}
            {(activeMode === "admob" || activeMode === "adsense") && (
              <OptimizationTips
                platform={activeMode}
                adSenseInputs={adSenseInputs}
                adMobInputs={adMobInputs}
              />
            )}
          </div>

          {/* Right Column: Results & Charts */}
          <div className="lg:col-span-5 space-y-4 sticky top-18">
            {activeMode === "admob" && (
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
            )}

            {activeMode === "adsense" && (
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

            {(activeMode === "portfolio" || activeMode === "goal" || activeMode === "compare" || activeMode === "benchmarks") && (
              <FormulaDeepDive />
            )}
          </div>
        </section>

        {/* Mathematical Proofs */}
        {(activeMode === "admob" || activeMode === "adsense") && (
          <section>
            <FormulaDeepDive />
          </section>
        )}

        {/* SEO Guide & Reference */}
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
        platform={activeMode === "admob" ? "admob" : "adsense"}
        currency={currency}
        adSenseInputs={adSenseInputs}
        adSenseResults={adSenseResults}
        adMobInputs={adMobInputs}
        adMobResults={admobResults}
      />

      {/* Mobile Floating Sticky Bar */}
      <MobileStickyBar
        activeMode={activeMode}
        currency={currency}
        monthlyRevenue={
          activeMode === "admob"
            ? admobResults.monthlyRevenue
            : activeMode === "portfolio"
            ? adSenseResults.monthlyRevenue * 2 + admobResults.monthlyRevenue
            : adSenseResults.monthlyRevenue
        }
        rateLabel={activeMode === "admob" ? "ARPDAU" : "Page RPM"}
        rateValue={activeMode === "admob" ? `$${admobResults.arpdau}` : `$${adSenseResults.pageRpm}`}
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
