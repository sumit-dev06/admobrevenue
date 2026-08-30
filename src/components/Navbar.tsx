import React from "react";
import { CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import {
  Globe,
  Smartphone,
  Layers,
  Target,
  GitCompare,
  BarChart3,
  Moon,
  Sun,
  Code2,
  Download,
  Share2,
} from "lucide-react";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenEmbed: () => void;
  onOpenExport: () => void;
  onShare: () => void;
  activePlatform: string;
  onPlatformChange: (p: any) => void;
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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onPlatformChange("adsense")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-black text-xl tracking-tight">
              $
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-neutral-900 dark:text-neutral-50 tracking-tight">
                  AdRev<span className="text-emerald-500">Pro</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  2026 Engine
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                AdSense & AdMob Precision Revenue Calculator
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <button
              onClick={() => onPlatformChange("adsense")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "adsense" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              AdSense
            </button>
            <button
              onClick={() => onPlatformChange("admob")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "admob" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              AdMob
            </button>
            <button
              onClick={() => onPlatformChange("portfolio")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "portfolio" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              Portfolio
            </button>
            <button
              onClick={() => onPlatformChange("goal")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "goal" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <Target className="w-3.5 h-3.5 text-purple-500" />
              Target Goal
            </button>
            <button
              onClick={() => onPlatformChange("compare")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "compare" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <GitCompare className="w-3.5 h-3.5 text-rose-500" />
              A/B Test
            </button>
            <button
              onClick={() => onPlatformChange("benchmarks")}
              className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all " + (activePlatform === "benchmarks" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold" : "hover:text-neutral-900 dark:hover:text-white")}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-500" />
              Benchmarks
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              title="Select Display Currency"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>

            {/* Share */}
            <button
              onClick={onShare}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors"
              title="Share Calculation"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Embed */}
            <button
              onClick={onOpenEmbed}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Embed</span>
            </button>

            {/* Export */}
            <button
              onClick={onOpenExport}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
