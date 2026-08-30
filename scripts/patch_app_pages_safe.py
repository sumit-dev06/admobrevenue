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
main_start = content.find('<main className="')
main_end_tag_index = content.find('>', main_start) + 1

content = content[:main_end_tag_index] + """
        {activePlatform === "about" && <AboutPage />}
        {activePlatform === "contact" && <ContactPage />}
        {activePlatform === "privacy" && <PrivacyPage />}
        {activePlatform === "terms" && <TermsPage />}
        {activePlatform === "disclaimer" && <DisclaimerPage />}
        
        {(activePlatform === "admob" || activePlatform === "adsense") && (
          <>
""" + content[main_end_tag_index:]

# Close the condition before </main>
main_close = content.rfind('</main>')
content = content[:main_close] + """
          </>
        )}
      </main>""" + content[main_close+7:]


with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App safely patched for trust pages")
