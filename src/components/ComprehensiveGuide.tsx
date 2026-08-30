import React from "react";
import { BookOpen } from "lucide-react";

export const ComprehensiveGuide = React.memo(() => {
  return (
    <div id="comprehensive-guide" className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 text-xs font-mono">
      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <BookOpen className="w-4 h-4 text-blue-500" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          2026 Publisher & Developer Monetization Blueprint
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            Mastering App Revenue
          </div>
          <p>
            Welcome to the ultimate <a href="/?page=admob" className="text-emerald-500 hover:underline">Google AdMob Revenue Calculator</a>. 
            Waterfall mediation is obsolete. Modern mobile publishers use in-app programmatic real-time bidding (RTB). 
            By utilizing the official <a href="https://admob.google.com/home/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google AdMob</a> platform, 
            developers can force multiple ad networks to compete concurrently per impression, raising blended eCPMs by 20% to 35%. 
            This accurate earnings forecast tool helps you simulate those gains.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            Web Viewability Optimization
          </div>
          <p>
            By leveraging our <a href="/?page=adsense" className="text-blue-500 hover:underline">Google AdSense Revenue Calculator</a>, 
            webmasters can optimize for high-paying ad units. Advertisers bid on viewable impressions on the <a href="https://www.google.com/adsense/start/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AdSense</a> network. 
            Placing ads below the fold with 20% viewability yields low CPMs. Mobile anchor ads and sticky sidebars achieve 90%+ viewability, commanding premium programmatic CPM bids for 2026 and beyond.
            Read more in our <a href="#faq-section" className="text-blue-500 hover:underline">SEO FAQ Section</a>.
          </p>
        </div>
      </div>
    </div>
  );
});
