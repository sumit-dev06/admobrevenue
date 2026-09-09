export type PlatformMode = 'adsense' | 'admob' | 'portfolio' | 'goal' | 'compare' | 'benchmarks';

export type CalculationMode = 'quick' | 'advanced';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY' | 'BRL' | 'KRW';

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
  accountCountry?: string;
  targetCountry?: string;
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
  accountCountry?: string;
  targetCountry?: string;
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

// ==========================================
// YOUTUBE CREATOR TYPES
// ==========================================
export interface YouTubeInputs {
  monthlyLongFormViews: number;
  monthlyShortsViews: number;
  nicheId: string;
  enableMidrolls: boolean;
  activeMemberships: number;
  membershipPrice?: number;
  monthlySuperChats: number;
  monthlySponsorships: number;
  targetCountry?: string;
  accountCountry?: string;
  selectedMonth: number;
  useSeasonality: boolean;
}

export interface YouTubeResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  blendedRpm: number;
  longFormAdRevenue: number;
  shortsRevenue: number;
  membershipsRevenue: number;
  superChatsRevenue: number;
  sponsorshipRevenue: number;
  formatBreakdown: {
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

// ==========================================
// TIKTOK CREATOR TYPES
// ==========================================
export interface TikTokInputs {
  monthlyViews: number;
  nicheId: string;
  overOneMinutePercent: number; // 0 - 100%
  qualifiedViewRate: number; // 30% - 70%
  monthlyLiveHours: number;
  avgLiveCcv: number;
  monthlyDiamondsEarned: number;
  monthlyShopAffiliateEarnings: number;
  monthlySponsorships: number;
  targetCountry?: string;
  accountCountry?: string;
}

export interface TikTokResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  effectiveRpm: number;
  creatorRewardsRevenue: number;
  liveGiftsRevenue: number;
  shopAffiliateRevenue: number;
  sponsorshipRevenue: number;
  qualifiedViewsCount: number;
  formatBreakdown: {
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

// ==========================================
// TWITCH STREAMER TYPES
// ==========================================
export interface TwitchInputs {
  avgConcurrentViewers: number;
  streamHoursPerMonth: number;
  tier1Subs: number;
  tier2Subs: number;
  tier3Subs: number;
  partnerSplitRate: number; // 0.50, 0.60, 0.70
  adMinutesPerHour: number; // 0 to 6
  monthlyBits: number;
  monthlyDirectDonations: number;
  monthlySponsorships: number;
  targetCountry?: string;
  accountCountry?: string;
}

export interface TwitchResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  hourlyEarningsRate: number;
  subscriptionRevenue: number;
  adBreakRevenue: number;
  bitsRevenue: number;
  donationsRevenue: number;
  sponsorshipRevenue: number;
  totalSubPoints: number;
  formatBreakdown: {
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

// ==========================================
// MONEY RUNWAY (WITHDRAWAL) TYPES
// ==========================================
export interface RunwayInputs {
  principal: number;
  annualReturn: number;
  monthlyWithdrawal: number;
  yearlyIncrease: number; // % or fixed amount per year (inflation step-up)
  increaseMode: "percent" | "amount";
  targetCountry?: string;
  accountCountry?: string;
}

export interface RunwayMonthRow {
  month: number;
  startBalance: number;
  interest: number;
  withdrawal: number;
  endBalance: number;
}

export interface RunwayYearRow {
  year: number;
  startBalance: number;
  withdrawn: number;
  interest: number;
  endBalance: number;
}

export interface RunwayResults {
  months: number | null;
  neverDepletes: boolean;
  invalid: boolean;
  tooSmall: boolean;
  overdraw: boolean;
  breakeven: number;
  totalWithdrawn: number;
  totalInterest: number;
  rows: RunwayMonthRow[];
  yearly: RunwayYearRow[];
}

// ==========================================
// 8TH PAY COMMISSION (INDIA) TYPES
// ==========================================
export type HraCityClass = "X" | "Y" | "Z";

export interface PayCommissionInputs {
  payLevel: number; // 1 - 18
  currentBasic: number; // 7th CPC basic pay in INR
  fitmentFactor: number; // e.g. 1.92
  currentDaPercent: number; // e.g. 60
  hraClass: HraCityClass; // X 30% / Y 20% / Z 10%
  monthlyTa: number; // Transport Allowance base (excl. DA) in INR
  accountCountry?: string;
  targetCountry?: string;
}

export interface PayCommissionResults {
  revisedBasic: number; // rounded to nearest 100
  currentDa: number;
  currentHra: number;
  currentTaWithDa: number;
  currentGross: number;
  revisedHra: number;
  revisedTa: number; // TA with DA reset to 0
  revisedGross: number;
  monthlyIncrease: number;
  percentHike: number; // vs current gross
  effectiveHikeVsBasicDa: number; // vs basic + DA (Patel method)
  revisedPension: number; // 50% of revised basic
  currentPension: number; // 50% of current basic
  arrearsPerMonth: number;
}

// ==========================================
// FUEL COST (GLOBAL) TYPES
// ==========================================
export type DistanceUnit = "km" | "mi";
export type EfficiencyUnit = "kmpl" | "l100km" | "mpg_us" | "mpg_uk";
export type FuelPriceUnit = "per_litre" | "per_us_gallon" | "per_uk_gallon";

export interface FuelInputs {
  distance: number;
  distanceUnit: DistanceUnit;
  efficiency: number;
  efficiencyUnit: EfficiencyUnit;
  fuelPrice: number;
  fuelPriceUnit: FuelPriceUnit;
  roundTrip: boolean;
  tripsPerMonth: number;
  passengers: number;
  accountCountry?: string;
  targetCountry?: string;
}

export interface FuelResults {
  distanceKm: number;
  fuelNeededLitres: number;
  fuelNeededUsGallons: number;
  pricePerLitre: number;
  singleTripCost: number;
  costPerKm: number;
  monthlyCost: number;
  perPersonCost: number;
  invalid: boolean;
}

// ==========================================
// KICK STREAMER TYPES
// ==========================================
export interface KickInputs {
  avgConcurrentViewers: number;
  streamHoursPerMonth: number;
  activeSubs: number;
  kcpEligible: boolean;
  monthlyTips: number;
  monthlySponsorships: number;
  targetCountry?: string;
  accountCountry?: string;
}

export interface KickResults {
  dailyRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  hourlyEarningsRate: number;
  subscriptionRevenue: number;
  kcpStipendRevenue: number;
  tipsRevenue: number;
  sponsorshipRevenue: number;
  kickVsTwitchDelta: number; // How much extra earned on Kick vs Twitch 50% split
  formatBreakdown: {
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
