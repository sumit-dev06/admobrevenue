with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

anti_flicker = """
    <!-- Anti-Flicker Script for Platform Memory -->
    <style>
      html.anti-flicker-hide body { opacity: 0 !important; visibility: hidden !important; }
      body { transition: opacity 0.15s ease-in-out; }
    </style>
    <script>
      (function() {
        try {
          var params = new URLSearchParams(window.location.search);
          var pageParam = params.get("page");
          var saved = localStorage.getItem("adrev_platform");
          var platform = pageParam || saved || "admob";
          
          var isIndex = window.location.pathname === "/" || window.location.pathname === "/index.html";
          
          // If we are on the root URL (AdMob pre-rendered) but we need AdSense, hide the body
          if (isIndex && platform === "adsense") {
            document.documentElement.classList.add("anti-flicker-hide");
          }
        } catch (e) {}
      })();
    </script>
"""

# Insert right after <head>
content = content.replace("<head>", "<head>" + anti_flicker)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Added anti-flicker to index.html")
