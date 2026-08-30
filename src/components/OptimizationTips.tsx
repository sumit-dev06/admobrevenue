import React from "react";
import { AdSenseInputs, AdMobInputs } from "../types";
import { Lightbulb, ArrowRight } from "lucide-react";

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
  const tips: { title: string; desc: string; impact: string }[] = [];

  if (platform === "admob" && adMobInputs) {
    if (!adMobInputs.hasMediation) {
      tips.push({
        title: "Activate In-App Bidding Mediation",
        desc: "Enabling AppLovin MAX or Unity bidding creates auction pressure and increases blended eCPM by +20% to +35%.",
        impact: "+25% Revenue",
      });
    }
    if (!adMobInputs.adFormats.rewardedVideo.enabled) {
      tips.push({
        title: "Integrate Rewarded Video Placements",
        desc: "Rewarded video commands the highest eCPMs ($20–$45 in Tier 1) with strong user engagement.",
        impact: "+40% ARPDAU",
      });
    }
    if (!adMobInputs.adFormats.appOpen.enabled) {
      tips.push({
        title: "Add App Open Splash Ads",
        desc: "Monetize daily app launches without disrupting active gameplay or utility workflows.",
        impact: "+15% Lift",
      });
    }
    if (adMobInputs.geoDistribution.tier1 < 40) {
      tips.push({
        title: "Focus ASO & User Acquisition in Tier 1",
        desc: "US, UK, CA, and AU users produce 4x to 8x higher eCPMs than Tier 3 regions.",
        impact: "+200% RPM",
      });
    }
  } else if (platform === "adsense" && adSenseInputs) {
    if (!adSenseInputs.selectedUnits.anchorAd) {
      tips.push({
        title: "Turn On Mobile Sticky Anchor Ads",
        desc: "Anchors stay pinned to the screen viewport, achieving 90%+ viewability and reliable incremental RPM.",
        impact: "+18% Revenue",
      });
    }
    if (!adSenseInputs.selectedUnits.vignetteAd) {
      tips.push({
        title: "Enable Vignette Interstitials",
        desc: "Full-screen page transition ads command top programmatic CPMs across both mobile and desktop.",
        impact: "+22% Revenue",
      });
    }
    if (adSenseInputs.adBlockerRate > 20) {
      tips.push({
        title: "Deploy Ad-Block Recovery or Funding Choices",
        desc: "Google Funding Choices recovers 30% to 50% of ad-blocked page impressions through polite whitelisting prompts.",
        impact: "+12% Recovered",
      });
    }
  }

  if (tips.length === 0) {
    tips.push({
      title: "Layout Fully Optimized",
      desc: "Your current configuration utilizes recommended ad units, viewability standards, and auction mediation.",
      impact: "Maximized",
    });
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          Optimization Audit
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {tips.map((t, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5 bg-neutral-50/50 dark:bg-neutral-900/40"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                {t.title}
              </span>
              <span className="shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-dashed border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                {t.impact}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed">
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
