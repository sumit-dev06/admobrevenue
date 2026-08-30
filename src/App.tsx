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
import { AdSenseCalculator } from "./components/AdSenseCalculator";
import { AdMobCalculator } from "./components/AdMobCalculator";
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
import { Footer } from "./components/Footer";
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Share2,
  Download,
  Code2,
  BarChart3,
  Bookmark,
  Zap,
} from "lucide-react";

export function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  // Mode
  const [activeMode, setActiveMode] = useState<PlatformMode>("adsense");

  // Modals
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // AdMob Inputs
  const [adMobInputs, setAdMobInputs] = useState<AdMobInputs>({
    mode: "quick",
    dau: 20000,
    categoryId: "hypercasual-games",
    geoDistribution: { tier1: 50, tier2: 30, tier3: 20 },
    platformSplit: { ios: 40, android: 60 },
    sessionsPerUserPerDay: 3.5,
    sessionDurationMinutes: 5.5,
    adFormats: {
      rewardedVideo: { enabled: true, impressionsPerUserPerDay: 1.8 },
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

  // Check URL params for shared state
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

  // Calculation Results
  const adSenseResults = useMemo(() => calculateAdSenseRevenue(adSenseInputs), [adSenseInputs]);
  const admobResults = useMemo(() => calculateAdMobRevenue(adMobInputs), [adMobInputs]);

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
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Programmatic CPM & eCPM Calculation Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            AdSense & AdMob <span className="text-emerald-500">Revenue Calculator</span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Forecast website Page RPM and mobile app ARPDAU with verified industry benchmarks. Factor in ad viewability, format weights, geo tiers, seasonality, and mediation auction lifts.
          </p>

          {/* Quick Presets Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1 mr-1">
              <Zap className="w-3 h-3 text-amber-500" /> Presets:
            </span>
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 text-neutral-700 dark:text-neutral-300 transition-all shadow-2xs hover:shadow-xs"
              >
                {p.name}
              </button>
            ))}
          </div>
        </section>

        {/* Mode Selector Tabs */}
        <section>
          <ModeSelector activeMode={activeMode} onSelectMode={setActiveMode} />
        </section>

        {/* Dynamic Calculator Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Input Engines */}
          <div className="lg:col-span-7 space-y-6">
            {activeMode === "adsense" && (
              <AdSenseCalculator
                inputs={adSenseInputs}
                onChange={setAdSenseInputs}
                currency={currency}
              />
            )}

            {activeMode === "admob" && (
              <AdMobCalculator
                inputs={adMobInputs}
                onChange={setAdMobInputs}
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

            {/* Contextual Optimization Recommendations */}
            {(activeMode === "adsense" || activeMode === "admob") && (
              <OptimizationTips
                platform={activeMode}
                adSenseInputs={adSenseInputs}
                adMobInputs={adMobInputs}
              />
            )}
          </div>

          {/* Right Column: Live Revenue Dashboard & Charts */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
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

            {(activeMode === "portfolio" || activeMode === "goal" || activeMode === "compare" || activeMode === "benchmarks") && (
              <FormulaDeepDive />
            )}
          </div>
        </section>

        {/* Full-Width Formula Math Section */}
        {(activeMode === "adsense" || activeMode === "admob") && (
          <section>
            <FormulaDeepDive />
          </section>
        )}

        {/* SEO In-Depth Publisher Guide */}
        <section>
          <ComprehensiveGuide />
        </section>

        {/* SEO Glossary Section */}
        <section>
          <GlossarySection />
        </section>

        {/* SEO FAQ Accordion with Schema.org JSON-LD */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
