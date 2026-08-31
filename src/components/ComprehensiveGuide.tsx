import React from "react";
import { BookOpen } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

export const ComprehensiveGuide = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div id="comprehensive-guide" className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 text-xs font-mono">
      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <BookOpen className="w-4 h-4 text-blue-500" aria-hidden="true" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          {t.editorial.mainTitle}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            {t.editorial.appRevenueTitle}
          </div>
          <p>{t.editorial.appRevenueBody}</p>
        </div>

        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
            {t.editorial.whatIsAdSenseTitle}
          </div>
          <p>{t.editorial.whatIsAdSenseBody1}</p>
        </div>
      </div>
    </div>
  );
});
