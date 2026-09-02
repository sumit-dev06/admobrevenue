import React from "react";
import { Calculator } from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";
import { useTranslation } from "../i18n/LanguageContext";

export const FormulaDeepDive: React.FC = () => {
  const { t } = useTranslation();

  const formulaCards = [
    {
      platform: "AdSense",
      title: "Google AdSense Page RPM",
      icon: AdSenseIcon,
      color: "text-blue-500",
      formula: "Page RPM = (Estimated Earnings / Pageviews) × 1,000",
      desc: "Measures gross earnings generated for every 1,000 pageviews across all ad units. Affected by geographic tier, niche CPM bidding, and Active View viewability %.",
      example: "100,000 views in Finance ($18 base RPM, 1.2x US tier) = $2,160/mo",
    },
    {
      platform: "AdMob",
      title: "Google AdMob ARPDAU & eCPM",
      icon: AdMobIcon,
      color: "text-emerald-500",
      formula: "ARPDAU = Daily Ad Revenue / Daily Active Users (DAU)",
      desc: "ARPDAU tracks monetization density per user. Combined with format eCPMs (Rewarded Video, Interstitial, App Open) and waterfall mediation lift.",
      example: "25,000 DAU with 4 ad impressions/user at $14 eCPM = $1,400/day ($0.056 ARPDAU)",
    },
    {
      platform: "YouTube",
      title: "YouTube Video RPM & Shorts Pool",
      icon: YouTubeIcon,
      color: "text-red-500",
      formula: "Gross YPP = ((Long-form Views / 1,000) × RPM) + ((Shorts Views / 1,000) × Shorts RPM)",
      desc: "Calculates net creator earnings after YouTube's 45% cut on long-form video (creator gets 55%) and 55% cut on Shorts (creator gets 45%). Mid-rolls on videos >8m add +45% lift.",
      example: "500,000 long-form views ($6.50 RPM) + 2M Shorts ($0.06 RPM) = $3,370/mo",
    },
    {
      platform: "TikTok",
      title: "TikTok Creator Rewards & Gifts",
      icon: TikTokIcon,
      color: "text-cyan-500",
      formula: "Creator Rewards = (Qualified Views / 1,000) × Base RPM × Engagement Multiplier",
      desc: "Qualified views must exceed 5 seconds in the 'For You' feed on original videos >1 minute. LIVE gift diamonds convert at $0.005/diamond (50% net creator payout).",
      example: "1,000,000 total views (45% qualified = 450k) at $0.80 RPM = $360 + LIVE gifts",
    },
    {
      platform: "Twitch",
      title: "Twitch Subscriptions & AIP Ad Pay",
      icon: TwitchIcon,
      color: "text-purple-500",
      formula: "Sub Pay = (T1 × $4.99 + T2 × $9.99 + T3 × $24.99) × Split Rate (50%–70%)",
      desc: "Twitch Partner Plus tiers unlock 60/40 (100 Plus Points) and 70/30 (350 Plus Points) revenue splits. Ad Incentive Program (AIP) pays ~$4.50 eCPM per CCV hour.",
      example: "200 Tier 1 subs (70/30 split = $3.49/sub) + 80 hrs at 100 CCV AIP ads = $1,058/mo",
    },
    {
      platform: "Kick",
      title: "Kick 95/5 Split & KCP Hourly Rate",
      icon: KickIcon,
      color: "text-emerald-400",
      formula: "Kick Net = (Active Subs × $4.99 × 0.95) + (Stream Hours × KCP Hourly Rate) + Direct Tips",
      desc: "Kick pays creators 95% of subscription revenue ($4.74 net per $4.99 sub). The KICK Creator Program (KCP) provides hourly stipends ($16–$40/hr) based on average CCV.",
      example: "200 active subs ($948 net) + 80 stream hrs at 100 CCV ($24/hr KCP = $1,920) = $2,868/mo",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-7 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-6 text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <h2 className="text-sm font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Monetization Mathematical Formulas & Calculations
          </h2>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
          Exact 2026 Algorithms
        </span>
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
        Understand the exact mathematical equations used across major advertising networks and streaming platforms to calculate net creator take-home pay, RPM, eCPM, and revenue splits.
      </p>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formulaCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconComponent className={`w-4 h-4 ${card.color}`} />
                  <span className="font-bold text-neutral-900 dark:text-white text-xs">
                    {card.title}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-950 font-mono text-[11px] text-neutral-900 dark:text-neutral-100 font-semibold border border-dashed border-neutral-200 dark:border-neutral-800">
                  {card.formula}
                </div>

                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  📌 Example: {card.example}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
