import React from "react";
import { AdSenseInputs, CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { COUNTRIES } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import { Globe, Sliders } from "lucide-react";

interface AdSenseCalculatorProps {
  inputs: AdSenseInputs;
  onChange: (inputs: AdSenseInputs) => void;
  currency: CurrencyCode;
}

export const AdSenseCalculator: React.FC<AdSenseCalculatorProps> = ({
  inputs,
  onChange,
}) => {
  const { t } = useTranslation();
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
        label: `🌐 ${t.adsense.blended} (Custom Slider)`,
        badge: "BLENDED",
      },
      ...COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name}`,
        subLabel: `${c.cpmMultiplier}x RPM`,
        badge: c.tier.toUpperCase(),
      })),
    ],
    [t]
  );

  const categoryOptions: SearchableOption[] = React.useMemo(
    () =>
      ADSENSE_CATEGORIES.map((cat) => ({
        value: cat.id,
        label: cat.name,
        badge: `$${cat.baseRpmTier1} T1`,
      })),
    []
  );

  return (
    <div className="space-y-4">
      {/* Geographic Targeting & Account Country */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {t.adsense.geoTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {t.adsense.autoCalibrated}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="adsense-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {t.adsense.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">{t.adsense.taxAndBank}</span>
            </div>
            <SearchableSelect
              id="adsense-account-country"
              ariaLabel="AdSense Account Country for tax and payment settings"
              searchPlaceholder="Search country name or code..."
              options={accountCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="adsense-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {t.adsense.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                {inputs.targetCountry && inputs.targetCountry !== "ALL"
                  ? `${COUNTRIES.find((c) => c.code === inputs.targetCountry)?.tier.toUpperCase()} RPM`
                  : t.adsense.blended}
              </span>
            </div>
            <SearchableSelect
              id="adsense-traffic-country"
              ariaLabel="AdSense Audience Location Country"
              searchPlaceholder="Search audience country..."
              options={trafficCountryOptions}
              value={inputs.targetCountry || "ALL"}
              onChange={(val) => handleTrafficCountryChange(val)}
            />
          </div>
        </div>
      </div>

      {/* Website Setup */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {t.adsense.websiteParams}
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
              {t.adsense.quick}
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
              {t.adsense.advanced}
            </button>
          </div>
        </div>

        {/* Niche */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="adsense-category" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px]">
              {t.adsense.websiteNiche}
            </label>
            <TermTooltip id="pagerpm">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                T1 RPM: ${selectedCategory.baseRpmTier1}
              </span>
            </TermTooltip>
          </div>
          <SearchableSelect
            id="adsense-category"
            ariaLabel="AdSense Website Niche Category"
            searchPlaceholder={t.adsense.searchNichePlaceholder}
            options={categoryOptions}
            value={inputs.categoryId}
            onChange={(val) => handleCategoryChange(val)}
          />
        </div>

        {/* Pageviews */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="adsense-pageviews-number" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px] cursor-pointer flex items-center gap-1.5">
              <span>{t.adsense.monthlyPageviews}</span>
              <TermTooltip id="pagerpm" />
            </label>
            <input
              id="adsense-pageviews-number"
              aria-label="Monthly Pageviews number input"
              type="number"
              min="1000"
              max="50000000"
              step="5000"
              inputMode="numeric"
              value={inputs.monthlyPageviews}
              onChange={(e) => onChange({ ...inputs, monthlyPageviews: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-32 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
            />
          </div>
          <input
            id="adsense-pageviews-slider"
            aria-label="Monthly Pageviews range slider"
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={Math.min(inputs.monthlyPageviews, 1000000)}
            onChange={(e) => onChange({ ...inputs, monthlyPageviews: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      {/* Ad Units Grid */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            {t.adsense.adUnitsTitle}
          </span>
          <TermTooltip id="viewability">
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              {t.adsense.viewabilityGuide}
            </span>
          </TermTooltip>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Header Billboard */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.leaderboard > 0
                ? "border-blue-500 bg-blue-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">
                {t.adsense.topHeader}
              </span>
              <TermTooltip id="leaderboard" />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${t.adsense.topHeader} count`}
                disabled={inputs.selectedUnits.leaderboard <= 0}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      leaderboard: Math.max(0, inputs.selectedUnits.leaderboard - 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1 min-w-[20px] text-center text-blue-600 dark:text-blue-400">
                {inputs.selectedUnits.leaderboard}x
              </span>
              <button
                type="button"
                aria-label={`Increase ${t.adsense.topHeader} count`}
                disabled={inputs.selectedUnits.leaderboard >= 3}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      leaderboard: Math.min(3, inputs.selectedUnits.leaderboard + 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* In Article */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.inArticle > 0
                ? "border-blue-500 bg-blue-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">
                {t.adsense.inArticle}
              </span>
              <TermTooltip id="inArticle" />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${t.adsense.inArticle} count`}
                disabled={inputs.selectedUnits.inArticle <= 0}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      inArticle: Math.max(0, inputs.selectedUnits.inArticle - 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1 min-w-[20px] text-center text-blue-600 dark:text-blue-400">
                {inputs.selectedUnits.inArticle}x
              </span>
              <button
                type="button"
                aria-label={`Increase ${t.adsense.inArticle} count`}
                disabled={inputs.selectedUnits.inArticle >= 4}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      inArticle: Math.min(4, inputs.selectedUnits.inArticle + 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.sidebar > 0
                ? "border-blue-500 bg-blue-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">
                {t.adsense.sidebar}
              </span>
              <TermTooltip id="sidebar" />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${t.adsense.sidebar} count`}
                disabled={inputs.selectedUnits.sidebar <= 0}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      sidebar: Math.max(0, inputs.selectedUnits.sidebar - 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1 min-w-[20px] text-center text-blue-600 dark:text-blue-400">
                {inputs.selectedUnits.sidebar}x
              </span>
              <button
                type="button"
                aria-label={`Increase ${t.adsense.sidebar} count`}
                disabled={inputs.selectedUnits.sidebar >= 3}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      sidebar: Math.min(3, inputs.selectedUnits.sidebar + 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Mobile Anchor */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.anchorAd
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                role="switch"
                aria-checked={inputs.selectedUnits.anchorAd}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: { ...inputs.selectedUnits, anchorAd: !inputs.selectedUnits.anchorAd },
                  })
                }
                className="text-xs font-mono cursor-pointer hover:underline"
              >
                {t.adsense.anchor}
              </button>
              <TermTooltip id="anchorAd" />
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={inputs.selectedUnits.anchorAd}
              onClick={() =>
                onChange({
                  ...inputs,
                  selectedUnits: { ...inputs.selectedUnits, anchorAd: !inputs.selectedUnits.anchorAd },
                })
              }
              className={
                "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                (inputs.selectedUnits.anchorAd
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-dashed border-blue-500"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
              }
            >
              {inputs.selectedUnits.anchorAd ? t.adsense.on : t.adsense.off}
            </button>
          </div>

          {/* Vignette */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.vignetteAd
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                role="switch"
                aria-checked={inputs.selectedUnits.vignetteAd}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: { ...inputs.selectedUnits, vignetteAd: !inputs.selectedUnits.vignetteAd },
                  })
                }
                className="text-xs font-mono cursor-pointer hover:underline"
              >
                {t.adsense.vignette}
              </button>
              <TermTooltip id="vignette" />
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={inputs.selectedUnits.vignetteAd}
              onClick={() =>
                onChange({
                  ...inputs,
                  selectedUnits: { ...inputs.selectedUnits, vignetteAd: !inputs.selectedUnits.vignetteAd },
                })
              }
              className={
                "text-[10px] font-mono font-bold cursor-pointer px-2.5 py-1 rounded transition-colors " +
                (inputs.selectedUnits.vignetteAd
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-dashed border-blue-500"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700")
              }
            >
              {inputs.selectedUnits.vignetteAd ? t.adsense.on : t.adsense.off}
            </button>
          </div>

          {/* Multiplex */}
          <div
            className={
              "p-2.5 rounded-xl border border-dashed flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.multiplexAd > 0
                ? "border-blue-500 bg-blue-500/5 text-neutral-900 dark:text-white"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">
                {t.adsense.multiplex}
              </span>
              <TermTooltip id="multiplex" />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${t.adsense.multiplex} count`}
                disabled={inputs.selectedUnits.multiplexAd <= 0}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      multiplexAd: Math.max(0, inputs.selectedUnits.multiplexAd - 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1 min-w-[20px] text-center text-blue-600 dark:text-blue-400">
                {inputs.selectedUnits.multiplexAd}x
              </span>
              <button
                type="button"
                aria-label={`Increase ${t.adsense.multiplex} count`}
                disabled={inputs.selectedUnits.multiplexAd >= 2}
                onClick={() =>
                  onChange({
                    ...inputs,
                    selectedUnits: {
                      ...inputs.selectedUnits,
                      multiplexAd: Math.min(2, inputs.selectedUnits.multiplexAd + 1),
                    },
                  })
                }
                className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Monetization Modifiers */}
      {inputs.mode === "advanced" && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" aria-hidden="true" />
              <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
                {t.adsense.qualityModifiers}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Custom CTR */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.adsense.customCtr}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {inputs.customCtr ?? selectedCategory.baseCtr}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                aria-label="Custom Click-Through Rate"
                value={inputs.customCtr ?? selectedCategory.baseCtr}
                onChange={(e) =>
                  onChange({ ...inputs, customCtr: parseFloat(e.target.value) })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Niche Baseline: {selectedCategory.baseCtr}%
              </div>
            </div>

            {/* Ad Blocker Rate */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.adsense.adBlockerRate}
                </span>
                <span className="font-bold text-rose-500">
                  {inputs.adBlockerRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                aria-label="Ad Blocker Rate"
                value={inputs.adBlockerRate}
                onChange={(e) =>
                  onChange({ ...inputs, adBlockerRate: parseInt(e.target.value) || 0 })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Niche Risk: {selectedCategory.adBlockerRisk}%
              </div>
            </div>

            {/* Viewability Rate */}
            <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {t.adsense.viewabilityRate}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {inputs.viewabilityRate}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                step="1"
                aria-label="Ad Viewability Rate"
                value={inputs.viewabilityRate}
                onChange={(e) =>
                  onChange({ ...inputs, viewabilityRate: parseInt(e.target.value) || 70 })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-[10px] font-mono text-neutral-400">
                Target: &ge;70%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
