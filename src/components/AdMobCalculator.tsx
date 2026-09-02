import React from "react";
import { AdMobInputs, CurrencyCode } from "../types";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { COUNTRIES, REGIONAL_PRESETS } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import {
  Smartphone,
  Globe,
  Users,
  Sliders,
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
  const { t } = useTranslation();
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

  const accountCountryOptions: SearchableOption[] = React.useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name} (${c.code})`,
        badge: c.tier.toUpperCase(),
      })),
    []
  );

  const trafficCountryOptions: SearchableOption[] = React.useMemo(
    () => [
      {
        value: "ALL",
        label: `🌐 ${t.admob.blended} (Custom Slider)`,
        badge: "BLENDED",
      },
      ...COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name}`,
        subLabel: `${c.cpmMultiplier}x CPM`,
        badge: c.tier.toUpperCase(),
      })),
    ],
    [t]
  );

  const categoryOptions: SearchableOption[] = React.useMemo(
    () =>
      ADMOB_CATEGORIES.map((cat) => ({
        value: cat.id,
        label: cat.name,
        badge: `$${cat.baseEcpm.rewarded.tier1} T1`,
      })),
    []
  );

  return (
    <div className="space-y-4">
      {/* Target Audience & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {t.admob.audienceTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {t.admob.autoCalibrated}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="admob-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {t.admob.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">{t.admob.taxAndBank}</span>
            </div>
            <SearchableSelect
              id="admob-account-country"
              ariaLabel="AdMob Account Country for tax and payment settings"
              searchPlaceholder="Search country name or code..."
              options={accountCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="admob-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {t.admob.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">
                {inputs.targetCountry && inputs.targetCountry !== "ALL"
                  ? `${COUNTRIES.find((c) => c.code === inputs.targetCountry)?.tier.toUpperCase()} CPM`
                  : t.admob.blended}
              </span>
            </div>
            <SearchableSelect
              id="admob-traffic-country"
              ariaLabel="AdMob User Audience Location Country"
              searchPlaceholder="Search country or select Global..."
              options={trafficCountryOptions}
              value={inputs.targetCountry || "ALL"}
              onChange={(val) => handleTrafficCountryChange(val)}
            />
          </div>
        </div>

        {/* Custom Geo Tier Sliders */}
        {inputs.targetCountry === "ALL" && (
          <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[11px] font-semibold flex items-center gap-1">
                <span>{t.admob.tierDistribution}</span>
                <TermTooltip id="tier1" />
              </span>
              <div className="flex gap-1">
                {REGIONAL_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => onChange({ ...inputs, geoDistribution: { tier1: p.t1, tier2: p.t2, tier3: p.t3 } })}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono cursor-pointer"
                  >
                    {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] font-mono text-neutral-500">Tier 1</span>
                  <TermTooltip id="tier1" />
                </div>
                <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                  {inputs.geoDistribution.tier1}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] font-mono text-neutral-500">Tier 2</span>
                  <TermTooltip id="tier2" />
                </div>
                <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                  {inputs.geoDistribution.tier2}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] font-mono text-neutral-500">Tier 3</span>
                  <TermTooltip id="tier3" />
                </div>
                <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                  {inputs.geoDistribution.tier3}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* App Category & Metrics */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {t.admob.appParams}
            </span>
          </div>
          <div className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 rounded-lg text-xs font-mono">
            <button
              type="button"
              onClick={() => onChange({ ...inputs, mode: "quick" })}
              className={
                "px-2.5 py-0.5 rounded-md transition-all cursor-pointer " +
                (inputs.mode === "quick"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white")
              }
              aria-label="Switch to Quick Mode"
            >
              {t.admob.quick}
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...inputs, mode: "advanced" })}
              className={
                "px-2.5 py-0.5 rounded-md transition-all cursor-pointer " +
                (inputs.mode === "advanced"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white")
              }
              aria-label="Switch to Advanced Mode"
            >
              {t.admob.advanced}
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="admob-category" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px]">
              {t.admob.appGenre}
            </label>
            <TermTooltip id="ecpm">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Rewarded T1: ${selectedCategory.baseEcpm.rewarded.tier1}
              </span>
            </TermTooltip>
          </div>
          <SearchableSelect
            id="admob-category"
            ariaLabel="AdMob App Category"
            searchPlaceholder={t.admob.searchCategoryPlaceholder}
            options={categoryOptions}
            value={inputs.categoryId}
            onChange={(val) => handleCategoryChange(val)}
          />
        </div>

        {/* DAU */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="admob-dau-number" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer">
              <Users className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
              <span>{t.admob.dau}</span>
              <TermTooltip id="dau" />
            </label>
            <input
              id="admob-dau-number"
              aria-label="Daily Active Users number input"
              type="number"
              min="100"
              max="5000000"
              step="500"
              inputMode="numeric"
              value={inputs.dau}
              onChange={(e) => onChange({ ...inputs, dau: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-28 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
            />
          </div>
          <input
            id="admob-dau-slider"
            aria-label="Daily Active Users range slider"
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={Math.min(inputs.dau, 100000)}
            onChange={(e) => onChange({ ...inputs, dau: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Platform Split (100% Android on Left -> 100% iOS on Right) */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="admob-platform-split" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer">
              <span>{t.admob.platformSplit}</span>
              <TermTooltip id="osPlatform" />
            </label>
            <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
              {inputs.platformSplit?.android ?? 70}% Android / {inputs.platformSplit?.ios ?? 30}% iOS
            </span>
          </div>
          <div className="space-y-1">
            <input
              id="admob-platform-split"
              aria-label="Platform Split: 100% Android on left, 100% iOS on right"
              type="range"
              min="0"
              max="100"
              step="5"
              value={inputs.platformSplit?.ios ?? 30}
              onChange={(e) => {
                const iosVal = parseInt(e.target.value) || 0;
                onChange({
                  ...inputs,
                  platformSplit: {
                    ios: iosVal,
                    android: 100 - iosVal,
                  },
                });
              }}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <button
                type="button"
                onClick={() => onChange({ ...inputs, platformSplit: { ios: 0, android: 100 } })}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                100% Android
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...inputs, platformSplit: { ios: 50, android: 50 } })}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                50 / 50
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...inputs, platformSplit: { ios: 100, android: 0 } })}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                100% iOS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Formats & Mediation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            {t.admob.adFormatsTitle}
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {Object.values(inputs.adFormats).filter((f) => f.enabled).length} Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Rewarded Video */}
          <div
            className={
              "p-3 rounded-xl border border-dashed transition-colors space-y-2 " +
              (inputs.adFormats.rewardedVideo.enabled
                ? "border-emerald-500 bg-emerald-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.adFormats.rewardedVideo.enabled}
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
                  className="text-xs font-mono font-bold cursor-pointer hover:underline"
                >
                  {t.admob.rewardedVideo}
                </button>
                <TermTooltip id="rewardedVideo" />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={inputs.adFormats.rewardedVideo.enabled}
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
                  "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                  (inputs.adFormats.rewardedVideo.enabled
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-500"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
                }
              >
                {inputs.adFormats.rewardedVideo.enabled ? t.admob.active : t.admob.disabled}
              </button>
            </div>

            {inputs.adFormats.rewardedVideo.enabled && (
              <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {t.admob.impressionsPerDay}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="10.0"
                  step="0.1"
                  aria-label="Rewarded Video Impressions per user per day"
                  value={inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        rewardedVideo: {
                          ...inputs.adFormats.rewardedVideo,
                          impressionsPerUserPerDay: parseFloat(e.target.value) || 0.2,
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Interstitial */}
          <div
            className={
              "p-3 rounded-xl border border-dashed transition-colors space-y-2 " +
              (inputs.adFormats.interstitial.enabled
                ? "border-emerald-500 bg-emerald-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.adFormats.interstitial.enabled}
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
                  className="text-xs font-mono font-bold cursor-pointer hover:underline"
                >
                  {t.admob.interstitial}
                </button>
                <TermTooltip id="interstitial" />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={inputs.adFormats.interstitial.enabled}
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
                  "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                  (inputs.adFormats.interstitial.enabled
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-500"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
                }
              >
                {inputs.adFormats.interstitial.enabled ? t.admob.active : t.admob.disabled}
              </button>
            </div>

            {inputs.adFormats.interstitial.enabled && (
              <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {t.admob.impressionsPerSession}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {inputs.adFormats.interstitial.impressionsPerUserPerSession}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="6.0"
                  step="0.1"
                  aria-label="Interstitial Impressions per user per session"
                  value={inputs.adFormats.interstitial.impressionsPerUserPerSession}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        interstitial: {
                          ...inputs.adFormats.interstitial,
                          impressionsPerUserPerSession: parseFloat(e.target.value) || 0.2,
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* App Open */}
          <div
            className={
              "p-3 rounded-xl border border-dashed transition-colors space-y-2 " +
              (inputs.adFormats.appOpen.enabled
                ? "border-emerald-500 bg-emerald-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.adFormats.appOpen.enabled}
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
                  className="text-xs font-mono font-bold cursor-pointer hover:underline"
                >
                  {t.admob.appOpen}
                </button>
                <TermTooltip id="appOpen" />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={inputs.adFormats.appOpen.enabled}
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
                  "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                  (inputs.adFormats.appOpen.enabled
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-500"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
                }
              >
                {inputs.adFormats.appOpen.enabled ? t.admob.active : t.admob.disabled}
              </button>
            </div>

            {inputs.adFormats.appOpen.enabled && (
              <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {t.admob.impressionsPerDay}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {inputs.adFormats.appOpen.impressionsPerUserPerDay}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  aria-label="App Open Impressions per user per day"
                  value={inputs.adFormats.appOpen.impressionsPerUserPerDay}
                  onChange={(e) =>
                    onChange({
                      ...inputs,
                      adFormats: {
                        ...inputs.adFormats,
                        appOpen: {
                          ...inputs.adFormats.appOpen,
                          impressionsPerUserPerDay: parseFloat(e.target.value) || 0.1,
                        },
                      },
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Adaptive Banner */}
          <div
            className={
              "p-3 rounded-xl border border-dashed transition-colors space-y-2 " +
              (inputs.adFormats.banner.enabled
                ? "border-emerald-500 bg-emerald-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.adFormats.banner.enabled}
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
                  className="text-xs font-mono font-bold cursor-pointer hover:underline"
                >
                  {t.admob.adaptiveBanner}
                </button>
                <TermTooltip id="adaptiveBanner" />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={inputs.adFormats.banner.enabled}
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
                  "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                  (inputs.adFormats.banner.enabled
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-500"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
                }
              >
                {inputs.adFormats.banner.enabled ? t.admob.active : t.admob.disabled}
              </button>
            </div>

            {inputs.adFormats.banner.enabled && (
              <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800/80 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {t.admob.showPerSessionMinutes}:
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {inputs.adFormats.banner.showPerSessionMinutes} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.5"
                    aria-label="Banner active minutes per session"
                    value={inputs.adFormats.banner.showPerSessionMinutes}
                    onChange={(e) =>
                      onChange({
                        ...inputs,
                        adFormats: {
                          ...inputs.adFormats,
                          banner: {
                            ...inputs.adFormats.banner,
                            showPerSessionMinutes: parseFloat(e.target.value) || 0.5,
                          },
                        },
                      })
                    }
                    className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-medium">
                    {t.admob.refreshSeconds}:
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {[30, 45, 60].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() =>
                          onChange({
                            ...inputs,
                            adFormats: {
                              ...inputs.adFormats,
                              banner: {
                                ...inputs.adFormats.banner,
                                refreshIntervalSeconds: sec,
                              },
                            },
                          })
                        }
                        className={
                          "px-2 py-0.5 rounded text-[10px] font-bold border border-dashed cursor-pointer transition-colors " +
                          (inputs.adFormats.banner.refreshIntervalSeconds === sec
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
                        }
                      >
                        {sec}s{sec === 30 ? " *" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Bidding Mediation Toggle */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div
            className={
              "w-full p-3 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.hasMediation
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300")
            }
          >
            <div className="text-left space-y-0.5">
              <div className="text-xs font-mono font-bold flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onChange({ ...inputs, hasMediation: !inputs.hasMediation })}
                  className="cursor-pointer hover:underline"
                >
                  {t.admob.biddingMediation}
                </button>
                <TermTooltip id="biddingMediation" />
              </div>
              <div className="text-[10px] text-neutral-500">{t.admob.mediationDesc}</div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={inputs.hasMediation}
              onClick={() => onChange({ ...inputs, hasMediation: !inputs.hasMediation })}
              className="text-xs font-mono font-bold cursor-pointer px-3 py-1 rounded bg-white/70 dark:bg-neutral-800 shadow-2xs"
            >
              {inputs.hasMediation ? t.admob.active : t.admob.disabled}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Engagement & Delivery Modifiers */}
      {inputs.mode === "advanced" && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
                {t.admob.advanced} Engagement &amp; Delivery Modifiers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Sessions Per User */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.admob.sessionsPerUser}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {inputs.sessionsPerUserPerDay}x
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                aria-label="Sessions per user per day"
                value={inputs.sessionsPerUserPerDay}
                onChange={(e) =>
                  onChange({ ...inputs, sessionsPerUserPerDay: parseFloat(e.target.value) || 1 })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Genre Avg: {selectedCategory.avgSessionsPerDay} sessions
              </div>
            </div>

            {/* Session Duration */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.admob.sessionDuration}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {inputs.sessionDurationMinutes} min
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                aria-label="Session duration in minutes"
                value={inputs.sessionDurationMinutes}
                onChange={(e) =>
                  onChange({ ...inputs, sessionDurationMinutes: parseInt(e.target.value) || 1 })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Genre Avg: {selectedCategory.avgSessionDurationMinutes} min
              </div>
            </div>

            {/* Fill Rate */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.admob.fillRate}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {inputs.fillRate}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                step="1"
                aria-label="Network Fill Rate percentage"
                value={inputs.fillRate}
                onChange={(e) =>
                  onChange({ ...inputs, fillRate: parseInt(e.target.value) || 95 })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Industry Benchmark: ~95%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
