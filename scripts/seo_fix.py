with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Title
content = content.replace(
    "<title>AdMob & AdSense Revenue Calculator | 2026 Accurate Earnings Forecast</title>",
    "<title>Google AdMob & AdSense Revenue Calculator 2026</title>"
)
content = content.replace(
    'content="AdMob & AdSense Revenue Calculator | 2026 Accurate Earnings Forecast"',
    'content="Google AdMob & AdSense Revenue Calculator 2026"'
)

# 2. Update Meta Description
# Current is 250 characters. Needs to be around 155.
content = content.replace(
    'content="Free, highly accurate Google AdMob & AdSense revenue calculator. Forecast mobile app ARPDAU and website Page RPM across 25+ niches, country tiers (Tier 1/2/3), ad formats (Rewarded, Interstitial, Anchor, App Open), and real-time bidding mediation."',
    'content="Accurate Google AdMob & AdSense revenue calculator. Forecast mobile app ARPDAU and website Page RPM across niches, countries, and ad formats for 2026."'
)
content = content.replace(
    'content="Calculate true AdMob ARPDAU and AdSense Page RPM with verified industry benchmarks, geographic tiers, format multipliers, and mediation lifts."',
    'content="Accurate Google AdMob & AdSense revenue calculator. Forecast mobile app ARPDAU and website Page RPM across niches, countries, and ad formats for 2026."'
)

# 3. Add Apple Touch Icon
# Find favicon and add apple touch icon after it
if "apple-touch-icon" not in content:
    content = content.replace(
        '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
        '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <link rel="apple-touch-icon" href="/favicon.svg" />'
    )

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html SEO tags")
