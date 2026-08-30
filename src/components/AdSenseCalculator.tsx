import React from "react";
import { AdSenseInputs, CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { COUNTRIES, REGIONAL_PRESETS } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import { Globe, Building, Eye, ShieldAlert } from "lucide-react";

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
              <TermTooltip id="accountCountry">
                <span className="text-neutral-500 uppercase text-[10px]">Account Country</span>
              </TermTooltip>
              <span className="text-[10px] text-neutral-400 font-mono">Tax & Bank</span>
            </div>
            <select
              value={inputs.accountCountry || "US"}
              onChange={(e) => onChange({ ...inputs, accountCountry: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={"acc-adsense-" + c.code} value={c.code}>
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
              <span className="text-[10px] text-blue-500 font-mono font-bold">
                {inputs.targetCountry && inputs.targetCountry !== "ALL"
                  ? `${COUNTRIES.find((c) => c.code === inputs.targetCountry)?.tier.toUpperCase()} RPM`
                  : "Blended"}
              </span>
            </div>
            <select
              value={inputs.targetCountry || "ALL"}
              onChange={(e) => handleTrafficCountryChange(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">🌐 Global Traffic Mix (Custom Tier Slider)</option>
              <optgroup label="Tier 1 High-Yield Countries (US, UK, CA, DE, AU...)">
                {COUNTRIES.filter((c) => c.tier === "tier1").map((c) => (
                  <option key={"adsense-t1-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 1 · {c.cpmMultiplier}x RPM)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tier 2 Moderate-Yield Countries (BR, MX, IT, ES, ZA...)">
                {COUNTRIES.filter((c) => c.tier === "tier2").map((c) => (
                  <option key={"adsense-t2-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 2 · {c.cpmMultiplier}x RPM)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tier 3 High-Volume Emerging Countries (IN, PK, NG, PH...)">
                {COUNTRIES.filter((c) => c.tier === "tier3").map((c) => (
                  <option key={"adsense-t3-" + c.code} value={c.code}>
                    {c.flag} {c.name} (Tier 3 · {c.cpmMultiplier}x RPM)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Website Setup */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Website Parameters
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

        {/* Niche */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-500 uppercase">Website Niche</span>
            <TermTooltip id="pagerpm">
              <span className="text-blue-500 font-bold">
                T1 RPM: ${selectedCategory.baseRpmTier1}
              </span>
            </TermTooltip>
          </div>
          <select
            value={inputs.categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-mono font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {ADSENSE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pageviews */}
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-500 uppercase">Monthly Pageviews</span>
            <input
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
            <span className="text-[10px] font-mono text-neutral-400">Viewability Guide</span>
          </TermTooltip>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Header Billboard */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Top Header</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
              {inputs.selectedUnits.leaderboard}x
            </span>
          </div>

          {/* In Article */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">In-Article</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
              {inputs.selectedUnits.inArticle}x
            </span>
          </div>

          {/* Sidebar */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Sidebar</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
              {inputs.selectedUnits.sidebar}x
            </span>
          </div>

          {/* Mobile Anchor */}
          <div
            onClick={() =>
              onChange({
                ...inputs,
                selectedUnits: { ...inputs.selectedUnits, anchorAd: !inputs.selectedUnits.anchorAd },
              })
            }
            className={
              "p-2.5 rounded-xl border border-dashed cursor-pointer flex items-center justify-between " +
              (inputs.selectedUnits.anchorAd
                ? "border-blue-500 bg-blue-500/10 text-blue-500 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-500")
            }
          >
            <span className="text-xs font-mono">Anchor</span>
            <span className="text-[10px] font-mono">{inputs.selectedUnits.anchorAd ? "ON" : "OFF"}</span>
          </div>

          {/* Vignette */}
          <div
            onClick={() =>
              onChange({
                ...inputs,
                selectedUnits: { ...inputs.selectedUnits, vignetteAd: !inputs.selectedUnits.vignetteAd },
              })
            }
            className={
              "p-2.5 rounded-xl border border-dashed cursor-pointer flex items-center justify-between " +
              (inputs.selectedUnits.vignetteAd
                ? "border-blue-500 bg-blue-500/10 text-blue-500 font-bold"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-500")
            }
          >
            <span className="text-xs font-mono">Vignette</span>
            <span className="text-[10px] font-mono">{inputs.selectedUnits.vignetteAd ? "ON" : "OFF"}</span>
          </div>

          {/* Multiplex */}
          <div className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300">Multiplex</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
              {inputs.selectedUnits.multiplexAd}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
