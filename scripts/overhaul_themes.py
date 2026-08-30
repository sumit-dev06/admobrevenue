import os

components_dir = os.path.join(os.getcwd(), "src/components")

# 1. RevenueSummaryCard.tsx
summary_card = r"""import React from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { TermTooltip } from "./TermTooltip";

interface RevenueSummaryProps {
  type: "adsense" | "admob";
  currency: CurrencyCode;
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  rateMetricLabel: string;
  rateMetricValue: string;
  secondaryRateLabel?: string;
  secondaryRateValue?: string;
  impressions: number;
  adBlockLossRevenue?: number;
  mediationLiftRevenue?: number;
  onExportCSV?: () => void;
}

export const RevenueSummaryCard: React.FC<RevenueSummaryProps> = ({
  type,
  currency,
  dailyRevenue,
  monthlyRevenue,
  annualRevenue,
  rateMetricLabel,
  rateMetricValue,
  secondaryRateLabel,
  secondaryRateValue,
  adBlockLossRevenue,
  mediationLiftRevenue,
}) => {
  const isAdMob = type === "admob";

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 shadow-xs space-y-5 transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Estimated Net Payout
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">
          {currency} Normalized
        </span>
      </div>

      {/* Main Monthly Revenue Ticker */}
      <div className="py-2">
        <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
          Monthly Revenue Run-Rate
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
            {formatCurrency(monthlyRevenue, currency)}
          </span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">/month</span>
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
        {/* Daily */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">Daily</div>
          <div className="text-base font-bold font-mono text-neutral-950 dark:text-white">
            {formatCurrency(dailyRevenue, currency)}
          </div>
          <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">~30.4 days</div>
        </div>

        {/* Annual */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">Annual</div>
          <div className="text-base font-bold font-mono text-neutral-950 dark:text-white">
            {formatCurrency(annualRevenue, currency)}
          </div>
          <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">12 mo + season</div>
        </div>

        {/* Rate metric */}
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
            <TermTooltip id={isAdMob ? "arpdau" : "pagerpm"}>
              <span>{rateMetricLabel}</span>
            </TermTooltip>
          </div>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {rateMetricValue}
          </div>
          {secondaryRateLabel && secondaryRateValue && (
            <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
              <TermTooltip id={isAdMob ? "ecpm" : "viewability"}>
                <span>{secondaryRateLabel}: {secondaryRateValue}</span>
              </TermTooltip>
            </div>
          )}
        </div>
      </div>

      {/* Lift / Loss Callout */}
      {mediationLiftRevenue !== undefined && mediationLiftRevenue > 0 && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-dashed border-emerald-300 dark:border-emerald-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1">
            <TermTooltip id="mediation">
              <span className="text-emerald-700 dark:text-emerald-300 text-[11px]">Mediation & Bidding Lift:</span>
            </TermTooltip>
          </div>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">+{formatCurrency(mediationLiftRevenue, currency)}/mo</span>
        </div>
      )}

      {adBlockLossRevenue !== undefined && adBlockLossRevenue > 0 && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-dashed border-rose-300 dark:border-rose-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1">
            <TermTooltip id="adblock">
              <span className="text-rose-700 dark:text-rose-300 text-[11px]">AdBlock Estimated Loss:</span>
            </TermTooltip>
          </div>
          <span className="font-bold text-rose-700 dark:text-rose-400">-{formatCurrency(adBlockLossRevenue, currency)}/mo</span>
        </div>
      )}
    </div>
  );
};
"""

