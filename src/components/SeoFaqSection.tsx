import React, { useState } from "react";
import { FAQS_DATA, FAQItem } from "../data/faqs";
import { ChevronDown, HelpCircle } from "lucide-react";

export const SeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_DATA.map((item: FAQItem) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div id="faq-section" className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-2 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <HelpCircle className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          Frequently Asked Questions & Monetization Audits
        </span>
      </div>

      <div className="space-y-2">
        {FAQS_DATA.map((item: FAQItem, idx: number) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-3.5 text-left bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100 pr-2">
                  {item.question}
                </span>
                <ChevronDown
                  className={"w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform " + (isOpen ? "rotate-180" : "")}
                />
              </button>

              {isOpen && (
                <div className="p-3.5 pt-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 border-t border-dashed border-neutral-200 dark:border-neutral-800 leading-relaxed bg-white dark:bg-neutral-950">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
