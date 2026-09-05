import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { SupportedLanguage } from "./i18n/types";

export function render(
  platform: "home" | "admob" | "adsense" | "youtube" | "tiktok" | "twitch" | "kick" | "runway" | "about" | "contact" | "privacy" | "terms" | "disclaimer" | "404" = "home",
  lang: SupportedLanguage = "en"
): string {
  return renderToString(<App initialPlatform={platform} initialLanguage={lang} />);
}
