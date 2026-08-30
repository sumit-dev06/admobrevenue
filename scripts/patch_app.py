import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

# 1. Remove isDarkMode state
app_code = re.sub(r'const \[isDarkMode, setIsDarkMode\].*?\n  \}\);\n?', '', app_code, flags=re.DOTALL)
# Remove the apply dark mode useEffect
app_code = re.sub(r'// Apply dark mode class to html root.*?\}\, \[isDarkMode\]\);\n?', '', app_code, flags=re.DOTALL)

# 2. Update Navbar props
app_code = app_code.replace('isDarkMode={isDarkMode}\n        onToggleTheme={() => setIsDarkMode(!isDarkMode)}\n', '')
app_code = app_code.replace('isDarkMode={isDarkMode}\n        onToggleTheme={() => setIsDarkMode(!isDarkMode)}', '')

# 3. Add startTransition to handlePlatformChange
app_code = app_code.replace('import React, { useState, useEffect, useMemo } from "react";', 'import React, { useState, useEffect, useMemo, startTransition } from "react";')
app_code = app_code.replace('setActivePlatform(p);', 'startTransition(() => setActivePlatform(p));')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_code)

print("Patched App.tsx")
