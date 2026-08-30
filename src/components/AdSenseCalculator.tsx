import React from "react";
import { AdSenseInputs, CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES, ADSENSE_AD_UNITS, SEASONALITY_FACTORS } from "../data/adSenseData";
import { REGIONAL_PRESETS } from "../data/geoTiers";
import {
  Globe,
  Sliders,
  Sparkles,
  LayoutGrid,
  Shield,
  Eye,
  Percent,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Info,
} from "lucide-react";

interface AdSenseCalculatorProps {
  inputs: AdSenseInputs;
  onChange: (inputs: AdSenseInputs) => void;
  currency: CurrencyCode;
}

export const AdSenseCalculator: React.FC<AdSenseCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const selectedCategory =
    ADSENSE_CATEGORIES.find((c) => c.id === inputs.categoryId) || ADSENSE_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    const cat = ADSENSE_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    onChange({
      ...inputs,
      categoryId: catId,
      adBlockerRate: cat.adBlockerRisk,
      customCtr: cat.baseCtr,
      customCpc: undefined,
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
      {/* Configuration Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Website & Blog AdSense Settings
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Configure traffic, niche valuation, ad units, and audience geography
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
              <Sliders className="w-3.5 h-3.5 text-blue-500" />
              Advanced Mode
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            Website Niche & Industry Category
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              value={inputs.categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-900 dark:text-white text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ADSENSE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (T1 RPM ~${cat.baseRpmTier1})
                </option>
              ))}
            </select>

            {/* Live Category RPM Badges */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs">
              <span className="font-semibold text-blue-900 dark:text-blue-200">RPM Benchmarks:</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-mono">
                T1: ${selectedCategory.baseRpmTier1}
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                T2: ${selectedCategory.baseRpmTier2}
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                T3: ${selectedCategory.baseRpmTier3}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            {selectedCategory.description}
          </p>
        </div>

        {/* Monthly Pageviews Slider & Numeric Input */}
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Monthly Pageviews
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1000"
                max="50000000"
                step="5000"
                value={inputs.monthlyPageviews}
                onChange={(e) =>
                  onChange({
                    ...inputs,
                    monthlyPageviews: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className="w-36 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-right font-mono font-bold text-neutral-900 dark:text-white px-2.5 py-1 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">PV / mo</span>
            </div>
          </div>
          <input
            type="range"
            min="10000"
            max="1500000"
            step="10000"
            value={Math.min(inputs.monthlyPageviews, 1500000)}
            onChange={(e) =>
              onChange({
                ...inputs,
                monthlyPageviews: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
            <span>10K</span>
            <span>250K</span>
            <span>500K</span>
            <span>1M</span>
            <span>1.5M+</span>
          </div>
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
              Country tiers dictate advertiser bid floors and effective CPM
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
              <span className="text-blue-600 dark:text-blue-400 font-bold">Tier 1 Traffic</span>
              <span className="font-mono bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded text-blue-900 dark:text-blue-300 font-bold">
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
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Tier 2 */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-amber-600 dark:text-amber-400 font-bold">Tier 2 Traffic</span>
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
              <span className="text-neutral-600 dark:text-neutral-400 font-bold">Tier 3 Traffic</span>
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

      {/* Ad Units Configuration */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-blue-500" />
              Ad Placement & Format Architecture
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Select enabled ad unit positions on your web templates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* Leaderboard Header */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Top Header Billboard</div>
              <div className="text-[10px] text-neutral-500">728x90 / 970x250</div>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 p-1 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      leaderboard: Math.max(0, inputs.selectedUnits.leaderboard - 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1.5">
                {inputs.selectedUnits.leaderboard}
              </span>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      leaderboard: Math.min(2, inputs.selectedUnits.leaderboard + 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* In-Article Units */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">In-Article Content Ads</div>
              <div className="text-[10px] text-neutral-500">Between paragraphs</div>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 p-1 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      inArticle: Math.max(0, inputs.selectedUnits.inArticle - 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1.5">
                {inputs.selectedUnits.inArticle}
              </span>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      inArticle: Math.min(6, inputs.selectedUnits.inArticle + 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Sticky Sidebar Banner</div>
              <div className="text-[10px] text-neutral-500">300x600 Half-Page</div>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 p-1 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      sidebar: Math.max(0, inputs.selectedUnits.sidebar - 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1.5">
                {inputs.selectedUnits.sidebar}
              </span>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      sidebar: Math.min(2, inputs.selectedUnits.sidebar + 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Mobile Anchor Overlay */}
          <div
            onClick={() =>
              onChange({
                ...inputs,
                selectedUnits: {
                  ...inputs.selectedUnits,
                  anchorAd: !inputs.selectedUnits.anchorAd,
                },
              })
            }
            className={
              "p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between " +
              (inputs.selectedUnits.anchorAd
                ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800")
            }
          >
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Mobile Sticky Anchor</div>
              <div className="text-[10px] text-neutral-500">Persistent bottom dock (+18% RPM)</div>
            </div>
            <div
              className={
                "w-5 h-5 rounded-md flex items-center justify-center transition-colors " +
                (inputs.selectedUnits.anchorAd
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700")
              }
            >
              {inputs.selectedUnits.anchorAd && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Vignette Interstitial */}
          <div
            onClick={() =>
              onChange({
                ...inputs,
                selectedUnits: {
                  ...inputs.selectedUnits,
                  vignetteAd: !inputs.selectedUnits.vignetteAd,
                },
              })
            }
            className={
              "p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between " +
              (inputs.selectedUnits.vignetteAd
                ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800")
            }
          >
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Vignette Interstitial</div>
              <div className="text-[10px] text-neutral-500">Full-screen page transition (High CPM)</div>
            </div>
            <div
              className={
                "w-5 h-5 rounded-md flex items-center justify-center transition-colors " +
                (inputs.selectedUnits.vignetteAd
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700")
              }
            >
              {inputs.selectedUnits.vignetteAd && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Multiplex Content Grid */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Multiplex Related Grid</div>
              <div className="text-[10px] text-neutral-500">Article footer recommendation</div>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 p-1 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      multiplexAd: Math.max(0, inputs.selectedUnits.multiplexAd - 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1.5">
                {inputs.selectedUnits.multiplexAd}
              </span>
              <button
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      multiplexAd: Math.min(2, inputs.selectedUnits.multiplexAd + 1),
                    },
                  })
                }
                className="w-6 h-6 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Precision Modifiers */}
      {inputs.mode === "advanced" && (
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
          <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-500" />
              Advanced Granular Variables
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Fine-tune CTR, CPC, ad blockers, viewability, and seasonality adjustments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Custom CTR */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Ad CTR %</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {inputs.customCtr ?? selectedCategory.baseCtr}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={inputs.customCtr ?? selectedCategory.baseCtr}
                onChange={(e) => onChange({ ...inputs, customCtr: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="text-[10px] text-neutral-500">Benchmark: {selectedCategory.baseCtr}%</div>
            </div>

            {/* Ad Blocker Rate */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Ad Blocker %</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  {inputs.adBlockerRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={inputs.adBlockerRate}
                onChange={(e) => onChange({ ...inputs, adBlockerRate: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="text-[10px] text-neutral-500">Category Risk: {selectedCategory.adBlockerRisk}%</div>
            </div>

            {/* Ad Viewability Rate */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Viewability %</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {inputs.viewabilityRate}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                step="1"
                value={inputs.viewabilityRate}
                onChange={(e) => onChange({ ...inputs, viewabilityRate: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-[10px] text-neutral-500">Target: &gt;70% viewable</div>
            </div>

            {/* Seasonality Month */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Seasonality</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  {SEASONALITY_FACTORS[inputs.selectedMonth]?.multiplier}x
                </span>
              </div>
              <select
                value={inputs.selectedMonth}
                onChange={(e) => onChange({ ...inputs, selectedMonth: parseInt(e.target.value) })}
                className="w-full bg-white dark:bg-neutral-700 text-xs font-semibold rounded-lg px-2 py-1 border border-neutral-200 dark:border-neutral-600"
              >
                {SEASONALITY_FACTORS.map((sf, idx) => (
                  <option key={sf.month} value={idx}>
                    {sf.name} ({sf.multiplier}x)
                  </option>
                ))}
              </select>
              <div className="text-[10px] text-neutral-500">
                {SEASONALITY_FACTORS[inputs.selectedMonth]?.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
