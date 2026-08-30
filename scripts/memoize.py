import os
import re

files = [
    "src/components/OptimizationTips.tsx",
    "src/components/FormulaDeepDive.tsx",
    "src/components/SeoFaqSection.tsx",
    "src/components/ComprehensiveGuide.tsx",
    "src/components/GlossarySection.tsx",
    "src/components/Footer.tsx",
    "src/components/AdMobCalculator.tsx",
    "src/components/AdSenseCalculator.tsx",
    "src/components/RevenueCharts.tsx",
    "src/components/RevenueSummaryCard.tsx"
]

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "export const" in content and "React.memo" not in content:
        # replace `export const Comp = ...` with `export const Comp = React.memo(...)`
        # Using a regex to find the export block
        pattern = r"(export\s+const\s+(\w+)(?:\s*:\s*React\.FC(?:<[^>]+>)?\s*)?\s*=\s*)(.+)"
        
        # We only want to match the start, so let's do a more robust string replacement
        # actually, just finding the export const and wrapping the entire rest of the statement in React.memo() is hard in pure string manip.
        pass

print("Done")
