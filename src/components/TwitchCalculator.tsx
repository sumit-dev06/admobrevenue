import React, { useMemo } from "react";
import {
  Globe,
  Award,
  Radio,
  Zap,
} from "lucide-react";
import { TwitchIcon } from "./PlatformIcons";
import { TwitchInputs, CurrencyCode } from "../types";
import { COUNTRIES } from "../data/geoTiers";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import { formatCurrency } from "../utils/currency";

interface TwitchCalculatorProps {
  inputs: TwitchInputs;
  onChange: (inputs: TwitchInputs) => void;
  currency: CurrencyCode;
}

export const TwitchCalculator: React.FC<TwitchCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const { t } = useTranslation();
  const tw = t.twitch;

  const trafficCountryOptions: SearchableOption[] = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name} (${c.code})`,
        badge: `${c.cpmMultiplier}x CPM`,
      })),
    []
  );

  const selectedCountry = COUNTRIES.find((c) => c.code === (inputs.targetCountry || "US")) || COUNTRIES[0];
  const countryMultiplier = selectedCountry.cpmMultiplier || 1.0;

  const totalViewerHours = inputs.avgConcurrentViewers * inputs.streamHoursPerMonth;
  const totalAdImpressions = totalViewerHours * (inputs.adMinutesPerHour * 2);
  const effectiveAdCpmUsd = 3.50 * countryMultiplier;
  const monthlyAipAdRevenueUsd = (totalAdImpressions / 1000) * effectiveAdCpmUsd;

  const totalSubPoints = inputs.tier1Subs + (inputs.tier2Subs * 2) + (inputs.tier3Subs * 6);

  return (
    <div className="space-y-4">
      {/* 1. Target Audience & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tw.geoTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-purple-500 font-bold">
            {countryMultiplier}x CPM Multiplier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {tw.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">Payout & Tax</span>
            </div>
            <SearchableSelect
              id="twitch-account-country"
              ariaLabel="Twitch Streamer Account Country"
              searchPlaceholder="Search country name or code..."
              options={trafficCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {tw.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">
                {selectedCountry.tier.toUpperCase()} ({countryMultiplier}x CPM)
              </span>
            </div>
            <SearchableSelect
              id="twitch-traffic-country"
              ariaLabel="Twitch Viewer Audience Location"
              searchPlaceholder="Search audience country..."
              options={trafficCountryOptions}
              value={inputs.targetCountry || "US"}
              onChange={(val) => onChange({ ...inputs, targetCountry: val })}
            />
          </div>
        </div>
      </div>

      {/* 2. Viewership & Stream Time */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <TwitchIcon className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tw.streamMetricsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            {totalViewerHours.toLocaleString()} Total Viewer Hours
          </span>
        </div>

        {/* CCV Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="twitch-ccv" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tw.avgCcv}</span>
              <TermTooltip id="ccv" />
            </label>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {inputs.avgConcurrentViewers.toLocaleString()} CCV
            </span>
          </div>
          <input
            id="twitch-ccv"
            type="range"
            min="5"
            max="10000"
            step="10"
            value={inputs.avgConcurrentViewers}
            onChange={(e) => onChange({ ...inputs, avgConcurrentViewers: Number(e.target.value) })}
            className="w-full accent-purple-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>5 CCV</span>
            <span>75 CCV</span>
            <span>10,000+ CCV</span>
          </div>
        </div>

        {/* Stream Hours per Month */}
        <div className="space-y-2 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="twitch-hours" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tw.streamHours}</span>
            </label>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {inputs.streamHoursPerMonth} hrs
            </span>
          </div>
          <input
            id="twitch-hours"
            type="range"
            min="10"
            max="300"
            step="5"
            value={inputs.streamHoursPerMonth}
            onChange={(e) => onChange({ ...inputs, streamHoursPerMonth: Number(e.target.value) })}
            className="w-full accent-purple-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>10 hrs</span>
            <span>80 hrs</span>
            <span>160+ hrs</span>
          </div>
        </div>

        {/* Live Viewer-Hour Breakdown Box */}
        <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-dashed border-purple-200 dark:border-purple-900/40 text-xs font-mono text-purple-900 dark:text-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <span>{inputs.avgConcurrentViewers.toLocaleString()} CCV × {inputs.streamHoursPerMonth} hrs</span>
          </div>
          <span className="font-bold">{totalViewerHours.toLocaleString()} Viewer Hours / mo</span>
        </div>
      </div>

      {/* 3. Subscriptions & Partner Plus Program */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tw.subscriptionsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {totalSubPoints} Plus Points
          </span>
        </div>

        {/* Partner Split Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold flex items-center gap-1">
              <span>{tw.partnerPlusSplit}</span>
              <TermTooltip id="partnerPlus" />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...inputs, partnerSplitRate: 0.50 })}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-mono ${
                inputs.partnerSplitRate === 0.50
                  ? "bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300 font-bold"
                  : "bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300"
              }`}
            >
              <div className="text-xs font-bold">50 / 50 Split</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Standard</div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ ...inputs, partnerSplitRate: 0.60 })}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-mono ${
                inputs.partnerSplitRate === 0.60
                  ? "bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300 font-bold"
                  : "bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300"
              }`}
            >
              <div className="text-xs font-bold">60 / 40 Split</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">100+ Points</div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ ...inputs, partnerSplitRate: 0.70 })}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-mono ${
                inputs.partnerSplitRate === 0.70
                  ? "bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300 font-bold"
                  : "bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300"
              }`}
            >
              <div className="text-xs font-bold">70 / 30 Split</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">350+ Points</div>
            </button>
          </div>
        </div>

        {/* Tier 1 / 2 / 3 Sub Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Tier 1 ($4.99) */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-t1-subs" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.tier1Subs}</span>
                <TermTooltip id="tier1Sub" />
              </label>
            </div>
            <input
              id="twitch-t1-subs"
              type="number"
              min="0"
              max="50000"
              step="5"
              value={inputs.tier1Subs}
              onChange={(e) => onChange({ ...inputs, tier1Subs: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">1 pt per sub</span>
          </div>

          {/* Tier 2 ($9.99) */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-t2-subs" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.tier2Subs}</span>
              </label>
            </div>
            <input
              id="twitch-t2-subs"
              type="number"
              min="0"
              max="10000"
              step="1"
              value={inputs.tier2Subs}
              onChange={(e) => onChange({ ...inputs, tier2Subs: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">2 pts per sub</span>
          </div>

          {/* Tier 3 ($24.99) */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-t3-subs" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.tier3Subs}</span>
              </label>
            </div>
            <input
              id="twitch-t3-subs"
              type="number"
              min="0"
              max="5000"
              step="1"
              value={inputs.tier3Subs}
              onChange={(e) => onChange({ ...inputs, tier3Subs: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">6 pts per sub</span>
          </div>
        </div>
      </div>

      {/* 4. In-Stream Ads & Bits */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {tw.adsTitle}
            </span>
          </div>
        </div>

        {/* Ad Breaks per Hour Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="twitch-ad-minutes" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{tw.adMinutesPerHour}</span>
              <TermTooltip id="twitchAip" />
            </label>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {inputs.adMinutesPerHour} min/hr
            </span>
          </div>
          <input
            id="twitch-ad-minutes"
            type="range"
            min="0"
            max="6"
            step="0.5"
            value={inputs.adMinutesPerHour}
            onChange={(e) => onChange({ ...inputs, adMinutesPerHour: Number(e.target.value) })}
            className="w-full accent-purple-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>0 min</span>
            <span>3 min (AIP)</span>
            <span>6 min/hr</span>
          </div>
        </div>

        {/* Live AIP Formula Callout Box */}
        <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-dashed border-purple-200 dark:border-purple-900/40 text-xs font-mono text-purple-900 dark:text-purple-200 space-y-1">
          <div className="flex justify-between text-[11px]">
            <span>Ad Impressions: {totalAdImpressions.toLocaleString()} @ ${effectiveAdCpmUsd.toFixed(2)} CPM</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(monthlyAipAdRevenueUsd, currency)}/mo
            </span>
          </div>
        </div>

        {/* Bits & Donations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Bits */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-bits" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.bits}</span>
                <TermTooltip id="bits" />
              </label>
            </div>
            <input
              id="twitch-bits"
              type="number"
              min="0"
              max="5000000"
              step="500"
              value={inputs.monthlyBits}
              onChange={(e) => onChange({ ...inputs, monthlyBits: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">$0.01 / bit</span>
          </div>

          {/* Donations */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-donations" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.directTips}</span>
              </label>
            </div>
            <input
              id="twitch-donations"
              type="number"
              min="0"
              max="100000"
              step="50"
              value={inputs.monthlyDirectDonations}
              onChange={(e) => onChange({ ...inputs, monthlyDirectDonations: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">PayPal / Cards</span>
          </div>

          {/* Sponsorships */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="twitch-sponsorships" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{tw.sponsorships}</span>
              </label>
            </div>
            <input
              id="twitch-sponsorships"
              type="number"
              min="0"
              max="200000"
              step="200"
              value={inputs.monthlySponsorships}
              onChange={(e) => onChange({ ...inputs, monthlySponsorships: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">Bounties & Sponsors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
