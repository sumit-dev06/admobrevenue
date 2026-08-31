export type SupportedLanguage =
  | 'en' // English (Default)
  | 'es' // Español
  | 'ja' // 日本語
  | 'fr' // Français
  | 'de' // Deutsch
  | 'pt' // Português
  | 'ko' // 한국어
  | 'it'; // Italiano

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  hreflang: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', hreflang: 'en' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', hreflang: 'es' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', hreflang: 'ja' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', hreflang: 'fr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', hreflang: 'de' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', hreflang: 'pt' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', hreflang: 'ko' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', hreflang: 'it' },
];

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    admobTab: string;
    adsenseTab: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    export: string;
    share: string;
    language: string;
  };
  hero: {
    admobBadge: string;
    adsenseBadge: string;
    admobTitle: string;
    adsenseTitle: string;
    admobSubtitle: string;
    adsenseSubtitle: string;
    reset: string;
    switchToAdSense: string;
    switchToAdMob: string;
  };
  adsense: {
    geoTitle: string;
    autoCalibrated: string;
    accountCountry: string;
    taxAndBank: string;
    audienceLocation: string;
    blended: string;
    tierDistribution: string;
    websiteParams: string;
    quick: string;
    advanced: string;
    websiteNiche: string;
    searchNichePlaceholder: string;
    monthlyPageviews: string;
    pagesPerVisit: string;
    deviceSplit: string;
    mobile: string;
    desktop: string;
    tablet: string;
    adUnitsTitle: string;
    viewabilityGuide: string;
    topHeader: string;
    inArticle: string;
    sidebar: string;
    anchor: string;
    vignette: string;
    multiplex: string;
    on: string;
    off: string;
    qualityModifiers: string;
    adBlockerRate: string;
    viewabilityRate: string;
    customCtr: string;
    customCpc: string;
    seasonality: string;
  };
  admob: {
    audienceTitle: string;
    autoCalibrated: string;
    accountCountry: string;
    taxAndBank: string;
    audienceLocation: string;
    blended: string;
    tierDistribution: string;
    appParams: string;
    quick: string;
    advanced: string;
    appGenre: string;
    searchCategoryPlaceholder: string;
    dau: string;
    platformSplit: string;
    ios: string;
    android: string;
    sessionsPerUser: string;
    sessionDuration: string;
    adFormatsTitle: string;
    rewardedVideo: string;
    interstitial: string;
    appOpen: string;
    rewardedInterstitial: string;
    nativeAd: string;
    adaptiveBanner: string;
    biddingMediation: string;
    mediationDesc: string;
    active: string;
    disabled: string;
    fillRate: string;
    impressionsPerDay: string;
    impressionsPerSession: string;
    refreshSeconds: string;
    showPerSessionMinutes: string;
  };
  summary: {
    summaryTitle: string;
    normalized: string;
    monthlyRunRate: string;
    perMonth: string;
    daily: string;
    annual: string;
    daysAvg: string;
    seasonAvg: string;
    pageRpm: string;
    impressionRpm: string;
    arpdau: string;
    blendedEcpm: string;
    adBlockLoss: string;
    mediationLift: string;
    exportCsv: string;
    visualBreakdown: string;
  };
  tips: {
    title: string;
    maximizedTitle: string;
    maximizedDesc: string;
    maximizedImpact: string;
    mediationTitle: string;
    mediationDesc: string;
    rewardedTitle: string;
    rewardedDesc: string;
    appOpenTitle: string;
    appOpenDesc: string;
    geoTitle: string;
    geoDesc: string;
    anchorTitle: string;
    anchorDesc: string;
    vignetteTitle: string;
    vignetteDesc: string;
    adBlockTitle: string;
    adBlockDesc: string;
  };
  formulas: {
    title: string;
    pageRpmTitle: string;
    pageRpmDesc: string;
    ecpmTitle: string;
    ecpmDesc: string;
    arpdauTitle: string;
    arpdauDesc: string;
  };
  editorial: {
    badge: string;
    mainTitle: string;
    whatIsAdSenseTitle: string;
    whatIsAdSenseBody1: string;
    whatIsAdSenseBody2: string;
    howToCalculateTitle: string;
    howToCalculateBody: string;
    formulaStep1: string;
    formulaStep2: string;
    formulaExampleTitle: string;
    formulaExampleBody: string;
    appRevenueTitle: string;
    appRevenueBody: string;
    keyDriversTitle: string;
    driver1Title: string;
    driver1Desc: string;
    driver2Title: string;
    driver2Desc: string;
    driver3Title: string;
    driver3Desc: string;
    driver4Title: string;
    driver4Desc: string;
    optimizationTitle: string;
    opt1: string;
    opt2: string;
    opt3: string;
    opt4: string;
  };
  faqs: {
    sectionTitle: string;
    searchPlaceholder: string;
    allCategory: string;
    adsenseCategory: string;
    admobCategory: string;
    formulasCategory: string;
    strategyCategory: string;
  };
  glossary: {
    title: string;
    searchPlaceholder: string;
  };
  trust: {
    aboutTitle: string;
    aboutP1: string;
    aboutWhyTitle: string;
    aboutWhyDesc: string;
    aboutMethodTitle: string;
    aboutMethod1: string;
    aboutMethod2: string;
    aboutMethod3: string;
    aboutMethod4: string;
    contactTitle: string;
    contactDesc: string;
    contactName: string;
    contactEmail: string;
    contactTopic: string;
    contactMsg: string;
    contactSubmit: string;
    contactSuccessTitle: string;
    contactSuccessDesc: string;
    contactSendAnother: string;
    privacyTitle: string;
    privacyDate: string;
    privacyIntro: string;
    termsTitle: string;
    termsDate: string;
    termsIntro: string;
    disclaimerTitle: string;
    disclaimerIntro: string;
    trademarkTitle: string;
    trademarkDesc: string;
  };
  footer: {
    tagline: string;
    calculators: string;
    legal: string;
    share: string;
    copyright: string;
    disclaimerNote: string;
  };
}
