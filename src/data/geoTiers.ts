import { CurrencyInfo } from '../types';

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 86.5 },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.38 },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rate: 1.54 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 154.0 },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.65 },
};

export interface CountryTierInfo {
  code: string;
  name: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  flag: string;
  cpmMultiplier: number;
}

export const COUNTRIES: CountryTierInfo[] = [
  // Tier 1
  { code: 'US', name: 'United States', tier: 'tier1', flag: '🇺🇸', cpmMultiplier: 1.0 },
  { code: 'GB', name: 'United Kingdom', tier: 'tier1', flag: '🇬🇧', cpmMultiplier: 0.88 },
  { code: 'CA', name: 'Canada', tier: 'tier1', flag: '🇨🇦', cpmMultiplier: 0.85 },
  { code: 'AU', name: 'Australia', tier: 'tier1', flag: '🇦🇺', cpmMultiplier: 0.90 },
  { code: 'DE', name: 'Germany', tier: 'tier1', flag: '🇩🇪', cpmMultiplier: 0.82 },
  { code: 'FR', name: 'France', tier: 'tier1', flag: '🇫🇷', cpmMultiplier: 0.75 },
  { code: 'CH', name: 'Switzerland', tier: 'tier1', flag: '🇨🇭', cpmMultiplier: 1.15 },
  { code: 'NO', name: 'Norway', tier: 'tier1', flag: '🇳🇴', cpmMultiplier: 0.95 },
  { code: 'SE', name: 'Sweden', tier: 'tier1', flag: '🇸🇪', cpmMultiplier: 0.85 },
  { code: 'NL', name: 'Netherlands', tier: 'tier1', flag: '🇳🇱', cpmMultiplier: 0.80 },
  { code: 'SG', name: 'Singapore', tier: 'tier1', flag: '🇸🇬', cpmMultiplier: 0.78 },
  { code: 'JP', name: 'Japan', tier: 'tier1', flag: '🇯🇵', cpmMultiplier: 0.72 },
  { code: 'NZ', name: 'New Zealand', tier: 'tier1', flag: '🇳🇿', cpmMultiplier: 0.82 },
  { code: 'AE', name: 'United Arab Emirates', tier: 'tier1', flag: '🇦🇪', cpmMultiplier: 0.80 },
  { code: 'DK', name: 'Denmark', tier: 'tier1', flag: '🇩🇰', cpmMultiplier: 0.88 },
  { code: 'AT', name: 'Austria', tier: 'tier1', flag: '🇦🇹', cpmMultiplier: 0.80 },
  { code: 'BE', name: 'Belgium', tier: 'tier1', flag: '🇧🇪', cpmMultiplier: 0.76 },
  { code: 'IE', name: 'Ireland', tier: 'tier1', flag: '🇮🇪', cpmMultiplier: 0.84 },
  { code: 'FI', name: 'Finland', tier: 'tier1', flag: '🇫🇮', cpmMultiplier: 0.82 },
  { code: 'KR', name: 'South Korea', tier: 'tier1', flag: '🇰🇷', cpmMultiplier: 0.68 },
  { code: 'IL', name: 'Israel', tier: 'tier1', flag: '🇮🇱', cpmMultiplier: 0.75 },

  // Tier 2
  { code: 'ES', name: 'Spain', tier: 'tier2', flag: '🇪🇸', cpmMultiplier: 0.45 },
  { code: 'IT', name: 'Italy', tier: 'tier2', flag: '🇮🇹', cpmMultiplier: 0.42 },
  { code: 'BR', name: 'Brazil', tier: 'tier2', flag: '🇧🇷', cpmMultiplier: 0.32 },
  { code: 'MX', name: 'Mexico', tier: 'tier2', flag: '🇲🇽', cpmMultiplier: 0.35 },
  { code: 'PL', name: 'Poland', tier: 'tier2', flag: '🇵🇱', cpmMultiplier: 0.38 },
  { code: 'ZA', name: 'South Africa', tier: 'tier2', flag: '🇿🇦', cpmMultiplier: 0.30 },
  { code: 'AR', name: 'Argentina', tier: 'tier2', flag: '🇦🇷', cpmMultiplier: 0.28 },
  { code: 'CL', name: 'Chile', tier: 'tier2', flag: '🇨🇱', cpmMultiplier: 0.34 },
  { code: 'CO', name: 'Colombia', tier: 'tier2', flag: '🇨🇴', cpmMultiplier: 0.26 },
  { code: 'RO', name: 'Romania', tier: 'tier2', flag: '🇷🇴', cpmMultiplier: 0.32 },
  { code: 'TR', name: 'Turkey', tier: 'tier2', flag: '🇹🇷', cpmMultiplier: 0.25 },
  { code: 'PT', name: 'Portugal', tier: 'tier2', flag: '🇵🇹', cpmMultiplier: 0.40 },
  { code: 'SA', name: 'Saudi Arabia', tier: 'tier2', flag: '🇸🇦', cpmMultiplier: 0.48 },
  { code: 'GR', name: 'Greece', tier: 'tier2', flag: '🇬🇷', cpmMultiplier: 0.36 },
  { code: 'CZ', name: 'Czech Republic', tier: 'tier2', flag: '🇨🇿', cpmMultiplier: 0.40 },
  { code: 'HU', name: 'Hungary', tier: 'tier2', flag: '🇭🇺', cpmMultiplier: 0.32 },
  { code: 'MY', name: 'Malaysia', tier: 'tier2', flag: '🇲🇾', cpmMultiplier: 0.28 },
  { code: 'TH', name: 'Thailand', tier: 'tier2', flag: '🇹🇭', cpmMultiplier: 0.24 },

  // Tier 3
  { code: 'IN', name: 'India', tier: 'tier3', flag: '🇮🇳', cpmMultiplier: 0.12 },
  { code: 'PK', name: 'Pakistan', tier: 'tier3', flag: '🇵🇰', cpmMultiplier: 0.08 },
  { code: 'BD', name: 'Bangladesh', tier: 'tier3', flag: '🇧🇩', cpmMultiplier: 0.07 },
  { code: 'NG', name: 'Nigeria', tier: 'tier3', flag: '🇳🇬', cpmMultiplier: 0.09 },
  { code: 'PH', name: 'Philippines', tier: 'tier3', flag: '🇵🇭', cpmMultiplier: 0.14 },
  { code: 'ID', name: 'Indonesia', tier: 'tier3', flag: '🇮🇩', cpmMultiplier: 0.13 },
  { code: 'VN', name: 'Vietnam', tier: 'tier3', flag: '🇻🇳', cpmMultiplier: 0.12 },
  { code: 'EG', name: 'Egypt', tier: 'tier3', flag: '🇪🇬', cpmMultiplier: 0.10 },
  { code: 'KE', name: 'Kenya', tier: 'tier3', flag: '🇰🇪', cpmMultiplier: 0.09 },
  { code: 'LK', name: 'Sri Lanka', tier: 'tier3', flag: '🇱🇰', cpmMultiplier: 0.08 },
  { code: 'GH', name: 'Ghana', tier: 'tier3', flag: '🇬🇭', cpmMultiplier: 0.08 },
  { code: 'NP', name: 'Nepal', tier: 'tier3', flag: '🇳🇵', cpmMultiplier: 0.07 },
];

export const REGIONAL_PRESETS = [
  { id: 'global-balanced', name: 'Global Balanced (50% T1, 30% T2, 20% T3)', t1: 50, t2: 30, t3: 20 },
  { id: 'tier1-dominant', name: 'Tier 1 Focused (80% T1, 15% T2, 5% T3)', t1: 80, t2: 15, t3: 5 },
  { id: 'tier3-emerging', name: 'Emerging Markets (10% T1, 30% T2, 60% T3)', t1: 10, t2: 30, t3: 60 },
  { id: 'latam-focus', name: 'LATAM Focused (15% T1, 75% T2, 10% T3)', t1: 15, t2: 75, t3: 10 },
  { id: 'south-asia', name: 'South Asia Dominant (5% T1, 15% T2, 80% T3)', t1: 5, t2: 15, t3: 80 },
];
