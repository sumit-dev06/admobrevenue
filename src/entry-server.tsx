import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";

export function render(platform: "admob" | "adsense" = "admob"): string {
  return renderToString(<App initialPlatform={platform} />);
}
