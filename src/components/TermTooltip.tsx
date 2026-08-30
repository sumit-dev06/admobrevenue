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
  ecpm: {
    term: "eCPM",
    fullName: "Effective Cost Per Mille",
    definition: "The true gross revenue generated for every 1,000 ad impressions rendered inside your app or website.",
    formula: "eCPM = (Total Ad Revenue / Total Ad Impressions) × 1,000",
    tip: "Rewarded video eCPMs range from $20–$45 in Tier 1 countries.",
  },
  pagerpm: {
    term: "Page RPM",
    fullName: "Page Revenue Per Mille",
    definition: "The total estimated earnings generated per 1,000 website pageviews across all combined ad placements on that page.",
    formula: "Page RPM = (Estimated Earnings / Total Pageviews) × 1,000",
    tip: "Finance, Legal, and SaaS niches command $35–$65 Page RPM in Tier 1.",
  },
  arpdau: {
    term: "ARPDAU",
    fullName: "Average Revenue Per Daily Active User",
    definition: "Measures how much ad income a single daily active player or app user generates over a 24-hour cycle.",
    formula: "ARPDAU = Total Daily Ad Revenue / Daily Active Users (DAU)",
    tip: "Casual puzzle games average $0.08–$0.22 ARPDAU in Tier 1 markets.",
  },
  fillrate: {
    term: "Fill Rate",
    fullName: "Ad Network Fill Rate",
    definition: "The percentage of requested ad impression opportunities successfully filled and returned by ad networks.",
    formula: "Fill Rate = (Served Impressions / Ad Requests) × 100%",
    tip: "In-app mediation with bidding networks raises fill rates to 95%+.",
  },
  viewability: {
    term: "Viewability",
    fullName: "Ad Viewability Rate (MRC Standard)",
    definition: "Percentage of served impressions that appear in the active user viewport for at least 1 continuous second.",
    formula: "Viewability = (In-View Impressions / Total Rendered) × 100%",
    tip: "Mobile sticky anchors and sidebar half-pages exceed 90% viewability.",
  },
  mediation: {
    term: "Mediation Lift",
    fullName: "SDK Bidding Mediation",
    definition: "Real-time programmatic auctions where networks (MAX, Unity, Mintegral, AdMob) bid simultaneously per impression.",
    tip: "Replaces waterfall latency and lifts overall app earnings by +20% to +35%.",
  },
  adblock: {
    term: "Ad Blocker Risk",
    fullName: "Ad Blocker Discount Rate",
    definition: "The percentage of website visitors using extension ad blockers (uBlock Origin, Brave, AdGuard) that prevent ad rendering.",
    tip: "Tech and gaming niches have 35%–50% ad blocker usage.",
  },
  accountCountry: {
    term: "Account Country",
    fullName: "Publisher Account Registration",
    definition: "The legal country where your Google AdSense or AdMob publisher account is registered for tax withholding and bank transfers.",
    tip: "Determines payment currency, W-8BEN/W-9 tax forms, and payment thresholds.",
  },
  trafficCountry: {
    term: "Traffic Country",
    fullName: "Audience Physical Location",
    definition: "The country where your visitors or players physically reside when viewing ads, which dictates advertiser CPM auction bids.",
    tip: "Tier 1 traffic (US, UK, CA, AU, DE) generates 4x to 10x higher CPMs than Tier 3.",
  },
};

interface TermTooltipProps {
  id: keyof typeof DEFINITIONS;
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
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={
          "inline-flex items-center gap-1 cursor-pointer border-b border-dashed border-neutral-400 hover:border-emerald-500 text-inherit transition-colors " +
          className
        }
        title={`Click for ${def.term} explanation`}
      >
        {children || def.term}
        <HelpCircle className="w-3 h-3 text-neutral-400 hover:text-emerald-500 transition-colors shrink-0" aria-hidden="true" />
      </button>

      {/* Tooltip Dialog / Popover */}
      {isOpen && (
        <>
          {/* Mobile Overlay Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Tooltip Card (Mobile: Bottom Sheet; Desktop: Anchored Popover) */}
          <div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${def.term} explanation`}
            className="fixed inset-x-4 bottom-4 z-50 p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 shadow-2xl space-y-2.5 text-left font-mono sm:absolute sm:inset-auto sm:bottom-full sm:right-0 sm:mb-2 sm:w-80 sm:p-3.5 sm:rounded-xl sm:shadow-xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  {def.term}
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {def.fullName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close tooltip"
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
              {def.definition}
            </p>

            {def.formula && (
              <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-dashed border-neutral-200 dark:border-neutral-700 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono select-all">
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