# 2. MobileStickyBar.tsx
mobile_bar = r"""import React, { useState } from "react";
import { CurrencyCode, PlatformMode } from "../types";
import { formatCurrency } from "../utils/currency";
import {
  Share2,
  Download,
  Code2,
  ChevronUp,
  X,
} from "lucide-react";

interface MobileStickyBarProps {
  activeMode: PlatformMode;
  currency: CurrencyCode;
  monthlyRevenue: number;
  rateLabel: string;
  rateValue: string;
  onOpenExport: () => void;
  onOpenEmbed: () => void;
  onShare: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currency,
  monthlyRevenue,
  rateLabel,
  rateValue,
  onOpenExport,
  onOpenEmbed,
  onShare,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Quick Drawer */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {isMenuOpen && (
        <div className="fixed bottom-16 left-3 right-3 z-50 p-4 bg-white dark:bg-neutral-950 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-2xl shadow-2xl space-y-3 lg:hidden">
          <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400">Actions</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onShare();
              }}
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1"
            >
              <Share2 className="w-4 h-4 text-blue-500" />
              <span>Share</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenExport();
              }}
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenEmbed();
              }}
              className="p-2.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex flex-col items-center gap-1"
            >
              <Code2 className="w-4 h-4 text-purple-500" />
              <span>Embed</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Sticky Bar */}
      <div className="fixed bottom-2 left-2 right-2 z-40 lg:hidden">
        <div className="flex items-center justify-between bg-white/95 dark:bg-neutral-950/95 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div>
              <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono uppercase">Monthly</div>
              <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(monthlyRevenue, currency)}
              </div>
            </div>
            <div className="h-5 w-px border-r border-dashed border-neutral-200 dark:border-neutral-800" />
            <div className="text-[10px] font-mono">
              <span className="text-neutral-500 dark:text-neutral-400">{rateLabel}: </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-300">{rateValue}</span>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1"
          >
            <span>Options</span>
            <ChevronUp className={"w-3 h-3 transition-transform " + (isMenuOpen ? "rotate-180" : "")} />
          </button>
        </div>
      </div>
    </>
  );
};
"""

# 3. TermTooltip.tsx
tooltip_file = r"""import React, { useState, useRef, useEffect } from "react";
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
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 shadow-2xl space-y-2 text-left font-mono animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start justify-between pb-1.5 border-b border-dashed border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{def.term}</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{def.fullName}</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            {def.definition}
          </p>

          {def.formula && (
            <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-900 border border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] text-emerald-600 dark:text-emerald-300 font-mono">
              {def.formula}
            </div>
          )}

          {def.tip && (
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans italic">
              💡 {def.tip}
            </div>
          )}
        </div>
      )}
    </span>
  );
};
"""

# 4. ScenarioComparator.tsx
comparator = r"""import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { GitCompare, ArrowRight, CheckCircle2 } from "lucide-react";

interface ScenarioComparatorProps {
  currency: CurrencyCode;
}

export const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({ currency }) => {
  const [dau, setDau] = useState<number>(20000);

  // Baseline: No mediation, only 1 banner + 1 interstitial
  const baseDailyRev = (dau * (0.0003 * 4 + 0.0012 * 1.5)) * 0.8;
  const baseMonthlyRev = baseDailyRev * 30.4;
  const baseArpdau = baseDailyRev / dau;

  // Optimized: Mediation + Rewarded Video + App Open + Paced Interstitials
  const optDailyRev = (dau * (0.0003 * 4 + 0.0012 * 1.5 + 0.0025 * 2.0 + 0.0010 * 1.5)) * 1.25;
  const optMonthlyRev = optDailyRev * 30.4;
  const optArpdau = optDailyRev / dau;

  const deltaMonthly = optMonthlyRev - baseMonthlyRev;
  const percentageLift = Math.round(((optMonthlyRev - baseMonthlyRev) / (baseMonthlyRev || 1)) * 100);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-rose-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            A/B Optimization Comparator
          </span>
        </div>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
          +{percentageLift}% Revenue Delta
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Test Daily Active Users (DAU):</span>
          <span className="font-bold text-neutral-900 dark:text-white">{dau.toLocaleString()} DAU</span>
        </div>
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={dau}
          onChange={(e) => setDau(parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Baseline */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Scenario A: Default Waterfall</div>
          <div className="text-lg font-bold text-neutral-900 dark:text-white">
            {formatCurrency(baseMonthlyRev, currency)}
            <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ARPDAU: ${baseArpdau.toFixed(4)} · Banners + Interstitial only
          </div>
        </div>

        {/* Optimized */}
        <div className="p-3.5 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 space-y-2 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase">
            Scenario B: Fully Optimized Stack
          </div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(optMonthlyRev, currency)}
            <span className="text-[10px] text-neutral-400 font-normal">/mo</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold">
            +{formatCurrency(deltaMonthly, currency)}/mo unlocked
          </div>
        </div>
      </div>
    </div>
  );
};
"""

