import React from "react";
import { CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import { ThemeToggle } from "./ThemeToggle";
import {
  Smartphone,
  Globe,
  Download,
  Share2,
} from "lucide-react";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  onOpenEmbed: () => void;
  onOpenExport: () => void;
  onShare: () => void;
  activePlatform: string;
  onPlatformChange: (p: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenExport,
  onShare,
  activePlatform,
  onPlatformChange,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14 gap-2">
          {/* Brand Logo */}
          <button
            type="button"
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer select-none shrink-0 text-left bg-transparent border-0 p-0"
            onClick={() => onPlatformChange("admob")}
            aria-label="AdMobRevenue Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-black text-xs sm:text-sm flex items-center justify-center border border-dashed border-neutral-700 dark:border-neutral-300">
              $
            </div>
            <span className="hidden md:inline font-bold text-sm sm:text-base tracking-tight text-neutral-950 dark:text-white font-mono">
              admob<span className="text-emerald-500">revenue</span>
            </span>
          </button>

          {/* 2-Page Mode Switcher */}
          <nav aria-label="Platform navigation" className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 sm:p-1 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs font-mono shrink min-w-0">
            <button
              type="button"
              onClick={() => onPlatformChange("admob")}
              className={
                "flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all text-[11px] sm:text-xs truncate " +
                (activePlatform === "admob"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white")
              }
              aria-label="Switch to Google AdMob App Calculator"
              title="AdMob App Calculator"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
              <span>AdMob</span>
            </button>
            <button
              type="button"
              onClick={() => onPlatformChange("adsense")}
              className={
                "flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all text-[11px] sm:text-xs truncate " +
                (activePlatform === "adsense"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white")
              }
              aria-label="Switch to Google AdSense Website Calculator"
              title="AdSense Website Calculator"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" aria-hidden="true" />
              <span>AdSense</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Currency Selector */}
            <select
              id="navbar-currency-select"
              aria-label="Select currency"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent border border-dashed border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-[11px] sm:text-xs font-mono font-semibold rounded-lg px-1.5 sm:px-2 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>

            {/* Share */}
            <button
              type="button"
              onClick={onShare}
              className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-dashed border-neutral-300 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Share Calculator Link"
              title="Share Link"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Export (Desktop) */}
            <button
              type="button"
              onClick={onOpenExport}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-950 border border-dashed border-neutral-700 dark:border-neutral-300 rounded-lg hover:bg-neutral-800 dark:hover:bg-white transition-all cursor-pointer"
              aria-label="Export monetization report"
            >
              <Download className="w-3 h-3" aria-hidden="true" />
              <span>Export</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
