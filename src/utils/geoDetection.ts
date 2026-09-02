import { CurrencyCode } from "../types";
import { SupportedLanguage } from "../i18n/types";
import { COUNTRIES, CURRENCIES } from "../data/geoTiers";

export interface GeoLocationDetection {
  countryCode: string;
  currencyCode: CurrencyCode;
  language: SupportedLanguage;
}

interface LocationMapping {
  country: string;
  currency: CurrencyCode;
  language: SupportedLanguage;
}

// Timezone to Country, Currency & Language Map
const TIMEZONE_MAP: Record<string, LocationMapping> = {
  // India & South Asia
  "Asia/Kolkata": { country: "IN", currency: "INR", language: "en" },
  "Asia/Calcutta": { country: "IN", currency: "INR", language: "en" },
  "Asia/Colombo": { country: "LK", currency: "USD", language: "en" },
  "Asia/Dhaka": { country: "BD", currency: "USD", language: "en" },
  "Asia/Karachi": { country: "PK", currency: "USD", language: "en" },
  "Asia/Kathmandu": { country: "NP", currency: "USD", language: "en" },

  // United States & North America
  "America/New_York": { country: "US", currency: "USD", language: "en" },
  "America/Detroit": { country: "US", currency: "USD", language: "en" },
  "America/Kentucky/Louisville": { country: "US", currency: "USD", language: "en" },
  "America/Indiana/Indianapolis": { country: "US", currency: "USD", language: "en" },
  "America/Chicago": { country: "US", currency: "USD", language: "en" },
  "America/North_Dakota/Center": { country: "US", currency: "USD", language: "en" },
  "America/Denver": { country: "US", currency: "USD", language: "en" },
  "America/Boise": { country: "US", currency: "USD", language: "en" },
  "America/Phoenix": { country: "US", currency: "USD", language: "en" },
  "America/Los_Angeles": { country: "US", currency: "USD", language: "en" },
  "America/Anchorage": { country: "US", currency: "USD", language: "en" },
  "Pacific/Honolulu": { country: "US", currency: "USD", language: "en" },

  // Canada
  "America/Toronto": { country: "CA", currency: "CAD", language: "en" },
  "America/Vancouver": { country: "CA", currency: "CAD", language: "en" },
  "America/Montreal": { country: "CA", currency: "CAD", language: "fr" },
  "America/Edmonton": { country: "CA", currency: "CAD", language: "en" },
  "America/Winnipeg": { country: "CA", currency: "CAD", language: "en" },
  "America/Halifax": { country: "CA", currency: "CAD", language: "en" },

  // United Kingdom
  "Europe/London": { country: "GB", currency: "GBP", language: "en" },

  // Germany, Austria, Switzerland
  "Europe/Berlin": { country: "DE", currency: "EUR", language: "de" },
  "Europe/Vienna": { country: "AT", currency: "EUR", language: "de" },
  "Europe/Zurich": { country: "CH", currency: "EUR", language: "de" },

  // France & Francophone
  "Europe/Paris": { country: "FR", currency: "EUR", language: "fr" },
  "Europe/Brussels": { country: "BE", currency: "EUR", language: "fr" },

  // Italy
  "Europe/Rome": { country: "IT", currency: "EUR", language: "it" },

  // Spain & Latin America
  "Europe/Madrid": { country: "ES", currency: "EUR", language: "es" },
  "America/Mexico_City": { country: "MX", currency: "USD", language: "es" },
  "America/Buenos_Aires": { country: "AR", currency: "USD", language: "es" },
  "America/Santiago": { country: "CL", currency: "USD", language: "es" },
  "America/Bogota": { country: "CO", currency: "USD", language: "es" },
  "America/Lima": { country: "PE", currency: "USD", language: "es" },

  // Portugal & Brazil
  "Europe/Lisbon": { country: "PT", currency: "EUR", language: "pt" },
  "America/Sao_Paulo": { country: "BR", currency: "BRL", language: "pt" },

  // Netherlands, Nordic & Other European
  "Europe/Amsterdam": { country: "NL", currency: "EUR", language: "en" },
  "Europe/Dublin": { country: "IE", currency: "EUR", language: "en" },
  "Europe/Helsinki": { country: "FI", currency: "EUR", language: "en" },
  "Europe/Athens": { country: "GR", currency: "EUR", language: "en" },
  "Europe/Oslo": { country: "NO", currency: "EUR", language: "en" },
  "Europe/Stockholm": { country: "SE", currency: "EUR", language: "en" },
  "Europe/Copenhagen": { country: "DK", currency: "EUR", language: "en" },
  "Europe/Warsaw": { country: "PL", currency: "EUR", language: "en" },
  "Europe/Prague": { country: "CZ", currency: "EUR", language: "en" },
  "Europe/Budapest": { country: "HU", currency: "EUR", language: "en" },
  "Europe/Bucharest": { country: "RO", currency: "EUR", language: "en" },
  "Europe/Istanbul": { country: "TR", currency: "USD", language: "en" },

  // Japan & Asia Pacific
  "Asia/Tokyo": { country: "JP", currency: "JPY", language: "ja" },
  "Asia/Seoul": { country: "KR", currency: "USD", language: "ko" },
  "Asia/Singapore": { country: "SG", currency: "USD", language: "en" },
  "Asia/Bangkok": { country: "TH", currency: "USD", language: "en" },
  "Asia/Kuala_Lumpur": { country: "MY", currency: "USD", language: "en" },
  "Asia/Jakarta": { country: "ID", currency: "USD", language: "en" },
  "Asia/Manila": { country: "PH", currency: "USD", language: "en" },
  "Asia/Ho_Chi_Minh": { country: "VN", currency: "USD", language: "en" },
  "Asia/Dubai": { country: "AE", currency: "USD", language: "en" },
  "Asia/Riyadh": { country: "SA", currency: "USD", language: "en" },
  "Asia/Jerusalem": { country: "IL", currency: "USD", language: "en" },

  // Australia & New Zealand
  "Australia/Sydney": { country: "AU", currency: "AUD", language: "en" },
  "Australia/Melbourne": { country: "AU", currency: "AUD", language: "en" },
  "Australia/Brisbane": { country: "AU", currency: "AUD", language: "en" },
  "Australia/Perth": { country: "AU", currency: "AUD", language: "en" },
  "Australia/Adelaide": { country: "AU", currency: "AUD", language: "en" },
  "Pacific/Auckland": { country: "NZ", currency: "AUD", language: "en" },

  // Africa
  "Africa/Johannesburg": { country: "ZA", currency: "USD", language: "en" },
  "Africa/Lagos": { country: "NG", currency: "USD", language: "en" },
  "Africa/Cairo": { country: "EG", currency: "USD", language: "en" },
  "Africa/Nairobi": { country: "KE", currency: "USD", language: "en" },
  "Africa/Accra": { country: "GH", currency: "USD", language: "en" },
};

