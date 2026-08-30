import React from "react";
import { BookOpen, Calculator, HelpCircle, ArrowRight } from "lucide-react";

export const FormulaDeepDive: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Ad Revenue Mathematical Model & Formula Reference
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Deterministic mathematical formulas used by Google AdSense, AdMob, and programmatic ad exchanges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Formula 1: AdSense Page RPM */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Formula 01
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">Website Level</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Google AdSense Page RPM (Revenue Per Mille)
            </h4>
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-emerald-400 text-center font-bold">
              Page RPM = (Estimated Earnings / Total Pageviews) × 1,000
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Page RPM measures total revenue across all ad slots on a page per 1,000 pageviews. If a site earns $150 from 10,000 pageviews with 3 ad units per page, the Page RPM is ($150 / 10,000) × 1,000 = $15.00.
            </p>
          </div>

          {/* Formula 2: AdMob eCPM */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Formula 02
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">Unit / Network Level</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              AdMob eCPM (Effective Cost Per Mille)
            </h4>
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-emerald-400 text-center font-bold">
              eCPM = (Total Ad Earnings / Total Ad Impressions) × 1,000
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              eCPM translates all pricing models (CPC, CPM, CPA) into standardized revenue per 1,000 served ad impressions, enabling direct performance comparison between Rewarded Video and Interstitial units.
            </p>
          </div>

          {/* Formula 3: ARPDAU */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Formula 03
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">User Monetization</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              ARPDAU (Average Revenue Per Daily Active User)
            </h4>
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-emerald-400 text-center font-bold">
              ARPDAU = Total Daily Ad Revenue / Daily Active Users (DAU)
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Measures how much monetization value an active daily player or user generates. If 20,000 DAU generate $1,600 in daily ad revenue, the ARPDAU is $1,600 / 20,000 = $0.08 (8 cents/user/day).
            </p>
          </div>

          {/* Formula 4: Blended CTR & CPC */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Formula 04
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">Click & Impression Blend</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              CPC / CTR Derived RPM Equivalent
            </h4>
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-emerald-400 text-center font-bold">
              RPM = (CTR % × 10) × CPC ($) × Units Per Page × Viewability %
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When ads are bought on CPC, page revenue scales proportionally with user click-through rate, cost-per-click, number of visible ad units, and viewable impression proportion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
