with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports for TrustPages
imports = """import { AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from "./components/TrustPages";
"""
content = content.replace('import { Footer } from "./components/Footer";', 'import { Footer } from "./components/Footer";\n' + imports)

# Update App signature to accept more platforms
content = content.replace(
    'export function App({ initialPlatform }: { initialPlatform?: "admob" | "adsense" } = {}) {',
    'export function App({ initialPlatform }: { initialPlatform?: "admob" | "adsense" | "about" | "contact" | "privacy" | "terms" | "disclaimer" } = {}) {'
)

# Update useState
content = content.replace(
    'const [activePlatform, setActivePlatform] = useState<"admob" | "adsense">(',
    'const [activePlatform, setActivePlatform] = useState<string>('
)
content = content.replace(
    'const pageParam = searchParams.get("page") as "admob" | "adsense";\n      if (pageParam === "admob" || pageParam === "adsense") {',
    'const pageParam = searchParams.get("page");\n      if (pageParam) {'
)
content = content.replace(
    'const handlePlatformChange = (p: "admob" | "adsense") => {',
    'const handlePlatformChange = (p: string) => {'
)

# Render main content conditionally
# Currently, it renders main content directly.
# Let's find the main element.
main_start = content.find('<main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8">')
main_end = content.find('</main>', main_start) + 7

original_main = content[main_start:main_end]

new_main = """<main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {activePlatform === "about" && <AboutPage />}
        {activePlatform === "contact" && <ContactPage />}
        {activePlatform === "privacy" && <PrivacyPage />}
        {activePlatform === "terms" && <TermsPage />}
        {activePlatform === "disclaimer" && <DisclaimerPage />}
        
        {(activePlatform === "admob" || activePlatform === "adsense") && (
          <>
""" + original_main.replace('<main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8">', '').replace('</main>', '') + """
          </>
        )}
      </main>"""

content = content.replace(original_main, new_main)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App patched for trust pages")
