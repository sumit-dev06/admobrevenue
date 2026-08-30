export interface QuickPreset {
  id: string;
  name: string;
  badge: string;
  type: 'adsense' | 'admob';
  description: string;
  params: Record<string, any>;
}

export const QUICK_PRESETS: QuickPreset[] = [
  {
    id: 'tech-blog-50k',
    name: 'Tech & AI Blog (50K PV)',
    badge: 'AdSense',
    type: 'adsense',
    description: 'High-intent tech blog with 50,000 monthly pageviews in Tier 1 US/UK markets',
    params: {
      monthlyPageviews: 50000,
      categoryId: 'tech-software-ai',
      geoDistribution: { tier1: 75, tier2: 18, tier3: 7 },
      deviceDistribution: { mobile: 55, desktop: 42, tablet: 3 },
      selectedUnits: {
        leaderboard: 1,
        inArticle: 3,
        sidebar: 1,
        anchorAd: true,
        vignetteAd: true,
        multiplexAd: 1,
      },
    },
  },
  {
    id: 'finance-portal-200k',
    name: 'Personal Finance & Loans (200K PV)',
    badge: 'AdSense',
    type: 'adsense',
    description: 'Finance & credit card review portal with massive high-CPC advertiser demand',
    params: {
      monthlyPageviews: 200000,
      categoryId: 'finance-insurance',
      geoDistribution: { tier1: 85, tier2: 12, tier3: 3 },
      deviceDistribution: { mobile: 65, desktop: 32, tablet: 3 },
      selectedUnits: {
        leaderboard: 1,
        inArticle: 4,
        sidebar: 1,
        anchorAd: true,
        vignetteAd: true,
        multiplexAd: 1,
      },
    },
  },
  {
    id: 'recipe-food-150k',
    name: 'Food & Recipe Blog (150K PV)',
    badge: 'AdSense',
    type: 'adsense',
    description: 'Popular recipe blog with high mobile readership and sticky in-content ad placements',
    params: {
      monthlyPageviews: 150000,
      categoryId: 'food-recipes',
      geoDistribution: { tier1: 70, tier2: 22, tier3: 8 },
      deviceDistribution: { mobile: 82, desktop: 15, tablet: 3 },
      selectedUnits: {
        leaderboard: 1,
        inArticle: 4,
        sidebar: 1,
        anchorAd: true,
        vignetteAd: true,
        multiplexAd: 1,
      },
    },
  },
  {
    id: 'hypercasual-game-25k',
    name: 'Hypercasual Mobile Game (25K DAU)',
    badge: 'AdMob',
    type: 'admob',
    description: 'Fast-paced arcade mobile game with high daily interstitial and app-open triggers',
    params: {
      dau: 25000,
      categoryId: 'hypercasual-games',
      geoDistribution: { tier1: 45, tier2: 35, tier3: 20 },
      platformSplit: { ios: 35, android: 65 },
      hasMediation: true,
      adFormats: {
        rewardedVideo: { enabled: true, impressionsPerUserPerDay: 1.8 },
        interstitial: { enabled: true, impressionsPerUserPerSession: 1.5 },
        appOpen: { enabled: true, impressionsPerUserPerDay: 1.2 },
        rewardedInterstitial: { enabled: true, impressionsPerUserPerDay: 0.5 },
        native: { enabled: false, impressionsPerUserPerDay: 0 },
        banner: { enabled: true, refreshIntervalSeconds: 30, showPerSessionMinutes: 3.5 },
      },
    },
  },
  {
    id: 'casual-puzzle-10k',
    name: 'Casual Match-3 / Puzzle Game (10K DAU)',
    badge: 'AdMob',
    type: 'admob',
    description: 'Rewarding puzzle game with high user retention and rewarded video ad rewards',
    params: {
      dau: 10000,
      categoryId: 'casual-puzzle-games',
      geoDistribution: { tier1: 65, tier2: 25, tier3: 10 },
      platformSplit: { ios: 50, android: 50 },
      hasMediation: true,
      adFormats: {
        rewardedVideo: { enabled: true, impressionsPerUserPerDay: 2.8 },
        interstitial: { enabled: true, impressionsPerUserPerSession: 1.2 },
        appOpen: { enabled: true, impressionsPerUserPerDay: 1.5 },
        rewardedInterstitial: { enabled: true, impressionsPerUserPerDay: 0.8 },
        native: { enabled: false, impressionsPerUserPerDay: 0 },
        banner: { enabled: true, refreshIntervalSeconds: 45, showPerSessionMinutes: 6.0 },
      },
    },
  },
  {
    id: 'utility-scanner-50k',
    name: 'Document Scanner & PDF Tool (50K DAU)',
    badge: 'AdMob',
    type: 'admob',
    description: 'Utility productivity app with continuous banner display and app-open launches',
    params: {
      dau: 50000,
      categoryId: 'productivity-utility-tools',
      geoDistribution: { tier1: 40, tier2: 40, tier3: 20 },
      platformSplit: { ios: 40, android: 60 },
      hasMediation: true,
      adFormats: {
        rewardedVideo: { enabled: true, impressionsPerUserPerDay: 0.6 },
        interstitial: { enabled: true, impressionsPerUserPerSession: 0.8 },
        appOpen: { enabled: true, impressionsPerUserPerDay: 1.6 },
        rewardedInterstitial: { enabled: false, impressionsPerUserPerDay: 0 },
        native: { enabled: true, impressionsPerUserPerDay: 1.4 },
        banner: { enabled: true, refreshIntervalSeconds: 30, showPerSessionMinutes: 2.8 },
      },
    },
  },
];
