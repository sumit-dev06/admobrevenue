import React, { useState } from "react";
import { AdSenseInputs, AdMobInputs } from "../types";
import { useTranslation } from "../i18n/LanguageContext";
import { Lightbulb, ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono transition-all overflow-hidden shadow-2xs">
      {/* Clickable Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 dark:text-white truncate">
                {t.tips.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold uppercase font-mono">
                {tips.length} Recommendations
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {isOpen ? "Click to collapse audit tips" : "Actionable growth opportunities to increase revenue (Click to expand)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
          <span className="hidden sm:inline">{isOpen ? "Hide Tips" : "Show Tips"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-500" : "text-neutral-400"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-5 pt-0 space-y-3 border-t border-dashed border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
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
      )}
    </div>
  );
};
