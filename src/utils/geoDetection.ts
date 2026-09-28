import { CurrencyCode } from "../types";
import { SupportedLanguage } from "../i18n/types";
import { COUNTRIES, CURRENCIES, getCountryByCode } from "../data/geoTiers";

export interface GeoLocationDetection {
  countryCode: string;
  currencyCode: CurrencyCode;
  language: SupportedLanguage;
}

export const LANGUAGE_DEFAULTS: Record<
  SupportedLanguage,
  {
    countryCode: string;
    currencyCode: CurrencyCode;
    tierDistribution: { tier1: number; tier2: number; tier3: number };
  }
> = {
  en: {
    countryCode: "US",
    currencyCode: "USD",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  es: {
    countryCode: "ES",
    currencyCode: "EUR",
    tierDistribution: { tier1: 0, tier2: 100, tier3: 0 },
  },
  ja: {
    countryCode: "JP",
    currencyCode: "JPY",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  fr: {
    countryCode: "FR",
    currencyCode: "EUR",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  de: {
    countryCode: "DE",
    currencyCode: "EUR",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  pt: {
    countryCode: "BR",
    currencyCode: "BRL",
    tierDistribution: { tier1: 0, tier2: 100, tier3: 0 },
  },
  ko: {
    countryCode: "KR",
    currencyCode: "KRW",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  it: {
    countryCode: "IT",
    currencyCode: "EUR",
    tierDistribution: { tier1: 0, tier2: 100, tier3: 0 },
  },
  ru: {
    countryCode: "RU",
    currencyCode: "RUB",
    tierDistribution: { tier1: 0, tier2: 60, tier3: 40 },
  },
  ar: {
    countryCode: "SA",
    currencyCode: "SAR",
    tierDistribution: { tier1: 50, tier2: 50, tier3: 0 },
  },
  zh: {
    countryCode: "CN",
    currencyCode: "CNY",
    tierDistribution: { tier1: 20, tier2: 80, tier3: 0 },
  },
  tr: {
    countryCode: "TR",
    currencyCode: "TRY",
    tierDistribution: { tier1: 0, tier2: 100, tier3: 0 },
  },
  pl: {
    countryCode: "PL",
    currencyCode: "PLN",
    tierDistribution: { tier1: 0, tier2: 100, tier3: 0 },
  },
  id: {
    countryCode: "ID",
    currencyCode: "IDR",
    tierDistribution: { tier1: 0, tier2: 0, tier3: 100 },
  },
  nl: {
    countryCode: "NL",
    currencyCode: "EUR",
    tierDistribution: { tier1: 100, tier2: 0, tier3: 0 },
  },
  vi: {
    countryCode: "VN",
    currencyCode: "VND",
    tierDistribution: { tier1: 0, tier2: 0, tier3: 100 },
  },
};

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

  // Netherlands & Dutch
  "Europe/Amsterdam": { country: "NL", currency: "EUR", language: "nl" },
  "Europe/Dublin": { country: "IE", currency: "EUR", language: "en" },
  "Europe/Helsinki": { country: "FI", currency: "EUR", language: "en" },
  "Europe/Athens": { country: "GR", currency: "EUR", language: "en" },
  "Europe/Oslo": { country: "NO", currency: "EUR", language: "en" },
  "Europe/Stockholm": { country: "SE", currency: "EUR", language: "en" },
  "Europe/Copenhagen": { country: "DK", currency: "EUR", language: "en" },
  "Europe/Warsaw": { country: "PL", currency: "PLN", language: "pl" },
  "Europe/Prague": { country: "CZ", currency: "EUR", language: "en" },
  "Europe/Budapest": { country: "HU", currency: "EUR", language: "en" },
  "Europe/Bucharest": { country: "RO", currency: "EUR", language: "en" },
  "Europe/Istanbul": { country: "TR", currency: "TRY", language: "tr" },

  // Russia & Russian-speaking
  "Europe/Moscow": { country: "RU", currency: "RUB", language: "ru" },
  "Asia/Yekaterinburg": { country: "RU", currency: "RUB", language: "ru" },
  "Asia/Novosibirsk": { country: "RU", currency: "RUB", language: "ru" },
  "Asia/Vladivostok": { country: "RU", currency: "RUB", language: "ru" },
  "Europe/Minsk": { country: "BY", currency: "RUB", language: "ru" },
  "Asia/Almaty": { country: "KZ", currency: "RUB", language: "ru" },
  "Asia/Tashkent": { country: "UZ", currency: "USD", language: "ru" },

  // China, Taiwan, Hong Kong (Mandarin)
  "Asia/Shanghai": { country: "CN", currency: "CNY", language: "zh" },
  "Asia/Chongqing": { country: "CN", currency: "CNY", language: "zh" },
  "Asia/Taipei": { country: "TW", currency: "TWD", language: "zh" },
  "Asia/Hong_Kong": { country: "HK", currency: "USD", language: "zh" },

  // Japan & Asia Pacific
  "Asia/Tokyo": { country: "JP", currency: "JPY", language: "ja" },
  "Asia/Seoul": { country: "KR", currency: "KRW", language: "ko" },
  "Asia/Singapore": { country: "SG", currency: "USD", language: "en" },
  "Asia/Bangkok": { country: "TH", currency: "USD", language: "en" },
  "Asia/Kuala_Lumpur": { country: "MY", currency: "USD", language: "en" },
  "Asia/Jakarta": { country: "ID", currency: "IDR", language: "id" },
  "Asia/Makassar": { country: "ID", currency: "IDR", language: "id" },
  "Asia/Jayapura": { country: "ID", currency: "IDR", language: "id" },
  "Asia/Manila": { country: "PH", currency: "USD", language: "en" },
  "Asia/Ho_Chi_Minh": { country: "VN", currency: "VND", language: "vi" },

  // Middle East & North Africa (Arabic)
  "Asia/Riyadh": { country: "SA", currency: "SAR", language: "ar" },
  "Asia/Dubai": { country: "AE", currency: "AED", language: "ar" },
  "Asia/Qatar": { country: "QA", currency: "USD", language: "ar" },
  "Asia/Kuwait": { country: "KW", currency: "USD", language: "ar" },
  "Asia/Muscat": { country: "OM", currency: "USD", language: "ar" },
  "Asia/Bahrain": { country: "BH", currency: "USD", language: "ar" },
  "Asia/Amman": { country: "JO", currency: "USD", language: "ar" },
  "Asia/Beirut": { country: "LB", currency: "USD", language: "ar" },
  "Asia/Baghdad": { country: "IQ", currency: "USD", language: "ar" },
  "Africa/Cairo": { country: "EG", currency: "USD", language: "ar" },
  "Africa/Casablanca": { country: "MA", currency: "USD", language: "ar" },
  "Africa/Algiers": { country: "DZ", currency: "USD", language: "ar" },
  "Africa/Tunis": { country: "TN", currency: "USD", language: "ar" },
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
  "ko-KR": { country: "KR", currency: "KRW", language: "ko" },
  "ko": { country: "KR", currency: "KRW", language: "ko" },
  "ru-RU": { country: "RU", currency: "RUB", language: "ru" },
  "ru": { country: "RU", currency: "RUB", language: "ru" },
  "ar-SA": { country: "SA", currency: "SAR", language: "ar" },
  "ar-AE": { country: "AE", currency: "AED", language: "ar" },
  "ar-EG": { country: "EG", currency: "USD", language: "ar" },
  "ar": { country: "SA", currency: "SAR", language: "ar" },
  "zh-CN": { country: "CN", currency: "CNY", language: "zh" },
  "zh-TW": { country: "TW", currency: "TWD", language: "zh" },
  "zh-HK": { country: "HK", currency: "USD", language: "zh" },
  "zh": { country: "CN", currency: "CNY", language: "zh" },
  "tr-TR": { country: "TR", currency: "TRY", language: "tr" },
  "tr": { country: "TR", currency: "TRY", language: "tr" },
  "pl-PL": { country: "PL", currency: "PLN", language: "pl" },
  "pl": { country: "PL", currency: "PLN", language: "pl" },
  "id-ID": { country: "ID", currency: "IDR", language: "id" },
  "id": { country: "ID", currency: "IDR", language: "id" },
  "nl-NL": { country: "NL", currency: "EUR", language: "nl" },
  "nl-BE": { country: "BE", currency: "EUR", language: "nl" },
  "nl": { country: "NL", currency: "EUR", language: "nl" },
  "vi-VN": { country: "VN", currency: "VND", language: "vi" },
  "vi": { country: "VN", currency: "VND", language: "vi" },
};

export function mapCountryToDetails(countryCode: string): GeoLocationDetection {
  const code = (countryCode || "").trim().toUpperCase();
  const country = getCountryByCode(code);
  
  // Currency mapping based on country
  let currency: CurrencyCode = "USD";
  if (code === "IN") {
    currency = "INR";
  } else if (code === "GB") {
    currency = "GBP";
  } else if (code === "JP") {
    currency = "JPY";
  } else if (code === "KR") {
    currency = "KRW";
  } else if (code === "CA") {
    currency = "CAD";
  } else if (code === "AU" || code === "NZ") {
    currency = "AUD";
  } else if (code === "BR") {
    currency = "BRL";
  } else if (code === "RU" || code === "BY") {
    currency = "RUB";
  } else if (code === "TR") {
    currency = "TRY";
  } else if (code === "ID") {
    currency = "IDR";
  } else if (code === "VN") {
    currency = "VND";
  } else if (code === "PL") {
    currency = "PLN";
  } else if (code === "SA") {
    currency = "SAR";
  } else if (code === "AE") {
    currency = "AED";
  } else if (code === "CN") {
    currency = "CNY";
  } else if (code === "TW") {
    currency = "TWD";
  } else if ([
    // Europe (Eurozone and European economic area)
    "NO", "DE", "FR", "IT", "ES", "NL", "AT", "BE", "IE", "FI",
    "PT", "GR", "CH", "SE", "DK", "CZ", "HU", "RO", "BG",
    "HR", "SK", "SI", "LT", "LV", "EE", "CY", "MT", "LU", "IS",
    "RS", "BA", "ME", "MK", "AL", "MD", "UA", "AD", "MC", "SM",
    "VA", "LI"
  ].includes(code)) {
    currency = "EUR";
  }

  // Language mapping
  let language: SupportedLanguage = "en";
  if ([
    // Spanish speaking countries & territories
    "ES", "MX", "AR", "CL", "CO", "PE", "VE", "EC", "GT", "CU",
    "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR", "GQ"
  ].includes(code)) {
    language = "es";
  } else if (code === "JP") {
    language = "ja";
  } else if (["DE", "AT", "LI"].includes(code)) {
    language = "de";
  } else if (["FR", "BE", "MC", "SN", "CI", "CM", "CD", "CG", "MG", "ML", "GN", "HT"].includes(code)) {
    language = "fr";
  } else if (["PT", "BR", "AO", "MZ", "CV", "GW", "ST"].includes(code)) {
    language = "pt";
  } else if (["IT", "SM", "VA"].includes(code)) {
    language = "it";
  } else if (code === "KR" || code === "KP") {
    language = "ko";
  } else if (["RU", "BY", "KZ", "KG", "UZ", "TJ", "TM"].includes(code)) {
    language = "ru";
  } else if (["SA", "AE", "EG", "QA", "KW", "OM", "BH", "JO", "LB", "IQ", "MA", "DZ", "TN", "LY", "SD", "YE", "SY", "PS"].includes(code)) {
    language = "ar";
  } else if (["CN", "TW", "HK", "MO"].includes(code)) {
    language = "zh";
  } else if (["TR", "AZ"].includes(code)) {
    language = "tr";
  } else if (code === "PL") {
    language = "pl";
  } else if (code === "ID") {
    language = "id";
  } else if (["NL", "SR"].includes(code)) {
    language = "nl";
  } else if (code === "VN") {
    language = "vi";
  }

  return {
    countryCode: country.code,
    currencyCode: currency,
    language,
  };
}

export async function fetchUserLocationIP(): Promise<GeoLocationDetection | null> {
  if (typeof window === "undefined") return null;

  // 1. Primary: api.country.is (ultra fast, HTTPS, CORS, zero rate limits)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch("https://api.country.is/", {
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country && typeof data.country === "string" && data.country.length === 2) {
        return mapCountryToDetails(data.country);
      }
    }
  } catch (err) {
    console.debug("api.country.is lookup skipped or timed out", err);
  }

  // 2. Secondary fallback: ipwho.is (reliable, HTTPS, CORS)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch("https://ipwho.is/", {
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code && typeof data.country_code === "string" && data.country_code.length === 2) {
        return mapCountryToDetails(data.country_code);
      }
    }
  } catch (err) {
    console.debug("ipwho.is lookup skipped or timed out", err);
  }

  // 3. Third fallback: freeipapi.com
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch("https://freeipapi.com/api/json/", {
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.countryCode && typeof data.countryCode === "string" && data.countryCode.length === 2) {
        return mapCountryToDetails(data.countryCode);
      }
    }
  } catch (err) {
    console.debug("freeipapi lookup skipped", err);
  }

  // 4. Fourth fallback: ipapi.co
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      cache: "no-cache",
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code && typeof data.country_code === "string" && data.country_code.length === 2) {
        return mapCountryToDetails(data.country_code);
      }
    }
  } catch (err) {
    console.debug("ipapi.co lookup skipped or timed out", err);
  }

  return null;
}

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
          return mapCountryToDetails(region);
        }
      }
    }
  } catch (e) {
    console.debug("Locale detection skipped", e);
  }

  return { countryCode: "US", currencyCode: "USD", language: "en" };
}
