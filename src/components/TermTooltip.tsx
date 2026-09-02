import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, X, Lightbulb } from "lucide-react";

export interface TermDefinition {
  term: string;
  fullName: string;
  definition: string;
  formula?: string;
  tip?: string;
}

export const DEFINITIONS: Record<string, TermDefinition> = {
  // Mobile Ad Formats & Metrics
  rewardedVideo: {
    term: "Rewarded Video",
    fullName: "Rewarded Video Ad Format",
    definition: "An opt-in, full-screen video ad (15–30 seconds) where players or users willingly choose to watch in exchange for an in-app reward (e.g., extra lives, virtual coins, premium features, or unlockable content).",
    tip: "Commands the highest eCPMs in mobile monetization ($20–$45 in Tier 1 countries) with high retention.",
  },
  interstitial: {
    term: "Interstitial Ads",
    fullName: "Full-Screen Interstitial Ad",
    definition: "Full-screen static image, rich media, or playable video ads rendered during natural transition pauses in an app (e.g., between game levels, after completing a task, or during navigation).",
    tip: "Highest yield when placed at natural breaks so they don't interrupt active user workflows.",
  },
  appOpen: {
    term: "App Open Ads",
    fullName: "App Open Splash Ad Format",
    definition: "A special ad format designed specifically to monetize daily app opening moments or background-to-foreground resume transitions without disrupting active gameplay or utility use.",
    tip: "Generates reliable incremental daily income from cold app launches and returning sessions.",
  },
  rewardedInterstitial: {
    term: "Rewarded Interstitial",
    fullName: "Rewarded Interstitial Ad Format",
    definition: "A hybrid ad format that renders during natural transition breaks offering a reward without requiring a preceding opt-in prompt, allowing users to watch or skip.",
    tip: "Bridges the gap between standard interstitials and opt-in rewarded video.",
  },
  nativeAd: {
    term: "Native Advanced",
    fullName: "Native Advanced Ad Unit",
    definition: "Ad assets (headline, icon, image, call-to-action button) rendered through native UI components matching the exact look, feel, typography, and theme of your app interface.",
    tip: "Delivers higher user engagement and CTR than standard rectangular banners.",
  },
  adaptiveBanner: {
    term: "Adaptive Banner",
    fullName: "Anchored Adaptive Banner",
    definition: "The next-generation standard banner format that automatically calculates the optimal banner height and aspect ratio based on the specific device width, delivering maximum fill rate.",
    tip: "Replaces legacy fixed 320x50 smart banners with up to 25% higher eCPMs.",
  },
  biddingMediation: {
    term: "Bidding Mediation",
    fullName: "In-App Programmatic Real-Time Bidding (RTB)",
    definition: "An advanced monetization architecture where multiple ad demand networks (e.g., AppLovin MAX, Unity Ads, Meta Audience Network, Mintegral, and Google AdMob) compete simultaneously in real-time auctions for every single impression.",
    tip: "Eliminates slow waterfall mediation latency and lifts blended eCPMs by +20% to +35%.",
  },
  osPlatform: {
    term: "Platform Split",
    fullName: "Mobile Operating System Distribution (Android vs iOS)",
    definition: "The proportion of your app's active user base on Android vs Apple iOS. iOS traffic delivers +25% to +40% higher eCPMs in Tier 1 countries due to higher user purchasing power and advertiser spend.",
    tip: "Android delivers higher global volume; iOS commands top-tier monetization yield.",
  },
  dau: {
    term: "DAU",
    fullName: "Daily Active Users",
    definition: "The total number of unique individual users who open and engage with your mobile app or game within a single 24-hour day.",
    formula: "Daily Ad Revenue = DAU × ARPDAU",
    tip: "The primary growth and revenue multiplier metric for mobile games and utility apps.",
  },
  sessionDuration: {
    term: "Session Duration",
    fullName: "Average Session Length",
    definition: "The average continuous length of time (in minutes) an active user spends using your app from launch to exit.",
    tip: "Longer sessions create more natural transition opportunities for non-intrusive rewarded and interstitial ads.",
  },
  sessionsPerUser: {
    term: "Sessions Per User",
    fullName: "Daily Session Frequency",
    definition: "The average number of times a single active user returns to and opens your app throughout a 24-hour cycle.",
    tip: "Utility and messaging apps have high session frequency; midcore games have fewer but longer sessions.",
  },
  fillrate: {
    term: "Fill Rate",
    fullName: "Ad Network Fill Rate",
    definition: "The percentage of requested ad opportunities that are successfully matched and filled with a paid ad creative from advertising networks.",
    formula: "Fill Rate = (Served Impressions / Total Ad Requests) × 100%",
    tip: "Enabling multi-network real-time bidding pushes fill rates above 95% across global traffic.",
  },
  arpdau: {
    term: "ARPDAU",
    fullName: "Average Revenue Per Daily Active User",
    definition: "The universal mobile metric measuring the average gross ad income generated per individual active user engaging with your app each day.",
    formula: "ARPDAU = Total Daily Ad Revenue / Daily Active Users (DAU)",
    tip: "Casual mobile games typically achieve $0.05–$0.25 ARPDAU in Tier 1 countries.",
  },
  ecpm: {
    term: "eCPM",
    fullName: "Effective Cost Per Mille",
    definition: "The true effective earnings generated for every 1,000 ad impressions rendered and served inside your app or website.",
    formula: "eCPM = (Total Ad Revenue / Total Ad Impressions) × 1,000",
    tip: "Rewarded videos command $20–$45 eCPMs, while standard banners range from $1.00–$3.50.",
  },

  // Website / AdSense Formats & Metrics
  pagerpm: {
    term: "Page RPM",
    fullName: "Page Revenue Per Mille",
    definition: "The total gross revenue earned per 1,000 webpage views, aggregating the yield of all combined ad units placed across that page.",
    formula: "Page RPM = (Total Ad Revenue / Total Pageviews) × 1,000",
    tip: "High-value niches (Finance, Insurance, SaaS) command $25–$60+ Page RPM with Tier 1 traffic.",
  },
  impressionRpm: {
    term: "Impression RPM",
    fullName: "Revenue Per Mille Impressions",
    definition: "The estimated earnings for every 1,000 individual ad impressions rendered, regardless of how many ads appear on a single pageview.",
    formula: "Impression RPM = (Total Earnings / Total Individual Ad Impressions) × 1,000",
    tip: "Used to evaluate the standalone performance of individual ad unit placements.",
  },
  leaderboard: {
    term: "Top Header Banner",
    fullName: "Leaderboard Header Placement (728x90 / 970x250)",
    definition: "A large horizontal display banner positioned above the main content header or immediately below navigation menus.",
    tip: "Commands high initial visibility; pairing with sticky scroll anchors maximizes revenue.",
  },
  inArticle: {
    term: "In-Article Ad",
    fullName: "Native In-Article Display Placement",
    definition: "Responsive display or native ads embedded naturally between content paragraphs in editorial blog posts or articles.",
    tip: "Achieves high reader engagement and 70%+ viewability as users scroll through content.",
  },
  sidebar: {
    term: "Sticky Sidebar",
    fullName: "Sticky Sidebar Skyscraper (300x250 / 300x600)",
    definition: "A vertical ad unit placed in the website sidebar column that remains pinned in the user viewport as they scroll down long-form pages.",
    tip: "Sticky sidebars achieve over 85% viewability, attracting premium programmatic CPM bids.",
  },
  anchorAd: {
    term: "Mobile Anchor",
    fullName: "Sticky Mobile Anchor Ad Unit",
    definition: "An ad unit permanently pinned to the bottom (or top) edge of mobile device screens that stays visible as visitors browse and scroll.",
    tip: "Maintains 90%+ viewability and provides reliable incremental revenue without hindering navigation.",
  },
  vignette: {
    term: "Vignette Interstitial",
    fullName: "AdSense Vignette Full-Screen Ad",
    definition: "Full-screen web ads displayed during page transitions when users click links between internal pages on your website.",
    tip: "Commands top-tier programmatic CPMs ($15–$35) across both mobile and desktop web traffic.",
  },
  multiplex: {
    term: "Multiplex Grid",
    fullName: "Multiplex Native Recommendation Grid",
    definition: "A grid-based content recommendation unit displaying 4–8 native sponsored articles and product links, typically placed at article ends.",
    tip: "Excellent for post-reading monetization and reducing page bounce rates.",
  },
  viewability: {
    term: "Viewability",
    fullName: "Active Viewability Rate (MRC Standard)",
    definition: "The percentage of served impressions where at least 50% of the ad pixel area was visible in the active viewport for at least 1 continuous second.",
    formula: "Viewability = (In-View Impressions / Total Rendered) × 100%",
    tip: "Advertisers pay up to 3x higher CPM bids for inventory exceeding 75% viewability.",
  },
  viewabilityRate: {
    term: "Viewability Rate",
    fullName: "Active Viewport Viewability Percentage",
    definition: "The percentage of served ads that meet the Media Rating Council (MRC) standard of remaining in the active user viewport for at least 1 continuous second.",
    tip: "Sticky anchors and in-article units consistently achieve 80%–95% viewability.",
  },
  adblock: {
    term: "Ad Blocker Risk",
    fullName: "Ad Blocker Discount Rate",
    definition: "The percentage of website visitors using browser ad blockers (uBlock Origin, Brave, AdGuard) that prevent ad scripts from loading.",
    tip: "Tech and gaming niches experience 35%–50% ad block loss; lifestyle niches average 10%–18%.",
  },
  adBlockerRate: {
    term: "Ad Blocker Loss Rate",
    fullName: "Ad Blocker Traffic Loss Percentage",
    definition: "The proportion of total website pageviews where ad units fail to render due to browser extensions or ad-blocking browsers.",
    tip: "Deploying Google Funding Choices helps recover 30%–50% of blocked impressions.",
  },
  ctr: {
    term: "CTR",
    fullName: "Click-Through Rate",
    definition: "The percentage of displayed ad impressions that result in an intentional click by the website visitor or mobile app user.",
    formula: "CTR = (Total Clicks / Total Impressions) × 100%",
    tip: "Standard display ads average 0.5%–1.5% CTR; native and sticky units reach 2%–4%.",
  },
  cpc: {
    term: "CPC",
    fullName: "Cost Per Click",
    definition: "The monetary amount an advertiser pays to the publisher each time a user clicks on an ad unit.",
    formula: "Earnings = Total Clicks × CPC",
    tip: "Commercial niches like Insurance, Mortgage, and Law have CPCs ranging from $3.00 to $45.00+.",
  },
  seasonality: {
    term: "Seasonality",
    fullName: "Quarterly Ad Spend Seasonality (Q1–Q4)",
    definition: "The predictable annual fluctuation in advertiser marketing budgets, which peak in Q4 (Black Friday & Christmas) and drop in Q1 (January).",
    tip: "Q4 eCPMs are typically 35%–55% higher than baseline Q1 rates.",
  },
  accountCountry: {
    term: "Account Country",
    fullName: "Publisher Account Registration",
    definition: "The legal country where your Google AdSense or AdMob publisher account is registered for tax withholding, banking, and payment transfers.",
    tip: "Determines bank wire currency, tax withholding certificates (W-8BEN), and payout thresholds.",
  },
  trafficCountry: {
    term: "Audience Location",
    fullName: "Audience Physical Location & Geographic Tier",
    definition: "The country where your visitors or app players physically reside when viewing ads, which dictates advertiser auction bidding strength.",
    tip: "Tier 1 traffic (US, UK, CA, AU, DE) generates 4x to 10x higher CPMs than Tier 3 markets.",
  },
  tier1: {
    term: "Tier 1 Traffic",
    fullName: "Tier 1 High-Purchasing-Power Markets",
    definition: "Countries with high disposable income and strong consumer spending (US, UK, CA, AU, DE, FR, JP, CH), commanding premium advertiser bids.",
    tip: "Produces the highest eCPMs and Page RPMs across all ad categories.",
  },
  tier2: {
    term: "Tier 2 Traffic",
    fullName: "Tier 2 Moderate Purchasing Power",
    definition: "Countries with emerging digital economies and moderate advertiser budgets (Spain, Italy, Brazil, Mexico, Poland, South Africa).",
    tip: "Offers solid volume with 40%–60% of Tier 1 CPM rates.",
  },
  tier3: {
    term: "Tier 3 Traffic",
    fullName: "Tier 3 High-Volume Emerging Markets",
    definition: "Countries with massive mobile and web user volume but lower advertiser bidding budgets (India, Pakistan, Philippines, Nigeria, Egypt).",
    tip: "Monetized primarily through high user volume, rewarded video ads, and in-app purchases.",
  },
  mediation: {
    term: "Mediation Lift",
    fullName: "SDK Bidding Mediation Revenue Lift",
    definition: "The incremental revenue increase generated by running real-time bidding auctions across multiple ad demand networks simultaneously.",
    tip: "Typically unlocks +20% to +35% extra revenue over a single ad network.",
  },

  // ==========================================
  // YOUTUBE CREATOR DEFINITIONS
  // ==========================================
  ypp: {
    term: "YPP",
    fullName: "YouTube Partner Program",
    definition: "YouTube's monetization program that gives creators access to ad revenue sharing, channel memberships, Super Chats, and YouTube Shopping. Requires 1,000 subscribers and 4,000 valid public watch hours (or 10 million Shorts views) in the past 12 months.",
    tip: "Creators receive 55% of net ad revenue on long-form videos and 45% on Shorts.",
  },
  youtubeRpm: {
    term: "YouTube RPM",
    fullName: "Revenue Per Mille (Creator Net Earnings)",
    definition: "The exact money a creator earns per 1,000 video views after YouTube takes its 45% platform cut. Includes ads, YouTube Premium views, memberships, and Super Chats.",
    formula: "RPM = (Total Creator Payout / Total Video Views) × 1,000",
    tip: "Finance, Tech, and Business niches average $12.00–$25.00+ RPM in Tier 1 countries.",
  },
  youtubeCpm: {
    term: "Playback CPM",
    fullName: "Playback-Based Cost Per Mille",
    definition: "What advertisers pay per 1,000 monetized playbacks before YouTube's 45% revenue split is deducted.",
    formula: "Creator RPM ≈ Playback CPM × 0.55 × (Monetized Playback Rate)",
    tip: "A $20.00 advertiser CPM translates to approximately $8.00–$12.00 creator RPM.",
  },
  youtubeShorts: {
    term: "Shorts Revenue",
    fullName: "YouTube Shorts Creator Pool Revenue Share",
    definition: "Revenue sharing model where ad revenue from ads running between Shorts feeds is pooled and allocated to creators based on their share of total global views.",
    formula: "Shorts RPM = $0.03 to $0.09 per 1,000 views (scaled by audience geography)",
    tip: "High volume is essential: 10 million Shorts views typically generate $400 to $900.",
  },
  midrolls: {
    term: "Mid-roll Ads",
    fullName: "Mid-roll In-Stream Video Ads",
    definition: "Ad breaks inserted in the middle of long-form videos. YouTube allows mid-rolls on any video exceeding 8 minutes in length.",
    tip: "Enabling natural mid-roll ad breaks increases long-form video RPM by +35% to +60%.",
  },
  memberships: {
    term: "Memberships",
    fullName: "YouTube Channel Memberships",
    definition: "Recurring monthly subscriptions from dedicated channel fans for custom badges, emojis, members-only live streams, and community posts.",
    tip: "Creators keep 70% of gross membership fees ($3.49 net per $4.99/mo member).",
  },
  superchat: {
    term: "Super Chat & Thanks",
    fullName: "Super Chat, Super Stickers & Super Thanks",
    definition: "Direct fan micro-donations during live streams, premieres, and on standard uploaded video comments.",
    tip: "Creators receive 70% of the total amount donated after app store fee deductions.",
  },
  ytSponsorships: {
    term: "Brand Integrations",
    fullName: "Dedicated & Integrated Video Sponsorships",
    definition: "Direct sponsorship agreements with brands for 30–60 second shoutouts or dedicated review videos.",
    formula: "Sponsorship Rate ≈ (Average Views / 1,000) × $20 to $45 CPM",
    tip: "Niche authority channels earn up to $50–$100 CPM on direct brand deals.",
  },

  // ==========================================
  // TIKTOK CREATOR DEFINITIONS
  // ==========================================
  creatorRewards: {
    term: "Creator Rewards",
    fullName: "TikTok Creator Rewards Program",
    definition: "TikTok's flagship creator payout program (formerly the Creativity Program Beta) that pays creators for high-retention, original videos over 1 minute long.",
    tip: "Replaced the legacy Creator Fund with 10x–20x higher RPMs ($0.40–$1.20 per 1,000 qualified views).",
  },
  qualifiedViews: {
    term: "Qualified Views",
    fullName: "TikTok Qualified Monetized Views",
    definition: "Views from the For You Page (FYP) where viewers watch for at least 5 continuous seconds, are from eligible countries, and are not marked as spam/bot traffic.",
    formula: "Qualified Views ≈ Total Views × 35% to 65% (based on retention)",
    tip: "Hook viewers in the first 3 seconds to push your qualified view rate above 50%.",
  },
  overOneMin: {
    term: ">1 Min Requirement",
    fullName: "Original 60+ Second Video Threshold",
    definition: "The strict Creator Rewards eligibility requirement where only original videos exceeding 60 seconds in duration qualify for monetization.",
    tip: "Videos between 65–90 seconds with strong narrative pacing perform best.",
  },
  diamondPayout: {
    term: "LIVE Diamonds",
    fullName: "TikTok LIVE Stream Virtual Gift Diamonds",
    definition: "Virtual currency awarded when viewers send gifts during TikTok LIVE broadcasts. Diamonds can be redeemed directly for cash ($0.005 per diamond).",
    formula: "Creator Net Earnings = Total Diamonds × $0.005 (after TikTok 50% split)",
    tip: "Engaging LIVE stream creators earn hundreds to thousands of dollars per stream.",
  },
  tiktokShop: {
    term: "TikTok Shop GMV",
    fullName: "TikTok Shop Affiliate Sales Commission",
    definition: "Commission earned by tagging eligible products in videos or live streams from the TikTok Shop marketplace.",
    tip: "Affiliate commission rates typically range from 8% to 20% of Gross Merchandise Value (GMV).",
  },

  // ==========================================
  // TWITCH STREAMER DEFINITIONS
  // ==========================================
  ccv: {
    term: "CCV",
    fullName: "Average Concurrent Viewers",
    definition: "The average number of simultaneous live viewers watching your stream at any given point during your broadcast.",
    tip: "The single most important streaming metric for unlocking Twitch Partner, sponsorships, and high ad payouts.",
  },
  tier1Sub: {
    term: "Twitch Subscriptions",
    fullName: "Twitch Channel Subscriptions (Tier 1/2/3)",
    definition: "Monthly recurring channel subscriptions ($4.99 Tier 1, $9.99 Tier 2, $24.99 Tier 3) that give viewers ad-free viewing and custom subscriber emotes.",
    tip: "Standard Affiliates and Partners receive a 50/50 revenue split ($2.49/sub).",
  },
  partnerPlus: {
    term: "Partner Plus Program",
    fullName: "Twitch Partner Plus Revenue Split (60/40 & 70/30)",
    definition: "Twitch's premium program that upgrades streamer subscription revenue share to 60% (100 Plus points) or 70% (350 Plus points).",
    formula: "Plus Points: Tier 1 = 1 pt, Tier 2 = 2 pts, Tier 3 = 6 pts (recurring paid subs only)",
    tip: "Unlocking the 70/30 tier increases your sub income by +40% for the same number of subscribers.",
  },
  twitchAip: {
    term: "Twitch AIP",
    fullName: "Twitch Ad Incentive Program",
    definition: "Programmatic in-stream video ad breaks (pre-rolls and mid-rolls) run during live broadcasts.",
    formula: "Ad Revenue ≈ Total Viewer Hours × (Ad Minutes / 60) × $4.50 eCPM",
    tip: "Running 3 minutes of ads per hour disables pre-rolls for incoming viewers and boosts income.",
  },
  bits: {
    term: "Twitch Bits",
    fullName: "Bits & Cheer Micro-Donations",
    definition: "Twitch's virtual cheering currency. Streamers receive exactly $0.01 per bit cheered in chat (100 bits = $1.00 net).",
    tip: "Bits are 100% protected against payment chargebacks, unlike external PayPal donations.",
  },

  // ==========================================
  // KICK STREAMER DEFINITIONS
  // ==========================================
  kickSplit95: {
    term: "95/5 Sub Split",
    fullName: "Kick 95% Creator Subscription Revenue Split",
    definition: "Kick's industry-disrupting monetization model where streamers receive 95% of every subscription ($4.74 per $4.99 sub), while Kick takes only a 5% platform fee.",
    tip: "Streamers earn nearly 2x more per subscriber on Kick compared to Twitch's default 50% split.",
  },
  kcp: {
    term: "KCP Hourly Pay",
    fullName: "KICK Creator Program (Hourly Streaming Rate)",
    definition: "Kick's verified creator program that pays streamers an hourly wage ($16 to $40+ per hour) based on their average concurrent viewership, chat velocity, and stream consistency.",
    formula: "Monthly KCP Pay = Stream Hours × Tier Hourly Rate ($16–$40/hr)",
    tip: "Provides reliable base monthly income independent of viewer donations or subscriptions.",
  },
  kickTips: {
    term: "Direct Tips",
    fullName: "Kick Direct Tips & Crypto Donations",
    definition: "Direct peer-to-peer viewer donations via credit cards or cryptocurrency, where 100% of proceeds go directly to the creator.",
    tip: "Zero platform commission taken on tips and third-party donation links.",
  },
};

