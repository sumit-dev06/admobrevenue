import React, { useEffect } from "react";

interface NotFoundPageProps {
  requestedPath?: string;
  onNavigateHome?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ requestedPath, onNavigateHome }) => {
  const path = requestedPath || (typeof window !== "undefined" ? window.location.pathname : "/unknown");

  useEffect(() => {
    // Set noindex for 404 and update title
    if (typeof document !== "undefined") {
      document.title = "404 - Page Not Found | RealTools";

      // Add noindex meta for this 404 page (prevent Google indexing garbage URLs)
      let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      const originalContent = metaRobots?.content || null;
      if (metaRobots) {
        metaRobots.content = "noindex, nofollow";
      } else {
        metaRobots = document.createElement("meta");
        metaRobots.name = "robots";
        metaRobots.content = "noindex, nofollow";
        document.head.appendChild(metaRobots);
      }

      return () => {
        if (originalContent && metaRobots) {
          metaRobots.content = originalContent;
        } else if (metaRobots && metaRobots.parentElement) {
          // remove dynamically added tag
          metaRobots.remove();
        }
      };
    }
  }, []);

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-8 sm:p-10 max-w-lg w-full bg-neutral-50/50 dark:bg-neutral-900/30">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          404 — Page Not Found
        </div>

        <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-neutral-950 dark:text-white mb-3">
          404
        </h1>
        <h2 className="text-base sm:text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          This page doesn&apos;t exist
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
          The URL <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-rose-600 dark:text-rose-400 text-xs break-all">{path}</code> is not a valid calculator page.
        </p>
        <p className="text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-6">
          Valid pages: <span className="text-neutral-800 dark:text-neutral-300">/adsense</span>, <span className="text-neutral-800 dark:text-neutral-300">/youtube</span>, <span className="text-neutral-800 dark:text-neutral-300">/tiktok</span>, <span className="text-neutral-800 dark:text-neutral-300">/twitch</span>, <span className="text-neutral-800 dark:text-neutral-300">/kick</span>
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer border border-dashed border-neutral-700 dark:border-neutral-300"
          >
            ← Back to Calculator
          </button>
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-mono font-semibold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-center"
          >
            Go to Homepage
          </a>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb3">Try one of our calculators</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <a href="/adsense" className="px-3 py-1.5 rounded-full border border-dashed border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">AdSense</a>
            <a href="/youtube" className="px-3 py-1.5 rounded-full border border-dashed border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-mono font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">YouTube</a>
            <a href="/tiktok" className="px-3 py-1.5 rounded-full border border-dashed border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">TikTok</a>
            <a href="/twitch" className="px-3 py-1.5 rounded-full border border-dashed border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-xs font-mono font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">Twitch</a>
            <a href="/kick" className="px-3 py-1.5 rounded-full border border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">Kick</a>
          </div>
        </div>
      </div>

      {/* SEO: Help search engines understand this is a 404 */}
      <p className="mt-6 text-[11px] font-mono text-neutral-400 dark:text-neutral-600 max-w-md">
        If you typed this URL manually, please check the spelling. If you followed a broken link, please report it via our contact page.
      </p>
    </div>
  );
};

export default NotFoundPage;
