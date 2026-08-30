import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-8 transition-colors text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500">
          <div>
            © {new Date().getFullYear()} admobrevenue.pages.dev · 2026 Engine
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cloudflare Pages Deployed</span>
            <span>·</span>
            <span>Client-Side Deterministic Math</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
