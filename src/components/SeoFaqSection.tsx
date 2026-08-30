import React, { useState } from "react";
import { FAQS_DATA } from "../data/faqs";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const SeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="space-y-6 pt-6" id="faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          Frequently Asked Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
          AdSense & AdMob Revenue Knowledge Base
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Authoritative answers to critical ad monetization, eCPM calculation, and RPM questions
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={
                "bg-white dark:bg-neutral-900 rounded-2xl border transition-all duration-200 overflow-hidden " +
                (isOpen
                  ? "border-emerald-500/50 shadow-md shadow-emerald-500/5"
                  : "border-neutral-200 dark:border-neutral-800")
              }
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={
                    "w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 " +
                    (isOpen ? "rotate-180 text-emerald-500" : "")
                  }
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
