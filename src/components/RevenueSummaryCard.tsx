import React from "react";
import { CurrencyCode } from "../types";
import { formatCurrency, formatNumber } from "../utils/currency";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

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
  impressions,
  adBlockLossRevenue,
  mediationLiftRevenue,
}) => {
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-7 border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Masthead */}
      <div className="relative z-10 flex items-center justify-between pb-5 border-b border-neutral-800">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Projected Publisher Earnings
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Revenue Estimate
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {currency} Net Payout
          </span>
        </div>
      </div>

      {/* Main Large Monthly Number */}
      <div className="relative z-10 py-6 text-center sm:text-left">
        <div className="text-xs font-medium text-neutral-400 mb-1">
          Estimated Monthly Revenue
        </div>
        <div className="flex items-baseline justify-center sm:justify-start gap-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
            {formatCurrency(monthlyRevenue, currency)}
          </span>
          <span className="text-sm font-semibold text-emerald-400">/ mo</span>
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Based on verified programmatic CPM & eCPM algorithm benchmarks
        </p>
      </div>

      {/* Sub KPI Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-4">
        {/* Daily */}
        <div className="p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
          <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-1 mb-1">
            <DollarSign className="w-3 h-3 text-emerald-400" />
            Daily Revenue
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {formatCurrency(dailyRevenue, currency)}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">~30.4 days avg</div>
        </div>

        {/* Annual */}
        <div className="p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
          <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3 text-blue-400" />
            Annual Trajectory
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {formatCurrency(annualRevenue, currency)}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">12 mo + seasonality</div>
        </div>

        {/* Rate Metric (Page RPM / ARPDAU) */}
        <div className="p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/50 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            {rateMetricLabel}
          </div>
          <div className="text-lg font-bold text-emerald-300 font-mono">
            {rateMetricValue}
          </div>
          {secondaryRateLabel && secondaryRateValue && (
            <div className="text-[10px] text-neutral-400 mt-0.5">
              {secondaryRateLabel}: {secondaryRateValue}
            </div>
          )}
        </div>
      </div>

      {/* Extra Value Adds: AdBlock Loss / Mediation Lift */}
      {adBlockLossRevenue !== undefined && adBlockLossRevenue > 0 && (
        <div className="relative z-10 mt-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-rose-300">
              Ad Blocker Impact:{" "}
            </span>
            <span className="text-rose-200">
              You are losing ~{formatCurrency(adBlockLossRevenue, currency)}/mo to browser ad blockers.
            </span>
          </div>
        </div>
      )}

      {mediationLiftRevenue !== undefined && mediationLiftRevenue > 0 && (
        <div className="relative z-10 mt-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-emerald-300">
              Mediation & Bidding Lift:{" "}
            </span>
            <span className="text-emerald-200">
              Generating an extra +{formatCurrency(mediationLiftRevenue, currency)}/mo via real-time auctions.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
