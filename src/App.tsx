import React, { useState, useEffect, useMemo, useRef, startTransition, Suspense, lazy } from "react";
import {
  CurrencyCode,
  AdSenseInputs,
  AdMobInputs,
  YouTubeInputs,
  TikTokInputs,
  TwitchInputs,
  KickInputs,
  RunwayInputs,
} from "./types";
import { SupportedLanguage } from "./i18n/types";
import { LanguageProvider, useTranslation } from "./i18n/LanguageContext";
import { calculateAdSenseRevenue, calculateAdMobRevenue } from "./utils/adCalculations";
import { formatCurrency } from "./utils/currency";
import {
  calculateYouTubeRevenue,
  calculateTikTokRevenue,
  calculateTwitchRevenue,
  calculateKickRevenue,
} from "./utils/creatorCalculations";
import { copyShareableLink } from "./utils/export";
import { Navbar } from "./components/Navbar";
import { AdMobCalculator } from "./components/AdMobCalculator";
import { AdSenseCalculator } from "./components/AdSenseCalculator";
import { RevenueSummaryCard } from "./components/RevenueSummaryCard";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { PwaInstallBanner } from "./components/PwaInstallBanner";
import { Footer } from "./components/Footer";

// SEO-critical sections: eager for SSR crawlability (H2s must be in HTML)
import { OptimizationTips } from "./components/OptimizationTips";
import { HomeHub } from "./components/HomeHub";
import { RunwaySummary, RunwayBreakdown, RunwaySeoSection } from "./components/RunwayCalculator";
import { FormulaDeepDive } from "./components/FormulaDeepDive";
import { EditorialSeoSection } from "./components/EditorialSeoSection";
import { SeoFaqSection } from "./components/SeoFaqSection";
import { ComprehensiveGuide } from "./components/ComprehensiveGuide";
import { GlossarySection } from "./components/GlossarySection";
// Lazy remaining heavy below-the-fold / modals for performance
const YouTubeCalculator = lazy(() => import("./components/YouTubeCalculator").then(m => ({ default: m.YouTubeCalculator })));
const TikTokCalculator = lazy(() => import("./components/TikTokCalculator").then(m => ({ default: m.TikTokCalculator })));
const TwitchCalculator = lazy(() => import("./components/TwitchCalculator").then(m => ({ default: m.TwitchCalculator })));
const KickCalculator = lazy(() => import("./components/KickCalculator").then(m => ({ default: m.KickCalculator })));
const RunwayCalculator = lazy(() => import("./components/RunwayForm").then(m => ({ default: m.RunwayCalculator })));
const RevenueCharts = lazy(() => import("./components/RevenueCharts").then(m => ({ default: m.RevenueCharts })));
const EmbedWidgetModal = lazy(() => import("./components/EmbedWidgetModal").then(m => ({ default: m.EmbedWidgetModal })));
const ExportReportModal = lazy(() => import("./components/ExportReportModal").then(m => ({ default: m.ExportReportModal })));
const AboutPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import("./components/TrustPages").then(m => ({ default: m.DisclaimerPage })));

import {
  CheckCircle2,
} from "lucide-react";
import {
  AdMobIcon,
  AdSenseIcon,
  TikTokIcon,
  YouTubeIcon,
  TwitchIcon,
  KickIcon,
} from "./components/PlatformIcons";

const DEFAULT_ADMOB_INPUTS: AdMobInputs = {
  mode: "quick",
  dau: 1000,
  categoryId: "hypercasual-games",
  accountCountry: "IN",
  targetCountry: "IN",
  geoDistribution: { tier1: 0, tier2: 0, tier3: 100 },
  platformSplit: { ios: 30, android: 70 },
  sessionsPerUserPerDay: 3.5,
  sessionDurationMinutes: 5.0,
  adFormats: {
    rewardedVideo: { enabled: true, impressionsPerUserPerDay: 2.0 },
    interstitial: { enabled: false, impressionsPerUserPerSession: 1.0 },
    appOpen: { enabled: false, impressionsPerUserPerDay: 1.0 },
    rewardedInterstitial: { enabled: false, impressionsPerUserPerDay: 0.5 },
    native: { enabled: false, impressionsPerUserPerDay: 0 },
    banner: { enabled: false, refreshIntervalSeconds: 30, showPerSessionMinutes: 4.0 },
  },
  hasMediation: false,
  fillRate: 95,
  selectedMonth: new Date().getMonth(),
  useSeasonality: true,
};

const DEFAULT_ADSENSE_INPUTS: AdSenseInputs = {
  mode: "quick",
  monthlyPageviews: 50000,
  pagesPerVisit: 1.8,
  categoryId: "tech-software-ai",
  accountCountry: "US",
  targetCountry: "ALL",
  geoDistribution: { tier1: 60, tier2: 25, tier3: 15 },
  deviceDistribution: { mobile: 65, desktop: 30, tablet: 5 },
  selectedUnits: {
    leaderboard: 1,
    inArticle: 2,
    sidebar: 1,
    anchorAd: true,
    vignetteAd: true,
    multiplexAd: 1,
  },
  adBlockerRate: 25,
  viewabilityRate: 75,
  selectedMonth: new Date().getMonth(),
  useSeasonality: true,
};

