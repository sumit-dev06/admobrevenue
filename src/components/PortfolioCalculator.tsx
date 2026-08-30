import React, { useState } from "react";
import { CurrencyCode, AdSenseResults, AdMobResults } from "../types";
import { formatCurrency, formatNumber } from "../utils/currency";
import {
  Layers,
  Globe,
  Smartphone,
  TrendingUp,
  DollarSign,
  Plus,
  Trash2,
  Sparkles,
  PieChart as PieIcon,
} from "lucide-react";

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
  const [webCount, setWebCount] = useState(2);
  const [appCount, setAppCount] = useState(1);

  const totalMonthly = adsenseResults.monthlyRevenue * webCount + admobResults.monthlyRevenue * appCount;
  const totalAnnual = totalMonthly * 12;
  const totalDaily = totalMonthly / 30.417;

  const webShare = totalMonthly > 0 ? ((adsenseResults.monthlyRevenue * webCount) / totalMonthly) * 100 : 50;
  const appShare = 100 - webShare;

  return (
    <div className="space-y-6">
      {/* Portfolio Master Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-amber-200/60 dark:border-amber-900/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                  Publisher Media Portfolio Calculator
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Multi-Property
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Model total recurring revenue across your entire network of websites and mobile applications
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Total Portfolio Monthly Run-Rate
            </div>
            <div className="text-3xl font-black text-neutral-900 dark:text-white font-mono text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalMonthly, currency)} <span className="text-xs text-neutral-400 font-sans">/ mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Multipliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Website Properties */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Content Websites</h4>
                <div className="text-xs text-neutral-500">AdSense & Display Network</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setWebCount(Math.max(0, webCount - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold px-2 text-neutral-900 dark:text-white">
                {webCount} sites
              </span>
              <button
                onClick={() => setWebCount(Math.min(20, webCount + 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between text-xs">
            <span className="text-neutral-500">Per Website Monthly Yield:</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white">
              {formatCurrency(adsenseResults.monthlyRevenue, currency)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-between text-xs">
            <span className="font-bold text-blue-900 dark:text-blue-200">Total Web Channel Revenue:</span>
            <span className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">
              {formatCurrency(adsenseResults.monthlyRevenue * webCount, currency)}/mo
            </span>
          </div>
        </div>

        {/* Mobile App Properties */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Mobile Applications</h4>
                <div className="text-xs text-neutral-500">AdMob & In-App Ads</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setAppCount(Math.max(0, appCount - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold px-2 text-neutral-900 dark:text-white">
                {appCount} apps
              </span>
              <button
                onClick={() => setAppCount(Math.min(20, appCount + 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between text-xs">
            <span className="text-neutral-500">Per App Monthly Yield:</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white">
              {formatCurrency(admobResults.monthlyRevenue, currency)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900 dark:text-emerald-200">Total App Channel Revenue:</span>
            <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
              {formatCurrency(admobResults.monthlyRevenue * appCount, currency)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Annual Summary Box */}
      <div className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
            Combined Annual Run-Rate
          </div>
          <div className="text-3xl font-black font-mono mt-1">
            {formatCurrency(totalAnnual, currency)}
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Diversified cashflow across {webCount} websites and {appCount} mobile apps
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-neutral-400">Web Share</div>
            <div className="text-sm font-bold text-blue-400">{Math.round(webShare)}%</div>
          </div>
          <div className="w-px h-8 bg-neutral-800" />
          <div className="text-left">
            <div className="text-[11px] text-neutral-400">App Share</div>
            <div className="text-sm font-bold text-emerald-400">{Math.round(appShare)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
