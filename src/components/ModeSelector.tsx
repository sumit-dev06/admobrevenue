import React from "react";
import { PlatformMode } from "../types";
import {
  Globe,
  Smartphone,
  Layers,
  Target,
  GitCompare,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface ModeSelectorProps {
  activeMode: PlatformMode;
  onSelectMode: (mode: PlatformMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const modes: { id: PlatformMode; label: string; sub: string; icon: any; color: string; badge?: string }[] = [
    {
      id: "adsense",
      label: "Google AdSense",
      sub: "Websites & Content Blogs",
      icon: Globe,
      color: "text-blue-500",
      badge: "Page RPM",
    },
    {
      id: "admob",
      label: "Google AdMob",
      sub: "iOS & Android Apps",
      icon: Smartphone,
      color: "text-emerald-500",
      badge: "ARPDAU / eCPM",
    },
    {
      id: "portfolio",
      label: "Combined Media",
      sub: "Web + Mobile Ecosystem",
      icon: Layers,
      color: "text-amber-500",
      badge: "Multi-Asset",
    },
    {
      id: "goal",
      label: "Reverse Target Goal",
      sub: "Calculate Required Traffic",
      icon: Target,
      color: "text-purple-500",
      badge: "Roadmap",
    },
    {
      id: "compare",
      label: "A/B Optimization",
      sub: "Baseline vs Optimized Setup",
      icon: GitCompare,
      color: "text-rose-500",
      badge: "Revenue Lift",
    },
    {
      id: "benchmarks",
      label: "Industry Benchmarks",
      sub: "2025–2026 Live eCPM & RPM",
      icon: BarChart3,
      color: "text-cyan-500",
      badge: "Database",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-1.5 bg-neutral-100 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 shadow-inner">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={
                "relative group flex flex-col items-start p-3 rounded-xl text-left transition-all duration-200 " +
                (isActive
                  ? "bg-white dark:bg-neutral-800 shadow-md shadow-neutral-900/5 dark:shadow-black/40 border border-neutral-200 dark:border-neutral-700/80 ring-1 ring-emerald-500/30"
                  : "hover:bg-white/60 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400")
              }
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div
                  className={
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors " +
                    (isActive
                      ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      : "bg-neutral-200/60 dark:bg-neutral-800/60 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700")
                  }
                >
                  <Icon className={"w-4 h-4 " + m.color} />
                </div>
                {m.badge && (
                  <span
                    className={
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded " +
                      (isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                        : "bg-neutral-200/50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400")
                    }
                  >
                    {m.badge}
                  </span>
                )}
              </div>
              <span
                className={
                  "text-xs font-bold tracking-tight line-clamp-1 " +
                  (isActive
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white")
                }
              >
                {m.label}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                {m.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
