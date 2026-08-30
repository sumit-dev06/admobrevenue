import React from "react";
import { CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import {
  Smartphone,
  Globe,
  Moon,
  Sun,
  Download,
  Share2,
  Code2,
} from "lucide-react";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenEmbed: () => void;
  onOpenExport: () => void;
  onShare: () => void;
  activePlatform: "admob" | "adsense";
  onPlatformChange: (p: "admob" | "adsense") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  isDarkMode,
  onToggleTheme,
  onOpenEmbed,
  onOpenExport,
  onShare,
  activePlatform,
  onPlatformChange,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => onPlatformChange("admob")}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-black text-sm flex items-center justify-center border border-dashed border-neutral-700 dark:border-neutral-300">
              $
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base tracking-tight text-neutral-950 dark:text-white font-mono">
                admob<span className="text-emerald-500">revenue</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono uppercase rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-500">
                2026 Engine
              </span>
            </div>
          </div>

          {/* Dedicated 2-Page Nav Switcher */}
          <nav className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-1 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs font-mono">
            <button
              onClick={() => onPlatformChange("admob")}
              className={
                "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all " +
                (activePlatform === "admob"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white")
              }
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span>AdMob (Apps)</span>
            </button>
            <button
              onClick={() => onPlatformChange("adsense")}
              className={
                "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all " +
                (activePlatform === "adsense"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white")
              }
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>AdSense (Web)</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent border border-dashed border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs font-mono font-semibold rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-white dark:bg-neutral-900">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>

            {/* Share */}
            <button
              onClick={onShare}
              className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-dashed border-neutral-300 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Export */}
            <button
              onClick={onOpenExport}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-950 border border-dashed border-neutral-700 dark:border-neutral-300 rounded-lg hover:bg-neutral-800 dark:hover:bg-white transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-dashed border-neutral-300 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