# 5. ReverseGoalCalculator.tsx
goal_calc = r"""import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import { Target, CheckCircle2 } from "lucide-react";

interface ReverseGoalCalculatorProps {
  currency: CurrencyCode;
}

export const ReverseGoalCalculator: React.FC<ReverseGoalCalculatorProps> = ({ currency }) => {
  const [targetIncome, setTargetIncome] = useState<number>(3000);
  const [nicheTier, setNicheTier] = useState<"standard" | "high" | "emerging">("standard");

  // Standard: $12 RPM / $0.08 ARPDAU
  // High: $35 RPM / $0.20 ARPDAU
  // Emerging: $2.50 RPM / $0.02 ARPDAU
  const rpm = nicheTier === "high" ? 35 : nicheTier === "standard" ? 12 : 2.5;
  const arpdau = nicheTier === "high" ? 0.20 : nicheTier === "standard" ? 0.08 : 0.02;

  const requiredPageviews = Math.round((targetIncome / rpm) * 1000);
  const requiredDailyVisitors = Math.round(requiredPageviews / (30.4 * 1.8));
  const requiredDau = Math.round(targetIncome / (30.4 * arpdau));

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            Target Revenue Income Roadmap
          </span>
        </div>
        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
          Reverse Forecaster
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Target Monthly Income:</span>
          <span className="font-bold text-neutral-900 dark:text-white">
            {formatCurrency(targetIncome, currency)}/mo
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={targetIncome}
          onChange={(e) => setTargetIncome(parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Web Requirement */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Website Route (AdSense)</div>
          <div className="text-base font-bold text-neutral-900 dark:text-white">
            {requiredPageviews.toLocaleString()}
            <span className="text-[10px] text-neutral-400 font-normal"> PVs/mo</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ~{requiredDailyVisitors.toLocaleString()} unique visits/day
          </div>
        </div>

        {/* App Requirement */}
        <div className="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="text-[10px] text-neutral-500 uppercase">Mobile App Route (AdMob)</div>
          <div className="text-base font-bold text-neutral-900 dark:text-white">
            {requiredDau.toLocaleString()}
            <span className="text-[10px] text-neutral-400 font-normal"> DAU</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            ~{(requiredDau * 3.5).toLocaleString()} Monthly Active Users (MAU)
          </div>
        </div>
      </div>
    </div>
  );
};
"""

