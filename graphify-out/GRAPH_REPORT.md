# Graph Report - adsense_revenue  (2026-08-30)

## Corpus Check
- Corpus is ~24,500 words - fits in a single context window. You may not need a graph.

## Summary
- 204 nodes · 384 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Shell & Knowledge Views
- AdSense & AdMob Calculation UIs
- Dev Dependencies & Tooling
- Reporting, Portfolios & Export Modals
- TypeScript App Configuration
- Vite Node Configuration
- Production Runtime Libraries
- Linter & Code Quality Rules
- Navigation & Geographic Tier Data
- Industry Benchmarks Database
- TypeScript Project References

## God Nodes (most connected - your core abstractions)
1. `CurrencyCode` - 22 edges
2. `react` - 21 edges
3. `compilerOptions` - 18 edges
4. `formatCurrency()` - 15 edges
5. `compilerOptions` - 15 edges
6. `AdSenseInputs` - 9 edges
7. `AdMobInputs` - 9 edges
8. `formatNumber()` - 8 edges
9. `ExportReportModalProps` - 6 edges
10. `AdSenseResults` - 6 edges

## Surprising Connections (you probably didn't know these)
- `NavbarProps` --references--> `CurrencyCode`  [EXTRACTED]
  src/components/Navbar.tsx → src/types/index.ts
- `AdMobCalculatorProps` --references--> `CurrencyCode`  [EXTRACTED]
  src/components/AdMobCalculator.tsx → src/types/index.ts
- `AdSenseCalculatorProps` --references--> `CurrencyCode`  [EXTRACTED]
  src/components/AdSenseCalculator.tsx → src/types/index.ts
- `ExportReportModalProps` --references--> `AdMobInputs`  [EXTRACTED]
  src/components/ExportReportModal.tsx → src/types/index.ts
- `ExportReportModalProps` --references--> `AdSenseInputs`  [EXTRACTED]
  src/components/ExportReportModal.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (12 total, 1 thin omitted)

### Community 0 - "App Shell & Knowledge Views"
Cohesion: 0.11
Nodes (21): react, App(), ComprehensiveGuide(), EmbedWidgetModal(), EmbedWidgetModalProps, Footer(), FormulaDeepDive(), GLOSSARY_TERMS (+13 more)

### Community 1 - "AdSense & AdMob Calculation UIs"
Cohesion: 0.16
Nodes (21): AdMobCalculator(), AdMobCalculatorProps, AdSenseCalculator(), AdSenseCalculatorProps, OptimizationTips(), OptimizationTipsProps, ADMOB_CATEGORIES, ADMOB_FORMAT_SPECS (+13 more)

### Community 2 - "Dev Dependencies & Tooling"
Cohesion: 0.07
Nodes (26): oxlint, devDependencies, oxlint, @types/canvas-confetti, @types/node, @types/react, @types/react-dom, typescript (+18 more)

### Community 3 - "Reporting, Portfolios & Export Modals"
Cohesion: 0.19
Nodes (18): ExportReportModal(), ExportReportModalProps, PortfolioCalculator(), PortfolioCalculatorProps, COLORS, RevenueCharts(), RevenueChartsProps, RevenueSummaryCard() (+10 more)

### Community 4 - "TypeScript App Configuration"
Cohesion: 0.08
Nodes (23): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+15 more)

### Community 5 - "Vite Node Configuration"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 6 - "Production Runtime Libraries"
Cohesion: 0.11
Nodes (19): canvas-confetti, clsx, lucide-react, dependencies, canvas-confetti, clsx, lucide-react, react (+11 more)

### Community 7 - "Linter & Code Quality Rules"
Cohesion: 0.22
Nodes (8): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, typescript, warn

### Community 8 - "Navigation & Geographic Tier Data"
Cohesion: 0.25
Nodes (7): Navbar(), NavbarProps, COUNTRIES, CountryTierInfo, CURRENCIES, REGIONAL_PRESETS, CurrencyInfo

### Community 9 - "Industry Benchmarks Database"
Cohesion: 0.50
Nodes (3): BenchmarksExplorer(), BENCHMARKS_DATA, BenchmarkItem

## Knowledge Gaps
- **77 isolated node(s):** `$schema`, `typescript`, `oxc`, `react/rules-of-hooks`, `warn` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Shell & Knowledge Views` to `AdSense & AdMob Calculation UIs`, `Reporting, Portfolios & Export Modals`, `Linter & Code Quality Rules`, `Navigation & Geographic Tier Data`, `Industry Benchmarks Database`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `plugins` connect `Linter & Code Quality Rules` to `App Shell & Knowledge Views`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Production Runtime Libraries` to `Dev Dependencies & Tooling`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `$schema`, `typescript`, `oxc` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell & Knowledge Views` be split into smaller, more focused modules?**
  _Cohesion score 0.11290322580645161 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `TypeScript App Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._