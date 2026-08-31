import { CurrencyCode } from "../types";
import { COUNTRIES, CURRENCIES } from "../data/geoTiers";

export interface GeoLocationDetection {
  countryCode: string;
  currencyCode: CurrencyCode;
}

// Timezone to Country & Currency Map
const TIMEZONE_MAP: Record<string, { country: string; currency: CurrencyCode }> = {
  // India & South Asia
  "Asia/Kolkata": { country: "IN", currency: "INR" },
  "Asia/Calcutta": { country: "IN", currency: "INR" },
  "Asia/Colombo": { country: "LK", currency: "USD" },
  "Asia/Dhaka": { country: "BD", currency: "USD" },
  "Asia/Karachi": { country: "PK", currency: "USD" },
  "Asia/Kathmandu": { country: "NP", currency: "USD" },

  // United States & North America
  "America/New_York": { country: "US", currency: "USD" },
  "America/Detroit": { country: "US", currency: "USD" },
  "America/Kentucky/Louisville": { country: "US", currency: "USD" },
  "America/Indiana/Indianapolis": { country: "US", currency: "USD" },
  "America/Chicago": { country: "US", currency: "USD" },
  "America/North_Dakota/Center": { country: "US", currency: "USD" },
  "America/Denver": { country: "US", currency: "USD" },
  "America/Boise": { country: "US", currency: "USD" },
  "America/Phoenix": { country: "US", currency: "USD" },
  "America/Los_Angeles": { country: "US", currency: "USD" },
  "America/Anchorage": { country: "US", currency: "USD" },
  "Pacific/Honolulu": { country: "US", currency: "USD" },

  // Canada
  "America/Toronto": { country: "CA", currency: "CAD" },
  "America/Vancouver": { country: "CA", currency: "CAD" },
  "America/Montreal": { country: "CA", currency: "CAD" },
  "America/Edmonton": { country: "CA", currency: "CAD" },
  "America/Winnipeg": { country: "CA", currency: "CAD" },
  "America/Halifax": { country: "CA", currency: "CAD" },

  // United Kingdom
  "Europe/London": { country: "GB", currency: "GBP" },

  // Europe (Eurozone)
  "Europe/Berlin": { country: "DE", currency: "EUR" },
  "Europe/Paris": { country: "FR", currency: "EUR" },
  "Europe/Rome": { country: "IT", currency: "EUR" },
  "Europe/Madrid": { country: "ES", currency: "EUR" },
  "Europe/Amsterdam": { country: "NL", currency: "EUR" },
  "Europe/Brussels": { country: "BE", currency: "EUR" },
  "Europe/Vienna": { country: "AT", currency: "EUR" },
  "Europe/Dublin": { country: "IE", currency: "EUR" },
  "Europe/Helsinki": { country: "FI", currency: "EUR" },
  "Europe/Lisbon": { country: "PT", currency: "EUR" },
  "Europe/Athens": { country: "GR", currency: "EUR" },

  // Europe (Other)
  "Europe/Zurich": { country: "CH", currency: "EUR" },
  "Europe/Oslo": { country: "NO", currency: "EUR" },
  "Europe/Stockholm": { country: "SE", currency: "EUR" },
  "Europe/Copenhagen": { country: "DK", currency: "EUR" },
  "Europe/Warsaw": { country: "PL", currency: "EUR" },
  "Europe/Prague": { country: "CZ", currency: "EUR" },
  "Europe/Budapest": { country: "HU", currency: "EUR" },
  "Europe/Bucharest": { country: "RO", currency: "EUR" },
  "Europe/Istanbul": { country: "TR", currency: "USD" },

  // Japan & Asia Pacific
  "Asia/Tokyo": { country: "JP", currency: "JPY" },
  "Asia/Seoul": { country: "KR", currency: "USD" },
  "Asia/Singapore": { country: "SG", currency: "USD" },
  "Asia/Bangkok": { country: "TH", currency: "USD" },
  "Asia/Kuala_Lumpur": { country: "MY", currency: "USD" },
  "Asia/Jakarta": { country: "ID", currency: "USD" },
  "Asia/Manila": { country: "PH", currency: "USD" },
  "Asia/Ho_Chi_Minh": { country: "VN", currency: "USD" },
  "Asia/Dubai": { country: "AE", currency: "USD" },
  "Asia/Riyadh": { country: "SA", currency: "USD" },
  "Asia/Jerusalem": { country: "IL", currency: "USD" },

  // Australia & New Zealand
  "Australia/Sydney": { country: "AU", currency: "AUD" },
  "Australia/Melbourne": { country: "AU", currency: "AUD" },
  "Australia/Brisbane": { country: "AU", currency: "AUD" },
  "Australia/Perth": { country: "AU", currency: "AUD" },
  "Australia/Adelaide": { country: "AU", currency: "AUD" },
  "Pacific/Auckland": { country: "NZ", currency: "AUD" },

  // Latin America
  "America/Sao_Paulo": { country: "BR", currency: "BRL" },
  "America/Mexico_City": { country: "MX", currency: "USD" },
  "America/Buenos_Aires": { country: "AR", currency: "USD" },
  "America/Santiago": { country: "CL", currency: "USD" },
  "America/Bogota": { country: "CO", currency: "USD" },

  // Africa
  "Africa/Johannesburg": { country: "ZA", currency: "USD" },
  "Africa/Lagos": { country: "NG", currency: "USD" },
  "Africa/Cairo": { country: "EG", currency: "USD" },
  "Africa/Nairobi": { country: "KE", currency: "USD" },
  "Africa/Accra": { country: "GH", currency: "USD" },
};

