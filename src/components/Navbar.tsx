import React, { useState, useRef, useEffect } from "react";
import { CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "../i18n/LanguageContext";
import { SupportedLanguage } from "../i18n/types";
import {
  Share2,
  Download,
  Languages,
  ChevronDown,
} from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  TikTokIcon,
  YouTubeIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";

interface NavbarProps {
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  onOpenEmbed: () => void;
  onOpenExport: () => void;
  onShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePlatform,
  onPlatformChange,
  currentCurrency,
  onCurrencyChange,
  onOpenExport,
  onOpenEmbed,
  onShare,
}) => {
  const { language, setLanguage, supportedLanguages, t } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  const platforms = [
    { id: "admob", label: t.nav.admobTab || "AdMob", icon: AdMobIcon, iconColor: "text-emerald-500" },
    { id: "adsense", label: t.nav.adsenseTab || "AdSense", icon: AdSenseIcon, iconColor: "text-blue-500" },
    { id: "youtube", label: "YouTube", icon: YouTubeIcon, iconColor: "text-red-500" },
    { id: "tiktok", label: "TikTok", icon: TikTokIcon, iconColor: "text-cyan-500" },
    { id: "twitch", label: "Twitch", icon: TwitchIcon, iconColor: "text-purple-500" },
    { id: "kick", label: "Kick", icon: KickIcon, iconColor: "text-emerald-400" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14 gap-2 sm:gap-4">
          {/* Left: Brand Logo */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer select-none shrink-0 text-left bg-transparent border-0 p-0"
            onClick={() => onPlatformChange("admob")}
            aria-label="AdMobRevenue Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-black text-xs sm:text-sm flex items-center justify-center border border-dashed border-neutral-700 dark:border-neutral-300 shadow-xs">
              $
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-neutral-950 dark:text-white font-mono hidden sm:inline">
              admob<span className="text-emerald-500">revenue</span>
            </span>
          </button>

          {/* Center: Platform Navigation Tabs */}
          <nav
            aria-label="Platform navigation"
            className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 sm:p-1 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 text-xs font-mono overflow-x-auto no-scrollbar max-w-[55vw] sm:max-w-none shadow-2xs"
          >
            {platforms.map((p) => {
              const Icon = p.icon;
              const isActive = activePlatform === p.id;
              const href = p.id === "admob" ? "/" : `/${p.id}`;
              return (
                <a
                  key={p.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onPlatformChange(p.id);
                  }}
                  className={
                    "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-all text-[11px] sm:text-xs font-mono whitespace-nowrap cursor-pointer select-none no-underline " +
                    (isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-medium")
                  }
                  aria-label={`Switch to ${p.label} Calculator`}
                  title={`${p.label} Revenue Calculator`}
                >
                  <Icon className={`w-3.5 h-3.5 ${p.iconColor} shrink-0`} aria-hidden="true" />
                  <span>{p.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] sm:text-xs font-mono font-semibold rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shadow-2xs"
                aria-label={`Select language. Current language: ${currentLang.nativeName}`}
                aria-expanded={langMenuOpen}
              >
                <span className="text-sm leading-none shrink-0">{currentLang.flag}</span>
                <span className="hidden md:inline font-bold">{currentLang.nativeName}</span>
                <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform shrink-0 ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-1.5 z-[100] animate-in fade-in slide-in-from-top-2 duration-150 font-mono text-xs ring-1 ring-black/5 dark:ring-white/10">
                  <div className="px-3 py-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider border-b border-dashed border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t.nav.language}</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
                    {supportedLanguages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code as SupportedLanguage);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer rounded-lg mx-auto ${
                          language === l.code
                            ? "bg-neutral-100 dark:bg-neutral-800 font-bold text-emerald-600 dark:text-emerald-400"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{l.flag}</span>
                          <span>{l.nativeName}</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase font-mono">
                          {l.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <select
              id="navbar-currency-select"
              aria-label="Select currency"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-neutral-50/80 dark:bg-neutral-900/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-[11px] sm:text-xs font-mono font-semibold rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>

            {/* Share (Desktop & Tablet) */}
            <button
              type="button"
              onClick={onShare}
              className="hidden sm:flex p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer bg-neutral-50/80 dark:bg-neutral-900/80 shadow-2xs"
              aria-label={t.nav.share}
              title={t.nav.share}
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Export (Desktop) */}
            <button
              type="button"
              onClick={onOpenExport}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-950 border border-dashed border-neutral-700 dark:border-neutral-300 rounded-lg hover:bg-neutral-800 dark:hover:bg-white transition-all cursor-pointer shadow-2xs"
              aria-label={t.nav.export}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.nav.export}</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
