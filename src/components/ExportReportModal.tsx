import React from "react";
import { CurrencyCode, AdSenseResults, AdMobResults, AdSenseInputs, AdMobInputs } from "../types";
import { exportAdMobCSV, exportAdSenseCSV } from "../utils/export";
import { formatCurrency, formatNumber } from "../utils/currency";
import { COUNTRIES } from "../data/geoTiers";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";
import { Download, Printer, X, FileText, CheckCircle2, Smartphone, Globe, Sliders, Layers } from "lucide-react";

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

function getCountryName(code?: string): string {
  if (!code || code === "ALL") return "Global Blended Average (ALL)";
  const c = COUNTRIES.find((item) => item.code === code);
  return c ? `${c.name} (${c.code})` : code;
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

  const admobCategory = ADMOB_CATEGORIES.find((c) => c.id === adMobInputs.categoryId);
  const adsenseCategory = ADSENSE_CATEGORIES.find((c) => c.id === adSenseInputs.categoryId);

  const handleDownloadCSV = () => {
    if (isAdSense) {
      exportAdSenseCSV(adSenseInputs, adSenseResults, currency);
    } else {
      exportAdMobCSV(adMobInputs, adMobResults, currency);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 id="export-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
                Monetization Audit Sheet & Export
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Verified 2025–2026 publisher revenue projection & user configuration audit
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

        {/* Scrollable Content Container */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Top Revenue Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-700">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-dashed border-emerald-500/30">
                  {isAdSense ? "AdSense Web Projection" : "AdMob App Projection"}
                </span>
                <div className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base mt-1">
                  {isAdSense ? adsenseCategory?.name : admobCategory?.name}
                </div>
              </div>
              <div className="sm:text-right font-mono">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base sm:text-lg">
                  {formatCurrency(monthlyRev, currency)} <span className="text-xs text-neutral-500 font-normal">/ month</span>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                  Annual Run-Rate: <span className="font-bold text-neutral-900 dark:text-white">{formatCurrency(annualRev, currency)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-neutral-700 dark:text-neutral-300">
              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-neutral-500 text-[11px] block">Daily Revenue</span>
                <div className="font-bold font-mono text-neutral-900 dark:text-white text-xs sm:text-sm mt-0.5">
                  {formatCurrency(dailyRev, currency)}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-neutral-500 text-[11px] block">{isAdSense ? "Page RPM" : "ARPDAU"}</span>
                <div className="font-bold font-mono text-neutral-900 dark:text-white text-xs sm:text-sm mt-0.5">
                  {isAdSense ? `$${adSenseResults.pageRpm}` : `$${adMobResults.arpdau}`}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-neutral-500 text-[11px] block">{isAdSense ? "Impression RPM" : "Blended eCPM"}</span>
                <div className="font-bold font-mono text-neutral-900 dark:text-white text-xs sm:text-sm mt-0.5">
                  {isAdSense ? `$${adSenseResults.impressionRpm}` : `$${adMobResults.blendedEcpm}`}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-neutral-500 text-[11px] block">Monthly Impressions</span>
                <div className="font-bold font-mono text-neutral-900 dark:text-white text-xs sm:text-sm mt-0.5">
                  {formatNumber(isAdSense ? adSenseResults.monthlyImpressions : adMobResults.monthlyImpressions)}
                </div>
              </div>
            </div>
          </div>

          {/* User Chosen Options & Configurations Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              <Sliders className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              <span>Configured User Parameters & Chosen Options</span>
            </div>

            {isAdSense ? (
              /* AdSense User Options */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 font-mono">
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase flex items-center gap-1.5 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    <Globe className="w-3 h-3 text-emerald-500" />
                    <span>Audience & Traffic</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Target Location:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{getCountryName(adSenseInputs.targetCountry)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Account Country:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{getCountryName(adSenseInputs.accountCountry)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Monthly Pageviews:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(adSenseInputs.monthlyPageviews)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Pages / Visit:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{adSenseInputs.pagesPerVisit}x</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Device Split:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adSenseInputs.deviceDistribution.mobile}% Mob / {adSenseInputs.deviceDistribution.desktop}% Desk / {adSenseInputs.deviceDistribution.tablet}% Tab
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 font-mono">
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase flex items-center gap-1.5 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    <Layers className="w-3 h-3 text-emerald-500" />
                    <span>Ad Units & Modifiers</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Traffic Tiers:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      T1: {adSenseInputs.geoDistribution.tier1}% | T2: {adSenseInputs.geoDistribution.tier2}% | T3: {adSenseInputs.geoDistribution.tier3}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Ad Units Active:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adSenseInputs.selectedUnits.leaderboard}x Leaderboard, {adSenseInputs.selectedUnits.inArticle}x In-Article, {adSenseInputs.selectedUnits.sidebar}x Sidebar
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Anchor & Vignette:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      Anchor: {adSenseInputs.selectedUnits.anchorAd ? "On" : "Off"} | Vignette: {adSenseInputs.selectedUnits.vignetteAd ? "On" : "Off"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">AdBlock Loss Rate:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{adSenseInputs.adBlockerRate}%</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Viewability Rate:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{adSenseInputs.viewabilityRate}%</span>
                  </div>
                </div>
              </div>
            ) : (
              /* AdMob User Options */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 font-mono">
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase flex items-center gap-1.5 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    <Smartphone className="w-3 h-3 text-emerald-500" />
                    <span>Audience & Platforms</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Target Location:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{getCountryName(adMobInputs.targetCountry)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Account Country:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{getCountryName(adMobInputs.accountCountry)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Platform Split:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {adMobInputs.platformSplit?.android ?? 70}% Android / {adMobInputs.platformSplit?.ios ?? 30}% iOS
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Daily Active Users:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(adMobInputs.dau)} DAU</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Traffic Tiers:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      T1: {adMobInputs.geoDistribution.tier1}% | T2: {adMobInputs.geoDistribution.tier2}% | T3: {adMobInputs.geoDistribution.tier3}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 font-mono">
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase flex items-center gap-1.5 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    <Layers className="w-3 h-3 text-emerald-500" />
                    <span>Ad Formats & Engagement</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Sessions & Duration:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adMobInputs.sessionsPerUserPerDay}x / day ({adMobInputs.sessionDurationMinutes}m)
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Fill Rate & Mediation:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adMobInputs.fillRate}% | {adMobInputs.hasMediation ? "Mediation (+25%)" : "Direct"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Rewarded Video:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adMobInputs.adFormats.rewardedVideo.enabled ? `${adMobInputs.adFormats.rewardedVideo.impressionsPerUserPerDay}x/day` : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Interstitial Ads:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {adMobInputs.adFormats.interstitial.enabled ? `${adMobInputs.adFormats.interstitial.impressionsPerUserPerSession}x/session` : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">Banner & App Open:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      Banner: {adMobInputs.adFormats.banner.enabled ? `${adMobInputs.adFormats.banner.refreshIntervalSeconds}s` : "Off"} | Open: {adMobInputs.adFormats.appOpen.enabled ? `${adMobInputs.adFormats.appOpen.impressionsPerUserPerDay}x` : "Off"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ad Format Revenue Breakdown Table */}
          <div className="space-y-2">
            <div className="font-mono text-xs font-bold uppercase text-neutral-900 dark:text-white">
              Revenue Breakdown by Format / Unit
            </div>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden font-mono">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <th className="p-2.5">Ad Format / Unit</th>
                    <th className="p-2.5 text-right">Monthly Revenue</th>
                    <th className="p-2.5 text-right">Revenue Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
                  {breakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                      <td className="p-2.5 font-medium text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{item.name}</span>
                      </td>
                      <td className="p-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(item.revenue, currency)}
                      </td>
                      <td className="p-2.5 text-right text-neutral-500">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 sm:p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 shrink-0">
          <div className="text-xs text-neutral-500 font-mono">
            Full parameter audit included in CSV and printable PDF
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
