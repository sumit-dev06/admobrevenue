// GA4 SPA helper — sends a page_view on every client-side navigation.
// The base gtag('config', 'G-QM0YG2LXTC') in index.html already tracks the
// initial load; this covers pushState route changes (/adsense -> /youtube …)
// which GA4 would otherwise miss in this single-page app.
export const GA_MEASUREMENT_ID = "G-L9P76WQ3E3";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string, title?: string) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
    }
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    });
  } catch {
    // Analytics must never break the app.
  }
}
