import React, { useRef, useEffect } from "react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";
import { useTranslation } from "../i18n/LanguageContext";

interface PlatformSwitcherProps {
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
}

export const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({
  activePlatform,
  onPlatformChange,
}) => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const platforms = [
    {
      id: "admob",
      label: t.nav.admobTab || "AdMob",
      icon: AdMobIcon,
      activeColor: "bg-emerald-600 text-white shadow-emerald-500/20",
      iconColor: "text-emerald-500",
      activeIconColor: "text-white",
      tag: "Apps",
    },
    {
      id: "adsense",
      label: t.nav.adsenseTab || "AdSense",
      icon: AdSenseIcon,
      activeColor: "bg-blue-600 text-white shadow-blue-500/20",
      iconColor: "text-blue-500",
      activeIconColor: "text-white",
      tag: "Websites",
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: YouTubeIcon,
      activeColor: "bg-red-600 text-white shadow-red-500/20",
      iconColor: "text-red-500",
      activeIconColor: "text-white",
      tag: "Videos",
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: TikTokIcon,
      activeColor: "bg-cyan-600 text-white shadow-cyan-500/20",
      iconColor: "text-cyan-500",
      activeIconColor: "text-white",
      tag: "Shorts",
    },
    {
      id: "twitch",
      label: "Twitch",
      icon: TwitchIcon,
      activeColor: "bg-purple-600 text-white shadow-purple-500/20",
      iconColor: "text-purple-500",
      activeIconColor: "text-white",
      tag: "Streams",
    },
    {
      id: "kick",
      label: "Kick",
      icon: KickIcon,
      activeColor: "bg-emerald-500 text-neutral-950 shadow-emerald-500/20 font-black",
      iconColor: "text-emerald-400",
      activeIconColor: "text-neutral-950",
      tag: "95/5",
    },
  ];

  const isInitialMount = useRef(true);

  // Auto-scroll active platform into view on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(`[data-platform="${activePlatform}"]`);
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: isInitialMount.current ? "auto" : "smooth",
        });
        isInitialMount.current = false;
      }
    }
  }, [activePlatform]);

  return (
    <div className="w-full border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-900/60 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 py-2 sm:py-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="tablist"
          aria-label="Platform Calculators"
        >
          {platforms.map((p) => {
            const Icon = p.icon;
            const isActive = activePlatform === p.id;
            const href = p.id === "admob" ? "/" : `/${p.id}`;

            return (
              <a
                key={p.id}
                href={href}
                data-platform={p.id}
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  onPlatformChange(p.id);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 select-none shrink-0 snap-center no-underline cursor-pointer border min-h-[42px] sm:min-h-[38px] touch-manipulation ${
                  isActive
                    ? `${p.activeColor} border-transparent shadow-md scale-[1.02]`
                    : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 shadow-2xs"
                }`}
                aria-label={`Switch to ${p.label} Calculator`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? `${p.activeIconColor} scale-110` : p.iconColor
                  }`}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm font-extrabold">{p.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                    isActive
                      ? "bg-black/20 text-white/90"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {p.tag}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
