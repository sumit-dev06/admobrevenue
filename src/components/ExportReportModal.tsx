import React from "react";
import { CurrencyCode, AdSenseResults, AdMobResults, AdSenseInputs, AdMobInputs } from "../types";
import { exportCalculationCSV } from "../utils/export";
import { formatCurrency, formatNumber } from "../utils/currency";
import { Download, Printer, X, FileText } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: "adsense" | "admob";
  currency: CurrencyCode;
  adSenseInputs: AdSenseInputs;
  adSenseResults: AdSenseResults;
  adMobInputs: AdMobInputs;
  adMobResults: AdMobResults;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  platform,
  currency,
  adSenseInputs,
  adSenseResults,
  adMobInputs,
  adMobResults,
}) => {
  if (!isOpen) return null;

  const isAdSense = platform === "adsense";
  const monthlyRev = isAdSense ? adSenseResults.monthlyRevenue : adMobResults.monthlyRevenue;
  const annualRev = isAdSense ? adSenseResults.annualRevenue : adMobResults.annualRevenue;
  const dailyRev = isAdSense ? adSenseResults.dailyRevenue : adMobResults.dailyRevenue;
  const breakdown = isAdSense ? adSenseResults.formatBreakdown : adMobResults.formatBreakdown;

  const handleDownloadCSV = () => {
    if (isAdSense) {
      exportCalculationCSV(
        "AdSense",
        adSenseInputs.categoryId,
        "Monthly Pageviews",
        formatNumber(adSenseInputs.monthlyPageviews),
        dailyRev,
        monthlyRev,
        annualRev,
        "Page RPM",
        `$${adSenseResults.pageRpm}`,
        breakdown,
        currency
      );
    } else {
      exportCalculationCSV(
        "AdMob",
        adMobInputs.categoryId,
        "Daily Active Users (DAU)",
        formatNumber(adMobInputs.dau),
        dailyRev,
        monthlyRev,
        annualRev,
        "ARPDAU",
        `$${adMobResults.arpdau}`,
        breakdown,
        currency
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="export-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
                Monetization Audit Sheet & Export
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Verified 2025–2026 publisher revenue projection report
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close export report dialog"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Audit Sheet Preview */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-700">
            <div>
              <div className="font-bold text-neutral-900 dark:text-white text-sm">
                {isAdSense ? "AdSense Website Revenue Projection" : "AdMob App Revenue Projection"}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                Niche: {isAdSense ? adSenseInputs.categoryId : adMobInputs.categoryId}
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {formatCurrency(monthlyRev, currency)} / mo
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                Annual: {formatCurrency(annualRev, currency)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-neutral-700 dark:text-neutral-300">
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">Daily Revenue:</span>
              <div className="font-bold font-mono text-neutral-900 dark:text-white">{formatCurrency(dailyRev, currency)}</div>
            </div>
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">{isAdSense ? "Page RPM:" : "ARPDAU:"}</span>
              <div className="font-bold font-mono text-neutral-900 dark:text-white">
                {isAdSense ? `$${adSenseResults.pageRpm}` : `$${adMobResults.arpdau}`}
              </div>
            </div>
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">Monthly Impressions:</span>
              <div className="font-bold font-mono text-neutral-900 dark:text-white">
                {formatNumber(isAdSense ? adSenseResults.monthlyImpressions : adMobResults.monthlyImpressions)}
              </div>
            </div>
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">Currency:</span>
              <div className="font-bold font-mono text-neutral-900 dark:text-white">{currency}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            Audit export ready in CSV or printable PDF format
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print revenue audit sheet"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print Sheet</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadCSV}
              aria-label="Download CSV revenue projection report"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
