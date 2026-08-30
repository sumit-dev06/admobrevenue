import React, { useState } from "react";
import { BookOpen, Search } from "lucide-react";

const GLOSSARY_TERMS = [
  { term: "Page RPM", def: "Revenue Per Mille for pageviews. Total revenue earned per 1,000 website pageviews across all ad units." },
  { term: "Impression RPM", def: "Revenue Per Mille for ad impressions. Earnings generated per 1,000 ad units rendered." },
  { term: "eCPM", def: "Effective Cost Per Mille. Standardized revenue generated per 1,000 ad impressions across all formats." },
  { term: "CTR (Click-Through Rate)", def: "The percentage of ad impressions that resulted in an active user click (Clicks / Impressions × 100)." },
  { term: "CPC (Cost Per Click)", def: "The monetary amount an advertiser pays each time a user clicks on an advertisement." },
  { term: "DAU (Daily Active Users)", def: "The number of unique individual users who open and engage with a mobile application on a given day." },
  { term: "MAU (Monthly Active Users)", def: "The total number of unique users who engaged with an app over a rolling 30-day period." },
  { term: "ARPDAU", def: "Average Revenue Per Daily Active User. Daily ad and IAP revenue divided by Daily Active Users." },
  { term: "Fill Rate", def: "The percentage of ad requests that are successfully fulfilled with a served ad impression (Impressions / Requests × 100)." },
  { term: "Ad Viewability", def: "MRC standard measurement requiring at least 50% of an ad's pixels to be in viewport for 1 continuous second." },
  { term: "Rewarded Video", def: "A full-screen video ad that users voluntarily choose to watch in exchange for an in-app reward or currency." },
  { term: "Interstitial Ad", def: "A full-screen static or video ad displayed during natural transition points (e.g. between game levels or articles)." },
  { term: "App Open Ad", def: "An ad format designed for mobile apps that displays when a user opens or resumes the application." },
  { term: "Adaptive Banner", def: "A modern responsive banner ad unit that dynamically sizes to optimal screen dimensions with auto-refresh." },
  { term: "Mediation", def: "A technology platform that manages multiple ad network SDKs to maximize fill rates and eCPMs via competitive auctions." },
  { term: "Real-Time Bidding (RTB)", def: "Instantaneous programmatic auction where advertisers bid on ad impressions in milliseconds." },
  { term: "Floor Price", def: "The minimum eCPM threshold a publisher sets below which an ad network cannot serve an impression." },
  { term: "Revenue Share (Rev Share)", def: "The percentage split between Google and the publisher (typically 68% for AdSense for Content, 51% for Search)." },
];

export const GlossarySection: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.def.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Ad Monetization Glossary
            </h3>
            <p className="text-xs text-neutral-500">Key industry terms and formulas explained</p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-neutral-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <div
            key={item.term}
            className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/50 space-y-1"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-white">{item.term}</div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {item.def}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
