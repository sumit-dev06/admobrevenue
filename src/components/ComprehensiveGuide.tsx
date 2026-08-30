import React from "react";
import { BookOpen } from "lucide-react";

export const ComprehensiveGuide: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 text-xs font-mono">
      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <BookOpen className="w-4 h-4 text-blue-500" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          2026 Publisher & Developer Monetization Blueprint
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            Mobile App In-App Bidding Strategy
          </div>
          <p>
            Waterfall mediation is obsolete. Modern mobile publishers use in-app programmatic real-time bidding (RTB) via AppLovin MAX, Google AdMob Mediation, and Unity LevelPlay. Enabling SDK bidding forces multiple ad demand networks to compete concurrently per impression, raising blended eCPMs by 20% to 35%.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            Web Viewability & Anchor Overlays
          </div>
          <p>
            Advertisers bid on viewable impressions (MRC standard: 50% pixels in view for ≥1s). Placing ads below the fold with 20% viewability yields low CPMs. Mobile anchor ads and sticky sidebars achieve 90%+ viewability, commanding premium programmatic CPM bids.
          </p>
        </div>
      </div>
    </div>
  );
};