interface TermTooltipProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({ id, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const def = DEFINITIONS[id];
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!def) return <>{children}</>;

  return (
    <span className="relative inline-flex items-center gap-1">
      {children && (
        <span className={className}>
          {children}
        </span>
      )}
      
      {/* Explicit Question Mark Button */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={`Definition of ${def.term}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center justify-center p-0.5 rounded-full text-neutral-400 dark:text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
        title={`What is ${def.term}? Click for definition`}
      >
        <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
      </button>

      {/* Tooltip Dialog / Popover */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Tooltip Card (Mobile: Bottom Floating Sheet; Desktop: Anchored Popover) */}
          <div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${def.term} explanation`}
            className="fixed inset-x-3 bottom-16 z-50 p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 shadow-2xl space-y-2.5 text-left font-mono sm:absolute sm:inset-auto sm:bottom-full sm:left-1/2 sm:-translate-x-1/2 sm:mb-2 sm:w-80 sm:p-3.5 sm:rounded-xl sm:shadow-xl animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5 dark:ring-white/10"
          >
            <div className="flex items-start justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <span>{def.term}</span>
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  {def.fullName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close definition"
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
              {def.definition}
            </p>

            {def.formula && (
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-dashed border-neutral-200 dark:border-neutral-700 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono select-all">
                {def.formula}
              </div>
            )}

            {def.tip && (
              <div className="flex items-start gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 font-sans">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{def.tip}</span>
              </div>
            )}
          </div>
        </>
      )}
    </span>
  );
};
