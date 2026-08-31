import React from "react";
import { AdSenseInputs, AdMobInputs } from "../types";
import { useTranslation } from "../i18n/LanguageContext";
import { Lightbulb } from "lucide-react";

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
  const { t } = useTranslation();
  const tips: { title: string; desc: string; impact: string }[] = [];

  if (platform === "admob" && adMobInputs) {
    if (!adMobInputs.hasMediation) {
      tips.push({
        title: t.tips.mediationTitle,
        desc: t.tips.mediationDesc,
        impact: "+25% Lift",
      });
    }
    if (!adMobInputs.adFormats.rewardedVideo.enabled) {
      tips.push({
        title: t.tips.rewardedTitle,
        desc: t.tips.rewardedDesc,
        impact: "+40% ARPDAU",
      });
    }
    if (!adMobInputs.adFormats.appOpen.enabled) {
      tips.push({
        title: t.tips.appOpenTitle,
        desc: t.tips.appOpenDesc,
        impact: "+15% Lift",
      });
    }
    if (adMobInputs.geoDistribution.tier1 < 40) {
      tips.push({
        title: t.tips.geoTitle,
        desc: t.tips.geoDesc,
        impact: "+200% RPM",
      });
    }
  } else if (platform === "adsense" && adSenseInputs) {
    if (!adSenseInputs.selectedUnits.anchorAd) {
      tips.push({
        title: t.tips.anchorTitle,
        desc: t.tips.anchorDesc,
        impact: "+18% Revenue",
      });
    }
    if (!adSenseInputs.selectedUnits.vignetteAd) {
      tips.push({
        title: t.tips.vignetteTitle,
        desc: t.tips.vignetteDesc,
        impact: "+22% Revenue",
      });
    }
    if (adSenseInputs.adBlockerRate > 20) {
      tips.push({
        title: t.tips.adBlockTitle,
        desc: t.tips.adBlockDesc,
        impact: "+12% Recovered",
      });
    }
  }

  if (tips.length === 0) {
    tips.push({
      title: t.tips.maximizedTitle,
      desc: t.tips.maximizedDesc,
      impact: t.tips.maximizedImpact,
    });
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          {t.tips.title}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5 bg-neutral-50/50 dark:bg-neutral-900/40"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                {tip.title}
              </span>
              <span className="shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-dashed border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                {tip.impact}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
