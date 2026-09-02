import React, { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";

export const ComprehensiveGuide = React.memo(() => {
  // Master container toggle
  const [isOpen, setIsOpen] = useState(false);
  // Mobile accordion active item index
  const [activeMobileItem, setActiveMobileItem] = useState<number | null>(null);

  const platformGuides = [
    {
      id: "admob",
      title: "Google AdMob Mobile App Monetization",
      icon: AdMobIcon,
      iconColor: "text-emerald-500",
      badge: "Mobile Apps & Games",
      description:
        "AdMob monetization is driven by Daily Active Users (DAU), impression frequency, and ad formats. Rewarded Video and Rewarded Interstitials command highest eCPMs ($18–$35 in Tier 1 countries), while App Open ads monetize session starts. Implementing mediation waterfalls or real-time bidding (AppLovin MAX, Unity) lifts gross yield by 20%–35%.",
      keyMetrics: ["ARPDAU: $0.02 – $0.15+", "Rewarded eCPM: $15 – $35+", "Mediation Lift: +30%"],
    },
    {
      id: "adsense",
      title: "Google AdSense Website & Content Publishing",
      icon: AdSenseIcon,
      iconColor: "text-blue-500",
      badge: "Websites & Blogs",
      description:
        "AdSense website revenue hinges on Page RPM (Revenue Per 1,000 pageviews) and Active View viewability. Niches like Finance, Technology, and Legal command $15–$45+ RPMs in Tier 1 regions (US, UK, CA, NO, DE). Maintaining above 70% viewability and 2–3 sticky responsive display ad units maximizes bidding competition.",
      keyMetrics: ["Page RPM: $2.50 – $38.50+", "Viewability Target: >70%", "Avg. Units: 2–4/page"],
    },
    {
      id: "youtube",
      title: "YouTube Video RPM & Shorts Creator Pool",
      icon: YouTubeIcon,
      iconColor: "text-red-500",
      badge: "Video & Shorts",
      description:
        "YouTube Partner Program (YPP) pays creators 55% of long-form ad revenue and 45% of allocated Shorts pool revenue. Videos longer than 8 minutes qualify for mid-roll ad placements (+40%–50% revenue boost). Direct fan funding through Channel Memberships ($4.99/mo, 70% net creator share) and SuperChats provides dependable recurring income.",
      keyMetrics: ["Long-form RPM: $2.00 – $22.00+", "Shorts RPM: $0.04 – $0.09", "Memberships: 70% Net"],
    },
    {
      id: "tiktok",
      title: "TikTok Creator Rewards & LIVE Diamonds",
      icon: TikTokIcon,
      iconColor: "text-cyan-500",
      badge: "Short Video & LIVE",
      description:
        "The TikTok Creator Rewards Program rewards original videos longer than 1 minute based on qualified views (watched >5s in the For You feed). LIVE stream monetization converts virtual gifts to Diamonds ($0.005 per Diamond, 50% net creator payout). TikTok Shop affiliate commissions add 10%–20% GMV earnings on product showcases.",
      keyMetrics: ["Qualified RPM: $0.40 – $1.10", "Diamond Payout: $0.005 (50% Net)", "Min Length: >1 Min"],
    },
    {
      id: "twitch",
      title: "Twitch Subscriptions & Ad Incentive Program",
      icon: TwitchIcon,
      iconColor: "text-purple-500",
      badge: "Live Streaming",
      description:
        "Twitch creators earn through Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99) subscriptions. The Partner Plus program offers elevated 60/40 (100 Plus Points) and 70/30 (350 Plus Points) splits. Twitch Ad Incentive Program (AIP) pays reliable hourly rates for running 2–3 minutes of in-stream ad breaks per hour, combined with Bits ($0.01/bit).",
      keyMetrics: ["Sub Splits: 50/50 to 70/30", "AIP eCPM: $3.50 – $6.00/hr", "Bits Net: $0.01/bit"],
    },
    {
      id: "kick",
      title: "Kick 95/5 Split & Creator Program (KCP)",
      icon: KickIcon,
      iconColor: "text-emerald-400",
      badge: "Next-Gen Streaming",
      description:
        "Kick provides a creator-friendly 95/5 subscription revenue split, netting streamers $4.74 per $4.99 Tier 1 subscription (nearly 2x Twitch's baseline $2.49). The KICK Creator Program (KCP) provides hourly wage stipends ($16–$40+/hr) based on average concurrent viewers (CCV), alongside 100% direct crypto tips via Stripe and cryptocurrency.",
      keyMetrics: ["Sub Payout: 95% ($4.74 net)", "KCP Hourly Pay: $16 – $40/hr", "Direct Tips: 100% Net"],
    },
  ];

  const toggleMobileItem = (index: number) => {
    setActiveMobileItem(activeMobileItem === index ? null : index);
  };

  return (
    <div id="comprehensive-guide" className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono transition-all overflow-hidden shadow-2xs">
      {/* Clickable Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 dark:text-white truncate">
                2026 In-Depth Publisher & Creator Monetization Guide
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase font-mono">
                Guide
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {isOpen ? "Click to collapse guide" : "Optimization blueprints for apps, sites, videos & streams (Click to expand)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
          <span className="hidden sm:inline">{isOpen ? "Hide Guide" : "Show Guide"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-500" : "text-neutral-400"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 sm:p-7 pt-0 sm:pt-0 space-y-5 sm:space-y-6 border-t border-dashed border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs pt-4">
            Whether you monetize mobile applications through <strong>Google AdMob</strong>, websites with <strong>Google AdSense</strong>, videos on <strong>YouTube</strong> and <strong>TikTok</strong>, or live streams on <strong>Twitch</strong> and <strong>Kick</strong>, revenue is dictated by audience tier, engagement depth, and format optimization. Explore our comprehensive platform breakdown below:
          </p>

          {/* 1. Mobile-Only Dropdown Accordions (Phone Only) */}
          <div className="space-y-2 md:hidden">
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pb-1">
              Select platform guide:
            </div>
            {platformGuides.map((guide, idx) => {
              const Icon = guide.icon;
              const isExpanded = activeMobileItem === idx;

              return (
                <div
                  key={guide.id}
                  className="rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileItem(idx)}
                    aria-expanded={isExpanded}
                    className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left cursor-pointer hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${guide.iconColor}`} />
                      <div className="truncate">
                        <span className="font-bold text-xs text-neutral-900 dark:text-white">
                          {guide.title}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-emerald-500" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-3.5 pt-0 space-y-2.5 border-t border-dashed border-neutral-100 dark:border-neutral-800/60 animate-in fade-in duration-150">
                      <span className="mt-2.5 inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                        {guide.badge}
                      </span>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-1.5">
                        {guide.keyMetrics.map((metric, mIdx) => (
                          <span
                            key={mIdx}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 2. Desktop Grid View (md: and above) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformGuides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <div
                  key={guide.id}
                  className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${guide.iconColor}`} />
                        <span className="font-bold text-neutral-900 dark:text-white text-xs">
                          {guide.title}
                        </span>
                      </div>
                    </div>
                    <span className="inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                      {guide.badge}
                    </span>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-1.5">
                    {guide.keyMetrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
