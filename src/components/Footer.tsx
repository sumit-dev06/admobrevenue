import React from "react";
import { Globe, Smartphone, Heart, ShieldCheck, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white font-black text-base shadow-sm">
                $
              </div>
              <span className="font-bold text-base text-neutral-900 dark:text-white tracking-tight">
                AdRev<span className="text-emerald-500">Pro</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                2026 Engine
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
              The world standard Google AdSense and Google AdMob revenue estimation engine. Verified across 25+ digital publishing categories, 190+ countries, and all modern mobile & web ad formats.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
              Calculators
            </div>
            <ul className="space-y-1.5 text-neutral-500 dark:text-neutral-400">
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">AdSense Website Calculator</a></li>
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">AdMob Mobile App Calculator</a></li>
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">Reverse Target Income Goal</a></li>
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">A/B Scenario Optimization</a></li>
            </ul>
          </div>

          {/* Data & Compliance */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
              Benchmark Data
            </div>
            <ul className="space-y-1.5 text-neutral-500 dark:text-neutral-400">
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">2026 RPM & eCPM Benchmarks</a></li>
              <li><a href="#faq-section" className="hover:text-emerald-500 transition-colors">Publisher Monetization FAQs</a></li>
              <li><a href="#root" className="hover:text-emerald-500 transition-colors">Monetization Glossary</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} AdRevPro. Estimates are for analytical forecasting based on programmatic publisher benchmarks. Google, AdSense, and AdMob are trademarks of Google LLC.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cloudflare Pages Deployed</span>
            <span>•</span>
            <span>100% Privacy Preserved (Client-Side)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
