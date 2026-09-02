import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (typeof window !== "undefined") {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("adrev_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("adrev_theme", "light");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
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
