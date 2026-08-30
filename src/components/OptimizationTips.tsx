import React from "react";
import { AdSenseInputs, AdMobInputs } from "../types";
import { Lightbulb, ArrowUpRight, Zap, CheckCircle2, AlertTriangle } from "lucide-react";

interface OptimizationTipsProps {
  platform: "adsense" | "admob";
  adSenseInputs?: AdSenseInputs;
  adMobInputs?: AdMobInputs;
}

export const OptimizationTips: React.FC<OptimizationTipsProps> = ({
  platform,
  adSenseInputs,
  adMobInputs,
}) => {
  const tips: { title: string; desc: string; impact: string; type: "high" | "medium" | "quick" }[] = [];

  if (platform === "adsense" && adSenseInputs) {
    if (!adSenseInputs.selectedUnits.anchorAd) {
      tips.push({
        title: "Enable Mobile Anchor Ads",
        desc: "Sticky bottom dock anchors achieve 92%+ viewability on mobile viewports and lift blended Page RPM by +15% to +22% without harming user experience.",
        impact: "+18% RPM Lift",
        type: "high",
      });
    }

    if (!adSenseInputs.selectedUnits.vignetteAd) {
      tips.push({
        title: "Activate Vignette Interstitials",
        desc: "Google AdSense Vignettes trigger between page navigations and pay 2.5x higher eCPM than standard banners with high user completion rates.",
        impact: "+25% Revenue Lift",
        type: "high",
      });
    }

    if (adSenseInputs.selectedUnits.sidebar === 0) {
      tips.push({
        title: "Implement 300x600 Sticky Sidebar",
        desc: "A floating sticky half-page unit stays in viewport as desktop users read long-form articles, doubling ad dwell time and programmatic bid value.",
        impact: "+14% Desktop RPM",
        type: "medium",
      });
    }

    if (adSenseInputs.adBlockerRate > 25) {
      tips.push({
        title: "Deploy AdBlock Recovery Messaging",
        desc: "Enable Google AdSense Funding Choices or subtle ad blocker whitelist prompts to recover 30%-50% of ad impressions blocked by browser extensions.",
        impact: "Recover ~$100-$500/mo",
        type: "quick",
      });
    }

    tips.push({
      title: "Target High-Intent Organic Keyword Clusters",
      desc: "Pages answering specific commercial intent queries (e.g., software comparisons, quotes, buying guides) trigger significantly higher advertiser CPC bids ($2.00-$8.00+).",
      impact: "+30% CPC Boost",
      type: "medium",
    });
  } else if (platform === "admob" && adMobInputs) {
    if (!adMobInputs.hasMediation) {
      tips.push({
        title: "Enable Real-Time Bidding Mediation",
        desc: "Integrate AppLovin MAX, Unity Ads, and Mintegral with AdMob mediation. Real-time competitive programmatic auctions lift blended eCPMs by +20% to +35%.",
        impact: "+25% eCPM Lift",
        type: "high",
      });
    }

    if (!adMobInputs.adFormats.rewardedVideo.enabled) {
      tips.push({
        title: "Incentivize with Rewarded Video Ads",
        desc: "Rewarded videos command top advertiser CPMs ($25-$45 in Tier 1) while maintaining positive user sentiment since users voluntarily opt-in for in-game or in-app perks.",
        impact: "+40% ARPDAU Lift",
        type: "high",
      });
    }

    if (!adMobInputs.adFormats.appOpen.enabled) {
      tips.push({
        title: "Add App Open Splash Ads",
        desc: "App Open ads monetizes the natural 1-2 second cold boot and background resume sequence, creating high-value impressions without interrupting active app tasks.",
        impact: "+15% Daily Impressions",
        type: "medium",
      });
    }

    if (adMobInputs.adFormats.banner.enabled && adMobInputs.adFormats.banner.refreshIntervalSeconds > 30) {
      tips.push({
        title: "Optimize Banner Auto-Refresh to 30 Seconds",
        desc: "Setting adaptive banners to refresh every 30 seconds (compliant with Google AdMob policy) doubles total banner impressions during longer active sessions.",
        impact: "+45% Banner Revenue",
        type: "quick",
      });
    }

    tips.push({
      title: "Improve D1 & D7 Day Retention",
      desc: "Increasing Day 1 retention from 25% to 35% through streamlined onboarding and push notifications compounds your active DAU base and daily impression velocity.",
      impact: "+30% Lifetime Value",
      type: "medium",
    });
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Actionable Revenue Optimization Recommendations
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Personalized suggestions to lift RPM and eCPM based on your configuration
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {tip.title}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {tip.impact}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