const DEFAULT_YOUTUBE_INPUTS: YouTubeInputs = {
  monthlyLongFormViews: 100000,
  monthlyShortsViews: 500000,
  nicheId: "tech-ai-software",
  enableMidrolls: true,
  activeMemberships: 50,
  monthlySuperChats: 100,
  monthlySponsorships: 1500,
  accountCountry: "US",
  targetCountry: "US",
  selectedMonth: new Date().getMonth(),
  useSeasonality: true,
};

const DEFAULT_TIKTOK_INPUTS: TikTokInputs = {
  monthlyViews: 500000,
  nicheId: "tech-gadgets",
  overOneMinutePercent: 60,
  qualifiedViewRate: 45,
  monthlyLiveHours: 15,
  avgLiveCcv: 80,
  monthlyDiamondsEarned: 25000,
  monthlyShopAffiliateEarnings: 300,
  monthlySponsorships: 1000,
  accountCountry: "US",
  targetCountry: "US",
};

const DEFAULT_TWITCH_INPUTS: TwitchInputs = {
  avgConcurrentViewers: 85,
  streamHoursPerMonth: 80,
  tier1Subs: 120,
  tier2Subs: 10,
  tier3Subs: 3,
  partnerSplitRate: 0.50,
  adMinutesPerHour: 3.0,
  monthlyBits: 15000,
  monthlyDirectDonations: 250,
  monthlySponsorships: 500,
  accountCountry: "US",
  targetCountry: "US",
};

const DEFAULT_KICK_INPUTS: KickInputs = {
  avgConcurrentViewers: 85,
  streamHoursPerMonth: 80,
  activeSubs: 130,
  kcpEligible: true,
  monthlyTips: 350,
  monthlySponsorships: 500,
  accountCountry: "US",
  targetCountry: "US",
};

const DEFAULT_RUNWAY_INPUTS: RunwayInputs = {
  principal: 1000000,
  annualReturn: 8,
  monthlyWithdrawal: 8000,
  yearlyIncrease: 0,
  increaseMode: "percent",
  accountCountry: "US",
  targetCountry: "US",
};

interface AppContentProps {
  initialPlatform?: "home" | "admob" | "adsense" | "youtube" | "tiktok" | "twitch" | "kick" | "runway" | "about" | "contact" | "privacy" | "terms" | "disclaimer" | "404";
}

import { detectUserLocation, fetchUserLocationIP, LANGUAGE_DEFAULTS } from "./utils/geoDetection";
import { COUNTRIES } from "./data/geoTiers";
import { NotFoundPage } from "./components/NotFoundPage";

// Strict route validation — only whitelisted paths return 200, everything else is 404
const SUPPORTED_LANGUAGES = ["es", "ja", "fr", "de", "pt", "ko", "it"] as const;
const VALID_PLATFORMS = ["home", "admob", "adsense", "youtube", "tiktok", "twitch", "kick", "runway", "about", "contact", "privacy", "terms", "disclaimer"] as const;
const LOCALIZED_CALC_PLATFORMS = ["admob", "adsense", "youtube", "tiktok", "twitch", "kick", "runway"] as const;

function parseRoute(pathname: string): { platform: string; isNotFound: boolean } {
  const cleaned = pathname.toLowerCase().replace(/\/$/, "");
  const segments = cleaned.split("/").filter(Boolean);

  // /  → home hub (landing with all tools)
  if (segments.length === 0) return { platform: "home", isNotFound: false };

  // Single segment: /adsense, /youtube, /es, /about etc.
  if (segments.length === 1) {
    const s = segments[0];
    if ((VALID_PLATFORMS as readonly string[]).includes(s)) return { platform: s, isNotFound: false };
    if ((SUPPORTED_LANGUAGES as readonly string[]).includes(s)) return { platform: "home", isNotFound: false };
    return { platform: "404", isNotFound: true };
  }

  // Two segments: /es/adsense etc. — only lang + calc platform is valid
  if (segments.length === 2) {
    const [lang, plat] = segments;
    if (
      (SUPPORTED_LANGUAGES as readonly string[]).includes(lang) &&
      (LOCALIZED_CALC_PLATFORMS as readonly string[]).includes(plat)
    ) {
      return { platform: plat, isNotFound: false };
    }
    return { platform: "404", isNotFound: true };
  }

  // >2 segments always 404 (e.g. /youtube/foobar, /a/b/c)
  return { platform: "404", isNotFound: true };
}

