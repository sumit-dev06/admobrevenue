import React, { useMemo } from "react";
import {
  Globe,
  Sliders,
  Video,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { YouTubeIcon } from "./PlatformIcons";
import { YouTubeInputs, CurrencyCode } from "../types";
import { COUNTRIES } from "../data/geoTiers";
import { YOUTUBE_NICHES } from "../data/creatorPlatforms";
import { SEASONALITY_FACTORS } from "../data/adSenseData";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import { formatCurrency } from "../utils/currency";

interface YouTubeCalculatorProps {
  inputs: YouTubeInputs;
  onChange: (inputs: YouTubeInputs) => void;
  currency: CurrencyCode;
}

const MONTHS = [
  "January (Q1)", "February (Q1)", "March (Q1)", "April (Q2)", "May (Q2)", "June (Q2)",
  "July (Q3)", "August (Q3)", "September (Q3)", "October (Q4)", "November (Q4)", "December (Q4 Holiday Peak)"
];

export const YouTubeCalculator: React.FC<YouTubeCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const { t } = useTranslation();
  const yt = t.youtube;

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
      YOUTUBE_NICHES.map((n) => ({
        value: n.id,
        label: n.name,
        badge: `$${n.baseRpm.toFixed(1)} RPM`,
        subLabel: n.description,
      })),
    []
  );

  const activeNiche = YOUTUBE_NICHES.find((n) => n.id === inputs.nicheId) || YOUTUBE_NICHES[0];
  const selectedCountry = COUNTRIES.find((c) => c.code === (inputs.targetCountry || "US")) || COUNTRIES[0];
  const countryMultiplier = selectedCountry.cpmMultiplier || 1.0;
  const midrollMultiplier = inputs.enableMidrolls ? 1.45 : 1.0;
  const seasonMult = inputs.useSeasonality ? (SEASONALITY_FACTORS[inputs.selectedMonth]?.multiplier || 1.0) : 1.0;

  const effectiveLongFormRpmUsd = activeNiche.baseRpm * countryMultiplier * midrollMultiplier * seasonMult;
  const monthlyLongFormAdRevenueUsd = (inputs.monthlyLongFormViews / 1000) * effectiveLongFormRpmUsd;
  const shortsRpmUsd = 0.055 * countryMultiplier;
  const monthlyShortsRevenueUsd = (inputs.monthlyShortsViews / 1000) * shortsRpmUsd;

  return (
    <div className="space-y-4">
      {/* 1. Target Audience & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {yt.geoTitle}
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
              <label htmlFor="yt-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {yt.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">{yt.taxAndBank}</span>
            </div>
            <SearchableSelect
              id="yt-account-country"
              ariaLabel="YouTube Creator Account Country"
              searchPlaceholder="Search country name or code..."
              options={trafficCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="yt-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {yt.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-red-600 dark:text-red-400 font-mono font-bold">
                {selectedCountry.tier.toUpperCase()} ({countryMultiplier}x CPM)
              </span>
            </div>
            <SearchableSelect
              id="yt-traffic-country"
              ariaLabel="YouTube Viewer Audience Location"
              searchPlaceholder="Search audience country..."
              options={trafficCountryOptions}
              value={inputs.targetCountry || "US"}
              onChange={(val) => onChange({ ...inputs, targetCountry: val })}
            />
          </div>
        </div>
      </div>

      {/* 2. Channel Niche & Content Category */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <YouTubeIcon className="w-4 h-4 text-red-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {yt.nicheTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            ${effectiveLongFormRpmUsd.toFixed(2)} Effective RPM
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="yt-niche-select">
              <TermTooltip id="youtubeRpm">
                <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                  {yt.nicheTitle}
                </span>
              </TermTooltip>
            </label>
            <span className="text-[10px] text-neutral-500 font-mono">Advertiser Competition</span>
          </div>
          <SearchableSelect
            id="yt-niche-select"
            ariaLabel="YouTube Niche Selection"
            searchPlaceholder="Search niche (Finance, Tech, Gaming, Vlog)..."
            options={nicheOptions}
            value={inputs.nicheId}
            onChange={(val) => onChange({ ...inputs, nicheId: val })}
          />
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
            {activeNiche.description}
          </p>
        </div>
      </div>

      {/* 3. Monthly Video Views (Long-Form & Shorts) */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-red-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {yt.viewsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            {((inputs.monthlyLongFormViews + inputs.monthlyShortsViews) / 1000).toFixed(1)}k Total Views
          </span>
        </div>

        {/* Long-Form Views */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="yt-longform-views" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{yt.longFormViews}</span>
              <TermTooltip id="youtubeCpm" />
            </label>
            <span className="font-bold text-red-600 dark:text-red-400 text-sm">
              {inputs.monthlyLongFormViews.toLocaleString()}
            </span>
          </div>
          <input
            id="yt-longform-views"
            type="range"
            min="1000"
            max="10000000"
            step="5000"
            value={inputs.monthlyLongFormViews}
            onChange={(e) => onChange({ ...inputs, monthlyLongFormViews: Number(e.target.value) })}
            className="w-full accent-red-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>1,000 views</span>
            <span>1,000,000</span>
            <span>10,000,000+</span>
          </div>
        </div>

        {/* Live Long-Form Formula Breakdown */}
        <div className="p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-dashed border-red-200 dark:border-red-900/40 text-xs font-mono text-red-900 dark:text-red-200 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Zap className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            <span>Long-Form Ad Net: ({inputs.monthlyLongFormViews.toLocaleString()} / 1,000) × ${effectiveLongFormRpmUsd.toFixed(2)} RPM</span>
          </div>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            +{formatCurrency(monthlyLongFormAdRevenueUsd, currency)}/mo
          </span>
        </div>

        {/* YouTube Shorts Views */}
        <div className="space-y-2 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="yt-shorts-views" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{yt.shortsViews}</span>
              <TermTooltip id="youtubeShorts" />
            </label>
            <span className="font-bold text-red-600 dark:text-red-400 text-sm">
              {inputs.monthlyShortsViews.toLocaleString()}
            </span>
          </div>
          <input
            id="yt-shorts-views"
            type="range"
            min="0"
            max="50000000"
            step="50000"
            value={inputs.monthlyShortsViews}
            onChange={(e) => onChange({ ...inputs, monthlyShortsViews: Number(e.target.value) })}
            className="w-full accent-red-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>0</span>
            <span>10,000,000 (YPP Threshold)</span>
            <span>50,000,000+</span>
          </div>

          {inputs.monthlyShortsViews > 0 && (
            <div className="p-2.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-dashed border-red-200 dark:border-red-900/40 text-[11px] font-mono text-red-900 dark:text-red-200 flex justify-between items-center mt-2">
              <span>Shorts Pool: ({inputs.monthlyShortsViews.toLocaleString()} / 1,000) × ${shortsRpmUsd.toFixed(3)} RPM</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+{formatCurrency(monthlyShortsRevenueUsd, currency)}/mo</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Video Length & Ad Format Modifiers */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {yt.videoLengthTitle}
            </span>
          </div>
        </div>

        {/* Mid-Roll Ad Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="space-y-0.5 pr-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-900 dark:text-white">
              <span>{yt.midrollsTitle}</span>
              <TermTooltip id="midrolls" />
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {yt.midrollsDesc}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={inputs.enableMidrolls}
            onClick={() => onChange({ ...inputs, enableMidrolls: !inputs.enableMidrolls })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              inputs.enableMidrolls ? "bg-red-600" : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                inputs.enableMidrolls ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Seasonality */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="yt-seasonality-month" className="flex items-center gap-1">
              <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                {yt.seasonalityTitle}
              </span>
              <TermTooltip id="seasonality" />
            </label>
            <span className="text-[10px] text-red-600 dark:text-red-400 font-mono font-bold">
              {inputs.useSeasonality ? `${MONTHS[inputs.selectedMonth]} (${seasonMult}x)` : "Disabled (1.0x)"}
            </span>
          </div>
          <select
            id="yt-seasonality-month"
            aria-label="Seasonality Month Selection"
            value={inputs.selectedMonth}
            onChange={(e) => onChange({ ...inputs, selectedMonth: Number(e.target.value) })}
            className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
          >
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Fan Funding & Brand Deals */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-red-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {yt.fanFundingTitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Active Memberships */}
          <div className="space-y-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="yt-memberships" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{yt.paidMembers}</span>
                <TermTooltip id="memberships" />
              </label>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{yt.netShare}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-neutral-500 font-mono block mb-1">{yt.count}</span>
                <input
                  id="yt-memberships"
                  type="number"
                  min="0"
                  max="50000"
                  step="10"
                  value={inputs.activeMemberships}
                  onChange={(e) => onChange({ ...inputs, activeMemberships: Math.max(0, Number(e.target.value)) })}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <span className="text-[10px] text-neutral-500 font-mono block mb-1">{yt.pricePerMonth}</span>
                <select
                  id="yt-membership-price"
                  aria-label="Membership Price per Month"
                  value={inputs.membershipPrice !== undefined ? inputs.membershipPrice : 4.99}
                  onChange={(e) => onChange({ ...inputs, membershipPrice: Number(e.target.value) })}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value={0.99}>$0.99</option>
                  <option value={1.99}>$1.99</option>
                  <option value={2.99}>$2.99</option>
                  <option value={4.99}>$4.99 (Standard)</option>
                  <option value={9.99}>$9.99</option>
                  <option value={19.99}>$19.99</option>
                  <option value={49.99}>$49.99</option>
                </select>
              </div>
            </div>

            <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 space-y-0.5">
              <div className="flex justify-between">
                <span>{yt.gross}: {inputs.activeMemberships} × ${inputs.membershipPrice || 4.99}</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formatCurrency(inputs.activeMemberships * (inputs.membershipPrice || 4.99), currency)}/mo</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>{yt.netTakeHome}:</span>
                <span>{formatCurrency(inputs.activeMemberships * (inputs.membershipPrice || 4.99) * 0.70, currency)}/mo</span>
              </div>
            </div>
          </div>

          {/* Super Chats */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="yt-superchats" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{yt.superchats}</span>
                <TermTooltip id="superchat" />
              </label>
            </div>
            <input
              id="yt-superchats"
              type="number"
              min="0"
              max="100000"
              step="50"
              value={inputs.monthlySuperChats}
              onChange={(e) => onChange({ ...inputs, monthlySuperChats: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">{yt.superchatsDesc}</span>
          </div>

          {/* Sponsorships */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="yt-sponsorships" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{yt.sponsorships}</span>
                <TermTooltip id="ytSponsorships" />
              </label>
            </div>
            <input
              id="yt-sponsorships"
              type="number"
              min="0"
              max="500000"
              step="500"
              value={inputs.monthlySponsorships}
              onChange={(e) => onChange({ ...inputs, monthlySponsorships: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-red-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">{yt.sponsorshipsDesc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