# 6. PortfolioCalculator.tsx
portfolio_calc = r"""import React, { useState } from "react";
import { CurrencyCode, AdSenseResults, AdMobResults } from "../types";
import { formatCurrency } from "../utils/currency";
import { Layers } from "lucide-react";

interface PortfolioCalculatorProps {
  adsenseResults: AdSenseResults;
  admobResults: AdMobResults;
  currency: CurrencyCode;
}

export const PortfolioCalculator: React.FC<PortfolioCalculatorProps> = ({
  adsenseResults,
  admobResults,
  currency,
}) => {
  const [siteCount, setSiteCount] = useState<number>(2);
  const [appCount, setAppCount] = useState<number>(1);

  const totalMonthly = adsenseResults.monthlyRevenue * siteCount + admobResults.monthlyRevenue * appCount;
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
            Digital Media Portfolio Aggregator
          </span>
        </div>
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          Multi-Property
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Websites Active</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSiteCount(Math.max(0, siteCount - 1))}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              -
            </button>
            <span className="font-bold text-base text-neutral-900 dark:text-white">{siteCount}</span>
            <button
              onClick={() => setSiteCount(siteCount + 1)}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">Apps Active</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAppCount(Math.max(0, appCount - 1))}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              -
            </button>
            <span className="font-bold text-base text-neutral-900 dark:text-white">{appCount}</span>
            <button
              onClick={() => setAppCount(appCount + 1)}
              className="w-6 h-6 rounded border border-dashed border-neutral-300 dark:border-neutral-700 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 uppercase">
            Combined Portfolio Run-Rate
          </div>
          <div className="text-xl font-bold text-amber-700 dark:text-amber-300">
            {formatCurrency(totalMonthly, currency)}
            <span className="text-xs font-normal text-neutral-500">/month</span>
          </div>
        </div>
        <div className="text-[11px] text-neutral-500">
          Annual: {formatCurrency(totalAnnual, currency)}/yr
        </div>
      </div>
    </div>
  );
};
"""

# 7. BenchmarksExplorer.tsx
benchmarks_code = r"""import React, { useState } from "react";
import { BENCHMARKS_DATA } from "../data/benchmarksData";
import { BarChart3, Search } from "lucide-react";

export const BenchmarksExplorer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "AdSense" | "AdMob">("all");

  const filtered = BENCHMARKS_DATA.filter((item) => {
    const matchesSearch =
      item.niche.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || item.platform === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-500" />
          <span className="font-bold uppercase text-neutral-900 dark:text-white">
            2025–2026 Industry Benchmark Directory
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter niches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            />
            <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 uppercase">
              <th className="py-2 pr-3">Niche / Category</th>
              <th className="py-2 px-3">Platform</th>
              <th className="py-2 px-3">Tier 1 Rate</th>
              <th className="py-2 px-3">Tier 2 Rate</th>
              <th className="py-2 px-3">Tier 3 Rate</th>
              <th className="py-2 pl-3">Avg CTR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800 text-[11px]">
            {filtered.slice(0, 10).map((b, idx) => (
              <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                <td className="py-2.5 pr-3 font-bold text-neutral-900 dark:text-white">{b.niche}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={
                      "px-1.5 py-0.5 rounded text-[9px] font-bold border border-dashed " +
                      (b.platform === "AdMob"
                        ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                        : "border-blue-500/50 text-blue-600 dark:text-blue-400")
                    }
                  >
                    {b.platform}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{b.tier1Range}</td>
                <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">{b.tier2Range}</td>
                <td className="py-2.5 px-3 text-neutral-500">{b.tier3Range}</td>
                <td className="py-2.5 pl-3 text-neutral-600 dark:text-neutral-400">{b.avgCtr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
"""

with open(os.path.join(components_dir, "RevenueSummaryCard.tsx"), "w", encoding="utf-8") as f:
    f.write(summary_card)

with open(os.path.join(components_dir, "MobileStickyBar.tsx"), "w", encoding="utf-8") as f:
    f.write(mobile_bar)

with open(os.path.join(components_dir, "TermTooltip.tsx"), "w", encoding="utf-8") as f:
    f.write(tooltip_file)

with open(os.path.join(components_dir, "ScenarioComparator.tsx"), "w", encoding="utf-8") as f:
    f.write(comparator)

with open(os.path.join(components_dir, "ReverseGoalCalculator.tsx"), "w", encoding="utf-8") as f:
    f.write(goal_calc)

with open(os.path.join(components_dir, "PortfolioCalculator.tsx"), "w", encoding="utf-8") as f:
    f.write(portfolio_calc)

with open(os.path.join(components_dir, "BenchmarksExplorer.tsx"), "w", encoding="utf-8") as f:
    f.write(benchmarks_code)

print("Theme overhaul applied across all components successfully!")
