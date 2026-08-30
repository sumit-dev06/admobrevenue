import React from "react";
import { AdMobInputs, CurrencyCode } from "../types";
import { ADMOB_CATEGORIES, ADMOB_FORMAT_SPECS } from "../data/adMobData";
import { REGIONAL_PRESETS } from "../data/geoTiers";
import { SEASONALITY_FACTORS } from "../data/adSenseData";
import {
  Smartphone,
  Sliders,
  Zap,
  ShieldCheck,
  Percent,
  PlaySquare,
  Maximize,
  Sparkles,
  Layers,
  CheckCircle2,
  Apple,
} from "lucide-react";

interface AdMobCalculatorProps {
  inputs: AdMobInputs;
  onChange: (inputs: AdMobInputs) => void;
  currency: CurrencyCode;
}

export const AdMobCalculator: React.FC<AdMobCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const selectedCategory =
    ADMOB_CATEGORIES.find((c) => c.id === inputs.categoryId) || ADMOB_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    const cat = ADMOB_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    onChange({
      ...inputs,
      categoryId: catId,
      sessionsPerUserPerDay: cat.avgSessionsPerDay,
      sessionDurationMinutes: cat.avgSessionDurationMinutes,
    });
  };

  const handleGeoPreset = (preset: (typeof REGIONAL_PRESETS)[0]) => {
    onChange({
      ...inputs,
      geoDistribution: {
        tier1: preset.t1,
        tier2: preset.t2,
        tier3: preset.t3,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Category & DAU Masthead */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Mobile App AdMob Configuration
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Configure DAU/MAU, app genre, OS distribution, formats, and mediation
              </p>
            </div>
          </div>

          {/* Mode Switch: Quick vs Advanced */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => onChange({ ...inputs, mode: "quick" })}
              className={
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (inputs.mode === "quick"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              Quick Mode
            </button>
            <button
              onClick={() => onChange({ ...inputs, mode: "advanced" })}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (inputs.mode === "advanced"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-500" />
              Advanced Mode
            </button>
          </div>
        </div>

        {/* App Category Selector */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            App Category & Genre
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              value={inputs.categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-900 dark:text-white text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ADMOB_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (Rewarded T1 eCPM ~${cat.baseEcpm.rewarded.tier1})
                </option>
              ))}
            </select>

            {/* Live Genre Benchmark Badges */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs">
              <span className="font-semibold text-emerald-900 dark:text-emerald-200">eCPMs:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono">
                Rewarded: ${selectedCategory.baseEcpm.rewarded.tier1}
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                Inter: ${selectedCategory.baseEcpm.interstitial.tier1}
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                Banner: ${selectedCategory.baseEcpm.banner.tier1}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            {selectedCategory.description}
          </p>
        </div>

        {/* Daily Active Users (DAU) Slider & Direct Input */}
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Daily Active Users (DAU)
              </label>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Estimated MAU: ~{(inputs.dau / (selectedCategory.baseStickiness || 0.25)).toLocaleString("en-US", { maximumFractionDigits: 0 })} users
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="500"
                max="5000000"
                step="1000"
                value={inputs.dau}
                onChange={(e) =>
                  onChange({
                    ...inputs,
                    dau: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className="w-36 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-right font-mono font-bold text-neutral-900 dark:text-white px-2.5 py-1 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">DAU</span>
            </div>
          </div>
          <input
            type="range"
            min="1000"
            max="150000"
            step="1000"
            value={Math.min(inputs.dau, 150000)}
            onChange={(e) =>
              onChange({
                ...inputs,
                dau: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
            <span>1K</span>
            <span>25K</span>
            <span>50K</span>
            <span>100K</span>
            <span>150K+</span>
          </div>
        </div>
      </div>

      {/* Platform OS & Mediation Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OS Platform Split */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
              OS Platform Split
            </h4>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              iOS commands +30% eCPM
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-1">
            <span className="text-neutral-800 dark:text-neutral-200">iOS: {inputs.platformSplit.ios}%</span>
            <span className="text-emerald-600 dark:text-emerald-400">Android: {inputs.platformSplit.android}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={inputs.platformSplit.ios}
            onChange={(e) => {
              const ios = parseInt(e.target.value);
              onChange({
                ...inputs,
                platformSplit: { ios, android: 100 - ios },
              });
            }}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-100"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>100% Android</span>
            <span>50 / 50</span>
            <span>100% iOS</span>
          </div>
        </div>

        {/* Mediation & Open Bidding Option */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Ad Mediation & Real-Time Bidding
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  AppLovin MAX, Unity, ironSource, Mintegral auctions
                </p>
              </div>
            </div>
            <button
              onClick={() => onChange({ ...inputs, hasMediation: !inputs.hasMediation })}
              className={
                "px-3 py-1.5 text-xs font-bold rounded-xl transition-all " +
                (inputs.hasMediation
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400")
              }
            >
              {inputs.hasMediation ? "Enabled (+25% Lift)" : "Disabled"}
            </button>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-3">
            Real-time multi-network competitive bidding lifts eCPMs by 15% - 35% over standalone AdMob.
          </p>
        </div>
      </div>

      {/* Audience Geography Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Traffic Geographic Distribution
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Country tiers dictate mobile ad request fill rates and eCPMs
            </p>
          </div>
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {REGIONAL_PRESETS.slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => handleGeoPreset(p)}
                className="px-2 py-1 text-[11px] font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                {p.name.split(" (")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Tier Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Tier 1 */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tier 1 Users</span>
              <span className="font-mono bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded text-emerald-900 dark:text-emerald-300 font-bold">
                {inputs.geoDistribution.tier1}%
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">US, UK, CA, AU, DE, EU</p>
            <input
              type="range"
              min="0"
              max="100"
              value={inputs.geoDistribution.tier1}
              onChange={(e) => {
                const t1 = parseInt(e.target.value);
                const remainder = 100 - t1;
                const half = Math.round(remainder / 2);
                onChange({
                  ...inputs,
                  geoDistribution: { tier1: t1, tier2: half, tier3: remainder - half },
                });
              }}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Tier 2 */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-amber-600 dark:text-amber-400 font-bold">Tier 2 Users</span>
              <span className="font-mono bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded text-amber-900 dark:text-amber-300 font-bold">
                {inputs.geoDistribution.tier2}%
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">BR, MX, ES, IT, PL, ZA</p>
            <input
              type="range"
              min="0"
              max="100"
              value={inputs.geoDistribution.tier2}
              onChange={(e) => {
                const t2 = parseInt(e.target.value);
                const remainder = Math.max(0, 100 - t2);
                const t1 = Math.min(inputs.geoDistribution.tier1, remainder);
                onChange({
                  ...inputs,
                  geoDistribution: { tier1: t1, tier2: t2, tier3: remainder - t1 },
                });
              }}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Tier 3 */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-600 dark:text-neutral-400 font-bold">Tier 3 Users</span>
              <span className="font-mono bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-900 dark:text-white font-bold">
                {inputs.geoDistribution.tier3}%
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">IN, PK, NG, BD, PH, ID</p>
            <input
              type="range"
              min="0"
              max="100"
              value={inputs.geoDistribution.tier3}
              onChange={(e) => {
                const t3 = parseInt(e.target.value);
                const remainder = Math.max(0, 100 - t3);
                const t1 = Math.min(inputs.geoDistribution.tier1, remainder);
                onChange({
                  ...inputs,
                  geoDistribution: { tier1: t1, tier2: remainder - t1, tier3: t3 },
                });
              }}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* AdMob Ad Formats Architecture */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <PlaySquare className="w-4 h-4 text-emerald-500" />
            Ad Formats & Impression Frequency
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Configure how often each format is shown per active user session
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* 1. Rewarded Video */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <PlaySquare className="w-3.5 h-3.5 text-emerald-500" />
                  Rewarded Video Ads
                </div>
                <div className="text-[10px] text-neutral-500">Highest eCPM ($20-$45 Tier 1)</div>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    adFormats: {
                      ...inputs.adFormats,
                      rewardedVideo: {
                        ...inputs.adFormats.rewardedVideo,
                        enabled: !inputs.adFormats.rewardedVideo.enabled,
                      },
                    },
                  })
                }
                className={
                  "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors " +
                  (inputs.adFormats.rewardedVideo.enabled
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300")
                }
              >
                {inputs.adFormats.rewardedVideo.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.rewardedVideo.enabled && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-600 dark:text-neutral-400">Views / User / Day:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.1"
                  value={inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        rewardedVideo: {
                          ...inputs.adFormats.rewardedVideo,
                          impressionsPerUserPerDay: parseFloat(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* 2. Interstitial Ads */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-blue-500" />
                  Interstitial Full-Screen Ads
                </div>
                <div className="text-[10px] text-neutral-500">Break point ads ($10-$22 Tier 1)</div>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    adFormats: {
                      ...inputs.adFormats,
                      interstitial: {
                        ...inputs.adFormats.interstitial,
                        enabled: !inputs.adFormats.interstitial.enabled,
                      },
                    },
                  })
                }
                className={
                  "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors " +
                  (inputs.adFormats.interstitial.enabled
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300")
                }
              >
                {inputs.adFormats.interstitial.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.interstitial.enabled && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-600 dark:text-neutral-400">Ads / Session:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    {inputs.adFormats.interstitial.impressionsPerUserPerSession}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={inputs.adFormats.interstitial.impressionsPerUserPerSession}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        interstitial: {
                          ...inputs.adFormats.interstitial,
                          impressionsPerUserPerSession: parseFloat(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            )}
          </div>

          {/* 3. App Open Ads */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  App Open Splash Ads
                </div>
                <div className="text-[10px] text-neutral-500">Foreground launch ads ($8-$16 Tier 1)</div>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    adFormats: {
                      ...inputs.adFormats,
                      appOpen: {
                        ...inputs.adFormats.appOpen,
                        enabled: !inputs.adFormats.appOpen.enabled,
                      },
                    },
                  })
                }
                className={
                  "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors " +
                  (inputs.adFormats.appOpen.enabled
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300")
                }
              >
                {inputs.adFormats.appOpen.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.appOpen.enabled && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-600 dark:text-neutral-400">Opens / User / Day:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {inputs.adFormats.appOpen.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={inputs.adFormats.appOpen.impressionsPerUserPerDay}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        appOpen: {
                          ...inputs.adFormats.appOpen,
                          impressionsPerUserPerDay: parseFloat(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            )}
          </div>

          {/* 4. Adaptive Banners */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-500" />
                  Adaptive Sticky Banners
                </div>
                <div className="text-[10px] text-neutral-500">Auto-refreshing in-session ads</div>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    adFormats: {
                      ...inputs.adFormats,
                      banner: {
                        ...inputs.adFormats.banner,
                        enabled: !inputs.adFormats.banner.enabled,
                      },
                    },
                  })
                }
                className={
                  "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors " +
                  (inputs.adFormats.banner.enabled
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300")
                }
              >
                {inputs.adFormats.banner.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.banner.enabled && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1">Refresh Rate:</div>
                  <select
                    value={inputs.adFormats.banner.refreshIntervalSeconds}
                    onChange={(e) =>
                      onChange({
                        ...inputs,
                        adFormats: {
                          ...inputs.adFormats,
                          banner: {
                            ...inputs.adFormats.banner,
                            refreshIntervalSeconds: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                    className="w-full bg-white dark:bg-neutral-700 text-xs font-semibold rounded-lg px-2 py-1 border border-neutral-200 dark:border-neutral-600"
                  >
                    <option value={30}>Every 30s (Optimal)</option>
                    <option value={45}>Every 45s</option>
                    <option value={60}>Every 60s</option>
                  </select>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1">Minutes / Session:</div>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={inputs.adFormats.banner.showPerSessionMinutes}
                    onChange={(e) =>
                      onChange({
                        ...inputs,
                        adFormats: {
                          ...inputs.adFormats,
                          banner: {
                            ...inputs.adFormats.banner,
                            showPerSessionMinutes: parseFloat(e.target.value) || 1,
                          },
                        },
                      })
                    }
                    className="w-full bg-white dark:bg-neutral-700 text-xs font-semibold font-mono rounded-lg px-2 py-1 border border-neutral-200 dark:border-neutral-600 text-right"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
