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
              <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[11px] font-semibold">
                {t.admob.tierDistribution}
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
                <span className="text-[10px] font-mono text-neutral-500 block">Tier 1</span>
                <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                  {inputs.geoDistribution.tier1}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <span className="text-[10px] font-mono text-neutral-500 block">Tier 2</span>
                <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                  {inputs.geoDistribution.tier2}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <span className="text-[10px] font-mono text-neutral-500 block">Tier 3</span>
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
              "p-3 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.adFormats.rewardedVideo.enabled
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">{t.admob.rewardedVideo}</span>
            <span className="text-[10px] font-mono">
              {inputs.adFormats.rewardedVideo.enabled ? t.admob.active : t.admob.disabled}
            </span>
          </button>

          {/* Interstitial */}
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
              "p-3 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.adFormats.interstitial.enabled
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">{t.admob.interstitial}</span>
            <span className="text-[10px] font-mono">
              {inputs.adFormats.interstitial.enabled ? t.admob.active : t.admob.disabled}
            </span>
          </button>

          {/* App Open */}
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
              "p-3 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.adFormats.appOpen.enabled
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">{t.admob.appOpen}</span>
            <span className="text-[10px] font-mono">
              {inputs.adFormats.appOpen.enabled ? t.admob.active : t.admob.disabled}
            </span>
          </button>

          {/* Adaptive Banner */}
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
              "p-3 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.adFormats.banner.enabled
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">{t.admob.adaptiveBanner}</span>
            <span className="text-[10px] font-mono">
              {inputs.adFormats.banner.enabled ? t.admob.active : t.admob.disabled}
            </span>
          </button>
        </div>

        {/* Real-time Bidding Mediation Toggle */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            role="switch"
            aria-checked={inputs.hasMediation}
            onClick={() => onChange({ ...inputs, hasMediation: !inputs.hasMediation })}
            className={
              "w-full p-3 rounded-xl border border-dashed flex items-center justify-between transition-colors cursor-pointer " +
              (inputs.hasMediation
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300")
            }
          >
            <div className="text-left space-y-0.5">
              <div className="text-xs font-mono font-bold">{t.admob.biddingMediation}</div>
              <div className="text-[10px] text-neutral-500">{t.admob.mediationDesc}</div>
            </div>
            <span className="text-xs font-mono font-bold">
              {inputs.hasMediation ? t.admob.active : t.admob.disabled}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
