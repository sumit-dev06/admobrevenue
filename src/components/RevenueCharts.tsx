import React, { useState } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { PieChart as PieIcon, BarChart2, TrendingUp } from "lucide-react";

interface RevenueChartsProps {
  formatBreakdown: { name: string; revenue: number; percentage: number }[];
  monthlyForecast: { month: string; revenue: number; multiplier: number }[];
  deviceBreakdown?: { device: string; revenue: number; percentage: number }[];
  currency: CurrencyCode;
}

const COLORS = [
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#F97316", // Orange
];

export const RevenueCharts: React.FC<RevenueChartsProps> = ({
  formatBreakdown,
  monthlyForecast,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<"forecast" | "formats">("forecast");

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded-xl shadow-xl text-xs">
          <div className="font-bold text-neutral-200 mb-0.5">{label || payload[0].name}</div>
          <div className="text-emerald-400 font-semibold font-mono">
            {formatCurrency(payload[0].value, currency)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      {/* Chart Tabs Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-5">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Revenue Visualizer
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Interactive breakdown and seasonality forecasts
          </p>
        </div>
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("forecast")}
            className={
              "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all " +
              (activeTab === "forecast"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200")
            }
          >
            <BarChart2 className="w-3.5 h-3.5" />
            12-Mo Seasonality
          </button>
          <button
            onClick={() => setActiveTab("formats")}
            className={
              "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all " +
              (activeTab === "formats"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200")
            }
          >
            <PieIcon className="w-3.5 h-3.5" />
            Format Share
          </button>
        </div>
      </div>

      {/* Active Chart View */}
      {activeTab === "forecast" ? (
        <div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888888" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#888888" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => "$" + val}
                />
                <Tooltip content={customTooltip} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 px-2">
            <span>Q1 Post-Holiday Slump</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Q4 Black Friday & Holiday Surge Peak</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatBreakdown}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {formatBreakdown.map((_, index) => (
                    <Cell key={"cell-" + index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {formatBreakdown.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[140px]">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(item.revenue, currency)}
                  </span>
                  <span className="text-neutral-400 text-[11px] w-8 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
