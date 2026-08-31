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
