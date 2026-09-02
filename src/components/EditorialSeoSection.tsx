import React, { useState } from "react";
import { FileText, TrendingUp, ChevronDown } from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";

export const EditorialSeoSection: React.FC = () => {
  // Master container open state
  const [isOpen, setIsOpen] = useState(false);
  // Mobile accordion active item index
  const [activeMobileItem, setActiveMobileItem] = useState<number | null>(null);

  const articles = [
    {
      icon: YouTubeIcon,
      color: "text-red-500",
      title: "YouTube Ad Revenue Calculator & Video RPM Dynamics",
      content:
        "Using an accurate YouTube ad revenue calculator requires understanding the difference between CPM (Cost Per Mille) paid by advertisers and RPM (Revenue Per Mille) received by creators after YouTube's 45% revenue share. In 2026, videos exceeding 8 minutes unlock mid-roll ad placements, lifting channel RPM by +35% to +50%. Channels targeting high-value niches (Personal Finance, SaaS, Real Estate) in Tier 1 countries (US, UK, Canada, Australia) earn $12.00–$35.00+ RPMs, while entertainment and gaming average $2.00–$6.00 RPMs.",
      keywords: "🔑 Key Terms: YouTube RPM calculator, YouTube money calculator, Shorts creator pool.",
    },
    {
      icon: TikTokIcon,
      color: "text-cyan-500",
      title: "TikTok Money Calculator & Creator Rewards Program",
      content:
        "Our TikTok money calculator models the 2026 TikTok Creator Rewards Program (replacing the legacy Creator Fund). Payouts strictly require original videos longer than 1 minute and are calculated solely on qualified views (viewers watching for at least 5 seconds from the 'For You' feed). Effective RPMs range between $0.40 and $1.20 per 1,000 qualified views. Additionally, LIVE stream virtual gifts convert into Diamonds at $0.005 per Diamond with a 50% net creator payout.",
      keywords: "🔑 Key Terms: TikTok money calculator, TikTok creator rewards, TikTok diamond to USD.",
    },
    {
      icon: TwitchIcon,
      color: "text-purple-500",
      title: "Twitch Money Calculators & Twitch Ad Revenue Calculators",
      content:
        "Professional streamers utilize Twitch money calculators and Twitch ad revenue calculators to project monthly earnings across Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99) subscriptions. Under the Partner Plus program, qualifying streamers earn elevated 60/40 or 70/30 revenue splits instead of the standard 50/50 baseline. The Twitch Ad Incentive Program (AIP) adds reliable in-stream ad revenue ($3.50–$6.00 eCPM per viewer-hour) when running 2–3 minutes of ad breaks per hour.",
      keywords: "🔑 Key Terms: Twitch money calculators, Twitch ad revenue calculators, Partner Plus.",
    },
    {
      icon: KickIcon,
      color: "text-emerald-400",
      title: "Kick Earnings Calculator: 95/5 Split & KCP Hourly Rates",
      content:
        "Our Kick earnings calculator reveals why thousands of creators are transitioning to Kick. With its groundbreaking 95/5 subscription revenue split, creators keep $4.74 of every $4.99 subscription (compared to Twitch's $2.49 baseline). Furthermore, the KICK Creator Program (KCP) provides eligible streamers with hourly stipends ranging from $16.00 to $40.00+ per broadcast hour based on Average Concurrent Viewers (CCV), plus 100% net crypto tipping.",
      keywords: "🔑 Key Terms: Kick earnings calculator, Kick sub split 95 5, KCP hourly stipend.",
    },
    {
      icon: AdSenseIcon,
      color: "text-blue-500",
      title: "Google AdSense Revenue Calculator & Page RPM Optimization",
      content:
        "A comprehensive Google AdSense revenue calculator computes website income using Page RPM (Revenue Per 1,000 Pageviews). In 2026, AdSense operates on a pure per-impression (CPM) model, where Active View viewability percentage is paramount. Websites maintaining >70% viewability with 2–3 high-performing responsive units (Sticky Sidebar 300x600, In-Article Responsive, Anchor Leaderboards) earn 2x to 3x higher programmatic bids from Google Ad Manager advertisers.",
      keywords: "🔑 Key Terms: Google AdSense revenue calculator, website ad revenue calculator, Page RPM.",
    },
    {
      icon: AdMobIcon,
      color: "text-emerald-500",
      title: "Google AdMob Revenue Calculator & App ARPDAU Forecaster",
      content:
        "Mobile app developers utilize our Google AdMob revenue calculator to project daily and annual revenue based on Daily Active Users (DAU), impression frequency, and ad format mix. High-intent formats like Rewarded Video ($18–$35 eCPM in Tier 1) and Rewarded Interstitials maximize user engagement without disrupting retention. Implementing open bidding with Google AdMob Mediation generates an additional +25% to +35% revenue lift.",
      keywords: "🔑 Key Terms: Google AdMob revenue calculator, app ad revenue calculator, ARPDAU.",
    },
  ];

  const toggleMobileItem = (index: number) => {
    setActiveMobileItem(activeMobileItem === index ? null : index);
  };

  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono transition-all overflow-hidden shadow-2xs">
      {/* Clickable Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <FileText className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 dark:text-white truncate">
                2026 Complete Monetization & Creator Revenue Industry Report
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase font-mono">
                Report
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {isOpen ? "Click to collapse industry report" : "In-depth benchmarks across YouTube, TikTok, Twitch, Kick, AdSense & AdMob (Click to expand)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
          <span className="hidden sm:inline">{isOpen ? "Hide Report" : "Show Report"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-500" : "text-neutral-400"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 sm:p-8 pt-0 sm:pt-0 space-y-6 sm:space-y-8 border-t border-dashed border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          {/* Main Introduction */}
          <div className="pt-4 sm:pt-5">
            <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
              Creator Economy & Digital Publishing Revenue Benchmarks 2026
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
              Whether you are calculating earnings as a YouTube creator, TikTok influencer, Twitch streamer, Kick broadcaster, mobile app developer on Google AdMob, or digital publisher on Google AdSense, monetization accuracy requires factoring in <strong>geographic traffic tiers, niche-specific advertiser budgets, audience engagement length, and platform payout splits</strong>.
            </p>
          </div>

          {/* 1. Mobile-Only Dropdown Accordions (Phone Only) */}
          <div className="space-y-2 md:hidden">
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pb-1">
              Select platform report to view:
            </div>
            {articles.map((item, idx) => {
              const Icon = item.icon;
              const isExpanded = activeMobileItem === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileItem(idx)}
                    aria-expanded={isExpanded}
                    className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left cursor-pointer hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                      <span className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-emerald-500" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-3.5 pt-0 space-y-2.5 border-t border-dashed border-neutral-100 dark:border-neutral-800/60 animate-in fade-in duration-150">
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed pt-2.5">
                        {item.content}
                      </p>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.keywords}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 2. Desktop Grid View (md: and above) */}
          <div className="hidden md:grid md:grid-cols-2 gap-5">
            {articles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <section
                  key={idx}
                  className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                    {item.content}
                  </p>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.keywords}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Core Calculation Formulas Reference Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-xs uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <h3>Standard 2026 Monetization Mathematics</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              All 6 digital monetization calculators in our engine use standard, verified industry equations:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                  1. Web & Video RPM
                </span>
                <p className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold text-[11px]">
                  RPM = (Earnings / Views) × 1,000
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  2. Mobile App ARPDAU
                </span>
                <p className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold text-[11px]">
                  ARPDAU = Daily Revenue / DAU
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">
                  3. Stream Sub Net
                </span>
                <p className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold text-[11px]">
                  Net = Subs × $4.99 × Split %
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