// Language / Locale to Country & Currency Map
const LOCALE_MAP: Record<string, { country: string; currency: CurrencyCode }> = {
  "en-IN": { country: "IN", currency: "INR" },
  "hi-IN": { country: "IN", currency: "INR" },
  "ta-IN": { country: "IN", currency: "INR" },
  "te-IN": { country: "IN", currency: "INR" },
  "mr-IN": { country: "IN", currency: "INR" },
  "gu-IN": { country: "IN", currency: "INR" },
  "bn-IN": { country: "IN", currency: "INR" },
  "en-GB": { country: "GB", currency: "GBP" },
  "en-US": { country: "US", currency: "USD" },
  "en-CA": { country: "CA", currency: "CAD" },
  "fr-CA": { country: "CA", currency: "CAD" },
  "en-AU": { country: "AU", currency: "AUD" },
  "en-NZ": { country: "NZ", currency: "AUD" },
  "ja-JP": { country: "JP", currency: "JPY" },
  "pt-BR": { country: "BR", currency: "BRL" },
  "de-DE": { country: "DE", currency: "EUR" },
  "de-AT": { country: "AT", currency: "EUR" },
  "fr-FR": { country: "FR", currency: "EUR" },
  "it-IT": { country: "IT", currency: "EUR" },
  "es-ES": { country: "ES", currency: "EUR" },
  "ko-KR": { country: "KR", currency: "USD" },
};

export function detectUserLocation(): GeoLocationDetection {
  if (typeof window === "undefined") {
    return { countryCode: "US", currencyCode: "USD" };
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
          };
        }
      }
      // Check for 2-letter country code suffix (e.g. en-GB -> GB)
      const parts = lang.split("-");
      if (parts.length === 2) {
        const region = parts[1].toUpperCase();
        const countryMatch = COUNTRIES.find((c) => c.code === region);
        if (countryMatch) {
          let cur: CurrencyCode = "USD";
          if (region === "IN") cur = "INR";
          else if (region === "GB") cur = "GBP";
          else if (region === "JP") cur = "JPY";
          else if (region === "CA") cur = "CAD";
          else if (region === "AU") cur = "AUD";
          else if (region === "BR") cur = "BRL";
          else if (["DE", "FR", "IT", "ES", "NL", "AT", "BE", "IE", "FI", "PT", "GR"].includes(region)) cur = "EUR";
          return { countryCode: region, currencyCode: cur };
        }
      }
    }
  } catch (e) {
    console.debug("Locale detection skipped", e);
  }

  return { countryCode: "US", currencyCode: "USD" };
}
