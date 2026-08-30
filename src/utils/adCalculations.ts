import {
  AdSenseInputs,
  AdSenseResults,
  AdMobInputs,
  AdMobResults,
} from "../types";
import { ADSENSE_CATEGORIES, ADSENSE_AD_UNITS, SEASONALITY_FACTORS } from "../data/adSenseData";
import { ADMOB_CATEGORIES } from "../data/adMobData";

export function calculateAdSenseRevenue(inputs: AdSenseInputs): AdSenseResults {
  const category =
    ADSENSE_CATEGORIES.find((c) => c.id === inputs.categoryId) || ADSENSE_CATEGORIES[0];

  const tier1Weight = (inputs.geoDistribution.tier1 || 0) / 100;
  const tier2Weight = (inputs.geoDistribution.tier2 || 0) / 100;
  const tier3Weight = (inputs.geoDistribution.tier3 || 0) / 100;

  const rawBaseRpm =
    category.baseRpmTier1 * tier1Weight +
    category.baseRpmTier2 * tier2Weight +
    category.baseRpmTier3 * tier3Weight;

  const rawBaseCpc =
    category.baseCpcTier1 * tier1Weight +
    category.baseCpcTier2 * tier2Weight +
    category.baseCpcTier3 * tier3Weight;

  const blendedCtr = inputs.customCtr !== undefined ? inputs.customCtr : category.baseCtr;
  const blendedCpc = inputs.customCpc !== undefined ? inputs.customCpc : rawBaseCpc;

  const units = inputs.selectedUnits;
  let totalUnitMultiplier = 0;
  const unitBreakdown: { name: string; multiplier: number; count: number }[] = [];

  if (units.leaderboard > 0) {
    const mult = units.leaderboard * ADSENSE_AD_UNITS.leaderboard.cpmMultiplier;
    totalUnitMultiplier += mult;
    unitBreakdown.push({
      name: ADSENSE_AD_UNITS.leaderboard.name,
      multiplier: mult,
      count: units.leaderboard,
    });
  }

  if (units.inArticle > 0) {
    const inArticleMult =
      units.inArticle <= 3
        ? units.inArticle * ADSENSE_AD_UNITS.inArticle.cpmMultiplier
        : (3 + (units.inArticle - 3) * 0.65) * ADSENSE_AD_UNITS.inArticle.cpmMultiplier;
    totalUnitMultiplier += inArticleMult;
    unitBreakdown.push({
      name: "In-Article Units (" + units.inArticle + "x)",
      multiplier: inArticleMult,
      count: units.inArticle,
    });
  }

  if (units.sidebar > 0) {
    const desktopRatio = (inputs.deviceDistribution.desktop || 0) / 100;
    const sidebarMult = units.sidebar * ADSENSE_AD_UNITS.sidebar.cpmMultiplier * (0.3 + 0.7 * desktopRatio);
    totalUnitMultiplier += sidebarMult;
    unitBreakdown.push({
      name: ADSENSE_AD_UNITS.sidebar.name,
      multiplier: sidebarMult,
      count: units.sidebar,
    });
  }

  if (units.anchorAd) {
    const mobileTabletRatio = ((inputs.deviceDistribution.mobile || 0) + (inputs.deviceDistribution.tablet || 0)) / 100;
    const anchorMult = ADSENSE_AD_UNITS.anchorAd.cpmMultiplier * (0.4 + 0.6 * mobileTabletRatio);
    totalUnitMultiplier += anchorMult;
    unitBreakdown.push({
      name: ADSENSE_AD_UNITS.anchorAd.name,
      multiplier: anchorMult,
      count: 1,
    });
  }

  if (units.vignetteAd) {
    const vignetteMult = ADSENSE_AD_UNITS.vignetteAd.cpmMultiplier;
    totalUnitMultiplier += vignetteMult;
    unitBreakdown.push({
      name: ADSENSE_AD_UNITS.vignetteAd.name,
      multiplier: vignetteMult,
      count: 1,
    });
  }

  if (units.multiplexAd > 0) {
    const multiplexMult = units.multiplexAd * ADSENSE_AD_UNITS.multiplexAd.cpmMultiplier;
    totalUnitMultiplier += multiplexMult;
    unitBreakdown.push({
      name: ADSENSE_AD_UNITS.multiplexAd.name,
      multiplier: multiplexMult,
      count: units.multiplexAd,
    });
  }

  if (totalUnitMultiplier === 0) {
    totalUnitMultiplier = 1.0;
  }

  const unitDensityFactor = totalUnitMultiplier / 3.4;
  const effectiveAdBlockRate = inputs.adBlockerRate !== undefined ? inputs.adBlockerRate : category.adBlockerRisk;
  const adBlockMultiplier = Math.max(0, 1 - effectiveAdBlockRate / 100);
  const viewabilityMultiplier = Math.min(1, Math.max(0.2, (inputs.viewabilityRate || 70) / 100));

  const mRatio = (inputs.deviceDistribution.mobile || 0) / 100;
  const dRatio = (inputs.deviceDistribution.desktop || 0) / 100;
  const tRatio = (inputs.deviceDistribution.tablet || 0) / 100;
  const deviceFactor = mRatio * 0.92 + dRatio * 1.15 + tRatio * 0.98;

  const currentMonthIdx = inputs.selectedMonth !== undefined ? inputs.selectedMonth : new Date().getMonth();
  const currentSeasonFactor = inputs.useSeasonality ? (SEASONALITY_FACTORS[currentMonthIdx]?.multiplier || 1.0) : 1.0;

  const calculatedPageRpm = rawBaseRpm * unitDensityFactor * adBlockMultiplier * viewabilityMultiplier * deviceFactor * currentSeasonFactor;
  const monthlyRevenue = (inputs.monthlyPageviews / 1000) * calculatedPageRpm;
  const dailyRevenue = monthlyRevenue / 30.417;

  let annualRevenue = 0;
  const monthlyForecast = SEASONALITY_FACTORS.map((sf) => {
    const monthMult = inputs.useSeasonality ? sf.multiplier : 1.0;
    const monthRev = (inputs.monthlyPageviews / 1000) * (rawBaseRpm * unitDensityFactor * adBlockMultiplier * viewabilityMultiplier * deviceFactor * monthMult);
    annualRevenue += monthRev;
    return {
      month: sf.month,
      revenue: Math.round(monthRev * 100) / 100,
      multiplier: sf.multiplier,
    };
  });

  const unitsPerPage = Math.max(1, Object.values(units).reduce<number>((acc, val) => acc + (typeof val === "boolean" ? (val ? 1 : 0) : Number(val)), 0));
  const totalRawImpressions = inputs.monthlyPageviews * unitsPerPage;
  const viewableImpressions = Math.round(totalRawImpressions * viewabilityMultiplier * adBlockMultiplier);
  const monthlyClicks = Math.round((viewableImpressions * blendedCtr) / 100);
  const impressionRpm = viewableImpressions > 0 ? (monthlyRevenue / viewableImpressions) * 1000 : calculatedPageRpm / unitsPerPage;

  const potentialWithoutAdBlock = (inputs.monthlyPageviews / 1000) * (rawBaseRpm * unitDensityFactor * viewabilityMultiplier * deviceFactor * currentSeasonFactor);
  const adBlockLossRevenue = Math.max(0, potentialWithoutAdBlock - monthlyRevenue);

  const formatBreakdown = unitBreakdown.map((item) => {
    const share = item.multiplier / totalUnitMultiplier;
    return {
      name: item.name,
      revenue: Math.round(monthlyRevenue * share * 100) / 100,
      percentage: Math.round(share * 100),
    };
  });

  const deviceBreakdown = [
    { device: "Mobile", revenue: Math.round(monthlyRevenue * mRatio * (0.92 / deviceFactor) * 100) / 100, percentage: Math.round(mRatio * 100) },
    { device: "Desktop", revenue: Math.round(monthlyRevenue * dRatio * (1.15 / deviceFactor) * 100) / 100, percentage: Math.round(dRatio * 100) },
    { device: "Tablet", revenue: Math.round(monthlyRevenue * tRatio * (0.98 / deviceFactor) * 100) / 100, percentage: Math.round(tRatio * 100) },
  ].filter((d) => d.percentage > 0);

  const geoWeightedSum = (category.baseRpmTier1 * tier1Weight) + (category.baseRpmTier2 * tier2Weight) + (category.baseRpmTier3 * tier3Weight);
  const geoBreakdown = [
    { tier: "tier1", name: "Tier 1 (US, UK, CA, AU, EU)", revenue: Math.round((monthlyRevenue * (category.baseRpmTier1 * tier1Weight) / (geoWeightedSum || 1)) * 100) / 100, percentage: Math.round(tier1Weight * 100) },
    { tier: "tier2", name: "Tier 2 (BR, MX, IT, ES, ZA)", revenue: Math.round((monthlyRevenue * (category.baseRpmTier2 * tier2Weight) / (geoWeightedSum || 1)) * 100) / 100, percentage: Math.round(tier2Weight * 100) },
    { tier: "tier3", name: "Tier 3 (IN, PK, NG, BD, PH)", revenue: Math.round((monthlyRevenue * (category.baseRpmTier3 * tier3Weight) / (geoWeightedSum || 1)) * 100) / 100, percentage: Math.round(tier3Weight * 100) },
  ].filter((g) => g.percentage > 0);

  return {
    dailyRevenue: Math.round(dailyRevenue * 100) / 100,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    annualRevenue: Math.round(annualRevenue * 100) / 100,
    pageRpm: Math.round(calculatedPageRpm * 100) / 100,
    impressionRpm: Math.round(impressionRpm * 100) / 100,
    monthlyImpressions: totalRawImpressions,
    viewableImpressions,
    monthlyClicks,
    blendedCtr: Math.round(blendedCtr * 100) / 100,
    blendedCpc: Math.round(blendedCpc * 100) / 100,
    adBlockLossRevenue: Math.round(adBlockLossRevenue * 100) / 100,
    formatBreakdown,
    deviceBreakdown,
    geoBreakdown,
    monthlyForecast,
  };
}

