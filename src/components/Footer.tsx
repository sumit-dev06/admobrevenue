import React from "react";

export const Footer = React.memo(() => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://admobrevenue.pages.dev/';
  
  return (
    <footer className="border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-12 transition-colors text-xs font-mono mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand & Links */}
          <div className="space-y-4">
            <div className="font-black text-sm text-neutral-900 dark:text-white">AdMobRevenue</div>
            <p className="text-neutral-500">Deterministic forecasting engine for mobile and web publishers.</p>
            <div className="flex flex-col space-y-2 text-neutral-600 dark:text-neutral-400">
              <a href="/?page=admob" className="hover:text-emerald-500 transition-colors">AdMob Calculator</a>
              <a href="/?page=adsense" className="hover:text-blue-500 transition-colors">AdSense Calculator</a>
              <a href="/?page=about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About Us</a>
              <a href="/?page=contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Column 2: Legal & Trust */}
          <div className="space-y-4">
            <div className="font-bold text-neutral-900 dark:text-white">Legal & Compliance</div>
            <div className="flex flex-col space-y-2 text-neutral-600 dark:text-neutral-400">
              <a href="/?page=privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="/?page=terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</a>
              <a href="/?page=disclaimer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Disclaimer & Methodology</a>
            </div>
          </div>

          {/* Column 3: Share */}
          <div className="space-y-4">
            <div className="font-bold text-neutral-900 dark:text-white">Share</div>
            <div className="flex items-center gap-3">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check+out+this+AdMob+%26+AdSense+Revenue+Calculator!`}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#1DA1F2] hover:text-white transition-all"
                aria-label="Share on X (Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#4267B2] hover:text-white transition-all"
                aria-label="Share on Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#0077b5] hover:text-white transition-all"
                aria-label="Share on LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 pt-8 border-t border-dashed border-neutral-200 dark:border-neutral-800">
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
});
