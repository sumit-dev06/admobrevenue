import React, { useMemo } from "react";
import {
  Globe,
  Award,
  Zap,
  Coins,
} from "lucide-react";
import { KickIcon } from "./PlatformIcons";
import { KickInputs, CurrencyCode } from "../types";
import { COUNTRIES } from "../data/geoTiers";
import { KICK_SUBSCRIPTION_PRICING, KICK_CREATOR_SPLIT, KICK_KCP_TIERS } from "../data/creatorPlatforms";
import { TermTooltip } from "./TermTooltip";
import { SearchableSelect, SearchableOption } from "./SearchableSelect";
import { useTranslation } from "../i18n/LanguageContext";
import { formatCurrency } from "../utils/currency";

interface KickCalculatorProps {
  inputs: KickInputs;
  onChange: (inputs: KickInputs) => void;
  currency: CurrencyCode;
}

export const KickCalculator: React.FC<KickCalculatorProps> = ({
  inputs,
  onChange,
  currency,
}) => {
  const { t } = useTranslation();
  const kc = t.kick;

  const trafficCountryOptions: SearchableOption[] = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name} (${c.code})`,
        badge: `${c.cpmMultiplier}x CPM`,
      })),
    []
  );

  const matchedKcpTier = KICK_KCP_TIERS.slice().reverse().find((t) => inputs.avgConcurrentViewers >= t.minCcv) || KICK_KCP_TIERS[0];
  const monthlyKcpUsd = inputs.kcpEligible ? inputs.streamHoursPerMonth * matchedKcpTier.hourlyRate : 0;
  const monthlySubGrossUsd = inputs.activeSubs * KICK_SUBSCRIPTION_PRICING.tier1;
  const monthlySubNetUsd = monthlySubGrossUsd * KICK_CREATOR_SPLIT;
  const totalViewerHours = inputs.avgConcurrentViewers * inputs.streamHoursPerMonth;

  return (
    <div className="space-y-4">
      {/* 1. Target Audience & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {kc.geoTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500 font-bold">
            95/5 Revenue Split Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Account Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="kick-account-country">
                <TermTooltip id="accountCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {kc.accountCountry}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">Stripe & Crypto Payout</span>
            </div>
            <SearchableSelect
              id="kick-account-country"
              ariaLabel="Kick Streamer Account Country"
              searchPlaceholder="Search country name or code..."
              options={trafficCountryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(val) => onChange({ ...inputs, accountCountry: val })}
            />
          </div>

          {/* User Traffic Country */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="kick-traffic-country">
                <TermTooltip id="trafficCountry">
                  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
                    {kc.audienceLocation}
                  </span>
                </TermTooltip>
              </label>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                {COUNTRIES.find((c) => c.code === (inputs.targetCountry || "US"))?.tier.toUpperCase()} Region
              </span>
            </div>
            <SearchableSelect
              id="kick-traffic-country"
              ariaLabel="Kick Viewer Audience Location"
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
            <KickIcon className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {kc.streamMetricsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            {totalViewerHours.toLocaleString()} Viewer Hours
          </span>
        </div>

        {/* CCV Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="kick-ccv" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{kc.avgCcv}</span>
              <TermTooltip id="ccv" />
            </label>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {inputs.avgConcurrentViewers.toLocaleString()} CCV
            </span>
          </div>
          <input
            id="kick-ccv"
            type="range"
            min="5"
            max="10000"
            step="10"
            value={inputs.avgConcurrentViewers}
            onChange={(e) => onChange({ ...inputs, avgConcurrentViewers: Number(e.target.value) })}
            className="w-full accent-emerald-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>5 CCV</span>
            <span>100 CCV</span>
            <span>10,000+ CCV</span>
          </div>
        </div>

        {/* Stream Hours per Month */}
        <div className="space-y-2 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="kick-hours" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{kc.streamHours}</span>
            </label>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {inputs.streamHoursPerMonth} hrs ({Math.round(inputs.streamHoursPerMonth / 4.3)} hrs/week)
            </span>
          </div>
          <input
            id="kick-hours"
            type="range"
            min="10"
            max="300"
            step="5"
            value={inputs.streamHoursPerMonth}
            onChange={(e) => onChange({ ...inputs, streamHoursPerMonth: Number(e.target.value) })}
            className="w-full accent-emerald-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>10 hrs</span>
            <span>80 hrs</span>
            <span>200+ hrs</span>
          </div>
        </div>

        {/* Live Viewer-Hour Breakdown Box */}
        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-dashed border-emerald-200 dark:border-emerald-900/40 text-xs font-mono text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{inputs.avgConcurrentViewers.toLocaleString()} CCV × {inputs.streamHoursPerMonth} hrs</span>
          </div>
          <span className="font-bold">{totalViewerHours.toLocaleString()} Viewer Hours / mo</span>
        </div>
      </div>

      {/* 3. Subscriptions (95/5 Split) */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {kc.subscriptionsTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {kc.subSplitBadge}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="kick-subs" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
              <span>{kc.activeSubs}</span>
              <TermTooltip id="kickSplit95" />
            </label>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {inputs.activeSubs.toLocaleString()} Subs
            </span>
          </div>
          <input
            id="kick-subs"
            type="range"
            min="0"
            max="10000"
            step="10"
            value={inputs.activeSubs}
            onChange={(e) => onChange({ ...inputs, activeSubs: Number(e.target.value) })}
            className="w-full accent-emerald-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          
          <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 space-y-0.5">
            <div className="flex justify-between">
              <span>Gross Subscriptions: {inputs.activeSubs} × $4.99</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formatCurrency(monthlySubGrossUsd, currency)}/mo</span>
            </div>
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
              <span>95% Creator Take-Home ($4.74/sub):</span>
              <span>{formatCurrency(monthlySubNetUsd, currency)}/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. KICK Creator Program (KCP) Hourly Pay */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {kc.kcpTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {inputs.kcpEligible ? `$${matchedKcpTier.hourlyRate}/hr Rate` : "Off"}
          </span>
        </div>

        {/* KCP Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="space-y-0.5 pr-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-900 dark:text-white">
              <span>{kc.kcpToggle}</span>
              <TermTooltip id="kcp" />
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {kc.kcpDesc}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={inputs.kcpEligible}
            onClick={() => onChange({ ...inputs, kcpEligible: !inputs.kcpEligible })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              inputs.kcpEligible ? "bg-emerald-600" : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                inputs.kcpEligible ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {inputs.kcpEligible && (
          <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-dashed border-emerald-200 dark:border-emerald-900/40 text-[11px] font-mono text-emerald-900 dark:text-emerald-200 flex justify-between items-center">
            <span>KCP Stipend: {inputs.streamHoursPerMonth} hrs × ${matchedKcpTier.hourlyRate}/hr (Tier @ {inputs.avgConcurrentViewers} CCV)</span>
            <span className="font-bold">+{formatCurrency(monthlyKcpUsd, currency)}/mo</span>
          </div>
        )}
      </div>

      {/* 5. Direct Tips & Sponsorships */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              {kc.tipsTitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Direct Tips */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="kick-tips" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{kc.cryptoTips}</span>
                <TermTooltip id="kickTips" />
              </label>
            </div>
            <input
              id="kick-tips"
              type="number"
              min="0"
              max="200000"
              step="50"
              value={inputs.monthlyTips}
              onChange={(e) => onChange({ ...inputs, monthlyTips: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">100% Payout (0% Platform Fee)</span>
          </div>

          {/* Sponsorships */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="kick-sponsorships" className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                <span>{kc.sponsorships}</span>
              </label>
            </div>
            <input
              id="kick-sponsorships"
              type="number"
              min="0"
              max="250000"
              step="200"
              value={inputs.monthlySponsorships}
              onChange={(e) => onChange({ ...inputs, monthlySponsorships: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[10px] text-neutral-500 font-mono block">Brand campaigns & overlays</span>
          </div>
        </div>
      </div>
    </div>
  );
};
