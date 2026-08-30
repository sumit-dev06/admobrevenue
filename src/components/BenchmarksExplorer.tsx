import React, { useState } from "react";
import { BENCHMARKS_DATA } from "../data/benchmarksData";
import { BarChart3, Search, Filter, Globe, Smartphone, TrendingUp } from "lucide-react";

export const BenchmarksExplorer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "website" | "app">("all");

  const filtered = BENCHMARKS_DATA.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch =
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.niche.toLowerCase().includes(search.toLowerCase()) ||
      item.topFormat.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                2025–2026 Industry RPM & eCPM Benchmark Directory
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Verified programmatic auction data by niche, format, and country tier
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilterType("all")}
              className={
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (filterType === "all"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              All Categories
            </button>
            <button
              onClick={() => setFilterType("website")}
              className={
                "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (filterType === "website"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Globe className="w-3 h-3 text-blue-500" />
              Web RPM
            </button>
            <button
              onClick={() => setFilterType("app")}
              className={
                "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all " +
                (filterType === "app"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
              }
            >
              <Smartphone className="w-3 h-3 text-emerald-500" />
              App eCPM
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search niche (e.g., Finance, SaaS, Rewarded, Casual Games, Legal)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Benchmarks Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold">
                <th className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">Category & Niche</th>
                <th className="py-3.5 px-4">Tier 1 (US / UK / CA)</th>
                <th className="py-3.5 px-4">Tier 2 (EU / LATAM)</th>
                <th className="py-3.5 px-4">Tier 3 (Asia / Africa)</th>
                <th className="py-3.5 px-4">Avg CTR</th>
                <th className="py-3.5 px-4">Top Monetizing Format</th>
                <th className="py-3.5 px-4 text-right">YoY Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-cyan-500" />
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-white">{item.category}</div>
                        <div className="text-[11px] text-neutral-500 line-clamp-1">{item.niche}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {item.tier1RpmOrEcpm}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-700 dark:text-neutral-300">
                    {item.tier2RpmOrEcpm}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {item.tier3RpmOrEcpm}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {item.avgCtr}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300 font-medium">
                    {item.topFormat}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-500">
                    {item.growthTrend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
