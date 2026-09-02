import React, { useState, useMemo } from "react";
import { getFaqsForLanguage, FAQItem } from "../data/faqs";
import { useTranslation } from "../i18n/LanguageContext";
import { ChevronDown, HelpCircle, Search, Filter } from "lucide-react";

export const SeoFaqSection: React.FC = () => {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const faqsList = useMemo(() => getFaqsForLanguage(language), [language]);

  const categories = useMemo(() => [
    { id: "All", label: t.faqs.allCategory },
    { id: "AdSense", label: t.faqs.adsenseCategory },
    { id: "AdMob", label: t.faqs.admobCategory },
    { id: "Formulas", label: t.faqs.formulasCategory },
    { id: "Strategy", label: t.faqs.strategyCategory },
  ], [t]);

  const filteredFaqs = useMemo(() => {
    return faqsList.filter((item: FAQItem) => {
      const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [faqsList, selectedCategory, searchQuery]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data Schema for Google Search Engine FAQ Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map((item: FAQItem) => ({
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

      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <h2 className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            {t.faqs.sectionTitle}
          </h2>
        </div>

        <div className="relative">
          <label htmlFor="faq-search-input" className="sr-only">{t.faqs.searchPlaceholder}</label>
          <input
            id="faq-search-input"
            type="text"
            placeholder={t.faqs.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 pr-3 py-1 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white w-full sm:w-64"
          />
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2 top-2" aria-hidden="true" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" aria-hidden="true" />
        </span>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCategory(c.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border border-dashed ${
              selectedCategory === c.id
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold border-neutral-900 dark:border-white shadow-xs"
                : "bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-2">
        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-neutral-500 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
            No matching questions found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredFaqs.map((item: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${idx}`}
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-3.5 text-left bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 pr-2">
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold shrink-0">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-500 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-emerald-500" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-ans-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="p-3.5 pt-2.5 text-[13.2px] leading-[1.65] font-mono text-neutral-700 dark:text-neutral-300 border-t border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
