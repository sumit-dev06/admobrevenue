import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { calculateReverseGoal } from "../utils/adCalculations";
import { formatCurrency, formatNumber } from "../utils/currency";
import confetti from "canvas-confetti";
import {
  Target,
  Globe,
  Smartphone,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ReverseGoalCalculatorProps {
  currency: CurrencyCode;
}

export const ReverseGoalCalculator: React.FC<ReverseGoalCalculatorProps> = ({ currency }) => {
  const [platform, setPlatform] = useState<"adsense" | "admob">("adsense");
  const [targetMonthly, setTargetMonthly] = useState<number>(5000);
  const [categoryId, setCategoryId] = useState<string>("tech-software-ai");
  const [tier1Share, setTier1Share] = useState<number>(75);

  const goalResult = calculateReverseGoal(
    targetMonthly,
    platform,
    categoryId,
    { tier1: tier1Share, tier2: Math.round((100 - tier1Share) / 2), tier3: Math.round((100 - tier1Share) / 2) }
  );

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-6">
      {/* Target Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Reverse Target Income Calculator
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Determine the exact pageviews or active users required to hit your income goal
              </p>
            </div>
          </div>

          {/* Platform Toggle */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setPlatform("adsense")}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (platform === "adsense"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              Website (AdSense)
            </button>
            <button
              onClick={() => setPlatform("admob")}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (platform === "admob"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              App (AdMob)
            </button>
          </div>
        </div>

        {/* Goal Income Slider & Input */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Desired Monthly Revenue Goal
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="100"
                max="500000"
                step="500"
                value={targetMonthly}
                onChange={(e) => setTargetMonthly(Math.max(10, parseInt(e.target.value) || 0))}
                className="w-36 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-right font-mono font-bold text-neutral-900 dark:text-white px-2.5 py-1 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">/ month</span>
            </div>
          </div>
          <input
            type="range"
            min="500"
            max="25000"
            step="250"
            value={Math.min(targetMonthly, 25000)}
            onChange={(e) => setTargetMonthly(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>$500/mo</span>
            <span>$2,500/mo</span>
            <span>$5,000/mo</span>
            <span>$10,000/mo</span>
            <span>$25,000+/mo</span>
          </div>
        </div>

        {/* Category & Tier Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {platform === "adsense"
                ? ADSENSE_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                : ADMOB_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              <span>Tier 1 Traffic Share</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono">{tier1Share}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={tier1Share}
              onChange={(e) => setTier1Share(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Target Result Dashboard */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-6 sm:p-7 border border-neutral-800 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Execution Roadmap for {formatCurrency(targetMonthly, currency)} / month
          </span>
          <button
            onClick={handleTriggerConfetti}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
          >
            Celebrate Goal 🎉
          </button>
        </div>

        {goalResult.platform === "adsense" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Required Monthly Pageviews</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatNumber(goalResult.requiredMonthlyPageviews)}
              </div>
              <div className="text-[11px] text-purple-300 mt-1">
                At estimated RPM of ${goalResult.expectedRpm}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Required Daily Pageviews</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                {formatNumber(goalResult.requiredDailyPageviews)}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">~30.4 days avg</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Estimated Daily Unique Visitors</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {formatNumber(goalResult.requiredDailyVisitors)}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">~1.8 pages per visitor</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Required Daily Active Users (DAU)</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatNumber(goalResult.requiredDau)}
              </div>
              <div className="text-[11px] text-purple-300 mt-1">
                At estimated ARPDAU of ${goalResult.estimatedArpdau}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Required Monthly Active Users (MAU)</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {formatNumber(goalResult.requiredMau)}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">~25% stickiness ratio</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/50">
              <div className="text-xs text-neutral-400 mb-1">Daily Ad Impressions</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                {formatNumber(goalResult.requiredDailyImpressions)}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Across all ad formats</div>
            </div>
          </div>
        )}

        {/* Milestone Steps */}
        <div className="pt-2">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
            Phased Growth Milestones
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {goalResult.milestones.map((m, idx) => (
              <div
                key={m.label}
                className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/40 space-y-1 text-xs"
              >
                <div className="font-semibold text-purple-300">{m.label}</div>
                <div className="font-bold text-white font-mono">
                  {formatCurrency(m.income, currency)}/mo
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  {"pageviews" in m
                    ? formatNumber(m.pageviews) + " PV"
                    : formatNumber(m.dau) + " DAU"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
