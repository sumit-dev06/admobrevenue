import React from "react";
import { AdSenseInputs, CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { COUNTRIES } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { Globe } from "lucide-react";

interface AdSenseCalculatorProps {
  inputs: AdSenseInputs;
  onChange: (inputs: AdSenseInputs) => void;
  currency: CurrencyCode;
}

export const AdSenseCalculator: React.FC<AdSenseCalculatorProps> = ({
  inputs,
  onChange,
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
        label: "🌐 Global Traffic Mix (Custom Tier Slider)",
        badge: "BLENDED",
      },
      ...COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name}`,
        subLabel: `${c.cpmMultiplier}x RPM`,
        badge: c.tier.toUpperCase(),
      })),
    ],
    []
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
              Geographic Targeting & Account
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            Auto-calibrated Page RPMs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="adsense-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">Account Country</span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">Tax & Bank</span>
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
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">Audience Location</span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                {inputs.targetCountry && inputs.targetCountry !== "ALL"
                  ? `${COUNTRIES.find((c) => c.code === inputs.targetCountry)?.tier.toUpperCase()} RPM`
                  : "Blended"}
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
              Website Parameters
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
              Quick
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
              Advanced
            </button>
          </div>
        </div>

        {/* Niche */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="adsense-category" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px]">Website Niche</label>
            <TermTooltip id="pagerpm">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                T1 RPM: ${selectedCategory.baseRpmTier1}
              </span>
            </TermTooltip>
          </div>
          <SearchableSelect
            id="adsense-category"
            ariaLabel="AdSense Website Niche Category"
            searchPlaceholder="Search finance, tech, travel, news..."
            options={categoryOptions}
            value={inputs.categoryId}
            onChange={(val) => handleCategoryChange(val)}
          />
        </div>

        {/* Pageviews */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="adsense-pageviews-number" className="text-neutral-600 dark:text-neutral-400 uppercase font-semibold text-[11px] cursor-pointer">Monthly Pageviews</label>
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
            Ad Units On Page
          </span>
          <TermTooltip id="viewability">
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">Viewability Guide</span>
          </TermTooltip>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Header Billboard */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Top Header</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              {inputs.selectedUnits.leaderboard}x
            </span>
          </div>

          {/* In Article */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">In-Article</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              {inputs.selectedUnits.inArticle}x
            </span>
          </div>

          {/* Sidebar */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Sidebar</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              {inputs.selectedUnits.sidebar}x
            </span>
          </div>

          {/* Mobile Anchor */}
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
              "p-2.5 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.anchorAd
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">Anchor</span>
            <span className="text-[10px] font-mono">{inputs.selectedUnits.anchorAd ? "ON" : "OFF"}</span>
          </button>

          {/* Vignette */}
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
              "p-2.5 rounded-xl border border-dashed cursor-pointer flex items-center justify-between transition-colors " +
              (inputs.selectedUnits.vignetteAd
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400")
            }
          >
            <span className="text-xs font-mono">Vignette</span>
            <span className="text-[10px] font-mono">{inputs.selectedUnits.vignetteAd ? "ON" : "OFF"}</span>
          </button>

          {/* Multiplex */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Multiplex</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              {inputs.selectedUnits.multiplexAd}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
