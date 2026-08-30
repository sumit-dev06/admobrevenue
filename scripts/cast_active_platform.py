with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('activePlatform={activePlatform}', 'activePlatform={activePlatform as "admob" | "adsense"}')
content = content.replace('platform={activePlatform}', 'platform={activePlatform as "admob" | "adsense"}')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Props casted")
