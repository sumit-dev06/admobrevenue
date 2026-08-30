import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adrev_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("adrev_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("adrev_theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      type="button"
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-dashed border-neutral-300 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
      aria-label={isDarkMode ? "Switch to light mode theme" : "Switch to dark mode theme"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
      )}
    </button>
  );
};
