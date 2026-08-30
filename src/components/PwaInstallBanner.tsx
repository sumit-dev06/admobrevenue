import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check localStorage / sessionStorage
    const permanentlyInstalled = localStorage.getItem("adrev_pwa_installed") === "true";
    if (permanentlyInstalled) return;

    const sessionDismissed = sessionStorage.getItem("adrev_pwa_session_dismissed") === "true";
    const lastDismissedTime = localStorage.getItem("adrev_pwa_dismissed_at");

    // If dismissed recently in the last 24 hours, don't show yet
    if (sessionDismissed) return;
    if (lastDismissedTime) {
      const hoursSinceDismiss = (Date.now() - parseInt(lastDismissedTime)) / (1000 * 60 * 60);
      if (hoursSinceDismiss < 24) return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Delay displaying the banner slightly so visitor first sees the calculator
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);

      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsVisible(false);
      setIsInstalled(true);
      localStorage.setItem("adrev_pwa_installed", "true");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("adrev_pwa_installed", "true");
        setIsVisible(false);
      } else {
        // User clicked cancel in native dialog; remember for this session
        sessionStorage.setItem("adrev_pwa_session_dismissed", "true");
        localStorage.setItem("adrev_pwa_dismissed_at", Date.now().toString());
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error("PWA install error:", err);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for this session, and will remind on subsequent visit after 24h
    sessionStorage.setItem("adrev_pwa_session_dismissed", "true");
    localStorage.setItem("adrev_pwa_dismissed_at", Date.now().toString());
  };

  if (!isVisible || isInstalled) return null;

  return (
    <aside
      aria-label="Install Ad Revenue Calculator App"
      className="bg-neutral-900 dark:bg-neutral-950 text-white border-b border-dashed border-emerald-500/40 px-3 py-2 sm:py-2.5 transition-all duration-300 font-mono text-xs z-50 sticky top-0 shadow-md"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* App Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-dashed border-emerald-500/50 flex items-center justify-center shrink-0 text-emerald-400">
            <Smartphone className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs truncate">
                Ad Revenue Calculator
              </span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-dashed border-emerald-500/40">
                Installable App
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 dark:text-neutral-400 truncate font-sans">
              Add to Home Screen for instant 1-tap calculation & offline use
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label="Install Ad Revenue Calculator on device"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Install App</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss install banner for now"
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Remind me later"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