// Language / Locale to Country, Currency & Language Map
const LOCALE_MAP: Record<string, LocationMapping> = {
  "en-IN": { country: "IN", currency: "INR", language: "en" },
  "hi-IN": { country: "IN", currency: "INR", language: "en" },
  "ta-IN": { country: "IN", currency: "INR", language: "en" },
  "te-IN": { country: "IN", currency: "INR", language: "en" },
  "mr-IN": { country: "IN", currency: "INR", language: "en" },
  "gu-IN": { country: "IN", currency: "INR", language: "en" },
  "bn-IN": { country: "IN", currency: "INR", language: "en" },
  "en-GB": { country: "GB", currency: "GBP", language: "en" },
  "en-US": { country: "US", currency: "USD", language: "en" },
  "en-CA": { country: "CA", currency: "CAD", language: "en" },
  "fr-CA": { country: "CA", currency: "CAD", language: "fr" },
  "en-AU": { country: "AU", currency: "AUD", language: "en" },
  "en-NZ": { country: "NZ", currency: "AUD", language: "en" },
  "ja-JP": { country: "JP", currency: "JPY", language: "ja" },
  "ja": { country: "JP", currency: "JPY", language: "ja" },
  "pt-BR": { country: "BR", currency: "BRL", language: "pt" },
  "pt-PT": { country: "PT", currency: "EUR", language: "pt" },
  "pt": { country: "BR", currency: "BRL", language: "pt" },
  "de-DE": { country: "DE", currency: "EUR", language: "de" },
  "de-AT": { country: "AT", currency: "EUR", language: "de" },
  "de-CH": { country: "CH", currency: "EUR", language: "de" },
  "de": { country: "DE", currency: "EUR", language: "de" },
  "fr-FR": { country: "FR", currency: "EUR", language: "fr" },
  "fr-BE": { country: "BE", currency: "EUR", language: "fr" },
  "fr-CH": { country: "CH", currency: "EUR", language: "fr" },
  "fr": { country: "FR", currency: "EUR", language: "fr" },
  "it-IT": { country: "IT", currency: "EUR", language: "it" },
  "it-CH": { country: "CH", currency: "EUR", language: "it" },
  "it": { country: "IT", currency: "EUR", language: "it" },
  "es-ES": { country: "ES", currency: "EUR", language: "es" },
  "es-MX": { country: "MX", currency: "USD", language: "es" },
  "es-AR": { country: "AR", currency: "USD", language: "es" },
  "es-CL": { country: "CL", currency: "USD", language: "es" },
  "es-CO": { country: "CO", currency: "USD", language: "es" },
  "es": { country: "ES", currency: "EUR", language: "es" },
  "ko-KR": { country: "KR", currency: "USD", language: "ko" },
  "ko": { country: "KR", currency: "USD", language: "ko" },
};

