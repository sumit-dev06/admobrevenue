import React from "react";
import { PlatformMode } from "../types";
import {
  Smartphone,
  Globe,
  Layers,
  Target,
  GitCompare,
  BarChart3,
} from "lucide-react";

interface ModeSelectorProps {
  activeMode: PlatformMode;
  onSelectMode: (mode: PlatformMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const modes: { id: PlatformMode; label: string; sub: string; icon: any; color: string; badge: string }[] = [
    {
      id: "admob",
      label: "Google AdMob",
      sub: "Mobile Apps (iOS & Android)",
      icon: Smartphone,
      color: "text-emerald-500",
      badge: "ARPDAU",
    },
    {
      id: "adsense",
      label: "Google AdSense",
      sub: "Websites & Content Blogs",
      icon: Globe,
      color: "text-blue-500",
      badge: "Page RPM",
    },
    {
      id: "portfolio",
      label: "Combined Media",
      sub: "Apps + Web Portfolio",
      icon: Layers,
      color: "text-amber-500",
      badge: "Multi-Asset",
    },
    {
      id: "goal",
      label: "Target Goal",
      sub: "Traffic Roadmap",
      icon: Target,
      color: "text-purple-500",
      badge: "Reverse",
    },
    {
      id: "compare",
      label: "A/B Comparator",
      sub: "Optimization Lift",
      icon: GitCompare,
      color: "text-rose-500",
      badge: "Delta",
    },
    {
      id: "benchmarks",
      label: "Benchmarks",
      sub: "2026 eCPM Rates",
      icon: BarChart3,
      color: "text-cyan-500",
      badge: "Directory",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={
                "group p-3 rounded-xl text-left transition-all border border-dashed " +
                (isActive
                  ? "bg-white dark:bg-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-xs"
                  : "bg-neutral-50/50 dark:bg-neutral-900/30 border-neutral-300 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-700")
              }
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={"w-4 h-4 " + (isActive ? m.color : "text-neutral-400")} />
                <span
                  className={
                    "text-[9px] font-mono uppercase px-1 py-0.5 rounded border border-dashed " +
                    (isActive
                      ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-bold"
                      : "border-neutral-300 dark:border-neutral-800 text-neutral-400")
                  }
                >
                  {m.badge}
                </span>
              </div>
              <div
                className={
                  "text-xs font-bold font-mono tracking-tight line-clamp-1 " +
                  (isActive
                    ? "text-neutral-950 dark:text-white"
                    : "text-neutral-700 dark:text-neutral-300")
                }
              >
                {m.label}
              </div>
              <div className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                {m.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