export function calculateAdMobRevenue(inputs: AdMobInputs): AdMobResults {
  const category = ADMOB_CATEGORIES.find((c) => c.id === inputs.categoryId) || ADMOB_CATEGORIES[0];

  const tier1Weight = (inputs.geoDistribution.tier1 || 0) / 100;
  const tier2Weight = (inputs.geoDistribution.tier2 || 0) / 100;
  const tier3Weight = (inputs.geoDistribution.tier3 || 0) / 100;

  const iosRatio = (inputs.platformSplit.ios || 0) / 100;
  const androidRatio = (inputs.platformSplit.android || 0) / 100;
  const osMultiplier = iosRatio * 1.30 + androidRatio * 0.90;

  const mediationMultiplier = inputs.hasMediation ? 1.25 : 1.0;
  const fillRateMultiplier = Math.min(1, Math.max(0.5, (inputs.fillRate || 95) / 100));

  const currentMonthIdx = inputs.selectedMonth !== undefined ? inputs.selectedMonth : new Date().getMonth();
  const currentSeasonFactor = inputs.useSeasonality ? (SEASONALITY_FACTORS[currentMonthIdx]?.multiplier || 1.0) : 1.0;

  let totalDailyRevenue = 0;
  let totalDailyImpressions = 0;
  const formatBreakdown: { name: string; revenue: number; impressions: number; ecpm: number; percentage: number }[] = [];

  const getFormatEcpm = (formatKey: keyof typeof category.baseEcpm, customEcpm?: number) => {
    if (customEcpm !== undefined && customEcpm > 0) return customEcpm;
    const baseObj = category.baseEcpm[formatKey];
    const blendedBase = baseObj.tier1 * tier1Weight + baseObj.tier2 * tier2Weight + baseObj.tier3 * tier3Weight;
    return blendedBase * osMultiplier * mediationMultiplier * currentSeasonFactor;
  };

  const formats = inputs.adFormats;

  if (formats.rewardedVideo.enabled && formats.rewardedVideo.impressionsPerUserPerDay > 0) {
    const dailyImps = inputs.dau * formats.rewardedVideo.impressionsPerUserPerDay * fillRateMultiplier;
    const ecpm = getFormatEcpm("rewarded", formats.rewardedVideo.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "Rewarded Video",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  if (formats.interstitial.enabled && formats.interstitial.impressionsPerUserPerSession > 0) {
    const dailyImps = inputs.dau * (inputs.sessionsPerUserPerDay || category.avgSessionsPerDay) * formats.interstitial.impressionsPerUserPerSession * fillRateMultiplier;
    const ecpm = getFormatEcpm("interstitial", formats.interstitial.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "Interstitial Ads",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  if (formats.appOpen.enabled && formats.appOpen.impressionsPerUserPerDay > 0) {
    const dailyImps = inputs.dau * formats.appOpen.impressionsPerUserPerDay * fillRateMultiplier;
    const ecpm = getFormatEcpm("appOpen", formats.appOpen.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "App Open Ads",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  if (formats.rewardedInterstitial.enabled && formats.rewardedInterstitial.impressionsPerUserPerDay > 0) {
    const dailyImps = inputs.dau * formats.rewardedInterstitial.impressionsPerUserPerDay * fillRateMultiplier;
    const ecpm = getFormatEcpm("rewardedInterstitial", formats.rewardedInterstitial.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "Rewarded Interstitials",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  if (formats.native.enabled && formats.native.impressionsPerUserPerDay > 0) {
    const dailyImps = inputs.dau * formats.native.impressionsPerUserPerDay * fillRateMultiplier;
    const ecpm = getFormatEcpm("native", formats.native.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "Native Advanced",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  if (formats.banner.enabled && formats.banner.showPerSessionMinutes > 0) {
    const refreshSec = Math.max(20, formats.banner.refreshIntervalSeconds || 30);
    const impressionsPerSession = (formats.banner.showPerSessionMinutes * 60) / refreshSec;
    const dailyImps = inputs.dau * (inputs.sessionsPerUserPerDay || category.avgSessionsPerDay) * impressionsPerSession * fillRateMultiplier;
    const ecpm = getFormatEcpm("banner", formats.banner.customEcpm);
    const dailyRev = (dailyImps / 1000) * ecpm;
    totalDailyRevenue += dailyRev;
    totalDailyImpressions += dailyImps;
    formatBreakdown.push({
      name: "Adaptive Banners",
      revenue: dailyRev * 30.417,
      impressions: Math.round(dailyImps * 30.417),
      ecpm: Math.round(ecpm * 100) / 100,
      percentage: 0,
    });
  }

  const monthlyRevenue = totalDailyRevenue * 30.417;
  const annualRevenue = monthlyRevenue * 12;

  formatBreakdown.forEach((f) => {
    f.percentage = monthlyRevenue > 0 ? Math.round((f.revenue / monthlyRevenue) * 100) : 0;
  });

  const arpdau = inputs.dau > 0 ? totalDailyRevenue / inputs.dau : 0;
  const estimatedMau = inputs.mau || (category.baseStickiness > 0 ? inputs.dau / category.baseStickiness : inputs.dau * 4);
  const arpau = estimatedMau > 0 ? monthlyRevenue / estimatedMau : 0;
  const blendedEcpm = totalDailyImpressions > 0 ? (totalDailyRevenue / totalDailyImpressions) * 1000 : 0;
  const mediationLiftRevenue = inputs.hasMediation ? monthlyRevenue - monthlyRevenue / 1.25 : 0;

  const platformBreakdown = [
    { platform: "iOS", revenue: Math.round(monthlyRevenue * (iosRatio * 1.30 / osMultiplier) * 100) / 100, percentage: Math.round(iosRatio * 100) },
    { platform: "Android", revenue: Math.round(monthlyRevenue * (androidRatio * 0.90 / osMultiplier) * 100) / 100, percentage: Math.round(androidRatio * 100) },
  ].filter((p) => p.percentage > 0);

  const geoBreakdown = [
    { tier: "tier1", name: "Tier 1 (US, UK, CA, AU, EU)", revenue: Math.round(monthlyRevenue * tier1Weight * 0.72 * 100) / 100, percentage: Math.round(tier1Weight * 100) },
    { tier: "tier2", name: "Tier 2 (BR, MX, IT, ES, ZA)", revenue: Math.round(monthlyRevenue * tier2Weight * 0.22 * 100) / 100, percentage: Math.round(tier2Weight * 100) },
    { tier: "tier3", name: "Tier 3 (IN, PK, NG, BD, PH)", revenue: Math.round(monthlyRevenue * tier3Weight * 0.06 * 100) / 100, percentage: Math.round(tier3Weight * 100) },
  ].filter((g) => g.percentage > 0);

  const monthlyForecast = SEASONALITY_FACTORS.map((sf) => {
    const monthMult = inputs.useSeasonality ? sf.multiplier : 1.0;
    const monthRev = (monthlyRevenue / (currentSeasonFactor || 1)) * monthMult;
    return {
      month: sf.month,
      revenue: Math.round(monthRev * 100) / 100,
      multiplier: sf.multiplier,
    };
  });

  return {
    dailyRevenue: Math.round(totalDailyRevenue * 100) / 100,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    annualRevenue: Math.round(annualRevenue * 100) / 100,
    arpdau: Math.round(arpdau * 10000) / 10000,
    arpdauCents: Math.round(arpdau * 1000) / 10,
    arpau: Math.round(arpau * 100) / 100,
    blendedEcpm: Math.round(blendedEcpm * 100) / 100,
    monthlyImpressions: Math.round(totalDailyImpressions * 30.417),
    dailyImpressions: Math.round(totalDailyImpressions),
    mediationLiftRevenue: Math.round(mediationLiftRevenue * 100) / 100,
    formatBreakdown,
    platformBreakdown,
    geoBreakdown,
    monthlyForecast,
  };
}

export function calculateReverseGoal(
  targetMonthlyIncome: number,
  platform: "adsense" | "admob",
  categoryId: string,
  geoTierDistribution: { tier1: number; tier2: number; tier3: number }
) {
  if (platform === "adsense") {
    const category = ADSENSE_CATEGORIES.find((c) => c.id === categoryId) || ADSENSE_CATEGORIES[0];
    const t1 = (geoTierDistribution.tier1 || 0) / 100;
    const t2 = (geoTierDistribution.tier2 || 0) / 100;
    const t3 = (geoTierDistribution.tier3 || 0) / 100;
    const expectedRpm = Math.max(1, category.baseRpmTier1 * t1 + category.baseRpmTier2 * t2 + category.baseRpmTier3 * t3);

    const requiredMonthlyPageviews = Math.round((targetMonthlyIncome / expectedRpm) * 1000);
    const requiredDailyPageviews = Math.round(requiredMonthlyPageviews / 30.417);
    const requiredDailyVisitors = Math.round(requiredDailyPageviews / 1.8);

    return {
      platform: "adsense" as const,
      targetMonthlyIncome,
      expectedRpm: Math.round(expectedRpm * 100) / 100,
      requiredMonthlyPageviews,
      requiredDailyPageviews,
      requiredDailyVisitors,
      milestones: [
        { label: "Starter Goal (25%)", income: Math.round(targetMonthlyIncome * 0.25), pageviews: Math.round(requiredMonthlyPageviews * 0.25) },
        { label: "Halfway Mark (50%)", income: Math.round(targetMonthlyIncome * 0.50), pageviews: Math.round(requiredMonthlyPageviews * 0.50) },
        { label: "Target Milestone (75%)", income: Math.round(targetMonthlyIncome * 0.75), pageviews: Math.round(requiredMonthlyPageviews * 0.75) },
        { label: "Full Goal (100%)", income: Math.round(targetMonthlyIncome), pageviews: requiredMonthlyPageviews },
      ],
    };
  } else {
    const category = ADMOB_CATEGORIES.find((c) => c.id === categoryId) || ADMOB_CATEGORIES[0];
    const t1 = (geoTierDistribution.tier1 || 0) / 100;
    const t2 = (geoTierDistribution.tier2 || 0) / 100;
    const t3 = (geoTierDistribution.tier3 || 0) / 100;

    const baseRewarded = category.baseEcpm.rewarded.tier1 * t1 + category.baseEcpm.rewarded.tier2 * t2 + category.baseEcpm.rewarded.tier3 * t3;
    const estimatedArpdau = Math.max(0.02, (baseRewarded * 1.5 + 8) / 1000);

    const requiredDailyIncome = targetMonthlyIncome / 30.417;
    const requiredDau = Math.round(requiredDailyIncome / estimatedArpdau);
    const requiredMau = Math.round(requiredDau / (category.baseStickiness || 0.25));

    return {
      platform: "admob" as const,
      targetMonthlyIncome,
      estimatedArpdau: Math.round(estimatedArpdau * 1000) / 1000,
      requiredDau,
      requiredMau,
      requiredDailyImpressions: Math.round(requiredDau * 4.5),
      milestones: [
        { label: "Starter Goal (25%)", income: Math.round(targetMonthlyIncome * 0.25), dau: Math.round(requiredDau * 0.25) },
        { label: "Halfway Mark (50%)", income: Math.round(targetMonthlyIncome * 0.50), dau: Math.round(requiredDau * 0.50) },
        { label: "Target Milestone (75%)", income: Math.round(targetMonthlyIncome * 0.75), dau: Math.round(requiredDau * 0.75) },
        { label: "Full Goal (100%)", income: Math.round(targetMonthlyIncome), dau: requiredDau },
      ],
    };
  }
}