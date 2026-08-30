import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { GitCompare, ArrowRight, CheckCircle2 } from "lucide-react";

interface ScenarioComparatorProps {
  currency: CurrencyCode;
}

export const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({ currency }) => {
  const [dau, setDau] = useState<number>(20000);

  // Baseline: No mediation, only 1 banner + 1 interstitial
  const baseDailyRev = (dau * (0.0003 * 4 + 0.0012 * 1.5)) * 0.8;
  const baseMonthlyRev = baseDailyRev * 30.4;
  const baseArpdau = baseDailyRev / dau;

  // Optimized: Mediation + Rewarded Video + App Open + Paced Interstitials
  const optDailyRev = (dau * (0.0003 * 4 + 0.0012 * 1.5 + 0.0025 * 2.0 + 0.0010 * 1.5)) * 1.25;
  const optMonthlyRev = optDailyRev * 30.4;
  const optArpdau = optDailyRev / dau;

  const deltaMonthly = optMonthlyRev - baseMonthlyRev;
  const percentageLift = Math.round(((optMonthlyRev - baseMonthlyRev) / (baseMonthlyRev || 1)) * 100);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-rose-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            A/B Optimization Comparator
          </span>
        </div>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
          +{percentageLift}% Revenue Delta
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Test Daily Active Users (DAU):</span>
          <span className="font-bold text-neutral-900 dark:text-white">{dau.toLocaleString()} DAU</span>
        </div>
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={dau}
          onChange={(e) => setDau(parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Baseline */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Scenario A: Default Waterfall</div>
          <div className="text-lg font-bold text-neutral-900 dark:text-white">
            {formatCurrency(baseMonthlyRev, currency)}
            <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ARPDAU: ${baseArpdau.toFixed(4)} · Banners + Interstitial only
          </div>
        </div>

        {/* Optimized */}
        <div className="p-3.5 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 space-y-2 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">
            Scenario B: Fully Optimized Stack
          </div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(optMonthlyRev, currency)}
            <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold">
            +{formatCurrency(deltaMonthly, currency)}/mo unlocked
          </div>
        </div>
      </div>
    </div>
  );
};
