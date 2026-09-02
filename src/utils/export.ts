import { CurrencyCode, AdSenseInputs, AdSenseResults, AdMobInputs, AdMobResults } from "../types";
import { formatCurrency, formatNumber } from "./currency";
import { COUNTRIES } from "../data/geoTiers";
import { ADMOB_CATEGORIES } from "../data/adMobData";
import { ADSENSE_CATEGORIES } from "../data/adSenseData";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getCountryLabel(code?: string): string {
  if (!code || code === "ALL") return "Global Blended Average";
  const c = COUNTRIES.find((item) => item.code === code);
  return c ? `${c.name} (${c.code}) [${c.tier.toUpperCase()}]` : code;
}

export function exportAdMobCSV(
  inputs: AdMobInputs,
  results: AdMobResults,
  currency: CurrencyCode
) {
  const category = ADMOB_CATEGORIES.find((c) => c.id === inputs.categoryId);
  const categoryName = category ? category.name : inputs.categoryId;
  const monthName = MONTH_NAMES[inputs.selectedMonth ?? new Date().getMonth()];

  const rows: (string | number)[][] = [
    ["=== REPORT SUMMARY ===", ""],
    ["Report Type", "Google AdMob App Revenue Audit & Projection"],
    ["Generated At", new Date().toUTCString()],
    ["Platform", "Mobile App (Android & iOS)"],
    ["Selected Currency", currency],
    ["", ""],
    ["=== ESTIMATED EARNINGS ===", ""],
    ["Daily Net Revenue", formatCurrency(results.dailyRevenue, currency)],
    ["Monthly Projected Revenue", formatCurrency(results.monthlyRevenue, currency)],
    ["Annual Projected Revenue", formatCurrency(results.annualRevenue, currency)],
    ["ARPDAU (Revenue / Daily Active User)", `$${results.arpdau}`],
    ["Blended eCPM", `$${results.blendedEcpm}`],
    ["Total Monthly Impressions", formatNumber(results.monthlyImpressions)],
    ["", ""],
    ["=== USER CONFIGURATION & PARAMETERS ===", ""],
    ["App Genre / Category", categoryName],
    ["Daily Active Users (DAU)", formatNumber(inputs.dau)],
    ["Calculation Mode", inputs.mode === "advanced" ? "Advanced / Granular" : "Quick Estimate"],
    ["Account Country", getCountryLabel(inputs.accountCountry)],
    ["Target Audience Location", getCountryLabel(inputs.targetCountry)],
    [
      "Traffic Tier Distribution",
      `Tier 1: ${inputs.geoDistribution.tier1}% | Tier 2: ${inputs.geoDistribution.tier2}% | Tier 3: ${inputs.geoDistribution.tier3}%`
    ],
    [
      "Platform Split (Android vs iOS)",
      `${inputs.platformSplit?.android ?? 70}% Android / ${inputs.platformSplit?.ios ?? 30}% iOS`
    ],
    ["Daily Sessions per User", `${inputs.sessionsPerUserPerDay} sessions/day`],
    ["Avg Session Duration", `${inputs.sessionDurationMinutes} minutes`],
    ["Network Fill Rate", `${inputs.fillRate}%`],
    ["Real-Time Bidding Mediation", inputs.hasMediation ? "Enabled (+25% blended eCPM lift)" : "Disabled (Standard AdMob)"],
    ["Seasonality Factor", inputs.useSeasonality ? `Enabled (${monthName} Curve Applied)` : "Disabled (Flat Average)"],
    ["", ""],
    ["=== AD FORMATS & FREQUENCY SETTINGS ===", ""],
    [
      "Rewarded Video",
      inputs.adFormats.rewardedVideo.enabled
        ? `Active (${inputs.adFormats.rewardedVideo.impressionsPerUserPerDay}x impressions/user/day)`
        : "Disabled"
    ],
    [
      "Interstitial Ads",
      inputs.adFormats.interstitial.enabled
        ? `Active (${inputs.adFormats.interstitial.impressionsPerUserPerSession}x impressions/session)`
        : "Disabled"
    ],
    [
      "App Open Ads",
      inputs.adFormats.appOpen.enabled
        ? `Active (${inputs.adFormats.appOpen.impressionsPerUserPerDay}x impressions/user/day)`
        : "Disabled"
    ],
    [
      "Rewarded Interstitial",
      inputs.adFormats.rewardedInterstitial.enabled
        ? `Active (${inputs.adFormats.rewardedInterstitial.impressionsPerUserPerDay}x impressions/user/day)`
        : "Disabled"
    ],
    [
      "Native Advanced",
      inputs.adFormats.native.enabled
        ? `Active (${inputs.adFormats.native.impressionsPerUserPerDay}x impressions/user/day)`
        : "Disabled"
    ],
    [
      "Adaptive Banner",
      inputs.adFormats.banner.enabled
        ? `Active (${inputs.adFormats.banner.refreshIntervalSeconds}s refresh interval | ${inputs.adFormats.banner.showPerSessionMinutes} min/session display)`
        : "Disabled"
    ],
    ["", ""],
    ["=== REVENUE BREAKDOWN BY AD FORMAT ===", ""],
    ["Ad Format", "Monthly Revenue", "Revenue Share (%)"],
    ...results.formatBreakdown.map((f) => [
      f.name,
      formatCurrency(f.revenue, currency),
      `${f.percentage}%`
    ]),
    ["", ""],
    ["Exported From", "AdMob & AdSense Revenue Engine (admobrevenue.pages.dev)"],
    ["Disclaimer", "Estimates are modeled based on real-time bidding auction datasets and seasonality curves."]
  ];

  downloadCsv(rows, `admob-revenue-audit-${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportAdSenseCSV(
  inputs: AdSenseInputs,
  results: AdSenseResults,
  currency: CurrencyCode
) {
  const category = ADSENSE_CATEGORIES.find((c) => c.id === inputs.categoryId);
  const categoryName = category ? category.name : inputs.categoryId;
  const monthName = MONTH_NAMES[inputs.selectedMonth ?? new Date().getMonth()];

  const rows: (string | number)[][] = [
    ["=== REPORT SUMMARY ===", ""],
    ["Report Type", "Google AdSense Website Revenue Audit & Projection"],
    ["Generated At", new Date().toUTCString()],
    ["Platform", "Website & Blog (Desktop, Mobile, Tablet)"],
    ["Selected Currency", currency],
    ["", ""],
    ["=== ESTIMATED EARNINGS ===", ""],
    ["Daily Net Revenue", formatCurrency(results.dailyRevenue, currency)],
    ["Monthly Projected Revenue", formatCurrency(results.monthlyRevenue, currency)],
    ["Annual Projected Revenue", formatCurrency(results.annualRevenue, currency)],
    ["Page RPM (Revenue / 1,000 Pageviews)", `$${results.pageRpm}`],
    ["Impression RPM (Revenue / 1,000 Impressions)", `$${results.impressionRpm}`],
    ["Total Monthly Impressions", formatNumber(results.monthlyImpressions)],
    ["", ""],
    ["=== USER CONFIGURATION & PARAMETERS ===", ""],
    ["Website Niche / Category", categoryName],
    ["Monthly Pageviews", formatNumber(inputs.monthlyPageviews)],
    ["Pages per Visit", `${inputs.pagesPerVisit}`],
    ["Calculation Mode", inputs.mode === "advanced" ? "Advanced / Granular" : "Quick Estimate"],
    ["Account Country", getCountryLabel(inputs.accountCountry)],
    ["Target Audience Location", getCountryLabel(inputs.targetCountry)],
    [
      "Traffic Tier Distribution",
      `Tier 1: ${inputs.geoDistribution.tier1}% | Tier 2: ${inputs.geoDistribution.tier2}% | Tier 3: ${inputs.geoDistribution.tier3}%`
    ],
    [
      "Device Distribution",
      `Mobile: ${inputs.deviceDistribution.mobile}% | Desktop: ${inputs.deviceDistribution.desktop}% | Tablet: ${inputs.deviceDistribution.tablet}%`
    ],
    ["Ad Blocker Loss Rate", `${inputs.adBlockerRate}%`],
    ["Active Viewability Rate", `${inputs.viewabilityRate}%`],
    ["Custom CTR Modifier", inputs.customCtr !== undefined ? `${inputs.customCtr}%` : "Default (Auto-calibrated)"],
    ["Custom CPC Modifier", inputs.customCpc !== undefined ? `$${inputs.customCpc}` : "Default (Auto-calibrated)"],
    ["Seasonality Factor", inputs.useSeasonality ? `Enabled (${monthName} Curve Applied)` : "Disabled (Flat Average)"],
    ["", ""],
    ["=== AD UNITS & PLACEMENTS CONFIGURED ===", ""],
    ["Header Billboard / Leaderboard", `${inputs.selectedUnits.leaderboard} unit(s)`],
    ["In-Article Ads", `${inputs.selectedUnits.inArticle} unit(s)`],
    ["Sticky Sidebar Ads", `${inputs.selectedUnits.sidebar} unit(s)`],
    ["Mobile Anchor Ad", inputs.selectedUnits.anchorAd ? "Enabled (Sticky Bottom Bar)" : "Disabled"],
    ["Vignette Interstitial Ad", inputs.selectedUnits.vignetteAd ? "Enabled (Full Screen Page-Transition)" : "Disabled"],
    ["Multiplex Native Grid", `${inputs.selectedUnits.multiplexAd} unit(s)`],
    ["", ""],
    ["=== REVENUE BREAKDOWN BY AD UNIT ===", ""],
    ["Ad Unit", "Monthly Revenue", "Revenue Share (%)"],
    ...results.formatBreakdown.map((f) => [
      f.name,
      formatCurrency(f.revenue, currency),
      `${f.percentage}%`
    ]),
    ["", ""],
    ["Exported From", "AdMob & AdSense Revenue Engine (admobrevenue.pages.dev)"],
    ["Disclaimer", "Estimates are modeled based on real-time bidding auction datasets and seasonality curves."]
  ];

  downloadCsv(rows, `adsense-revenue-audit-${new Date().toISOString().slice(0, 10)}.csv`);
}

function downloadCsv(rows: (string | number)[][], filename: string) {
  const csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportCalculationCSV(
  type: "AdSense" | "AdMob",
  categoryName: string,
  trafficMetric: string,
  trafficValue: string,
  dailyRev: number,
  monthlyRev: number,
  annualRev: number,
  rateMetric: string,
  rateValue: string,
  formatBreakdown: { name: string; revenue: number; percentage: number }[],
  currency: CurrencyCode
) {
  const rows = [
    ["Metric", "Value"],
    ["Report Type", `${type} Revenue Estimate (2025-2026 Verified Engine)`],
    ["Industry / Category", categoryName],
    [trafficMetric, trafficValue],
    [rateMetric, rateValue],
    ["Currency", currency],
    ["Daily Net Revenue", formatCurrency(dailyRev, currency)],
    ["Monthly Net Revenue", formatCurrency(monthlyRev, currency)],
    ["Annual Projected Revenue", formatCurrency(annualRev, currency)],
    ["", ""],
    ["--- Ad Format Breakdown ---", ""],
    ...formatBreakdown.map((f) => [f.name, `${formatCurrency(f.revenue, currency)} (${f.percentage}%)`]),
    ["", ""],
    ["Generated By", "AdSense & AdMob Revenue Calculator (https://admobrevenue.pages.dev)"],
    ["Timestamp", new Date().toISOString()],
  ];

  downloadCsv(rows, `${type.toLowerCase()}-revenue-audit-${new Date().toISOString().slice(0, 10)}.csv`);
}

export function copyShareableLink(params: Record<string, any>): boolean {
  try {
    const encoded = btoa(JSON.stringify(params));
    const url = `${window.location.origin}${window.location.pathname}?calc=${encoded}`;
    navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    console.error("Failed to copy share link:", err);
    return false;
  }
}

