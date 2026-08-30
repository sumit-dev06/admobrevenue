import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { calculateAdSenseRevenue, calculateAdMobRevenue } from "../utils/adCalculations";
import { formatCurrency, formatNumber } from "../utils/currency";
import {
  GitCompare,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";

interface ScenarioComparatorProps {
  currency: CurrencyCode;
}

export const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({ currency }) => {
  const [platform, setPlatform] = useState<"adsense" | "admob">("adsense");

  // AdSense Scenarios: Baseline (1 Banner) vs Optimized (Banner + InArticle + Anchor + Vignette)
  const baselineAdSense = calculateAdSenseRevenue({
    mode: "quick",
    monthlyPageviews: 100000,
    pagesPerVisit: 1.5,
    categoryId: "finance-insurance",
    geoDistribution: { tier1: 70, tier2: 20, tier3: 10 },
    deviceDistribution: { mobile: 60, desktop: 35, tablet: 5 },
    selectedUnits: {
      leaderboard: 1,
      inArticle: 1,
      sidebar: 0,
      anchorAd: false,
      vignetteAd: false,
      multiplexAd: 0,
    },
    adBlockerRate: 15,
    viewabilityRate: 55,
    selectedMonth: 5,
    useSeasonality: false,
  });

  const optimizedAdSense = calculateAdSenseRevenue({
    mode: "quick",
    monthlyPageviews: 100000,
    pagesPerVisit: 1.5,
    categoryId: "finance-insurance",
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
    adBlockerRate: 15,
    viewabilityRate: 82,
    selectedMonth: 5,
    useSeasonality: false,
  });

  // AdMob Scenarios: Baseline (Banner only) vs Optimized (Banner + Rewarded + Interstitial + Mediation)
  const baselineAdMob = calculateAdMobRevenue({
    mode: "quick",
    dau: 20000,
    categoryId: "casual-puzzle-games",
    geoDistribution: { tier1: 60, tier2: 30, tier3: 10 },
    platformSplit: { ios: 40, android: 60 },
    sessionsPerUserPerDay: 3.0,
    sessionDurationMinutes: 7.0,
    adFormats: {
      rewardedVideo: { enabled: false, impressionsPerUserPerDay: 0 },
      interstitial: { enabled: false, impressionsPerUserPerSession: 0 },
      appOpen: { enabled: false, impressionsPerUserPerDay: 0 },
      rewardedInterstitial: { enabled: false, impressionsPerUserPerDay: 0 },
      native: { enabled: false, impressionsPerUserPerDay: 0 },
      banner: { enabled: true, refreshIntervalSeconds: 60, showPerSessionMinutes: 4.0 },
    },
    hasMediation: false,
    fillRate: 85,
    selectedMonth: 5,
    useSeasonality: false,
  });

  const optimizedAdMob = calculateAdMobRevenue({
    mode: "quick",
    dau: 20000,
    categoryId: "casual-puzzle-games",
    geoDistribution: { tier1: 60, tier2: 30, tier3: 10 },
    platformSplit: { ios: 40, android: 60 },
    sessionsPerUserPerDay: 3.0,
    sessionDurationMinutes: 7.0,
    adFormats: {
      rewardedVideo: { enabled: true, impressionsPerUserPerDay: 2.2 },
      interstitial: { enabled: true, impressionsPerUserPerSession: 1.2 },
      appOpen: { enabled: true, impressionsPerUserPerDay: 1.4 },
      rewardedInterstitial: { enabled: true, impressionsPerUserPerDay: 0.5 },
      native: { enabled: false, impressionsPerUserPerDay: 0 },
      banner: { enabled: true, refreshIntervalSeconds: 30, showPerSessionMinutes: 5.0 },
    },
    hasMediation: true,
    fillRate: 96,
    selectedMonth: 5,
    useSeasonality: false,
  });

  const isAdSense = platform === "adsense";
  const baseMonthly = isAdSense ? baselineAdSense.monthlyRevenue : baselineAdMob.monthlyRevenue;
  const optMonthly = isAdSense ? optimizedAdSense.monthlyRevenue : optimizedAdMob.monthlyRevenue;
  const deltaMonthly = optMonthly - baseMonthly;
  const percentageLift = baseMonthly > 0 ? Math.round((deltaMonthly / baseMonthly) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                A/B Monetization Scenario Comparator
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Visualize how layout adjustments, mediation, and rewarded ads increase revenue
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setPlatform("adsense")}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (platform === "adsense"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              Website Comparison
            </button>
            <button
              onClick={() => setPlatform("admob")}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (platform === "admob"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              Mobile App Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baseline Scenario */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Scenario A: Basic Baseline Setup
            </span>
          </div>

          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
            {isAdSense ? (
              <>
                <div>• Single Top Banner + 1 Generic In-Content Unit</div>
                <div>• No Sticky Anchor Banner on Mobile</div>
                <div>• No Vignette Interstitial Screen Transitions</div>
                <div>• Standard 55% Ad Viewability</div>
              </>
            ) : (
              <>
                <div>• Banner Ads Only (60s slow auto-refresh)</div>
                <div>• No Rewarded Video Rewards</div>
                <div>• No Full-Screen Interstitials</div>
                <div>• No Ad Mediation / Single Network Only</div>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-xs text-neutral-400 mb-1">Baseline Monthly Revenue</div>
            <div className="text-2xl font-bold font-mono text-neutral-700 dark:text-neutral-300">
              {formatCurrency(baseMonthly, currency)} <span className="text-xs font-sans">/ mo</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Annual: {formatCurrency(baseMonthly * 12, currency)}
            </div>
          </div>
        </div>

        {/* Optimized Scenario */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border-2 border-emerald-500/60 dark:border-emerald-500/50 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-emerald-950">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Scenario B: Fully Optimized Setup ✨
            </span>
          </div>

          <div className="text-xs text-neutral-700 dark:text-neutral-300 space-y-1.5 font-medium">
            {isAdSense ? (
              <>
                <div>✓ Header Billboard + 3 Optimized In-Article Units</div>
                <div>✓ Mobile Sticky Anchor Ad (94% Viewability)</div>
                <div>✓ High-CPM Vignette Transitions</div>
                <div>✓ 82% Viewability with Sticky Sidebar Unit</div>
              </>
            ) : (
              <>
                <div>✓ Rewarded Video Incentives (eCPM $28+)</div>
                <div>✓ Natural Break Interstitials + App Open Splash</div>
                <div>✓ Adaptive Banners with 30s Fast Refresh</div>
                <div>✓ Real-Time Multi-Network Bidding Mediation (+25% Lift)</div>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-emerald-100 dark:border-emerald-950">
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              Optimized Monthly Revenue
            </div>
            <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {formatCurrency(optMonthly, currency)} <span className="text-xs font-sans">/ mo</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Annual: {formatCurrency(optMonthly * 12, currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Delta Revenue Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-950 text-white border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Optimization Revenue Delta
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-0.5">
              +{formatCurrency(deltaMonthly, currency)} <span className="text-sm text-emerald-400 font-sans font-bold">/ month extra</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              +{formatCurrency(deltaMonthly * 12, currency)} / year in unlocked earnings (+{percentageLift}% growth)
            </p>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
          <div className="text-xs text-emerald-300 font-semibold">Net Growth Multiplier</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">+{percentageLift}%</div>
        </div>
      </div>
    </div>
  );
};
