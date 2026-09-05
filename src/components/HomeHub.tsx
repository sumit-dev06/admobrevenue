import React, { useMemo, useState } from "react";
import { Search, ArrowUpRight, ShieldCheck, Languages, RefreshCw } from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  YouTubeIcon,
  TikTokIcon,
  TwitchIcon,
  KickIcon,
  RunwayIcon,
} from "./PlatformIcons";

interface HomeHubProps {
  onSelect: (platform: string) => void;
}

interface ToolCard {
  id: string;
  name: string;
  outcome: string;
  chips: string[];
  icon: React.FC<{ className?: string }>;
  iconWrap: string;
  accent: string;
}

const TOOLS: ToolCard[] = [
  {
    id: "adsense",
    name: "AdSense Calculator",
    outcome: "See what 50,000 pageviews actually pay across 26 niches.",
    chips: ["Page RPM", "26 niches", "AdBlock loss"],
    icon: AdSenseIcon,
    iconWrap: "bg-blue-500/10 text-blue-500",
    accent: "hover:border-blue-500",
  },
  {
    id: "admob",
    name: "AdMob Calculator",
    outcome: "Forecast app ARPDAU and eCPM by format and mediation.",
    chips: ["ARPDAU", "Rewarded $35", "+30% lift"],
    icon: AdMobIcon,
    iconWrap: "bg-emerald-500/10 text-emerald-500",
    accent: "hover:border-emerald-500",
  },
  {
    id: "youtube",
    name: "YouTube Calculator",
    outcome: "Long-form, Shorts, memberships and sponsors in one number.",
    chips: ["RPM by niche", "Mid-roll +45%", "Shorts pool"],
    icon: YouTubeIcon,
    iconWrap: "bg-red-500/10 text-red-500",
    accent: "hover:border-red-500",
  },
  {
    id: "runway",
    name: "Money Runway Calculator",
    outcome: "How many years will your savings survive monthly withdrawals?",
    chips: ["Breakeven/mo", "Inflation step-up", "SWP math"],
    icon: RunwayIcon,
    iconWrap: "bg-amber-500/10 text-amber-500",
    accent: "hover:border-amber-500",
  },
  {
    id: "tiktok",
    name: "TikTok Calculator",
    outcome: "Creator Rewards, qualified views and LIVE diamonds, decoded.",
    chips: ["$0.40–$1.10 RPM", "LIVE gifts", "Shop cut"],
    icon: TikTokIcon,
    iconWrap: "bg-cyan-500/10 text-cyan-500",
    accent: "hover:border-cyan-500",
  },
  {
    id: "twitch",
    name: "Twitch Calculator",
    outcome: "Subs, Partner Plus splits, AIP ads and Bits per hour.",
    chips: ["50/50–70/30", "AIP $4.50", "$0.01/bit"],
    icon: TwitchIcon,
    iconWrap: "bg-purple-500/10 text-purple-500",
    accent: "hover:border-purple-500",
  },
  {
    id: "kick",
    name: "Kick Calculator",
    outcome: "The 95/5 split and KCP hourly pay, side by side with Twitch.",
    chips: ["$4.74 net/sub", "$16–$40/hr", "100% tips"],
    icon: KickIcon,
    iconWrap: "bg-emerald-400/10 text-emerald-400",
    accent: "hover:border-emerald-400",
  },
];

const POPULAR_SEARCHES: { label: string; platform: string }[] = [
  { label: "how much does youtube pay per 1000 views", platform: "youtube" },
  { label: "adsense page rpm calculator", platform: "adsense" },
  { label: "how long will 1 crore last", platform: "runway" },
  { label: "tiktok creator rewards per 1000 views", platform: "tiktok" },
  { label: "twitch sub calculator 70/30 split", platform: "twitch" },
  { label: "kick 95/5 vs twitch earnings", platform: "kick" },
  { label: "admob arpdau by ad format", platform: "admob" },
  { label: "how long will $1 million last in retirement", platform: "runway" },
];

export const HomeHub: React.FC<HomeHubProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.outcome.toLowerCase().includes(q) ||
        t.chips.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onSelect(id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero — static CSS mesh gradient + glass search (zero JS libs) */}
      <section className="relative overflow-hidden rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900"
          style={{
            backgroundImage:
              "radial-gradient(520px 260px at 12% 8%, rgba(16,185,129,0.14), transparent 65%), radial-gradient(560px 280px at 88% 12%, rgba(245,158,11,0.13), transparent 65%), radial-gradient(640px 320px at 50% 110%, rgba(59,130,246,0.10), transparent 65%)",
          }}
        />
        <div className="relative p-6 sm:p-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            RealTools — 7 free calculators
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-neutral-950 dark:text-white leading-tight">
            Every money question,
            <br />
            answered with <span className="text-emerald-600 dark:text-emerald-400">your numbers</span>.
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Ad revenue, streaming payouts and savings runway — computed in your browser from 2026
            benchmarks. No sign-up. Nothing leaves your device.
          </p>

          {/* Glass search */}
          <div className="mt-5 relative max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <label htmlFor="hub-search" className="sr-only">Search calculators</label>
            <input
              id="hub-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “youtube rpm”, “runway”, “kick split”…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            <span><strong className="text-neutral-900 dark:text-white">7</strong> tools</span>
            <span><strong className="text-neutral-900 dark:text-white">8</strong> languages</span>
            <span><strong className="text-neutral-900 dark:text-white">0</strong> data stored</span>
            <span><strong className="text-neutral-900 dark:text-white">2026</strong> benchmarks</span>
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section aria-label="All calculators">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
          {query ? `${filtered.length} result${filtered.length === 1 ? "" : "s"}` : "All calculators"}
        </h2>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl">
            No calculator matches “{query}”. Try “rpm”, “subs” or “runway”.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.id}
                  href={`/${tool.id}`}
                  onClick={(e) => go(e, tool.id)}
                  className={`group p-5 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all hover:shadow-lg hover:-translate-y-0.5 ${tool.accent}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2 rounded-xl ${tool.iconWrap}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-sm font-mono font-black text-neutral-950 dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {tool.outcome}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tool.chips.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: ShieldCheck, title: "Private by design", desc: "Every calculation runs locally. Your inputs never touch a server." },
          { icon: RefreshCw, title: "2026 benchmarks", desc: "Niche RPMs, platform splits and seasonality from current data." },
          { icon: Languages, title: "8 languages", desc: "Full UI plus per-country keywords — not machine-translated chrome." },
        ].map((f) => (
          <div key={f.title} className="p-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <f.icon className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <h3 className="mt-2 text-xs font-mono font-bold text-neutral-900 dark:text-white">{f.title}</h3>
            <p className="mt-1 text-[11px] font-mono text-neutral-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Popular searches — internal SEO links */}
      <section className="p-5 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
          Popular right now
        </h2>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {POPULAR_SEARCHES.map((s) => (
            <li key={s.label}>
              <a
                href={`/${s.platform}`}
                onClick={(e) => go(e, s.platform)}
                className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                → {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
