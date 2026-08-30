import React, { useState } from "react";
import { CurrencyCode, PlatformMode } from "../types";
import { formatCurrency } from "../utils/currency";
import {
  TrendingUp,
  Share2,
  Download,
  Code2,
  ChevronUp,
  X,
  Sparkles,
  Layers,
} from "lucide-react";

interface MobileStickyBarProps {
  activeMode: PlatformMode;
  currency: CurrencyCode;
  monthlyRevenue: number;
  rateLabel: string;
  rateValue: string;
  onOpenExport: () => void;
  onOpenEmbed: () => void;
  onShare: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currency,
  monthlyRevenue,
  rateLabel,
  rateValue,
  onOpenExport,
  onOpenEmbed,
  onShare,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Quick Action Drawer Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Action Drawer */}
      {isMenuOpen && (
        <div className="fixed bottom-20 left-4 right-4 z-50 p-4 bg-neutral-900 border border-neutral-700 text-white rounded-3xl shadow-2xl space-y-3 lg:hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="text-xs font-bold text-neutral-300">Quick Actions</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onShare();
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Share</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenExport();
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenEmbed();
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium gap-1.5 transition-colors"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Embed</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Sticky Bar */}
      <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <div className="flex items-center justify-between bg-neutral-900/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 text-white px-4 py-2.5 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[10px] text-neutral-400 font-medium leading-none">
                Est. Monthly Earnings
              </div>
              <div className="text-base font-black font-mono text-emerald-400 leading-tight mt-0.5">
                {formatCurrency(monthlyRevenue, currency)}
                <span className="text-[10px] text-neutral-400 font-sans ml-1">/mo</span>
              </div>
            </div>
            <div className="h-6 w-px bg-neutral-700/80" />
            <div className="text-[10px]">
              <span className="text-neutral-400">{rateLabel}: </span>
              <span className="font-mono font-bold text-emerald-300">{rateValue}</span>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
          >
            <span>Options</span>
            <ChevronUp className={"w-3.5 h-3.5 transition-transform " + (isMenuOpen ? "rotate-180" : "")} />
          </button>
        </div>
      </div>
    </>
  );
};
