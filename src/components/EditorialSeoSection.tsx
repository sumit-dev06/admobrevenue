import React from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { FileText, TrendingUp, Sparkles, CheckCircle } from "lucide-react";

export const EditorialSeoSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-7 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-6 text-xs font-mono">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <FileText className="w-4 h-4 text-emerald-500" aria-hidden="true" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          {t.editorial.badge}
        </span>
      </div>

      <div className="space-y-6">
        {/* Main H2 */}
        <div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            {t.editorial.mainTitle}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            {t.editorial.whatIsAdSenseBody1}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-2">
            {t.editorial.whatIsAdSenseBody2}
          </p>
        </div>

        {/* Calculation Steps Grid */}
        <div className="p-4 sm:p-5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-xs uppercase">
            <TrendingUp className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <h3>{t.editorial.howToCalculateTitle}</h3>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
            {t.editorial.howToCalculateBody}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Formula 1: Page RPM Model
              </span>
              <p className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold text-[11px]">
                {t.editorial.formulaStep1}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                Formula 2: CPM Impression Model
              </span>
              <p className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold text-[11px]">
                {t.editorial.formulaStep2}
              </p>
            </div>
          </div>

          <div className="pt-2 text-neutral-700 dark:text-neutral-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-dashed border-emerald-300/60 dark:border-emerald-800/40">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px] block mb-1">
              💡 {t.editorial.formulaExampleTitle}
            </span>
            <p className="text-[11px] leading-relaxed">
              {t.editorial.formulaExampleBody}
            </p>
          </div>
        </div>

        {/* AdMob & Mobile App Revenue Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase">
            {t.editorial.appRevenueTitle}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            {t.editorial.appRevenueBody}
          </p>
        </div>

        {/* 4 Critical Drivers Cards */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase">
            {t.editorial.keyDriversTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-1">
              <div className="font-bold text-neutral-900 dark:text-white text-xs">
                {t.editorial.driver1Title}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                {t.editorial.driver1Desc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-1">
              <div className="font-bold text-neutral-900 dark:text-white text-xs">
                {t.editorial.driver2Title}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                {t.editorial.driver2Desc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-1">
              <div className="font-bold text-neutral-900 dark:text-white text-xs">
                {t.editorial.driver3Title}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                {t.editorial.driver3Desc}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-1">
              <div className="font-bold text-neutral-900 dark:text-white text-xs">
                {t.editorial.driver4Title}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                {t.editorial.driver4Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Checklist */}
        <div className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/20 space-y-2.5">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white text-xs uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <h3>{t.editorial.optimizationTitle}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.editorial.opt1}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.editorial.opt2}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.editorial.opt3}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.editorial.opt4}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