function MainAppContent({ initialPlatform }: AppContentProps) {
  const { t, language, setLanguage } = useTranslation();
  const prevLangRef = useRef<SupportedLanguage>(language);

  // Currency (persisted, defaulted to user's location)
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_currency") as CurrencyCode;
      if (saved) return saved;
      return detectUserLocation().currencyCode;
    }
    return "USD";
  });

  // Dedicated Mode: hub "home" + calculators or trust pages + 404
  const [activePlatform, setActivePlatform] = useState<string>(() => {
    if (initialPlatform) return initialPlatform;
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page");
      if (pageParam && (VALID_PLATFORMS as readonly string[]).includes(pageParam.toLowerCase())) {
        return pageParam.toLowerCase();
      }
      const { platform } = parseRoute(window.location.pathname);
      return platform;
    }
    return "home";
  });

  // Modals
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // YouTube Inputs
  const [youtubeInputs, setYouTubeInputs] = useState<YouTubeInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const defaultInputs: YouTubeInputs = {
      ...DEFAULT_YOUTUBE_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
    };
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_youtube_inputs");
      if (saved) {
        try {
          return { ...defaultInputs, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse YouTube inputs", e);
        }
      }
    }
    return defaultInputs;
  });

  // TikTok Inputs
  const [tikTokInputs, setTikTokInputs] = useState<TikTokInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const defaultInputs: TikTokInputs = {
      ...DEFAULT_TIKTOK_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
    };
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_tiktok_inputs");
      if (saved) {
        try {
          return { ...defaultInputs, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse TikTok inputs", e);
        }
      }
    }
    return defaultInputs;
  });

  // Twitch Inputs
  const [twitchInputs, setTwitchInputs] = useState<TwitchInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const defaultInputs: TwitchInputs = {
      ...DEFAULT_TWITCH_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
    };
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_twitch_inputs");
      if (saved) {
        try {
          return { ...defaultInputs, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse Twitch inputs", e);
        }
      }
    }
    return defaultInputs;
  });

  // Runway Inputs
  const [runwayInputs, setRunwayInputs] = useState<RunwayInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const defaultInputs: RunwayInputs = {
      ...DEFAULT_RUNWAY_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
    };
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_runway_inputs");
      if (saved) {
        try {
          return { ...defaultInputs, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse Runway inputs", e);
        }
      }
    }
    return defaultInputs;
  });

  // Kick Inputs
  const [kickInputs, setKickInputs] = useState<KickInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const defaultInputs: KickInputs = {
      ...DEFAULT_KICK_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
    };
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_kick_inputs");
      if (saved) {
        try {
          return { ...defaultInputs, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse Kick inputs", e);
        }
      }
    }
    return defaultInputs;
  });

  // AdMob Inputs (Page 1) (persisted, defaulted to user location)
  const [adMobInputs, setAdMobInputs] = useState<AdMobInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const country = COUNTRIES.find((c) => c.code === detected.countryCode);
    const t1 = country?.tier === "tier1" ? 100 : 0;
    const t2 = country?.tier === "tier2" ? 100 : 0;
    const t3 = country?.tier === "tier3" ? 100 : (!country ? 100 : 0);

    const defaultInputs: AdMobInputs = {
      ...DEFAULT_ADMOB_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
      geoDistribution: { tier1: t1, tier2: t2, tier3: t3 },
    };

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("adrev_admob_inputs");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...defaultInputs,
            ...parsed,
            adFormats: {
              ...defaultInputs.adFormats,
              ...(parsed?.adFormats || {}),
              rewardedVideo: { ...defaultInputs.adFormats.rewardedVideo, ...(parsed?.adFormats?.rewardedVideo || {}) },
              interstitial: { ...defaultInputs.adFormats.interstitial, ...(parsed?.adFormats?.interstitial || {}) },
              appOpen: { ...defaultInputs.adFormats.appOpen, ...(parsed?.adFormats?.appOpen || {}) },
              rewardedInterstitial: { ...defaultInputs.adFormats.rewardedInterstitial, ...(parsed?.adFormats?.rewardedInterstitial || {}) },
              native: { ...defaultInputs.adFormats.native, ...(parsed?.adFormats?.native || {}) },
              banner: { ...defaultInputs.adFormats.banner, ...(parsed?.adFormats?.banner || {}) },
            },
            geoDistribution: { ...defaultInputs.geoDistribution, ...(parsed?.geoDistribution || {}) },
            platformSplit: { ...defaultInputs.platformSplit, ...(parsed?.platformSplit || {}) },
          };
        }
      } catch (e) {
        console.error("Failed to load saved AdMob inputs", e);
      }
    }
    return defaultInputs;
  });

  // AdSense Inputs (Page 2) (persisted, defaulted to user location)
  const [adSenseInputs, setAdSenseInputs] = useState<AdSenseInputs>(() => {
    const detected = typeof window !== "undefined" ? detectUserLocation() : { countryCode: "US", currencyCode: "USD" as CurrencyCode, language: "en" as SupportedLanguage };
    const country = COUNTRIES.find((c) => c.code === detected.countryCode);
    const t1 = country?.tier === "tier1" ? 100 : 0;
    const t2 = country?.tier === "tier2" ? 100 : 0;
    const t3 = country?.tier === "tier3" ? 100 : (!country ? 0 : 0);

    const defaultInputs: AdSenseInputs = {
      ...DEFAULT_ADSENSE_INPUTS,
      accountCountry: detected.countryCode,
      targetCountry: detected.countryCode,
      geoDistribution: { tier1: t1, tier2: t2, tier3: t3 },
    };

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("adrev_adsense_inputs");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...defaultInputs,
            ...parsed,
            selectedUnits: {
              ...defaultInputs.selectedUnits,
              ...(parsed?.selectedUnits || {}),
            },
            geoDistribution: { ...defaultInputs.geoDistribution, ...(parsed?.geoDistribution || {}) },
            deviceDistribution: { ...defaultInputs.deviceDistribution, ...(parsed?.deviceDistribution || {}) },
          };
        }
      } catch (e) {
        console.error("Failed to load saved AdSense inputs", e);
      }
    }
    return defaultInputs;
  });



  // Async IP geolocation refinement: overwrite timezone/locale guess if IP says different country and user hasn't manually locked
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasManualCurrency = localStorage.getItem("adrev_user_selected_currency") === "true";
    const hasManualCountry = localStorage.getItem("adrev_user_selected_country") === "true";
    if (hasManualCurrency && hasManualCountry) return;
    let cancelled = false;
    fetchUserLocationIP().then((ip) => {
      if (!ip || cancelled) return;
      const syncDetected = detectUserLocation();
      // Only update if IP differs from sync timezone guess (means user traveling / VPN / locale mismatch)
      if (!hasManualCurrency && ip.currencyCode !== syncDetected.currencyCode) {
        setCurrency((prev) => (prev === syncDetected.currencyCode ? ip.currencyCode : prev));
      }
      if (!hasManualCountry && ip.countryCode !== syncDetected.countryCode) {
        const tier = COUNTRIES.find((c) => c.code === ip.countryCode)?.tier;
        const tierDist =
          tier === "tier1" ? { tier1: 100, tier2: 0, tier3: 0 } :
          tier === "tier2" ? { tier1: 0, tier2: 100, tier3: 0 } :
          tier === "tier3" ? { tier1: 0, tier2: 0, tier3: 100 } :
          { tier1: 0, tier2: 100, tier3: 0 };
        setAdMobInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode, geoDistribution: tierDist } : prev);
        setAdSenseInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode, geoDistribution: tierDist } : prev);
        setYouTubeInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode } : prev);
        setTikTokInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode } : prev);
        setTwitchInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode } : prev);
        setKickInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode } : prev);
        setRunwayInputs((prev) => prev.accountCountry === syncDetected.countryCode ? { ...prev, accountCountry: ip.countryCode, targetCountry: ip.countryCode } : prev);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // When language is changed via toggle option, update currency and location ONLY IF not manually locked
  useEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      const defaults = LANGUAGE_DEFAULTS[language];
      if (defaults) {
        const hasManualCurrency = typeof window !== "undefined" && localStorage.getItem("adrev_user_selected_currency") === "true";
        if (!hasManualCurrency) {
          setCurrency(defaults.currencyCode);
        }

        const hasManualCountry = typeof window !== "undefined" && localStorage.getItem("adrev_user_selected_country") === "true";
        if (!hasManualCountry) {
          // AdMob
          setAdMobInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
            geoDistribution: defaults.tierDistribution,
          }));

          // AdSense
          setAdSenseInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
            geoDistribution: defaults.tierDistribution,
          }));

          // YouTube
          setYouTubeInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
          }));

          // TikTok
          setTikTokInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
          }));

          // Twitch
          setTwitchInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
          }));

          // Kick
          setKickInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
          }));

          // Runway
          setRunwayInputs((prev) => ({
            ...prev,
            accountCountry: defaults.countryCode,
            targetCountry: defaults.countryCode,
          }));
        }
      }
    }
  }, [language]);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_currency", newCurrency);
      localStorage.setItem("adrev_user_selected_currency", "true");
    }
  };

  const handleAdMobChange = (newInputs: AdMobInputs) => {
    if (newInputs.targetCountry !== adMobInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setAdMobInputs(newInputs);
  };

  const handleAdSenseChange = (newInputs: AdSenseInputs) => {
    if (newInputs.targetCountry !== adSenseInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setAdSenseInputs(newInputs);
  };

  const handleYouTubeChange = (newInputs: YouTubeInputs) => {
    if (newInputs.targetCountry !== youtubeInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setYouTubeInputs(newInputs);
  };

  const handleTikTokChange = (newInputs: TikTokInputs) => {
    if (newInputs.targetCountry !== tikTokInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setTikTokInputs(newInputs);
  };

  const handleTwitchChange = (newInputs: TwitchInputs) => {
    if (newInputs.targetCountry !== twitchInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setTwitchInputs(newInputs);
  };

  const handleKickChange = (newInputs: KickInputs) => {
    if (newInputs.targetCountry !== kickInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setKickInputs(newInputs);
  };

  const handleRunwayChange = (newInputs: RunwayInputs) => {
    if (newInputs.targetCountry !== runwayInputs.targetCountry) {
      if (typeof window !== "undefined") {
        localStorage.setItem("adrev_user_selected_country", "true");
      }
    }
    setRunwayInputs(newInputs);
  };

  // Persist platform, currency, and inputs to localStorage whenever changed
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_currency", currency);
    }
  }, [currency]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_admob_inputs", JSON.stringify(adMobInputs));
    }
  }, [adMobInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_adsense_inputs", JSON.stringify(adSenseInputs));
    }
  }, [adSenseInputs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync URL parameters & browser back/forward history — strict 404 handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get("page");
      if (pageParam && (VALID_PLATFORMS as readonly string[]).includes(pageParam.toLowerCase())) {
        setActivePlatform(pageParam.toLowerCase());
        return;
      }
      const { platform } = parseRoute(window.location.pathname);
      setActivePlatform(platform);
    };

    window.addEventListener("popstate", handlePopState);

    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get("page");
    if (pageParam && (VALID_PLATFORMS as readonly string[]).includes(pageParam.toLowerCase())) {
      setActivePlatform(pageParam.toLowerCase());
    } else if (pageParam) {
      // Invalid ?page= value → 404
      setActivePlatform("404");
    }
    const calcParam = searchParams.get("calc");
    if (calcParam) {
      try {
        const parsed = JSON.parse(atob(calcParam));
        if (parsed.adSenseInputs) setAdSenseInputs(parsed.adSenseInputs);
        if (parsed.adMobInputs) setAdMobInputs(parsed.adMobInputs);
        if (parsed.activePlatform) setActivePlatform(parsed.activePlatform);
        showToast("Configuration loaded from link!");
      } catch (e) {
        console.error("Failed to parse URL config", e);
      }
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePlatformChange = (p: string) => {
    setActivePlatform(p);
    if (typeof window !== "undefined") {
      const cleanPath = p === "home" ? "/" : `/${p}`;
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("page");
      const newQuery = urlParams.toString() ? `?${urlParams.toString()}` : "";
      window.history.pushState({}, "", `${cleanPath}${newQuery}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = () => {
    const success = copyShareableLink({
      activePlatform,
      adSenseInputs,
      adMobInputs,
    });
    if (success) {
      showToast("Link copied to clipboard!");
    }
  };

  // Calculations
  const admobResults = useMemo(() => calculateAdMobRevenue(adMobInputs), [adMobInputs]);
  const adSenseResults = useMemo(() => calculateAdSenseRevenue(adSenseInputs), [adSenseInputs]);
  const youtubeResults = useMemo(() => calculateYouTubeRevenue(youtubeInputs, currency), [youtubeInputs, currency]);
  const tikTokResults = useMemo(() => calculateTikTokRevenue(tikTokInputs, currency), [tikTokInputs, currency]);
  const twitchResults = useMemo(() => calculateTwitchRevenue(twitchInputs, currency), [twitchInputs, currency]);
  const kickResults = useMemo(() => calculateKickRevenue(kickInputs, currency), [kickInputs, currency]);

  // Persist all platform inputs
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_youtube_inputs", JSON.stringify(youtubeInputs));
    }
  }, [youtubeInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_tiktok_inputs", JSON.stringify(tikTokInputs));
    }
  }, [tikTokInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_twitch_inputs", JSON.stringify(twitchInputs));
    }
  }, [twitchInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_kick_inputs", JSON.stringify(kickInputs));
    }
  }, [kickInputs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_runway_inputs", JSON.stringify(runwayInputs));
    }
  }, [runwayInputs]);

  const getPlatformHeroInfo = () => {
    switch (activePlatform) {
      case "youtube":
        return {
          badge: t.hero.youtubeBadge,
          badgeColor: "border-red-500 text-red-600 dark:text-red-400 bg-red-500/10",
          title: t.hero.youtubeTitle,
          titleColor: "text-red-600 dark:text-red-400",
          subtitle: t.hero.youtubeSubtitle,
        };
      case "tiktok":
        return {
          badge: t.hero.tiktokBadge,
          badgeColor: "border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
          title: t.hero.tiktokTitle,
          titleColor: "text-cyan-600 dark:text-cyan-400",
          subtitle: t.hero.tiktokSubtitle,
        };
      case "twitch":
        return {
          badge: t.hero.twitchBadge,
          badgeColor: "border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-500/10",
          title: t.hero.twitchTitle,
          titleColor: "text-purple-600 dark:text-purple-400",
          subtitle: t.hero.twitchSubtitle,
        };
      case "kick":
        return {
          badge: t.hero.kickBadge,
          badgeColor: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
          title: t.hero.kickTitle,
          titleColor: "text-emerald-600 dark:text-emerald-400",
          subtitle: t.hero.kickSubtitle,
        };
      case "runway":
        return {
          badge: "Retirement & SWP Math",
          badgeColor: "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10",
          title: "Money Runway Calculator",
          titleColor: "text-amber-600 dark:text-amber-400",
          subtitle: "How long will your savings last? Model withdrawals, returns and inflation.",
        };
      case "adsense":
        return {
          badge: t.hero.adsenseBadge,
          badgeColor: "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10",
          title: t.hero.adsenseTitle,
          titleColor: "text-blue-600 dark:text-blue-400",
          subtitle: t.hero.adsenseSubtitle,
        };
      default:
        return {
          badge: t.hero.admobBadge,
          badgeColor: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
          title: t.hero.admobTitle,
          titleColor: "text-emerald-600 dark:text-emerald-400",
          subtitle: t.hero.admobSubtitle,
        };
    }
  };

  const heroInfo = getPlatformHeroInfo();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 font-sans transition-colors duration-150">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-4 py-2.5 rounded-xl border border-dashed border-neutral-700 dark:border-neutral-300 text-xs font-mono font-semibold shadow-xl">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PWA Install Notification Banner */}
      <PwaInstallBanner />

      {/* Top Header with Language Dropdown */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={handleCurrencyChange}
        onOpenEmbed={() => setIsEmbedOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onShare={handleShare}
        activePlatform={activePlatform}
        onPlatformChange={handlePlatformChange}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28 lg:pb-8 overflow-x-hidden">
        {activePlatform === "404" && (
          <NotFoundPage
            requestedPath={typeof window !== "undefined" ? window.location.pathname : "/unknown"}
            onNavigateHome={() => handlePlatformChange("admob")}
          />
        )}
        {activePlatform === "about" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <AboutPage />
          </Suspense>
        )}
        {activePlatform === "contact" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <ContactPage />
          </Suspense>
        )}
        {activePlatform === "privacy" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <PrivacyPage />
          </Suspense>
        )}
        {activePlatform === "terms" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <TermsPage />
          </Suspense>
        )}
        {activePlatform === "disclaimer" && (
          <Suspense fallback={<div className="min-h-96" />}>
            <DisclaimerPage />
          </Suspense>
        )}
        
        {activePlatform === "home" && (
          <HomeHub onSelect={handlePlatformChange} />
        )}

        {["admob", "adsense", "youtube", "tiktok", "twitch", "kick", "runway"].includes(activePlatform) && (
          <>
            {/* Page Hero Banner */}
            <section className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-dashed ${heroInfo.badgeColor}`}>
                      {heroInfo.badge}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                    <span className={heroInfo.titleColor}>{heroInfo.title}</span>
                  </h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                    {heroInfo.subtitle}
                  </p>
                </div>

                {/* Reset Defaults Button */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    aria-label={t.hero.reset}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("adrev_user_selected_currency");
                        localStorage.removeItem("adrev_user_selected_country");
                      }
                      if (activePlatform === "admob") setAdMobInputs(DEFAULT_ADMOB_INPUTS);
                      else if (activePlatform === "adsense") setAdSenseInputs(DEFAULT_ADSENSE_INPUTS);
                      else if (activePlatform === "youtube") setYouTubeInputs(DEFAULT_YOUTUBE_INPUTS);
                      else if (activePlatform === "tiktok") setTikTokInputs(DEFAULT_TIKTOK_INPUTS);
                      else if (activePlatform === "twitch") setTwitchInputs(DEFAULT_TWITCH_INPUTS);
                      else if (activePlatform === "kick") setKickInputs(DEFAULT_KICK_INPUTS);
                      else if (activePlatform === "runway") setRunwayInputs(DEFAULT_RUNWAY_INPUTS);
                      showToast("Reset to defaults!");
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-rose-500 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 transition-colors bg-white dark:bg-neutral-900 text-[11px] cursor-pointer"
                    title={t.hero.reset}
                  >
                    {t.hero.reset}
                  </button>
                </div>
              </div>
            </section>

            {/* 2-Column Calculator Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Interactive Input Form */}
              <div className="lg:col-span-7 space-y-4">
                {activePlatform === "admob" && (
                  <AdMobCalculator
                    inputs={adMobInputs}
                    onChange={handleAdMobChange}
                    currency={currency}
                  />
                )}
                {activePlatform === "adsense" && (
                  <AdSenseCalculator
                    inputs={adSenseInputs}
                    onChange={handleAdSenseChange}
                    currency={currency}
                  />
                )}
                {activePlatform === "youtube" && (
                  <Suspense fallback={<div className="p-8 text-center text-xs font-mono">Loading YouTube Calculator...</div>}>
                    <YouTubeCalculator
                      inputs={youtubeInputs}
                      onChange={handleYouTubeChange}
                      currency={currency}
                    />
                  </Suspense>
                )}
                {activePlatform === "tiktok" && (
                  <Suspense fallback={<div className="p-8 text-center text-xs font-mono">Loading TikTok Calculator...</div>}>
                    <TikTokCalculator
                      inputs={tikTokInputs}
                      onChange={handleTikTokChange}
                      currency={currency}
                    />
                  </Suspense>
                )}
                {activePlatform === "twitch" && (
                  <Suspense fallback={<div className="p-8 text-center text-xs font-mono">Loading Twitch Calculator...</div>}>
                    <TwitchCalculator
                      inputs={twitchInputs}
                      onChange={handleTwitchChange}
                      currency={currency}
                    />
                  </Suspense>
                )}
                {activePlatform === "kick" && (
                  <Suspense fallback={<div className="p-8 text-center text-xs font-mono">Loading Kick Calculator...</div>}>
                    <KickCalculator
                      inputs={kickInputs}
                      onChange={handleKickChange}
                      currency={currency}
                    />
                  </Suspense>
                )}
                {activePlatform === "runway" && (
                  <>
                    <Suspense fallback={<div className="p-8 text-center text-xs font-mono">Loading Runway Calculator...</div>}>
                      <RunwayCalculator
                        inputs={runwayInputs}
                        onChange={handleRunwayChange}
                        currency={currency}
                        onCurrencyChange={handleCurrencyChange}
                      />
                    </Suspense>
                    <RunwayBreakdown inputs={runwayInputs} currency={currency} />
                  </>
                )}

                {/* Optimization Recommendations (AdMob / AdSense) */}
                {(activePlatform === "admob" || activePlatform === "adsense") && (
                  <Suspense fallback={null}>
                    <OptimizationTips
                      platform={activePlatform as "admob" | "adsense"}
                      adSenseInputs={adSenseInputs}
                      adMobInputs={adMobInputs}
                    />
                  </Suspense>
                )}
              </div>

              {/* Right: Revenue Dashboard & Visualizers */}
              <div className="lg:col-span-5 space-y-4 sticky top-18">
                {activePlatform === "admob" && (
                  <>
                    <RevenueSummaryCard
                      type="admob"
                      currency={currency}
                      dailyRevenue={admobResults.dailyRevenue}
                      monthlyRevenue={admobResults.monthlyRevenue}
                      annualRevenue={admobResults.annualRevenue}
                      rateMetricLabel={t.summary.arpdau}
                      rateMetricValue={formatCurrency(admobResults.arpdau, currency)}
                      secondaryRateLabel={t.summary.blendedEcpm}
                      secondaryRateValue={formatCurrency(admobResults.blendedEcpm, currency)}
                      impressions={admobResults.monthlyImpressions}
                      mediationLiftRevenue={admobResults.mediationLiftRevenue}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={admobResults.formatBreakdown}
                        monthlyForecast={admobResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "adsense" && (
                  <>
                    <RevenueSummaryCard
                      type="adsense"
                      currency={currency}
                      dailyRevenue={adSenseResults.dailyRevenue}
                      monthlyRevenue={adSenseResults.monthlyRevenue}
                      annualRevenue={adSenseResults.annualRevenue}
                      rateMetricLabel={t.summary.pageRpm}
                      rateMetricValue={formatCurrency(adSenseResults.pageRpm, currency)}
                      secondaryRateLabel={t.summary.impressionRpm}
                      secondaryRateValue={formatCurrency(adSenseResults.impressionRpm, currency)}
                      impressions={adSenseResults.monthlyImpressions}
                      adBlockLossRevenue={adSenseResults.adBlockLossRevenue}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={adSenseResults.formatBreakdown}
                        monthlyForecast={adSenseResults.monthlyForecast}
                        deviceBreakdown={adSenseResults.deviceBreakdown}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "youtube" && (
                  <>
                    <RevenueSummaryCard
                      type="youtube"
                      currency={currency}
                      dailyRevenue={youtubeResults.dailyRevenue}
                      monthlyRevenue={youtubeResults.monthlyRevenue}
                      annualRevenue={youtubeResults.annualRevenue}
                      rateMetricLabel="Channel Blended RPM"
                      rateMetricValue={formatCurrency(youtubeResults.blendedRpm, currency)}
                      secondaryRateLabel="Long-Form Ad Net"
                      secondaryRateValue={formatCurrency(youtubeResults.longFormAdRevenue, currency)}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={youtubeResults.formatBreakdown}
                        monthlyForecast={youtubeResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "tiktok" && (
                  <>
                    <RevenueSummaryCard
                      type="tiktok"
                      currency={currency}
                      dailyRevenue={tikTokResults.dailyRevenue}
                      monthlyRevenue={tikTokResults.monthlyRevenue}
                      annualRevenue={tikTokResults.annualRevenue}
                      rateMetricLabel="Effective RPM"
                      rateMetricValue={formatCurrency(tikTokResults.effectiveRpm, currency)}
                      secondaryRateLabel="Qualified Views"
                      secondaryRateValue={`${Math.round(tikTokResults.qualifiedViewsCount).toLocaleString()}`}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={tikTokResults.formatBreakdown}
                        monthlyForecast={tikTokResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "twitch" && (
                  <>
                    <RevenueSummaryCard
                      type="twitch"
                      currency={currency}
                      dailyRevenue={twitchResults.dailyRevenue}
                      monthlyRevenue={twitchResults.monthlyRevenue}
                      annualRevenue={twitchResults.annualRevenue}
                      rateMetricLabel="Hourly Stream Pay"
                      rateMetricValue={`${formatCurrency(twitchResults.hourlyEarningsRate, currency)}/hr`}
                      secondaryRateLabel="Plus Sub Points"
                      secondaryRateValue={`${twitchResults.totalSubPoints}`}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={twitchResults.formatBreakdown}
                        monthlyForecast={twitchResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "kick" && (
                  <>
                    <RevenueSummaryCard
                      type="kick"
                      currency={currency}
                      dailyRevenue={kickResults.dailyRevenue}
                      monthlyRevenue={kickResults.monthlyRevenue}
                      annualRevenue={kickResults.annualRevenue}
                      rateMetricLabel="Hourly Stream Pay"
                      rateMetricValue={`${formatCurrency(kickResults.hourlyEarningsRate, currency)}/hr`}
                      secondaryRateLabel="Net Sub Pay"
                      secondaryRateValue={formatCurrency(kickResults.subscriptionRevenue, currency)}
                      kickVsTwitchDelta={kickResults.kickVsTwitchDelta}
                      onExportCSV={() => setIsExportOpen(true)}
                    />
                    <Suspense fallback={<div className="h-48" />}>
                      <RevenueCharts
                        formatBreakdown={kickResults.formatBreakdown}
                        monthlyForecast={kickResults.monthlyForecast}
                        currency={currency}
                      />
                    </Suspense>
                  </>
                )}

                {activePlatform === "runway" && (
                  <RunwaySummary inputs={runwayInputs} currency={currency} />
                )}
              </div>
            </section>

{activePlatform !== "runway" && (
            <>
            {/* Keyword-Rich Editorial SEO Section */}
            <section className="cv-auto">
              <Suspense fallback={null}>
                <EditorialSeoSection />
              </Suspense>
            </section>

            {/* Mathematical Formulas */}
            <section className="cv-auto">
              <Suspense fallback={null}>
                <FormulaDeepDive />
              </Suspense>
            </section>

            {/* Publisher Guide */}
            <section className="cv-auto">
              <Suspense fallback={null}>
                <ComprehensiveGuide />
              </Suspense>
            </section>

            {/* Glossary */}
            <section className="cv-auto">
              <Suspense fallback={null}>
                <GlossarySection />
              </Suspense>
            </section>

            {/* SEO FAQs */}
            <section className="cv-auto">
              <Suspense fallback={null}>
                <SeoFaqSection />
              </Suspense>
            </section>
            </>
            )}
            {activePlatform === "runway" && (
              <section className="cv-auto">
                <RunwaySeoSection />
              </section>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {isEmbedOpen && (
        <Suspense fallback={null}>
          <EmbedWidgetModal isOpen={isEmbedOpen} onClose={() => setIsEmbedOpen(false)} />
        </Suspense>
      )}
      {isExportOpen && (
        <Suspense fallback={null}>
          <ExportReportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            platform={activePlatform as "admob" | "adsense"}
            currency={currency}
            adSenseInputs={adSenseInputs}
            adSenseResults={adSenseResults}
            adMobInputs={adMobInputs}
            adMobResults={admobResults}
          />
        </Suspense>
      )}

      {/* Mobile Floating Sticky Bar */}
      {["admob", "adsense", "youtube", "tiktok", "twitch", "kick"].includes(activePlatform) && (
        <MobileStickyBar
          activeMode={activePlatform as any}
          currency={currency}
          monthlyRevenue={
            activePlatform === "admob" ? admobResults.monthlyRevenue :
            activePlatform === "adsense" ? adSenseResults.monthlyRevenue :
            activePlatform === "youtube" ? youtubeResults.monthlyRevenue :
            activePlatform === "tiktok" ? tikTokResults.monthlyRevenue :
            activePlatform === "twitch" ? twitchResults.monthlyRevenue :
            kickResults.monthlyRevenue
          }
          rateLabel={
            activePlatform === "admob" ? "ARPDAU" :
            activePlatform === "adsense" ? "Page RPM" :
            activePlatform === "youtube" ? "Blended RPM" :
            activePlatform === "tiktok" ? "Effective RPM" :
            "Hourly Rate"
          }
          rateValue={
            activePlatform === "admob" ? `$${admobResults.arpdau}` :
            activePlatform === "adsense" ? `$${adSenseResults.pageRpm}` :
            activePlatform === "youtube" ? `$${youtubeResults.blendedRpm.toFixed(2)}` :
            activePlatform === "tiktok" ? `$${tikTokResults.effectiveRpm.toFixed(2)}` :
            activePlatform === "twitch" ? `$${twitchResults.hourlyEarningsRate.toFixed(2)}/hr` :
            `$${kickResults.hourlyEarningsRate.toFixed(2)}/hr`
          }
          onOpenExport={() => setIsExportOpen(true)}
          onOpenEmbed={() => setIsEmbedOpen(true)}
          onShare={handleShare}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App({
  initialPlatform,
  initialLanguage,
}: {
  initialPlatform?: "home" | "admob" | "adsense" | "youtube" | "tiktok" | "twitch" | "kick" | "runway" | "about" | "contact" | "privacy" | "terms" | "disclaimer" | "404";
  initialLanguage?: SupportedLanguage;
} = {}) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <MainAppContent initialPlatform={initialPlatform} />
    </LanguageProvider>
  );
}

export default App;

