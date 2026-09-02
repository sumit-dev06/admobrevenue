import React, { useState } from "react";
import { Bookmark, Search, ChevronDown } from "lucide-react";

export const GLOSSARY_TERMS = [
  { term: "eCPM", def: "Effective Cost Per Mille: Total revenue earned per 1,000 ad impressions served." },
  { term: "Page RPM", def: "Revenue Per Mille: Estimated revenue earned per 1,000 website pageviews." },
  { term: "ARPDAU", def: "Average Revenue Per Daily Active User: Total daily ad income divided by DAU." },
  { term: "Fill Rate", def: "Percentage of requested ad impressions successfully returned and rendered." },
  { term: "Header Bidding", def: "Programmatic technique where ad units are auctioned simultaneously to multiple demand partners." },
  { term: "Viewability Rate", def: "Percentage of served impressions that appear in the user's active viewport for ≥1 second." },
  { term: "Partner Plus", def: "Twitch program unlocking 60/40 or 70/30 subscriber revenue shares for qualifying creators." },
  { term: "Creator Rewards", def: "TikTok monetization program paying creators for original videos >1 minute based on qualified FYP views." },
  { term: "KCP Stipend", def: "Kick Creator Program offering hourly wages ($16–$40/hr) to livestreamers alongside 95/5 sub splits." },
];

export const GlossarySection: React.FC = () => {
  // Collapsed (off) by default
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono transition-all overflow-hidden shadow-2xs">
      {/* Clickable Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
            <Bookmark className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 dark:text-white truncate">
                Monetization Glossary & Terminology
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase font-mono">
                Dictionary
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {isOpen ? "Click to collapse glossary" : "Key definitions for eCPM, RPM, ARPDAU, Partner Plus & KCP (Click to expand)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
          <span className="hidden sm:inline">{isOpen ? "Hide Glossary" : "Show Glossary"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-purple-500" : "text-neutral-400"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-5 pt-0 space-y-4 border-t border-dashed border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pt-3">
            <span className="text-[11px] text-neutral-500">Search industry terms:</span>
            <div className="relative">
              <label htmlFor="glossary-search" className="sr-only">Search monetization terms</label>
              <input
                id="glossary-search"
                aria-label="Search monetization glossary terms"
                type="text"
                placeholder="Filter terms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-7 pr-2.5 py-1 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none text-neutral-900 dark:text-white"
              />
              <Search className="w-3 h-3 text-neutral-500 absolute left-2.5 top-2.5" aria-hidden="true" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filtered.map((item) => (
              <div
                key={item.term}
                className="p-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 space-y-1 bg-neutral-50/30 dark:bg-neutral-900/40"
              >
                <div className="text-xs font-mono font-bold text-neutral-950 dark:text-white">
                  {item.term}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 leading-relaxed">
                  {item.def}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
