import React, { useState, useMemo } from "react";
import { CurrencyCode } from "../types";
import { formatCurrency } from "../utils/currency";

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
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState<number | null>(null);

  // SVG dimensions for 12-month area curve
  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxRevenue = useMemo(() => {
    const max = Math.max(...monthlyForecast.map((d) => d.revenue), 10);
    return Math.ceil(max * 1.15); // +15% headroom
  }, [monthlyForecast]);

  // Generate SVG path points
  const points = useMemo(() => {
    if (!monthlyForecast || monthlyForecast.length === 0) return [];
    return monthlyForecast.map((d, i) => {
      const x = padding.left + (i / (monthlyForecast.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.revenue / maxRevenue) * chartHeight;
      return { x, y, ...d };
    });
  }, [monthlyForecast, maxRevenue, chartWidth, chartHeight, padding.left, padding.top]);

  // Smooth cubic bezier line path
  const linePath = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Smooth area fill path
  const areaPath = useMemo(() => {
    if (!linePath || points.length === 0) return "";
    const bottomY = padding.top + chartHeight;
    return `${linePath} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
  }, [linePath, points, padding.top, chartHeight]);

  // Pie / Donut Chart Geometry
  const totalRevenue = useMemo(
    () => formatBreakdown.reduce((sum, item) => sum + item.revenue, 0),
    [formatBreakdown]
  );

  const pieSlices = useMemo(() => {
    let cumulativeAngle = -90; // Start at 12 o'clock
    return formatBreakdown.map((item, idx) => {
      const fraction = totalRevenue > 0 ? item.revenue / totalRevenue : 1 / formatBreakdown.length;
      const angle = fraction * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle = endAngle;

      // Coordinates for SVG Arc
      const radStart = (startAngle * Math.PI) / 180;
      const radEnd = (endAngle * Math.PI) / 180;

      const outerRadius = 70;
      const innerRadius = 42;

      const x1 = 100 + outerRadius * Math.cos(radStart);
      const y1 = 100 + outerRadius * Math.sin(radStart);
      const x2 = 100 + outerRadius * Math.cos(radEnd);
      const y2 = 100 + outerRadius * Math.sin(radEnd);

      const x3 = 100 + innerRadius * Math.cos(radEnd);
      const y3 = 100 + innerRadius * Math.sin(radEnd);
      const x4 = 100 + innerRadius * Math.cos(radStart);
      const y4 = 100 + innerRadius * Math.sin(radStart);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        "Z",
      ].join(" ");

      return {
        ...item,
        pathData,
        color: COLORS[idx % COLORS.length],
        percentage: Number(item.percentage).toFixed(1),
      };
    });
  }, [formatBreakdown, totalRevenue]);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
      {/* Header Tabs */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-neutral-100">
          Visual Breakdown
        </span>
        <div className="flex items-center gap-1 border border-dashed border-neutral-300 dark:border-neutral-800 p-0.5 rounded-lg text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("forecast")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === "forecast"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            12-Mo Curve
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("formats")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === "formats"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Format Share
          </button>
        </div>
      </div>

      {activeTab === "forecast" ? (
        <div className="space-y-2">
          {/* Instant Native Vector Area Chart */}
          <div className="relative w-full h-52 sm:h-56 select-none">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full overflow-visible"
              aria-label="12-Month Projected Revenue Curve"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = padding.top + chartHeight * ratio;
                const val = maxRevenue * (1 - ratio);
                return (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      className="text-neutral-200 dark:text-neutral-800"
                    />
                    <text
                      x={padding.left - 6}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="currentColor"
                      className="text-neutral-400 font-mono"
                    >
                      {formatCurrency(val, currency).replace(/\.00$/, "").slice(0, 8)}
                    </text>
                  </g>
                );
              })}

              {/* Area Gradient */}
              {areaPath && <path d={areaPath} fill="url(#curveGradient)" />}

              {/* Line Stroke */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Data Nodes */}
              {points.map((p, idx) => {
                const isHovered = hoveredMonthIndex === idx;
                return (
                  <g key={idx} className="cursor-pointer">
                    {/* X-Axis Month Labels */}
                    <text
                      x={p.x}
                      y={height - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="currentColor"
                      className={`font-mono transition-colors ${
                        isHovered ? "font-bold text-emerald-500" : "text-neutral-400"
                      }`}
                    >
                      {p.month}
                    </text>

                    {/* Point Circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5.5 : 3.5}
                      className="fill-white dark:fill-neutral-900 stroke-emerald-500 transition-all"
                      strokeWidth={isHovered ? "3" : "2"}
                      onMouseEnter={() => setHoveredMonthIndex(idx)}
                      onTouchStart={() => setHoveredMonthIndex(idx)}
                    />

                    {/* Transparent Hit Area for Touch on Mobile */}
                    <rect
                      x={p.x - 20}
                      y={0}
                      width={40}
                      height={height}
                      fill="transparent"
                      onMouseEnter={() => setHoveredMonthIndex(idx)}
                      onTouchStart={() => setHoveredMonthIndex(idx)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Box */}
            {hoveredMonthIndex !== null && points[hoveredMonthIndex] && (
              <div
                className="absolute -top-3 z-10 -translate-x-1/2 bg-neutral-900/95 dark:bg-neutral-800/95 border border-dashed border-neutral-700 text-white px-2.5 py-1 rounded-lg shadow-xl text-xs font-mono pointer-events-none transition-all"
                style={{
                  left: `${(points[hoveredMonthIndex].x / width) * 100}%`,
                }}
              >
                <div className="text-[10px] text-neutral-400">
                  {points[hoveredMonthIndex].month} Forecast ({points[hoveredMonthIndex].multiplier}x)
                </div>
                <div className="font-bold text-emerald-400 text-xs">
                  {formatCurrency(points[hoveredMonthIndex].revenue, currency)}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
            <span>Q1 Slump (Ad Reset)</span>
            <span className="text-emerald-500 font-bold">Q4 Surge Peak (Holiday Ad Spend)</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Instant Native Vector Donut Chart */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-44 h-44 shrink-0">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                {pieSlices.map((slice, idx) => {
                  const isHovered = hoveredSliceIndex === idx;
                  return (
                    <path
                      key={idx}
                      d={slice.pathData}
                      fill={slice.color}
                      className="transition-transform duration-150 cursor-pointer"
                      style={{
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                        transformOrigin: "100px 100px",
                      }}
                      onMouseEnter={() => setHoveredSliceIndex(idx)}
                      onTouchStart={() => setHoveredSliceIndex(idx)}
                    />
                  );
                })}
              </svg>

              {/* Center Donut Hole Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Total</span>
                <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                  {formatCurrency(totalRevenue, currency).replace(/\.00$/, "")}
                </span>
              </div>
            </div>

            {/* Formatted Percentage Breakdown List */}
            <div className="w-full space-y-1.5 font-mono">
              {pieSlices.map((item, idx) => {
                const isHovered = hoveredSliceIndex === idx;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredSliceIndex(idx)}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all text-xs ${
                      isHovered
                        ? "border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800/80"
                        : "border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-neutral-700 dark:text-neutral-300 truncate text-[11px]">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                        {formatCurrency(item.revenue, currency)}
                      </span>
                      {/* Clean 1-decimal percentage display */}
                      <span className="font-bold text-neutral-950 dark:text-white text-xs bg-neutral-200/70 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
