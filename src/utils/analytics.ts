// GA4 SPA helper — sends a page_view on every client-side navigation.
// The base gtag('config', 'G-QM0YG2LXTC') in index.html already tracks the
// initial load; this covers pushState route changes (/adsense -> /youtube …)
// which GA4 would otherwise miss in this single-page app.
export const GA_MEASUREMENT_ID = "G-QM0YG2LXTC";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string, title?: string) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_title: title ?? document.title,
        page_location: window.location.href,
      });
    } else {
      // gtag.js blocked (ad-blocker) or not loaded yet — queue for later.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: path,
        page_title: title ?? (typeof document !== "undefined" ? document.title : path),
        page_location: window.location.href,
      });
    }
  } catch {
    // Analytics must never break the app.
  }
}
