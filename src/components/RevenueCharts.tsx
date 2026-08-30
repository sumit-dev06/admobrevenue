import React, { useState, useEffect } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

interface RevenueChartsProps {
  formatBreakdown: { name: string; revenue: number; percentage: number }[];
  monthlyForecast: { month: string; revenue: number; multiplier: number }[];
  deviceBreakdown?: { device: string; revenue: number; percentage: number }[];
  currency: CurrencyCode;
}

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"];

export const RevenueCharts: React.FC<RevenueChartsProps> = ({
  formatBreakdown,
  monthlyForecast,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<"forecast" | "formats">("forecast");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-dashed border-neutral-700 text-white px-3 py-1.5 rounded-lg shadow-md text-xs font-mono">
          <div className="text-neutral-400">{label || payload[0].name}</div>
          <div className="text-emerald-400 font-bold">
            {formatCurrency(payload[0].value, currency)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
      {/* Header Tabs */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-neutral-100">
          Visual Breakdown
        </span>
        <div className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab("forecast")}
            className={
              "px-2.5 py-0.5 rounded-md transition-all " +
              (activeTab === "forecast"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
            }
          >
            12-Mo Curve
          </button>
          <button
            onClick={() => setActiveTab("formats")}
            className={
              "px-2.5 py-0.5 rounded-md transition-all " +
              (activeTab === "formats"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white")
            }
          >
            Format Share
          </button>
        </div>
      </div>

      {!isMounted ? (
        <div className="h-56 w-full flex items-center justify-center text-xs font-mono text-neutral-400">
          Loading interactive charts...
        </div>
      ) : activeTab === "forecast" ? (
        <div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#888888" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 9, fill: "#888888" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => "$" + val}
                />
                <Tooltip content={customTooltip} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={0.15}
                  fill="#10B981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
            <span>Q1 Slump</span>
            <span className="text-emerald-500 font-bold">Q4 Surge Peak</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatBreakdown}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  innerRadius={35}
                  paddingAngle={2}
                >
                  {formatBreakdown.map((_, index) => (
                    <Cell key={"cell-" + index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
            {formatBreakdown.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-1.5 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800"
              >
                <span className="text-neutral-600 dark:text-neutral-400 truncate text-[11px]">
                  {item.name}
                </span>
                <span className="font-bold text-neutral-900 dark:text-white text-[11px] ml-1">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
