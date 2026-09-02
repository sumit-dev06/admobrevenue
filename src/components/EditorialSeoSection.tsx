import React from "react";
import { FileText, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
} from "./PlatformIcons";
import { useTranslation } from "../i18n/LanguageContext";

export const EditorialSeoSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-8 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-8 text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            2026 Complete Monetization & Creator Revenue Industry Report
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
          Updated September 2026
        </span>
      </div>

      <div className="space-y-8">
        {/* Main Introduction */}
        <div>
          <h2 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Creator Economy & Digital Publishing Revenue Benchmarks 2026
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            Whether you are calculating earnings as a YouTube creator, TikTok influencer, Twitch streamer, Kick broadcaster, mobile app developer on Google AdMob, or digital publisher on Google AdSense, monetization accuracy requires factoring in <strong>geographic traffic tiers, niche-specific advertiser budgets, audience engagement length, and platform payout splits</strong>.
          </p>
        </div>

        {/* 6 In-Depth Platform Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. YouTube Ad Revenue Calculator Article */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <YouTubeIcon className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                YouTube Ad Revenue Calculator & Video RPM Dynamics
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Using an accurate <strong>YouTube ad revenue calculator</strong> requires understanding the difference between <em>CPM (Cost Per Mille)</em> paid by advertisers and <em>RPM (Revenue Per Mille)</em> received by creators after YouTube's 45% revenue share. In 2026, videos exceeding 8 minutes unlock mid-roll ad placements, lifting channel RPM by <strong>+35% to +50%</strong>. Channels targeting high-value niches (Personal Finance, SaaS, Real Estate) in Tier 1 countries (US, UK, Canada, Australia) earn $12.00–$35.00+ RPMs, while entertainment and gaming average $2.00–$6.00 RPMs.
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              🔑 Key Terms: YouTube RPM calculator, YouTube money calculator, Shorts creator pool.
            </div>
          </section>

          {/* 2. TikTok Money Calculator Article */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <TikTokIcon className="w-4 h-4 text-cyan-500" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                TikTok Money Calculator & Creator Rewards Program
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Our <strong>TikTok money calculator</strong> models the 2026 TikTok Creator Rewards Program (replacing the legacy Creator Fund). Payouts strictly require original videos <strong>longer than 1 minute</strong> and are calculated solely on <em>qualified views</em> (viewers watching for at least 5 seconds from the "For You" feed). Effective RPMs range between $0.40 and $1.20 per 1,000 qualified views. Additionally, LIVE stream virtual gifts convert into Diamonds at $0.005 per Diamond with a 50% net creator payout.
            </p>
            <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
              🔑 Key Terms: TikTok money calculator, TikTok creator rewards, TikTok diamond to USD.
            </div>
          </section>

          {/* 3. Twitch Money & Ad Revenue Calculators */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <TwitchIcon className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Twitch Money Calculators & Twitch Ad Revenue Calculators
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Professional streamers utilize <strong>Twitch money calculators</strong> and <strong>Twitch ad revenue calculators</strong> to project monthly earnings across Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99) subscriptions. Under the Partner Plus program, qualifying streamers earn elevated <strong>60/40 or 70/30 revenue splits</strong> instead of the standard 50/50 baseline. The Twitch Ad Incentive Program (AIP) adds reliable in-stream ad revenue ($3.50–$6.00 eCPM per viewer-hour) when running 2–3 minutes of ad breaks per hour.
            </p>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
              🔑 Key Terms: Twitch money calculators, Twitch ad revenue calculators, Partner Plus.
            </div>
          </section>

          {/* 4. Kick Earnings Calculator Article */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <KickIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Kick Earnings Calculator: 95/5 Split & KCP Hourly Rates
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Our <strong>Kick earnings calculator</strong> reveals why thousands of creators are transitioning to Kick. With its groundbreaking <strong>95/5 subscription revenue split</strong>, creators keep $4.74 of every $4.99 subscription (compared to Twitch's $2.49 baseline). Furthermore, the KICK Creator Program (KCP) provides eligible streamers with hourly stipends ranging from $16.00 to $40.00+ per broadcast hour based on Average Concurrent Viewers (CCV), plus 100% net crypto tipping.
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              🔑 Key Terms: Kick earnings calculator, Kick sub split 95 5, KCP hourly stipend.
            </div>
          </section>

          {/* 5. Google AdSense Revenue Calculator Article */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <AdSenseIcon className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Google AdSense Revenue Calculator & Page RPM Optimization
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              A comprehensive <strong>Google AdSense revenue calculator</strong> computes website income using Page RPM (Revenue Per 1,000 Pageviews). In 2026, AdSense operates on a pure per-impression (CPM) model, where Active View viewability percentage is paramount. Websites maintaining &gt;70% viewability with 2–3 high-performing responsive units (Sticky Sidebar 300x600, In-Article Responsive, Anchor Leaderboards) earn 2x to 3x higher programmatic bids from Google Ad Manager advertisers.
            </p>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
              🔑 Key Terms: Google AdSense revenue calculator, website ad revenue calculator, Page RPM.
            </div>
          </section>

          {/* 6. Google AdMob Revenue Calculator Article */}
          <section className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <AdMobIcon className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Google AdMob Revenue Calculator & App ARPDAU Forecaster
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Mobile app developers utilize our <strong>Google AdMob revenue calculator</strong> to project daily and annual revenue based on Daily Active Users (DAU), impression frequency, and ad format mix. High-intent formats like Rewarded Video ($18–$35 eCPM in Tier 1) and Rewarded Interstitials maximize user engagement without disrupting retention. Implementing open bidding with Google AdMob Mediation generates an additional <strong>+25% to +35% revenue lift</strong>.
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              🔑 Key Terms: Google AdMob revenue calculator, app ad revenue calculator, ARPDAU.
            </div>
          </section>
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
    </article>
  );
};
