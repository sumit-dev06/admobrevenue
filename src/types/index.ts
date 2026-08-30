export type PlatformMode = 'adsense' | 'admob' | 'portfolio' | 'goal' | 'compare' | 'benchmarks';

export type CalculationMode = 'quick' | 'advanced';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY' | 'BRL';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number;
}

export type GeoTier = 'tier1' | 'tier2' | 'tier3';

export interface GeoDistribution {
  tier1: number;
  tier2: number;
  tier3: number;
}

export interface DeviceDistribution {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface AdSenseCategory {
  id: string;
  name: string;
  description: string;
  baseRpmTier1: number;
  baseRpmTier2: number;
  baseRpmTier3: number;
  baseCtr: number;
  baseCpcTier1: number;
  baseCpcTier2: number;
  baseCpcTier3: number;
  adBlockerRisk: number;
}

export interface AdSenseAdUnit {
  id: string;
  name: string;
  description: string;
  cpmMultiplier: number;
  defaultCount: number;
  maxCount: number;
  viewability: number;
}

export interface AdSenseInputs {
  mode: CalculationMode;
  monthlyPageviews: number;
  pagesPerVisit: number;
  categoryId: string;
  geoDistribution: GeoDistribution;
  deviceDistribution: DeviceDistribution;
  selectedUnits: {
    leaderboard: number;
    inArticle: number;
    sidebar: number;
    anchorAd: boolean;
    vignetteAd: boolean;
    multiplexAd: number;
  };
  customCtr?: number;
  customCpc?: number;
  adBlockerRate: number;
  viewabilityRate: number;
  selectedMonth: number;
  useSeasonality: boolean;
}

export interface AdSenseResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  pageRpm: number;
  impressionRpm: number;
  monthlyImpressions: number;
  viewableImpressions: number;
  monthlyClicks: number;
  blendedCtr: number;
  blendedCpc: number;
  adBlockLossRevenue: number;
  formatBreakdown: {
    name: string;
    revenue: number;
    percentage: number;
  }[];
  deviceBreakdown: {
    device: string;
    revenue: number;
    percentage: number;
  }[];
  geoBreakdown: {
    tier: string;
    name: string;
    revenue: number;
    percentage: number;
  }[];
  monthlyForecast: {
    month: string;
    revenue: number;
    multiplier: number;
  }[];
}

export interface AdMobCategory {
  id: string;
  name: string;
  description: string;
  baseStickiness: number;
  avgSessionsPerDay: number;
  avgSessionDurationMinutes: number;
  baseEcpm: {
    rewarded: { tier1: number; tier2: number; tier3: number };
    interstitial: { tier1: number; tier2: number; tier3: number };
    appOpen: { tier1: number; tier2: number; tier3: number };
    rewardedInterstitial: { tier1: number; tier2: number; tier3: number };
    native: { tier1: number; tier2: number; tier3: number };
    banner: { tier1: number; tier2: number; tier3: number };
  };
}

export interface AdMobInputs {
  mode: CalculationMode;
  dau: number;
  mau?: number;
  categoryId: string;
  geoDistribution: GeoDistribution;
  platformSplit: {
    ios: number;
    android: number;
  };
  sessionsPerUserPerDay: number;
  sessionDurationMinutes: number;
  adFormats: {
    rewardedVideo: { enabled: boolean; impressionsPerUserPerDay: number; customEcpm?: number };
    interstitial: { enabled: boolean; impressionsPerUserPerSession: number; customEcpm?: number };
    appOpen: { enabled: boolean; impressionsPerUserPerDay: number; customEcpm?: number };
    rewardedInterstitial: { enabled: boolean; impressionsPerUserPerDay: number; customEcpm?: number };
    native: { enabled: boolean; impressionsPerUserPerDay: number; customEcpm?: number };
    banner: { enabled: boolean; refreshIntervalSeconds: number; showPerSessionMinutes: number; customEcpm?: number };
  };
  hasMediation: boolean;
  fillRate: number;
  selectedMonth: number;
  useSeasonality: boolean;
}

export interface AdMobResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  arpdau: number;
  arpdauCents: number;
  arpau: number;
  blendedEcpm: number;
  monthlyImpressions: number;
  dailyImpressions: number;
  mediationLiftRevenue: number;
  formatBreakdown: {
    name: string;
    revenue: number;
    impressions: number;
    ecpm: number;
    percentage: number;
  }[];
  platformBreakdown: {
    platform: string;
    revenue: number;
    percentage: number;
  }[];
  geoBreakdown: {
    tier: string;
    name: string;
    revenue: number;
    percentage: number;
  }[];
  monthlyForecast: {
    month: string;
    revenue: number;
    multiplier: number;
  }[];
}

export interface BenchmarkItem {
  category: string;
  type: 'website' | 'app';
  niche: string;
  tier1RpmOrEcpm: string;
  tier2RpmOrEcpm: string;
  tier3RpmOrEcpm: string;
  avgCtr: string;
  topFormat: string;
  difficulty: 'Low' | 'Medium' | 'High';
  growthTrend: string;
}
