import React from "react";
import { AdMobInputs, CurrencyCode } from "../types";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { COUNTRIES, REGIONAL_PRESETS } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import {
  Smartphone,
  Globe,
  Building,
  Users,
} from "lucide-react";

interface AdMobCalculatorProps {
  inputs: AdMobInputs;
  onChange: (inputs: AdMobInputs) => void;
  currency: CurrencyCode;
}

export const AdMobCalculator: React.FC<AdMobCalculatorProps> = ({
  inputs,
  onChange,
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

  const handleTrafficCountryChange = (countryCode: string) => {
    if (countryCode === "ALL") {
      onChange({
        ...inputs,
        targetCountry: "ALL",
      });
      return;
    }
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (!country) return;

    const t1 = country.tier === "tier1" ? 100 : 0;
    const t2 = country.tier === "tier2" ? 100 : 0;
    const t3 = country.tier === "tier3" ? 100 : 0;

    onChange({
      ...inputs,
      targetCountry: countryCode,
      geoDistribution: { tier1: t1, tier2: t2, tier3: t3 },
    });
  };

  return (
    <div className="space-y-4">
      {/* Country Origins (Account vs Traffic) */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Geographic Targeting & Account
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            Auto-calibrated CPMs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <TermTooltip id="accountCountry">
                <span className="text-neutral-500 uppercase text-[10px]">Account Country</span>
              </TermTooltip>
              <span className="text-[10px] text-neutral-400 font-mono">Tax & Bank</span>
            </div>
            <select
              value={inputs.accountCountry || "US"}
              onChange={(e) => onChange({ ...inputs, accountCountry: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={"acc-" + c.code} value={c.code}>
                  {c.flag} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <TermTooltip id="trafficCountry">
                <span className="text-neutral-500 uppercase text-[10px]">Audience Location</span>
              </TermTooltip>
              <span className="text-[10px] text-emerald-500 font-mono font-bold">
                {inputs.targetCountry && inputs.targetCountry !== "ALL"
                  ? `${COUNTRIES.find((c) => c.code === inputs.targetCountry)?.tier.toUpperCase()} CPM`
                  : "Blended"}
              </span>
            </div>
            <select
              value={inputs.targetCountry || "ALL"}
              onChange={(e) => handleTrafficCountryChange(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="ALL">🌐 Global Traffic Mix (Custom Tier Slider)</option>
              <optgroup label="Tier 1 High-Yield Countries (US, UK, CA, DE, AU...)">
                {COUNTRIES.filter((c) => c.tier === "tier1").map((c) => (
                  <option key={"t1-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 1 · {c.cpmMultiplier}x CPM)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tier 2 Moderate-Yield Countries (BR, MX, IT, ES, ZA...)">
                {COUNTRIES.filter((c) => c.tier === "tier2").map((c) => (
                  <option key={"t2-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 2 · {c.cpmMultiplier}x CPM)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tier 3 High-Volume Emerging Countries (IN, PK, NG, PH...)">
                {COUNTRIES.filter((c) => c.tier === "tier3").map((c) => (
                  <option key={"t3-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 3 · {c.cpmMultiplier}x CPM)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* If Custom Global Mix is selected, show Tier distribution */}
        {(!inputs.targetCountry || inputs.targetCountry === "ALL") && (
          <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 text-[10px] uppercase">Global Tier Allocation</span>
              <div className="flex gap-1">
                {REGIONAL_PRESETS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() =>
                      onChange({
                        ...inputs,
                        geoDistribution: { tier1: p.t1, tier2: p.t2, tier3: p.t3 },
                      })
                    }
                    className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 text-neutral-500"
                  >
                    {p.name.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 text-[10px]">Tier 1</div>
                <div className="font-bold text-emerald-500">{inputs.geoDistribution.tier1}%</div>
              </div>
              <div className="p-2 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 text-[10px]">Tier 2</div>
                <div className="font-bold text-amber-500">{inputs.geoDistribution.tier2}%</div>
              </div>
              <div className="p-2 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 text-[10px]">Tier 3</div>
                <div className="font-bold text-neutral-400">{inputs.geoDistribution.tier3}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* App Parameters */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              App Category & Metrics
            </span>
          </div>
          <div className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => onChange({ ...inputs, mode: "quick" })}
              className={
                "px-2.5 py-0.5 rounded-md transition-all " +
                (inputs.mode === "quick"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              Quick
            </button>
            <button
              onClick={() => onChange({ ...inputs, mode: "advanced" })}
              className={
                "px-2.5 py-0.5 rounded-md transition-all " +
                (inputs.mode === "advanced"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Category & Benchmarks */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-500 uppercase">App Genre</span>
            <div className="flex items-center gap-1">
              <TermTooltip id="ecpm">
                <span className="text-emerald-500 font-bold">
                  Rewarded T1: ${selectedCategory.baseEcpm.rewarded.tier1}
                </span>
              </TermTooltip>
            </div>
          </div>
          <select
            value={inputs.categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {ADMOB_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* DAU Control */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500 uppercase">Daily Active Users (DAU)</span>
            </div>
            <input
              type="number"
              min="500"
              max="5000000"
              step="1000"
              inputMode="numeric"
              value={inputs.dau}
              onChange={(e) => onChange({ ...inputs, dau: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-28 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
            />
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={Math.min(inputs.dau, 100000)}
            onChange={(e) => onChange({ ...inputs, dau: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {/* OS & Mediation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* OS */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-neutral-500">Platform Split</span>
            <span className="font-bold text-neutral-900 dark:text-white">
              {inputs.platformSplit.ios}% iOS / {inputs.platformSplit.android}% Android
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={inputs.platformSplit.ios}
            onChange={(e) => {
              const ios = parseInt(e.target.value);
              onChange({ ...inputs, platformSplit: { ios, android: 100 - ios } });
            }}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-100"
          />
        </div>

        {/* Mediation */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-neutral-900 dark:text-white">
              <TermTooltip id="mediation">
                <span>Bidding Mediation</span>
              </TermTooltip>
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">MAX / Unity / Mintegral (+25%)</div>
          </div>
          <button
            onClick={() => onChange({ ...inputs, hasMediation: !inputs.hasMediation })}
            className={
              "px-3 py-1 text-xs font-mono font-bold rounded-lg border border-dashed transition-all " +
              (inputs.hasMediation
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                : "border-neutral-300 dark:border-neutral-700 text-neutral-500")
            }
          >
            {inputs.hasMediation ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Ad Formats */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Ad Formats Frequency
          </span>
          <TermTooltip id="ecpm">
            <span className="text-[10px] font-mono text-neutral-400">eCPM Guide</span>
          </TermTooltip>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Rewarded */}
          <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-neutral-900 dark:text-white">Rewarded Video</span>
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
                  "px-2 py-0.5 rounded text-[10px] font-bold border border-dashed " +
                  (inputs.adFormats.rewardedVideo.enabled
                    ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-400")
                }
              >
                {inputs.adFormats.rewardedVideo.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.rewardedVideo.enabled && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>Views/User/Day:</span>
                  <span className="font-bold text-emerald-400">
                    {inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
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
                  className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Interstitial */}
          <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-neutral-900 dark:text-white">Interstitial</span>
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
                  "px-2 py-0.5 rounded text-[10px] font-bold border border-dashed " +
                  (inputs.adFormats.interstitial.enabled
                    ? "border-blue-500 text-blue-500 bg-blue-500/10"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-400")
                }
              >
                {inputs.adFormats.interstitial.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.interstitial.enabled && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>Ads/Session:</span>
                  <span className="font-bold text-blue-400">
                    {inputs.adFormats.interstitial.impressionsPerUserPerSession}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
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
                  className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            )}
          </div>

          {/* App Open */}
          <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-neutral-900 dark:text-white">App Open Splash</span>
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
                  "px-2 py-0.5 rounded text-[10px] font-bold border border-dashed " +
                  (inputs.adFormats.appOpen.enabled
                    ? "border-amber-500 text-amber-500 bg-amber-500/10"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-400")
                }
              >
                {inputs.adFormats.appOpen.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.appOpen.enabled && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>Opens/User/Day:</span>
                  <span className="font-bold text-amber-400">
                    {inputs.adFormats.appOpen.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
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
                  className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            )}
          </div>

          {/* Banner */}
          <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-neutral-900 dark:text-white">Adaptive Banner</span>
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
                  "px-2 py-0.5 rounded text-[10px] font-bold border border-dashed " +
                  (inputs.adFormats.banner.enabled
                    ? "border-purple-500 text-purple-500 bg-purple-500/10"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-400")
                }
              >
                {inputs.adFormats.banner.enabled ? "Active" : "Off"}
              </button>
            </div>
            {inputs.adFormats.banner.enabled && (
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                <span>Refresh: 30s</span>
                <span>Active 4 min/session</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
