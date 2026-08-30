import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { Target } from "lucide-react";

interface ReverseGoalCalculatorProps {
  currency: CurrencyCode;
}

export const ReverseGoalCalculator: React.FC<ReverseGoalCalculatorProps> = ({ currency }) => {
  const [targetIncome, setTargetIncome] = useState<number>(3000);

  // Standard: $12 RPM / $0.08 ARPDAU
  const rpm = 12;
  const arpdau = 0.08;

  const requiredPageviews = Math.round((targetIncome / rpm) * 1000);
  const requiredDailyVisitors = Math.round(requiredPageviews / (30.4 * 1.8));
  const requiredDau = Math.round(targetIncome / (30.4 * arpdau));

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            Target Revenue Income Roadmap
          </span>
        </div>
        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
          Reverse Forecaster
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Target Monthly Income:</span>
          <span className="font-bold text-neutral-900 dark:text-white">
            {formatCurrency(targetIncome, currency)}/mo
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={targetIncome}
          onChange={(e) => setTargetIncome(parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Web Requirement */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Website Route (AdSense)</div>
          <div className="text-base font-bold text-neutral-900 dark:text-white">
            {requiredPageviews.toLocaleString()}
            <span className="text-[10px] text-neutral-400 font-normal"> PVs/mo</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ~{requiredDailyVisitors.toLocaleString()} unique visits/day
          </div>
        </div>

        {/* App Requirement */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Mobile App Route (AdMob)</div>
          <div className="text-base font-bold text-neutral-900 dark:text-white">
            {requiredDau.toLocaleString()}
            <span className="text-[10px] text-neutral-400 font-normal"> DAU</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ~{(requiredDau * 3.5).toLocaleString()} Monthly Active Users (MAU)
          </div>
        </div>
      </div>
    </div>
  );
};
