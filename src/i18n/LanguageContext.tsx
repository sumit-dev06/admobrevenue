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

      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang") as SupportedLanguage;
      if (urlLang && SUPPORTED_LANGUAGES.some((l) => l.code === urlLang)) {
        return urlLang;
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
      const url = new URL(window.location.href);
      if (newLang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", newLang);
      }
      window.history.replaceState({}, "", url.toString());
      document.documentElement.lang = newLang;
    }
  };

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
      if (t.meta?.title) document.title = t.meta.title;
      if (t.meta?.description) {
        document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
        document.querySelector('meta[property="twitter:description"]')?.setAttribute("content", t.meta.description);
      }
      if (t.meta?.keywords) {
        document.querySelector('meta[name="keywords"]')?.setAttribute("content", t.meta.keywords);
      }
      if (t.meta?.title) {
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
        document.querySelector('meta[property="twitter:title"]')?.setAttribute("content", t.meta.title);
      }
    }
  }, [language, t]);

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
