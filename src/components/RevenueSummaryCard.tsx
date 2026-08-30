import React from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { TermTooltip } from "./TermTooltip";

interface RevenueSummaryProps {
  type: "adsense" | "admob";
  currency: CurrencyCode;
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  rateMetricLabel: string;
  rateMetricValue: string;
  secondaryRateLabel?: string;
  secondaryRateValue?: string;
  impressions: number;
  adBlockLossRevenue?: number;
  mediationLiftRevenue?: number;
  onExportCSV?: () => void;
}

export const RevenueSummaryCard: React.FC<RevenueSummaryProps> = ({
  type,
  currency,
  dailyRevenue,
  monthlyRevenue,
  annualRevenue,
  rateMetricLabel,
  rateMetricValue,
  secondaryRateLabel,
  secondaryRateValue,
  adBlockLossRevenue,
  mediationLiftRevenue,
}) => {
  const isAdMob = type === "admob";

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 shadow-xs space-y-5 transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 font-semibold">
            Estimated Net Payout
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
          {currency} Normalized
        </span>
      </div>

      {/* Main Monthly Revenue Ticker */}
      <div className="py-2">
        <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
          Monthly Revenue Run-Rate
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
            {formatCurrency(monthlyRevenue, currency)}
          </span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">/month</span>
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
        {/* Daily */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-semibold">Daily</div>
          <div className="text-base font-bold font-mono text-neutral-950 dark:text-white">
            {formatCurrency(dailyRevenue, currency)}
          </div>
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono">~30.4 days</div>
        </div>

        {/* Annual */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-semibold">Annual</div>
          <div className="text-base font-bold font-mono text-neutral-950 dark:text-white">
            {formatCurrency(annualRevenue, currency)}
          </div>
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono">12 mo + season</div>
        </div>

        {/* Rate metric */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
            <TermTooltip id={isAdMob ? "arpdau" : "pagerpm"}>
              <span>{rateMetricLabel}</span>
            </TermTooltip>
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {rateMetricValue}
          </div>
          {secondaryRateLabel && secondaryRateValue && (
            <div className="text-[9px] text-neutral-600 dark:text-neutral-400 font-mono">
              <TermTooltip id={isAdMob ? "ecpm" : "viewability"}>
                <span>{secondaryRateLabel}: {secondaryRateValue}</span>
              </TermTooltip>
            </div>
          )}
        </div>
      </div>

      {/* Lift / Loss Callout */}
      {mediationLiftRevenue !== undefined && mediationLiftRevenue > 0 && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-dashed border-emerald-300 dark:border-emerald-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1">
            <TermTooltip id="mediation">
              <span className="text-emerald-700 dark:text-emerald-300 text-[11px]">Mediation & Bidding Lift:</span>
            </TermTooltip>
          </div>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">+{formatCurrency(mediationLiftRevenue, currency)}/mo</span>
        </div>
      )}

      {adBlockLossRevenue !== undefined && adBlockLossRevenue > 0 && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-dashed border-rose-300 dark:border-rose-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1">
            <TermTooltip id="adblock">
              <span className="text-rose-700 dark:text-rose-300 text-[11px]">AdBlock Estimated Loss:</span>
            </TermTooltip>
          </div>
          <span className="font-bold text-rose-700 dark:text-rose-400">-{formatCurrency(adBlockLossRevenue, currency)}/mo</span>
        </div>
      )}
    </div>
  );
};
