import React, { useState } from "react";
import { Code2, X, Copy, Check } from "lucide-react";

interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedWidgetModal: React.FC<EmbedWidgetModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [defaultPlatform, setDefaultPlatform] = useState<"adsense" | "admob">("adsense");

  if (!isOpen) return null;

  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://adrevpro.pages.dev";
  const embedCode = `<iframe 
  src="${currentOrigin}?mode=${defaultPlatform}&theme=${theme}" 
  width="100%" 
  height="680" 
  frameborder="0" 
  style="border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" 
  title="AdSense & AdMob Revenue Calculator"
  loading="lazy"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="embed-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="embed-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
                Embed Revenue Calculator Widget
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Embed this interactive tool on your website, blog, or internal portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close embed widget dialog"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Customizer */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="embed-default-mode" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Default Mode
            </label>
            <select
              id="embed-default-mode"
              aria-label="Widget Default Mode"
              value={defaultPlatform}
              onChange={(e) => setDefaultPlatform(e.target.value as any)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold rounded-xl px-3 py-2 text-neutral-900 dark:text-white cursor-pointer"
            >
              <option value="adsense">AdSense (Website)</option>
              <option value="admob">AdMob (App)</option>
            </select>
          </div>

          <div>
            <label htmlFor="embed-theme-style" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Theme Style
            </label>
            <select
              id="embed-theme-style"
              aria-label="Widget Theme Style"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold rounded-xl px-3 py-2 text-neutral-900 dark:text-white cursor-pointer"
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>HTML Embed Code</span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy embed HTML code"
              className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <pre className="p-3.5 rounded-2xl bg-neutral-950 text-neutral-300 text-[11px] font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
            {embedCode}
          </pre>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close embed modal"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
