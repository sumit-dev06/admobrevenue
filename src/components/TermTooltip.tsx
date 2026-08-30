import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";

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
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!def) return <>{children}</>;

  return (
    <span className="relative inline-flex items-center gap-1">
      <button
        type="button"
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
        <HelpCircle className="w-3 h-3 text-neutral-400 hover:text-emerald-500 transition-colors shrink-0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-neutral-950 text-white rounded-xl border border-dashed border-neutral-700 shadow-2xl space-y-2 text-left font-mono animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start justify-between pb-1.5 border-b border-dashed border-neutral-800">
            <div>
              <div className="text-xs font-bold text-emerald-400">{def.term}</div>
              <div className="text-[10px] text-neutral-400">{def.fullName}</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
            {def.definition}
          </p>

          {def.formula && (
            <div className="p-2 rounded bg-neutral-900 border border-dashed border-neutral-800 text-[10px] text-emerald-300 font-mono">
              {def.formula}
            </div>
          )}

          {def.tip && (
            <div className="text-[10px] text-neutral-400 font-sans italic">
              💡 {def.tip}
            </div>
          )}
        </div>
      )}
    </span>
  );
};
