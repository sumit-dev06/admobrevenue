# 💰 AdRevPro — AdSense & AdMob Revenue Calculator (2026 Engine)

> **High-precision, deterministic Google AdSense & Google AdMob revenue forecasting suite.** Built with React 19, TypeScript, Tailwind CSS, Recharts, and verified 2025–2026 programmatic auction benchmarks across 25+ niches and 190+ countries.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Key Features

### 1. 🌐 Google AdSense Website Calculator
- **Niche & Category Database**: 25+ real-world categories (Finance, Insurance, SaaS, AI, Legal, Real Estate, Health, Crypto, Lifestyle, Gaming, etc.) with pre-calibrated baseline RPM, CPC, and CTR ranges.
- **Audience Geography Tiers**: Granular breakdown of Tier 1 (US, UK, CA, AU, EU), Tier 2 (LATAM, Eastern EU, SA), and Tier 3 (South Asia, Africa).
- **Ad Unit Architecture**: Configure Top Leaderboard Billboard, In-Article paragraph ads, Sticky Sidebar (300x600), Mobile Sticky Anchor Overlays, Vignette Interstitials, and Multiplex Grids.
- **Granular Advanced Variables**: Ad Blocker discount rate (10%–50%), Ad Viewability percentage (40%–95%), and 12-month programmatic seasonality curve (Q1 slump to Q4 Black Friday surge).

### 2. 📱 Google AdMob Mobile App Calculator
- **DAU / MAU Stickiness**: Dynamic active user modeling across 18+ app categories (Hypercasual, Casual/Puzzle, Midcore RPG, Finance, Fitness, Utility/Scanner, Social, etc.).
- **Mobile Ad Formats**: Rewarded Video, Interstitial full-screen, App Open splash, Rewarded Interstitials, Native Advanced cards, and Adaptive Sticky Banners with configurable auto-refresh rates (30s, 45s, 60s).
- **OS Platform Split**: iOS vs. Android split accounting for iOS's +30% purchasing power and eCPM premium.
- **Mediation & Real-Time Bidding**: Model auction competition lift (+25% blended eCPM) with AppLovin MAX, Unity Ads, and Mintegral.
- **True ARPDAU / ARPU Metrics**: Instant calculations of Average Revenue Per Daily Active User and Monthly Active User.

### 3. 📊 Publisher Portfolio Aggregator
- Combine multiple digital assets (e.g. 3 blogs + 2 mobile games) into a unified monthly & annual recurring revenue forecast.

### 4. 🎯 Reverse Target Income Goal Calculator
- Input target monthly revenue (e.g. `$5,000/mo`) and get the exact traffic roadmap (required monthly pageviews, daily unique visitors, DAU, and impressions) with milestone stages.

### 5. ⚖️ A/B Monetization Scenario Comparator
- Compare baseline default setups against fully optimized layouts (adding Sticky Anchors, Vignettes, Rewarded Videos, and Mediation) with visual delta revenue bars.

### 6. 📈 2025–2026 Industry Benchmark Directory
- Searchable database of real-world publisher eCPMs, RPMs, CTRs, top formats, and growth trends across every industry.

### 7. 🚀 Built for 100% SEO Dominance
- **Semantic HTML5 & Schema.org JSON-LD**: Embedded `WebApplication`, `SoftwareApplication`, and `FAQPage` rich snippets.
- **14+ Authoritative FAQs & Glossary**: High-value search intent matching queries like *"How much does AdSense pay per 1,000 views in 2026?"*, *"What is a good AdMob ARPDAU?"*, etc.
- **Fast Core Web Vitals**: Zero layout shift (CLS: 0), instantaneous client-side calculations, sub-second LCP.

### 8. 🛠️ Export & Embed Toolkit
- **Printable Audit Report**: Clean, printer-friendly audit sheet for client presentations and media kits.
- **CSV Data Export**: One-click download of all calculation inputs and format breakdowns.
- **Shareable URL Encoding**: Encode calculation configurations directly into shareable links.
- **Embeddable Iframe Widget**: Responsive widget embed code generator with light/dark theme customization.

---

## 🧮 Mathematical Formulas

$$\text{Page RPM} = \left( \frac{\text{Estimated Earnings}}{\text{Total Pageviews}} \right) \times 1,000$$

$$\text{eCPM} = \left( \frac{\text{Total Ad Earnings}}{\text{Total Ad Impressions}} \right) \times 1,000$$

$$\text{ARPDAU} = \frac{\text{Daily Ad Revenue}}{\text{Daily Active Users (DAU)}}$$

---

## 🚀 Cloudflare Pages Deployment

This project is built as a pure static Single Page Application (SPA) optimized for instant zero-config deployment on **Cloudflare Pages**:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository: `admob-or-adsense-revenue-calculator`.
3. Configure the Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Node.js Version**: `18+` or `20+`
4. Click **Save and Deploy**. Cloudflare Pages will build and deploy the static site globally across 300+ edge locations with SSL and HTTP/3.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/admob-or-adsense-revenue-calculator.git
cd admob-or-adsense-revenue-calculator

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production distribution
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📄 License
MIT License. Free for personal and commercial publisher analytics.
