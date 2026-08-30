with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

sticky_start = content.find('<MobileStickyBar')
sticky_end = content.find('/>', sticky_start) + 2

original_sticky = content[sticky_start:sticky_end]

new_sticky = '{(activePlatform === "admob" || activePlatform === "adsense") && (\n      ' + original_sticky + '\n      )}'

content = content.replace(original_sticky, new_sticky)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Sticky bar patched")
