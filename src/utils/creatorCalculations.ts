import {
  CurrencyCode,
  YouTubeInputs,
  YouTubeResults,
  TikTokInputs,
  TikTokResults,
  TwitchInputs,
  TwitchResults,
  KickInputs,
  KickResults,
} from '../types';
import { getCountryByCode } from '../data/geoTiers';
import {
  YOUTUBE_NICHES,
  TIKTOK_NICHES,
  TWITCH_SUBSCRIPTION_PRICING,
  KICK_SUBSCRIPTION_PRICING,
  KICK_CREATOR_SPLIT,
  KICK_KCP_TIERS,
} from '../data/creatorPlatforms';
import { SEASONALITY_FACTORS } from '../data/adSenseData';

const MONTHLY_SEASONALITY = SEASONALITY_FACTORS.map((s) => s.multiplier);

// =================================================================
// 1. YOUTUBE REVENUE CALCULATIONS (Returns Base USD Values)
// =================================================================
export function calculateYouTubeRevenue(
  inputs: YouTubeInputs,
  _currencyCode: CurrencyCode = 'USD'
): YouTubeResults {
  const niche = YOUTUBE_NICHES.find((n) => n.id === inputs.nicheId) || YOUTUBE_NICHES[0];
  const targetCountry = getCountryByCode(inputs.targetCountry || 'US');
  const countryMultiplier = targetCountry.cpmMultiplier || 1.0;

  // Mid-roll multiplier for >8min videos (+45% lift)
  const midrollMultiplier = inputs.enableMidrolls ? 1.45 : 1.0;

  // Seasonality
  const seasonMult = inputs.useSeasonality ? (MONTHLY_SEASONALITY[inputs.selectedMonth] || 1.0) : 1.0;

  // 1. Long-Form Ad Revenue (55% creator split is already embedded in standard industry RPM)
  const effectiveLongFormRpmUsd = niche.baseRpm * countryMultiplier * midrollMultiplier * seasonMult;
  const monthlyLongFormAdRevenueUsd = (inputs.monthlyLongFormViews / 1000) * effectiveLongFormRpmUsd;

  // 2. YouTube Shorts Revenue ($0.03 - $0.09 RPM pool, scaled by geo)
  const shortsRpmUsd = 0.055 * countryMultiplier;
  const monthlyShortsRevenueUsd = (inputs.monthlyShortsViews / 1000) * shortsRpmUsd;

  // 3. Channel Memberships (default $4.99/mo standard, 70% creator share)
  const membershipPriceUsd = inputs.membershipPrice !== undefined && inputs.membershipPrice > 0 ? inputs.membershipPrice : 4.99;
  const monthlyMembershipsUsd = inputs.activeMemberships * membershipPriceUsd * 0.70;

  // 4. SuperChats & SuperThanks (70% creator share)
  const monthlySuperChatsUsd = inputs.monthlySuperChats * 0.70;

  // 5. Brand Sponsorships & Integrations
  const monthlySponsorshipsUsd = inputs.monthlySponsorships;

  const totalMonthlyUsd =
    monthlyLongFormAdRevenueUsd +
    monthlyShortsRevenueUsd +
    monthlyMembershipsUsd +
    monthlySuperChatsUsd +
    monthlySponsorshipsUsd;

  const dailyRevenue = totalMonthlyUsd / 30.417;
  const annualRevenue = totalMonthlyUsd * 12;

  const totalViews = inputs.monthlyLongFormViews + inputs.monthlyShortsViews;
  const blendedRpm = totalViews > 0 ? (totalMonthlyUsd / (totalViews / 1000)) : 0;

  const formatBreakdown = [
    {
      name: 'Long-Form Video Ads (YPP)',
      revenue: monthlyLongFormAdRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (monthlyLongFormAdRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'YouTube Shorts Ad Revenue',
      revenue: monthlyShortsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (monthlyShortsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Channel Memberships (70% Net)',
      revenue: monthlyMembershipsUsd,
      percentage: totalMonthlyUsd > 0 ? (monthlyMembershipsUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Super Chats & Super Thanks',
      revenue: monthlySuperChatsUsd,
      percentage: totalMonthlyUsd > 0 ? (monthlySuperChatsUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Brand Sponsorships',
      revenue: monthlySponsorshipsUsd,
      percentage: totalMonthlyUsd > 0 ? (monthlySponsorshipsUsd / totalMonthlyUsd) * 100 : 0,
    },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseMonthly = totalMonthlyUsd / seasonMult;
  const monthlyForecast = months.map((m, idx) => ({
    month: m,
    revenue: baseMonthly * MONTHLY_SEASONALITY[idx],
    multiplier: MONTHLY_SEASONALITY[idx],
  }));

  return {
    dailyRevenue,
    monthlyRevenue: totalMonthlyUsd,
    annualRevenue,
    blendedRpm,
    longFormAdRevenue: monthlyLongFormAdRevenueUsd,
    shortsRevenue: monthlyShortsRevenueUsd,
    membershipsRevenue: monthlyMembershipsUsd,
    superChatsRevenue: monthlySuperChatsUsd,
    sponsorshipRevenue: monthlySponsorshipsUsd,
    formatBreakdown,
    monthlyForecast,
  };
}

// =================================================================
// 2. TIKTOK REVENUE CALCULATIONS (Returns Base USD Values)
// =================================================================
export function calculateTikTokRevenue(
  inputs: TikTokInputs,
  _currencyCode: CurrencyCode = 'USD'
): TikTokResults {
  const niche = TIKTOK_NICHES.find((n) => n.id === inputs.nicheId) || TIKTOK_NICHES[0];
  const targetCountry = getCountryByCode(inputs.targetCountry || 'US');
  const countryMultiplier = targetCountry.cpmMultiplier || 1.0;

  // 1. Creator Rewards Program (requires >1 minute videos and qualified views)
  const eligibleViewsRatio = (inputs.overOneMinutePercent / 100);
  const qualifiedRatio = (inputs.qualifiedViewRate / 100);
  const qualifiedViewsCount = inputs.monthlyViews * eligibleViewsRatio * qualifiedRatio;

  const rpmUsd = niche.baseRpm * countryMultiplier;
  const creatorRewardsRevenueUsd = (qualifiedViewsCount / 1000) * rpmUsd;

  // 2. LIVE Stream Gifts / Diamonds (1 Diamond = $0.005, TikTok keeps 50%)
  const diamondValueUsd = 0.005;
  const liveGiftsRevenueUsd = inputs.monthlyDiamondsEarned * diamondValueUsd * 0.50;

  // 3. TikTok Shop Affiliate Commission
  const shopAffiliateRevenueUsd = inputs.monthlyShopAffiliateEarnings;

  // 4. Sponsorships & Brand Deals
  const sponsorshipRevenueUsd = inputs.monthlySponsorships;

  const totalMonthlyUsd =
    creatorRewardsRevenueUsd +
    liveGiftsRevenueUsd +
    shopAffiliateRevenueUsd +
    sponsorshipRevenueUsd;

  const dailyRevenue = totalMonthlyUsd / 30.417;
  const annualRevenue = totalMonthlyUsd * 12;
  const effectiveRpm = inputs.monthlyViews > 0 ? (totalMonthlyUsd / (inputs.monthlyViews / 1000)) : 0;

  const formatBreakdown = [
    {
      name: 'Creator Rewards Program (1m+ Videos)',
      revenue: creatorRewardsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (creatorRewardsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'LIVE Stream Gift Diamonds (50% Net)',
      revenue: liveGiftsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (liveGiftsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'TikTok Shop / Affiliate Sales',
      revenue: shopAffiliateRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (shopAffiliateRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Brand Campaigns & Spark Ads',
      revenue: sponsorshipRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (sponsorshipRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyForecast = months.map((m, idx) => ({
    month: m,
    revenue: totalMonthlyUsd * MONTHLY_SEASONALITY[idx],
    multiplier: MONTHLY_SEASONALITY[idx],
  }));

  return {
    dailyRevenue,
    monthlyRevenue: totalMonthlyUsd,
    annualRevenue,
    effectiveRpm,
    creatorRewardsRevenue: creatorRewardsRevenueUsd,
    liveGiftsRevenue: liveGiftsRevenueUsd,
    shopAffiliateRevenue: shopAffiliateRevenueUsd,
    sponsorshipRevenue: sponsorshipRevenueUsd,
    qualifiedViewsCount,
    formatBreakdown,
    monthlyForecast,
  };
}

// =================================================================
// 3. TWITCH REVENUE CALCULATIONS (Returns Base USD Values)
// =================================================================
export function calculateTwitchRevenue(
  inputs: TwitchInputs,
  _currencyCode: CurrencyCode = 'USD'
): TwitchResults {
  const split = inputs.partnerSplitRate || 0.50;
  const targetCountry = getCountryByCode(inputs.targetCountry || 'US');
  const countryMultiplier = targetCountry.cpmMultiplier || 1.0;

  // 1. Subscriptions (Tier 1 = 1 point, Tier 2 = 2 points, Tier 3 = 6 points)
  const t1Net = inputs.tier1Subs * TWITCH_SUBSCRIPTION_PRICING.tier1 * split;
  const t2Net = inputs.tier2Subs * TWITCH_SUBSCRIPTION_PRICING.tier2 * split;
  const t3Net = inputs.tier3Subs * TWITCH_SUBSCRIPTION_PRICING.tier3 * split;
  const subscriptionRevenueUsd = t1Net + t2Net + t3Net;
  const totalSubPoints = inputs.tier1Subs + (inputs.tier2Subs * 2) + (inputs.tier3Subs * 6);

  // 2. Twitch Ad Incentive Program (AIP)
  // Each ad minute delivers ~2 thirty-second video ad impressions per concurrent viewer
  const totalViewerHours = inputs.avgConcurrentViewers * inputs.streamHoursPerMonth;
  const totalAdImpressions = totalViewerHours * (inputs.adMinutesPerHour * 2);
  const baseAdCpmUsd = 3.50 * countryMultiplier;
  const adBreakRevenueUsd = (totalAdImpressions / 1000) * baseAdCpmUsd;

  // 3. Bits (1 bit = $0.01 to streamer)
  const bitsRevenueUsd = inputs.monthlyBits * 0.01;

  // 4. Direct Donations (PayPal / Streamlabs ~97% net)
  const donationsRevenueUsd = inputs.monthlyDirectDonations * 0.97;

  // 5. Monthly Sponsorships / Bounties
  const sponsorshipRevenueUsd = inputs.monthlySponsorships;

  const totalMonthlyUsd =
    subscriptionRevenueUsd +
    adBreakRevenueUsd +
    bitsRevenueUsd +
    donationsRevenueUsd +
    sponsorshipRevenueUsd;

  const dailyRevenue = totalMonthlyUsd / 30.417;
  const annualRevenue = totalMonthlyUsd * 12;
  const hourlyEarningsRate = inputs.streamHoursPerMonth > 0 ? (totalMonthlyUsd / inputs.streamHoursPerMonth) : 0;

  const formatBreakdown = [
    {
      name: `Subscriptions (${Math.round(split * 100)}% Net Split)`,
      revenue: subscriptionRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (subscriptionRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'In-Stream Video Ads (AIP)',
      revenue: adBreakRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (adBreakRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Bits & Cheering ($0.01/bit)',
      revenue: bitsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (bitsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Direct Tips & Donations',
      revenue: donationsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (donationsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Sponsorships & Bounty Board',
      revenue: sponsorshipRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (sponsorshipRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyForecast = months.map((m, idx) => ({
    month: m,
    revenue: totalMonthlyUsd * MONTHLY_SEASONALITY[idx],
    multiplier: MONTHLY_SEASONALITY[idx],
  }));

  return {
    dailyRevenue,
    monthlyRevenue: totalMonthlyUsd,
    annualRevenue,
    hourlyEarningsRate,
    subscriptionRevenue: subscriptionRevenueUsd,
    adBreakRevenue: adBreakRevenueUsd,
    bitsRevenue: bitsRevenueUsd,
    donationsRevenue: donationsRevenueUsd,
    sponsorshipRevenue: sponsorshipRevenueUsd,
    totalSubPoints,
    formatBreakdown,
    monthlyForecast,
  };
}

// =================================================================
// 4. KICK REVENUE CALCULATIONS (Returns Base USD Values)
// =================================================================
export function calculateKickRevenue(
  inputs: KickInputs,
  _currencyCode: CurrencyCode = 'USD'
): KickResults {
  // 1. Kick 95/5 Subscriptions ($4.99/sub, creator receives 95% = $4.74)
  const subscriptionRevenueUsd = inputs.activeSubs * KICK_SUBSCRIPTION_PRICING.tier1 * KICK_CREATOR_SPLIT;

  // 2. KICK Creator Program (KCP) Hourly Pay
  let kcpRate = 0;
  if (inputs.kcpEligible) {
    const tier = KICK_KCP_TIERS.slice().reverse().find((t) => inputs.avgConcurrentViewers >= t.minCcv) || KICK_KCP_TIERS[0];
    kcpRate = tier.hourlyRate;
  }
  const kcpStipendRevenueUsd = inputs.kcpEligible ? (inputs.streamHoursPerMonth * kcpRate) : 0;

  // 3. Direct Tips & Crypto Donations (100% creator)
  const tipsRevenueUsd = inputs.monthlyTips;

  // 4. Sponsorships
  const sponsorshipRevenueUsd = inputs.monthlySponsorships;

  const totalMonthlyUsd =
    subscriptionRevenueUsd +
    kcpStipendRevenueUsd +
    tipsRevenueUsd +
    sponsorshipRevenueUsd;

  const dailyRevenue = totalMonthlyUsd / 30.417;
  const annualRevenue = totalMonthlyUsd * 12;
  const hourlyEarningsRate = inputs.streamHoursPerMonth > 0 ? (totalMonthlyUsd / inputs.streamHoursPerMonth) : 0;

  // Twitch 50% comparison delta
  const twitchEquivalentSubs = inputs.activeSubs * 4.99 * 0.50;
  const kickVsTwitchDeltaUsd = (subscriptionRevenueUsd - twitchEquivalentSubs) + kcpStipendRevenueUsd;

  const formatBreakdown = [
    {
      name: 'Kick Subscriptions (95% Payout)',
      revenue: subscriptionRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (subscriptionRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'KICK Creator Program (Hourly Stipend)',
      revenue: kcpStipendRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (kcpStipendRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Direct Tips & Crypto Donations',
      revenue: tipsRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (tipsRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
    {
      name: 'Sponsorships & Brand Deals',
      revenue: sponsorshipRevenueUsd,
      percentage: totalMonthlyUsd > 0 ? (sponsorshipRevenueUsd / totalMonthlyUsd) * 100 : 0,
    },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyForecast = months.map((m, idx) => ({
    month: m,
    revenue: totalMonthlyUsd * MONTHLY_SEASONALITY[idx],
    multiplier: MONTHLY_SEASONALITY[idx],
  }));

  return {
    dailyRevenue,
    monthlyRevenue: totalMonthlyUsd,
    annualRevenue,
    hourlyEarningsRate,
    subscriptionRevenue: subscriptionRevenueUsd,
    kcpStipendRevenue: kcpStipendRevenueUsd,
    tipsRevenue: tipsRevenueUsd,
    sponsorshipRevenue: sponsorshipRevenueUsd,
    kickVsTwitchDelta: kickVsTwitchDeltaUsd,
    formatBreakdown,
    monthlyForecast,
  };
}
