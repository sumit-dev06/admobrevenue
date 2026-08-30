with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

# Add useEffect to remove anti-flicker-hide
use_effect = """
  // Remove anti-flicker class after initial hydration/mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Small timeout ensures the DOM has swapped before revealing
      setTimeout(() => {
        document.documentElement.classList.remove("anti-flicker-hide");
      }, 10);
    }
  }, []);
"""

# Insert before return (
app_code = app_code.replace('  return (\n    <div className="min-h-screen', use_effect + '  return (\n    <div className="min-h-screen')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_code)

print("Added anti-flicker remove to App.tsx")
