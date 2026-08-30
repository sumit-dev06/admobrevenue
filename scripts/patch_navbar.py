with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'activePlatform: "admob" | "adsense";',
    'activePlatform: string;'
)
content = content.replace(
    'onPlatformChange: (p: "admob" | "adsense") => void;',
    'onPlatformChange: (p: string) => void;'
)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Navbar patched")