export function detectUserLocation(): GeoLocationDetection {
  if (typeof window === "undefined") {
    return { countryCode: "US", currencyCode: "USD", language: "en" };
  }

  // 1. Try Timezone Detection
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_MAP[tz]) {
      const match = TIMEZONE_MAP[tz];
      if (COUNTRIES.some((c) => c.code === match.country)) {
        return {
          countryCode: match.country,
          currencyCode: match.currency in CURRENCIES ? match.currency : "USD",
          language: match.language || "en",
        };
      }
    }
  } catch (e) {
    console.debug("Timezone detection skipped", e);
  }

  // 2. Try Locale Detection from navigator.languages
  try {
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (LOCALE_MAP[lang]) {
        const match = LOCALE_MAP[lang];
        if (COUNTRIES.some((c) => c.code === match.country)) {
          return {
            countryCode: match.country,
            currencyCode: match.currency in CURRENCIES ? match.currency : "USD",
            language: match.language || "en",
          };
        }
      }
      // Check for 2-letter country code suffix (e.g. en-GB -> GB)
      const parts = lang.split("-");
      if (parts.length === 2) {
        const region = parts[1].toUpperCase();
        const langPrefix = parts[0].toLowerCase() as SupportedLanguage;
        const countryMatch = COUNTRIES.find((c) => c.code === region);
        if (countryMatch) {
          let cur: CurrencyCode = "USD";
          if (region === "IN") cur = "INR";
          else if (region === "GB") cur = "GBP";
          else if (region === "JP") cur = "JPY";
          else if (region === "CA") cur = "CAD";
          else if (region === "AU" || region === "NZ") cur = "AUD";
          else if (region === "BR") cur = "BRL";
          else if (["DE", "FR", "IT", "ES", "NL", "AT", "BE", "IE", "FI", "PT", "GR"].includes(region)) cur = "EUR";
          
          let l: SupportedLanguage = "en";
          if (["es", "ja", "fr", "de", "pt", "ko", "it"].includes(langPrefix)) {
            l = langPrefix;
          }
          return { countryCode: region, currencyCode: cur, language: l };
        }
      }
    }
  } catch (e) {
    console.debug("Locale detection skipped", e);
  }

  return { countryCode: "US", currencyCode: "USD", language: "en" };
}
