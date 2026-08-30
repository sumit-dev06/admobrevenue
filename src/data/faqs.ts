export interface FAQItem {
  question: string;
  answer: string;
  category: 'AdSense' | 'AdMob' | 'General & Strategy' | 'Formulas';
}

export const FAQS_DATA: FAQItem[] = [
  {
    category: 'Formulas',
    question: 'What is the exact mathematical formula for Google AdSense Page RPM?',
    answer: 'AdSense Page RPM (Revenue Per Mille) measures your total estimated earnings per 1,000 pageviews across all ad units on your page. The exact formula is: Page RPM = (Estimated Earnings / Total Pageviews) × 1,000. For instance, if you earn .00 from 20,000 pageviews, your Page RPM is ( / 20,000) × 1,000 = .00.',
  },
  {
    category: 'Formulas',
    question: 'How is AdMob eCPM calculated, and how is it different from RPM?',
    answer: 'AdMob eCPM (effective Cost Per Mille) calculates the revenue generated per 1,000 ad impressions: eCPM = (Ad Earnings / Total Ad Impressions) × 1,000. While AdSense RPM is pageview-based (which might contain 3-5 ads per pageview), AdMob eCPM is unit-impression-based, allowing app developers to compare the raw earning power of Rewarded Videos versus Interstitials or Banners.',
  },
  {
    category: 'Formulas',
    question: 'What is ARPDAU in AdMob and how is it calculated?',
    answer: 'ARPDAU stands for Average Revenue Per Daily Active User. It measures how much ad and in-app revenue a single active user generates in a 24-hour period. Formula: ARPDAU = Total Daily Revenue / Daily Active Users (DAU). For casual mobile games in Tier 1 countries, ARPDAU typically ranges between zsh.05 and zsh.25+.',
  },
  {
    category: 'AdSense',
    question: 'How much does Google AdSense pay per 1,000 views in 2026?',
    answer: 'In 2026, Google AdSense pays between .50 and .00+ per 1,000 pageviews. Your actual rate depends on three main pillars: (1) Niche (Finance, Legal, SaaS, and Crypto pay -+ RPM, while Gaming and Entertainment pay - RPM); (2) Geography (Tier 1 traffic from US/UK/CA pays 4x-10x more than Tier 3 traffic); and (3) Ad Placements (sticky sidebar banners, in-article paragraphs, and vignette interstitials double viewability).',
  },
  {
    category: 'AdSense',
    question: 'What is Google AdSense revenue share with publishers?',
    answer: 'Google shares 68% of ad revenue with publishers for AdSense for Content. This means when an advertiser pays .00 on Google Ads, the publisher receives zsh.68. For AdSense for Search, the publisher revenue share is 51%.',
  },
  {
    category: 'AdSense',
    question: 'How does Ad Blocker usage affect website AdSense revenue?',
    answer: 'Ad blockers prevent ad scripts from loading, decreasing ad impressions by 15% to 45% depending on your audience. Tech, developer, and gaming websites experience the highest ad blocker rates (35%-50%), whereas cooking, lifestyle, and beauty websites experience lower rates (10%-15%).',
  },
  {
    category: 'AdMob',
    question: 'Which AdMob ad format generates the highest revenue in mobile apps?',
    answer: 'Rewarded Video Ads generate the highest eCPM (.00 - .00+ in Tier 1 markets), followed by Rewarded Interstitials (.00 - .00), Interstitial Ads (.00 - .00), App Open Ads (.00 - .00), Native Advanced Ads (.00 - .00), and Adaptive Banners (.00 - .00). Combining Rewarded Videos with App Open Ads maximizes ARPDAU while preserving retention.',
  },
  {
    category: 'AdMob',
    question: 'Why does iOS have higher eCPM than Android in AdMob?',
    answer: 'iOS users consistently generate 25% to 50% higher eCPMs than Android users in Tier 1 countries (US, UK, CA, AU) due to higher user purchasing power, higher average in-app spend, and greater advertiser demand on the Apple App Store ecosystem.',
  },
  {
    category: 'AdMob',
    question: 'How much extra revenue does AdMob Mediation with Real-Time Bidding add?',
    answer: 'Enabling AdMob Mediation with real-time bidding partners (such as AppLovin MAX, Unity Ads, Mintegral, InMobi, and Meta Audience Network) creates competitive real-time auctions that increase blended app eCPMs by 15% to 35% compared to running Google AdMob alone.',
  },
  {
    category: 'General & Strategy',
    question: 'What are Tier 1, Tier 2, and Tier 3 countries in digital advertising?',
    answer: 'Tier 1 countries (United States, United Kingdom, Canada, Australia, Germany, Switzerland, Norway, Singapore) have high GDP per capita and high consumer purchasing power, commanding top advertiser CPMs. Tier 2 countries (Brazil, Mexico, Spain, Italy, Poland, South Africa) offer moderate CPMs. Tier 3 countries (India, Pakistan, Nigeria, Bangladesh, Philippines) have large traffic volume but lower average CPMs.',
  },
  {
    category: 'General & Strategy',
    question: 'How does Q4 holiday seasonality impact ad earnings?',
    answer: 'Ad revenue experiences major seasonality fluctuations throughout the year. Advertisers ramp up ad budgets for Q4 (October to December) for Black Friday, Cyber Monday, and Christmas, increasing CPMs by 30% to 55%. Conversely, in January and February (Q1), advertising budgets reset, resulting in a 20% to 30% seasonal dip in RPM/eCPM.',
  },
  {
    category: 'General & Strategy',
    question: 'How many pageviews or active users do I need to earn ,000 per month?',
    answer: 'To earn ,000/month: For an AdSense website in a Tier 1 Finance/SaaS niche (RPM ), you need ~166,000 monthly pageviews. In a Lifestyle niche (RPM ), you need ~415,000 pageviews. For an AdMob mobile game with an ARPDAU of zsh.08, you need approximately 2,100 Daily Active Users (DAU) maintaining daily engagement.',
  },
];
