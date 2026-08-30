# 📖 About AdRevPro — Google AdSense & AdMob Revenue Calculator

## 🎯 Purpose & Vision
Most online ad revenue calculators are either outdated (relying on 2015-era static averages) or simplistic toy tools that multiply pageviews by a flat $2.00 RPM. 

**AdRevPro** was created to provide digital publishers, indie app developers, media network operators, and portfolio investors with a **truly accurate, deterministic, and transparent ad revenue calculation engine**.

It reflects modern programmatic ad auctions in 2025–2026, accounting for:
- Ad format viewability standards (MRC guidelines)
- Ad blocker losses (10% to 50% depending on niche)
- Header bidding and in-app mediation (AppLovin MAX, Unity Ads, Mintegral, IronSource)
- Country tier economics (Tier 1 vs. Tier 2 vs. Tier 3 purchasing power)
- Seasonality cycles (Q4 holiday budget surges vs. Q1 post-holiday drops)
- Google publisher revenue share models (68% for AdSense for Content, 51% for Search)

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **React 19** + **TypeScript 5.x** | Modern component model, strictly-typed data models, zero runtime errors |
| **Build Tool** | **Vite 8** | Sub-second HMR, optimized production rollup, lightning-fast Core Web Vitals |
| **Styling & Design System** | **Tailwind CSS v4** | Swiss/Fintech dark & light theme, tokenized palette, zero unnecessary CSS bloat |
| **Visualization** | **Recharts** | Interactive SVG charts (area seasonality curves and format share donut graphs) |
| **Icons** | **Lucide React** | Clean, crisp, semantic SVG iconography |
| **Animation & Feedback** | **Canvas Confetti** + CSS Transitions | Delightful milestone celebration on achieving target goal calculations |
| **Hosting & CDN** | **Cloudflare Pages** | Pure static bundle deployed across 300+ global edge locations with SSL & HTTP/3 |

---

## 🎨 Anti-Slop Design Principles
This project was constructed in strict compliance with the **Anti-Slop Guidelines** (`anti-slop` and `frontend-design`):

1. **Zero Fake Telemetry / Fabrication**: No fabricated latency counters, fake status strips, or meaningless pseudo-code strings. Every label, number, and metric on screen is real, functional, and mathematically derived.
2. **Swiss / Fintech Precision**: High contrast typography (Inter / System sans for display and Tabular Mono for financial figures), subtle 1px border lines (`border-neutral-200 dark:border-neutral-800`), crisp surfaces, and uncluttered layout density.
3. **Tactile Interaction**: Real-time live updating sliders with instant visual feedback and smooth number formatting.
4. **Standard Action Copy**: Clean, predictable labels (`Export CSV`, `Embed Widget`, `Copy Link`) instead of themed jargon.

---

## 🧮 Mathematical Verification Standard
All calculation formulas are deterministic and mathematically auditable:
- **AdSense Page RPM**: Total estimated revenue divided by pageviews in thousands.
- **AdMob eCPM**: Ad earnings divided by ad impressions in thousands.
- **ARPDAU**: Total daily ad revenue divided by Daily Active Users.
- **Mediation Lift**: Evaluates competitive second-price auctions over single-network waterfall setups.
