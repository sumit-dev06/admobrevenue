import React from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { Calculator } from "lucide-react";

export const FormulaDeepDive: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <Calculator className="w-4 h-4 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
        <h2 className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          {t.formulas.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        {/* AdSense RPM */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
            {t.formulas.pageRpmTitle}
          </div>
          <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 border border-dashed border-neutral-300 dark:border-neutral-700">
            RPM = (Est. Earnings / Pageviews) × 1,000
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.formulas.pageRpmDesc}
          </p>
        </div>

        {/* AdMob eCPM */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
            {t.formulas.ecpmTitle}
          </div>
          <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 border border-dashed border-neutral-300 dark:border-neutral-700">
            eCPM = (Ad Earnings / Impressions) × 1,000
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.formulas.ecpmDesc}
          </p>
        </div>

        {/* ARPDAU */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/40 dark:bg-neutral-900/40">
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold uppercase">
            {t.formulas.arpdauTitle}
          </div>
          <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 border border-dashed border-neutral-300 dark:border-neutral-700">
            ARPDAU = Daily Ad Revenue / Daily Active Users
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.formulas.arpdauDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
