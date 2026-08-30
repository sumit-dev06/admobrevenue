import React, { useState } from "react";
import { BENCHMARKS_DATA } from "../data/benchmarksData";
import { BenchmarkItem } from "../types";
import { BarChart3, Search } from "lucide-react";

export const BenchmarksExplorer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "website" | "app">("all");

  const filtered = BENCHMARKS_DATA.filter((item: BenchmarkItem) => {
    const matchesSearch =
      item.niche.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4 font-mono text-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-500" />
          <span className="font-bold uppercase text-neutral-900 dark:text-white">
            2025–2026 Industry Benchmark Directory
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Type */}
          <div className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-700 p-0.5 rounded-lg text-[10px]">
            <button
              onClick={() => setFilterType("all")}
              className={"px-2 py-0.5 rounded " + (filterType === "all" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold" : "text-neutral-500")}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("app")}
              className={"px-2 py-0.5 rounded " + (filterType === "app" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold" : "text-neutral-500")}
            >
              Apps
            </button>
            <button
              onClick={() => setFilterType("website")}
              className={"px-2 py-0.5 rounded " + (filterType === "website" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold" : "text-neutral-500")}
            >
              Web
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search benchmarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none text-neutral-900 dark:text-white"
            />
            <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 uppercase">
              <th className="py-2 pr-3">Category / Niche</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Tier 1 Rate</th>
              <th className="py-2 px-3">Tier 2 Rate</th>
              <th className="py-2 px-3">Tier 3 Rate</th>
              <th className="py-2 pl-3">Avg CTR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800 text-[11px]">
            {filtered.slice(0, 12).map((b: BenchmarkItem, idx: number) => (
              <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                <td className="py-2.5 pr-3 font-bold text-neutral-900 dark:text-white">
                  <div>{b.category}</div>
                  <div className="text-[10px] text-neutral-400 font-normal">{b.niche}</div>
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={
                      "px-1.5 py-0.5 rounded text-[9px] font-bold border border-dashed " +
                      (b.type === "app"
                        ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                        : "border-blue-500/50 text-blue-600 dark:text-blue-400")
                    }
                  >
                    {b.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{b.tier1RpmOrEcpm}</td>
                <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">{b.tier2RpmOrEcpm}</td>
                <td className="py-2.5 px-3 text-neutral-500">{b.tier3RpmOrEcpm}</td>
                <td className="py-2.5 pl-3 text-neutral-600 dark:text-neutral-400">{b.avgCtr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
