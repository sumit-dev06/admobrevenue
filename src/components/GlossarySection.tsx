import React, { useState } from "react";
import { Bookmark, Search } from "lucide-react";

export const GLOSSARY_TERMS = [
  { term: "eCPM", def: "Effective Cost Per Mille: Total revenue earned per 1,000 ad impressions served." },
  { term: "Page RPM", def: "Revenue Per Mille: Estimated revenue earned per 1,000 website pageviews." },
  { term: "ARPDAU", def: "Average Revenue Per Daily Active User: Total daily ad income divided by DAU." },
  { term: "Fill Rate", def: "Percentage of requested ad impressions successfully returned and rendered." },
  { term: "Header Bidding", def: "Programmatic technique where ad units are auctioned simultaneously to multiple demand partners." },
  { term: "Viewability Rate", def: "Percentage of served impressions that appear in the user's active viewport for ≥1 second." },
];

export const GlossarySection: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Monetization Glossary
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 pr-2.5 py-1 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
          />
          <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-2.5" />
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
  );
};
