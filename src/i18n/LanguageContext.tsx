import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { SupportedLanguage, LanguageInfo, SUPPORTED_LANGUAGES, TranslationDictionary } from "./types";
import { TRANSLATIONS } from "./translations";
import { detectUserLocation, fetchUserLocationIP } from "../utils/geoDetection";

interface LanguageContextType {
  language: SupportedLanguage;
  currentLanguageInfo: LanguageInfo;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}> = ({ children, initialLanguage }) => {
  const [, startTransition] = useTransition();

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (initialLanguage) return initialLanguage;
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname.toLowerCase();
      const firstSegment = pathname.split("/").filter(Boolean)[0] as SupportedLanguage;
      if (firstSegment && SUPPORTED_LANGUAGES.some((l) => l.code === firstSegment)) {
        return firstSegment;
      }

      const savedLang = localStorage.getItem("adrev_language") as SupportedLanguage;
      if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        return savedLang;
      }
      // Check detected location language based on timezone / geo
      const detected = detectUserLocation();
      if (detected.language && SUPPORTED_LANGUAGES.some((l) => l.code === detected.language)) {
        return detected.language;
      }
      // Check browser language
      const browserLang = navigator.language?.slice(0, 2) as SupportedLanguage;
      if (browserLang && SUPPORTED_LANGUAGES.some((l) => l.code === browserLang)) {
        return browserLang;
      }
    }
    return "en";
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    startTransition(() => {
      setLanguageState(newLang);
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("adrev_language", newLang);
      // No ?lang= URL param - use subdirectory /{lang} canonical via navigation
      // Preserve current platform path when switching language
      const currentPath = window.location.pathname;
      const segments = currentPath.split("/").filter(Boolean);
      const validPlatforms = ["admob", "adsense", "youtube", "tiktok", "twitch", "kick", "runway"];
      const currentPlat = segments.find((s) => validPlatforms.includes(s.toLowerCase()));
      let newPath = "/";
      if (newLang !== "en") {
        newPath = currentPlat ? `/${newLang}/${currentPlat}` : `/${newLang}`;
      } else {
        newPath = currentPlat ? `/${currentPlat}` : "/";
      }
      // Only push if path actually changes and not already correct lang prefix
      const firstSeg = segments[0];
      const isAlreadyLangPrefix = SUPPORTED_LANGUAGES.some((l) => l.code === firstSeg);
      const expectedFirst = newLang === "en" ? (currentPlat || null) : newLang;
      const currentFirst = firstSeg || null;
      if (expectedFirst !== currentFirst) {
        // Use replaceState to avoid duplicate history, keep SEO clean (no ?lang=)
        window.history.pushState({}, "", newPath + window.location.search.replace(/[?&]lang=[^&]*/g, "").replace(/^\?$/, ""));
      }
      document.documentElement.lang = newLang;
    }
  };

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Clean legacy ?lang= param from URL (SEO duplicate) if present
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("lang=")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("lang");
      window.history.replaceState({}, "", url.pathname + (url.search ? "?" + url.searchParams.toString() : "") + url.hash);
    }
  }, []);

  // Refine language via IP geolocation if it differs from timezone guess and user hasn't manually chosen
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasManualLang = !!localStorage.getItem("adrev_language");
    if (hasManualLang) return;
    const syncLang = detectUserLocation().language;
    fetchUserLocationIP().then((ip) => {
      if (ip && ip.language !== syncLang && SUPPORTED_LANGUAGES.some((l) => l.code === ip.language)) {
        startTransition(() => setLanguageState(ip.language));
        localStorage.setItem("adrev_language", ip.language);
        document.documentElement.lang = ip.language;
      }
    });
  }, []);

  // NOTE: Per-page <title> / meta / canonical / OG tags are owned by the
  // platform-aware SEO effect in App.tsx (mirrors scripts/prerender.mjs
  // PLATFORM_METADATA). Do NOT set generic t.meta.* here — that would
  // overwrite the correct per-calculator tags after hydration and cause
  // Google to index /youtube, /tiktok, /twitch with AdSense titles/descs.
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguageInfo,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as SupportedLanguage,
      currentLanguageInfo: SUPPORTED_LANGUAGES[0],
      setLanguage: () => {},
      t: TRANSLATIONS.en,
      supportedLanguages: SUPPORTED_LANGUAGES,
    };
  }
  return context;
};
