import React, { useState } from "react";
import { CurrencyCode, AdSenseResults, AdMobResults } from "../types";
import { formatCurrency } from "../utils/currency";
import { Layers } from "lucide-react";

interface PortfolioCalculatorProps {
  adsenseResults: AdSenseResults;
  admobResults: AdMobResults;
  currency: CurrencyCode;
}

export const PortfolioCalculator: React.FC<PortfolioCalculatorProps> = ({
  adsenseResults,
  admobResults,
  currency,
}) => {
  const [siteCount, setSiteCount] = useState<number>(2);
  const [appCount, setAppCount] = useState<number>(1);

  const totalMonthly = adsenseResults.monthlyRevenue * siteCount + admobResults.monthlyRevenue * appCount;
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            Digital Media Portfolio Aggregator
          </span>
        </div>
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          Multi-Property
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Websites Active</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSiteCount(Math.max(0, siteCount - 1))}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              -
            </button>
            <span className="font-bold text-base text-neutral-900 dark:text-white">{siteCount}</span>
            <button
              onClick={() => setSiteCount(siteCount + 1)}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Apps Active</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAppCount(Math.max(0, appCount - 1))}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              -
            </button>
            <span className="font-bold text-base text-neutral-900 dark:text-white">{appCount}</span>
            <button
              onClick={() => setAppCount(appCount + 1)}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 uppercase">
            Combined Portfolio Run-Rate
          </div>
          <div className="text-xl font-bold text-amber-700 dark:text-amber-300">
            {formatCurrency(totalMonthly, currency)}
            <span className="text-xs font-normal text-neutral-500">/month</span>
          </div>
        </div>
        <div className="text-[11px] text-neutral-500">
          Annual: {formatCurrency(totalAnnual, currency)}/yr
        </div>
      </div>
    </div>
  );
};
