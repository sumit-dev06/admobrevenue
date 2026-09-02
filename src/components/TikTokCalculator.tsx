import React, { useMemo } from "react";
import {
  Globe,
  Video,
  Radio,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { TikTokIcon } from "./PlatformIcons";
import { TikTokInputs, CurrencyCode } from "../types";
import { COUNTRIES } from "../data/geoTiers";
import { TIKTOK_NICHES } from "../data/creatorPlatforms";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import { formatCurrency } from "../utils/currency";

interface TikTokCalculatorProps {
  inputs: TikTokInputs;
  onChange: (inputs: TikTokInputs) => void;
  currency: CurrencyCode;
}

export const TikTokCalculator: React.FC<TikTokCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const { t } = useTranslation();
  const tk = t.tiktok;

  const trafficCountryOptions: SearchableOption[] = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name} (${c.code})`,
        badge: `${c.cpmMultiplier}x CPM`,
      })),
    []
  );

  const nicheOptions: SearchableOption[] = useMemo(
    () =>
      TIKTOK_NICHES.map((n) => ({
        value: n.id,
        label: n.name,
        badge: `$${n.baseRpm.toFixed(2)} RPM`,
        subLabel: n.description,
      })),
    []
  );

  const activeNiche = TIKTOK_NICHES.find((n) => n.id === inputs.nicheId) || TIKTOK_NICHES[0];
  const selectedCountry = COUNTRIES.find((c) => c.code === (inputs.targetCountry || "US")) || COUNTRIES[0];
  const countryMultiplier = selectedCountry.cpmMultiplier || 1.0;

  // Live calculations
  const eligibleViewsRatio = inputs.overOneMinutePercent / 100;
  const qualifiedRatio = inputs.qualifiedViewRate / 100;
  const qualifiedViewsCount = inputs.monthlyViews * eligibleViewsRatio * qualifiedRatio;
  const effectiveRpmUsd = activeNiche.baseRpm * countryMultiplier;
  const creatorRewardsRevenueUsd = (qualifiedViewsCount / 1000) * effectiveRpmUsd;
  const liveDiamondsNetUsd = inputs.monthlyDiamondsEarned * 0.005 * 0.50;

  return (
    <div className="space-y-4">
      {/* 1. Target Audience & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tk.geoTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {countryMultiplier}x CPM Multiplier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {tk.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">Tax & Bank</span>
            </div>
            <SearchableSelect
              id="tiktok-account-country"
              ariaLabel="TikTok Creator Account Country"
              searchPlaceholder="Search country name or code..."
              options={trafficCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {tk.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                {selectedCountry.tier.toUpperCase()} ({countryMultiplier}x CPM)
              </span>
            </div>
            <SearchableSelect
              id="tiktok-traffic-country"
              ariaLabel="TikTok Viewer Audience Location"
              searchPlaceholder="Search audience country..."
              options={trafficCountryOptions}
              value={inputs.targetCountry || "US"}
              onChange={(val) => onChange({ ...inputs, targetCountry: val })}
            />
          </div>
        </div>
      </div>

      {/* 2. Content Niche */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <TikTokIcon className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tk.nicheTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            ${effectiveRpmUsd.toFixed(2)} Effective RPM
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="tiktok-niche-select">
              <TermTooltip id="creatorRewards">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {tk.nicheTitle}
                </span>
              </TermTooltip>
            </label>
            <span className="text-[10px] text-neutral-500 font-mono">Commercial Value</span>
          </div>
          <SearchableSelect
            id="tiktok-niche-select"
            ariaLabel="TikTok Niche Selection"
            searchPlaceholder="Search niche (Finance, Tech, Beauty, Comedy)..."
            options={nicheOptions}
            value={inputs.nicheId}
            onChange={(val) => onChange({ ...inputs, nicheId: val })}
          />
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
            {activeNiche.description}
          </p>
        </div>
      </div>

      {/* 3. Monthly Views & Creator Rewards Parameters */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tk.viewsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            {(inputs.monthlyViews / 1000000).toFixed(2)}M Total Views
          </span>
        </div>

        {/* Monthly Views Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="tiktok-monthly-views" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tk.monthlyViews}</span>
              <TermTooltip id="creatorRewards" />
            </label>
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
              {inputs.monthlyViews.toLocaleString()}
            </span>
          </div>
          <input
            id="tiktok-monthly-views"
            type="range"
            min="10000"
            max="50000000"
            step="50000"
            value={inputs.monthlyViews}
            onChange={(e) => onChange({ ...inputs, monthlyViews: Number(e.target.value) })}
            className="w-full accent-cyan-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>10k views</span>
            <span>1,000,000</span>
            <span>50,000,000+</span>
          </div>
        </div>

        {/* Over 1 Minute Ratio Slider */}
        <div className="space-y-2 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="tiktok-over-onemin" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tk.overOneMin}</span>
              <TermTooltip id="overOneMin" />
            </label>
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
              {inputs.overOneMinutePercent}%
            </span>
          </div>
          <input
            id="tiktok-over-onemin"
            type="range"
            min="0"
            max="100"
            step="5"
            value={inputs.overOneMinutePercent}
            onChange={(e) => onChange({ ...inputs, overOneMinutePercent: Number(e.target.value) })}
            className="w-full accent-cyan-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
            {tk.overOneMinDesc}
          </p>
        </div>

        {/* Qualified View Rate */}
        <div className="space-y-2 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="tiktok-qualified-rate" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tk.qualifiedViews}</span>
              <TermTooltip id="qualifiedViews" />
            </label>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {inputs.qualifiedViewRate}%
            </span>
          </div>
          <input
            id="tiktok-qualified-rate"
            type="range"
            min="20"
            max="80"
            step="5"
            value={inputs.qualifiedViewRate}
            onChange={(e) => onChange({ ...inputs, qualifiedViewRate: Number(e.target.value) })}
            className="w-full accent-cyan-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
            {tk.qualifiedViewsDesc}
          </p>
        </div>

        {/* Live Qualified View Breakdown Card */}
        <div className="p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-dashed border-cyan-200 dark:border-cyan-900/40 text-xs font-mono text-cyan-900 dark:text-cyan-200 space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Qualified Views: {Math.round(qualifiedViewsCount).toLocaleString()} ({inputs.overOneMinutePercent}% &gt;1m × {inputs.qualifiedViewRate}% FYP)</span>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(creatorRewardsRevenueUsd, currency)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* 4. LIVE Stream Gifts & Diamonds */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tk.liveTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            1 Diamond = $0.005 (50% Net)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Monthly Diamonds */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-diamonds" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tk.diamonds}</span>
                <TermTooltip id="diamondPayout" />
              </label>
            </div>
            <input
              id="tiktok-diamonds"
              type="number"
              min="0"
              max="5000000"
              step="1000"
              value={inputs.monthlyDiamondsEarned}
              onChange={(e) => onChange({ ...inputs, monthlyDiamondsEarned: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">{tk.diamondsDesc}</span>
          </div>

          {/* LIVE Hours */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-live-hours" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tk.liveHours}</span>
              </label>
            </div>
            <input
              id="tiktok-live-hours"
              type="number"
              min="0"
              max="300"
              step="5"
              value={inputs.monthlyLiveHours}
              onChange={(e) => onChange({ ...inputs, monthlyLiveHours: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">Broadcast duration</span>
          </div>
        </div>

        {/* Live Diamond Formula Callout */}
        <div className="p-2.5 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-dashed border-cyan-200 dark:border-cyan-900/40 text-[11px] font-mono text-cyan-900 dark:text-cyan-200 flex justify-between items-center">
          <span>Diamond Value: {inputs.monthlyDiamondsEarned.toLocaleString()} × $0.005 × 50% Net</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">+{formatCurrency(liveDiamondsNetUsd, currency)}/mo</span>
        </div>
      </div>

      {/* 5. TikTok Shop & Brand Deals */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tk.shopTitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Shop Affiliate */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-shop" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tk.shopCommission}</span>
                <TermTooltip id="tiktokShop" />
              </label>
            </div>
            <input
              id="tiktok-shop"
              type="number"
              min="0"
              max="200000"
              step="200"
              value={inputs.monthlyShopAffiliateEarnings}
              onChange={(e) => onChange({ ...inputs, monthlyShopAffiliateEarnings: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">Product showcase & tags</span>
          </div>

          {/* Sponsorships */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="tiktok-sponsorships" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tk.sponsorships}</span>
              </label>
            </div>
            <input
              id="tiktok-sponsorships"
              type="number"
              min="0"
              max="250000"
              step="500"
              value={inputs.monthlySponsorships}
              onChange={(e) => onChange({ ...inputs, monthlySponsorships: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">{tk.sponsorshipsDesc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
