import React from "react";
import { BookOpen, CheckCircle2, TrendingUp, Zap, Shield, Target } from "lucide-react";

export const ComprehensiveGuide: React.FC = () => {
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
      <div className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Comprehensive Monetization Blueprint
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
          How to Maximize Google AdSense & AdMob Earnings in 2026
        </h2>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white">
          1. Understanding the Core Difference: RPM vs eCPM vs ARPDAU
        </h3>
        <p>
          Website publishers and mobile app developers often confuse the key monetization metrics. <strong>AdSense Page RPM</strong> represents the aggregated revenue generated per 1,000 pageviews across all ad slots on the page. In contrast, <strong>AdMob eCPM</strong> is calculated strictly at the individual ad unit level (per 1,000 ad impressions). For mobile applications, <strong>ARPDAU</strong> (Average Revenue Per Daily Active User) remains the north-star metric because it reflects the true daily revenue yield per active user.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          2. The 5 Levers That Control Your AdSense Earnings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
            <span className="font-bold text-neutral-900 dark:text-white text-xs">High-Intent Niche</span>
            <p className="text-neutral-500 text-[11px]">Finance, SaaS, and Legal command $25-$50+ RPMs due to advertiser lifetime customer value.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
            <span className="font-bold text-neutral-900 dark:text-white text-xs">Mobile Sticky Anchors</span>
            <p className="text-neutral-500 text-[11px]">Persistent bottom anchors consistently achieve 90%+ viewability, triggering premium programmatic bids.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
            <span className="font-bold text-neutral-900 dark:text-white text-xs">Ad Viewability Rate (&gt;70%)</span>
            <p className="text-neutral-500 text-[11px]">Advertisers on Google Display Network bid 2x higher for ad placements that stay in user viewport for over 5 seconds.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
            <span className="font-bold text-neutral-900 dark:text-white text-xs">Q4 Holiday Ad Budgets</span>
            <p className="text-neutral-500 text-[11px]">November and December ad rates surge by up to 50% due to Black Friday and retail campaigns.</p>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          3. AdMob Hybrid Monetization Architecture
        </h3>
        <p>
          Top-grossing mobile apps utilize a tiered hybrid strategy:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
          <li><strong>App Open Ads:</strong> Show on cold start and foreground launch (eCPM $8-$16 Tier 1).</li>
          <li><strong>Rewarded Video:</strong> Opt-in rewarded currency and bonus lives (eCPM $20-$45 Tier 1).</li>
          <li><strong>Paced Interstitials:</strong> Placed at natural transition points every 3-4 minutes (eCPM $10-$22).</li>
          <li><strong>Real-Time Bidding Mediation:</strong> Connect AppLovin MAX, Unity Ads, and Mintegral to force programmatic bidding wars.</li>
        </ul>
      </div>
    </article>
  );
};
