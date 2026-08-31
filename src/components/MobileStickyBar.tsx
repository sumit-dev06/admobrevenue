import React, { useState } from "react";
import { CurrencyCode, PlatformMode } from "../types";
import { formatCurrency } from "../utils/currency";
import { useTranslation } from "../i18n/LanguageContext";
import {
  Share2,
  Download,
  Code2,
  ChevronUp,
  X,
} from "lucide-react";

interface MobileStickyBarProps {
  activeMode: PlatformMode;
  currency: CurrencyCode;
  monthlyRevenue: number;
  rateLabel: string;
  rateValue: string;
  onOpenExport: () => void;
  onOpenEmbed: () => void;
  onShare: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currency,
  monthlyRevenue,
  rateLabel,
  rateValue,
  onOpenExport,
  onOpenEmbed,
  onShare,
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Quick Drawer */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {isMenuOpen && (
        <div className="fixed bottom-16 left-3 right-3 z-50 p-4 bg-white dark:bg-neutral-950 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-2xl shadow-2xl space-y-3 lg:hidden">
          <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <span className="text-neutral-600 dark:text-neutral-400">Actions</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close action menu"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onShare();
              }}
              aria-label="Share Calculator Link"
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
              <span>{t.nav.share}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenExport();
              }}
              aria-label="Export monetization report"
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>{t.nav.export}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenEmbed();
              }}
              aria-label="Embed Calculator Widget"
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-purple-500" aria-hidden="true" />
              <span>Embed</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Sticky Bar */}
      <div className="fixed bottom-2 left-2 right-2 z-40 lg:hidden">
        <div className="flex items-center justify-between bg-white/95 dark:bg-neutral-950/95 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div>
              <div className="text-[9px] text-neutral-600 dark:text-neutral-400 font-mono uppercase">{t.summary.monthlyRunRate}</div>
              <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(monthlyRevenue, currency)}
              </div>
            </div>
            <div className="h-5 w-px border-r border-dashed border-neutral-200 dark:border-neutral-800" />
            <div className="text-[10px] font-mono">
              <span className="text-neutral-600 dark:text-neutral-400">{rateLabel}: </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-300">{rateValue}</span>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle mobile action options"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>Options</span>
            <ChevronUp className={"w-3 h-3 transition-transform " + (isMenuOpen ? "rotate-180" : "")} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};
