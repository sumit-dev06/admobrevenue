import React, { useState, useMemo } from "react";
import { getFaqsForLanguage, FAQItem } from "../data/faqs";
import { useTranslation } from "../i18n/LanguageContext";
import { ChevronDown, HelpCircle, Search, Filter } from "lucide-react";

export const SeoFaqSection: React.FC = () => {
  const { t, language } = useTranslation();
  // Collapsed (off) by default
  const [isSectionOpen, setIsSectionOpen] = useState(false);
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

  return (
    <div id="faq-section" className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono transition-all overflow-hidden shadow-2xs">

      {/* Clickable Toggle Header */}
      <button
        type="button"
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        aria-expanded={isSectionOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-neutral-900 dark:text-white truncate">
                {t.faqs.sectionTitle}
              </h2>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase font-mono">
                {faqsList.length} Questions
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {isSectionOpen ? "Click to collapse FAQ section" : "Common questions about AdSense, AdMob, YouTube, Twitch & Kick (Click to expand)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
          <span className="hidden sm:inline">{isSectionOpen ? "Hide FAQs" : "Show FAQs"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isSectionOpen ? "rotate-180 text-emerald-500" : "text-neutral-400"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Collapsible Content - always in DOM for SEO crawlers, CSS-hidden when collapsed for fast LCP */}
      <div className={isSectionOpen ? "contents" : "hidden"}>
        <div className="p-5 sm:p-6 pt-0 sm:pt-0 space-y-4 border-t border-dashed border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          {/* Search & Category Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 pb-1">
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

            <div className="relative">
              <label htmlFor="faq-search-input" className="sr-only">{t.faqs.searchPlaceholder}</label>
              <input
                id="faq-search-input"
                type="text"
                placeholder={t.faqs.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white w-full sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" aria-hidden="true" />
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-2.5">
            {filteredFaqs.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                No FAQs matched your search.
              </div>
            ) : (
              filteredFaqs.map((faq: FAQItem, idx: number) => {
                const isExpanded = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isExpanded}
                      className="w-full p-3.5 sm:p-4 text-left flex items-start justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    >
                      <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white leading-snug">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-emerald-500" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 pt-0 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 border-t border-dashed border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/40 dark:bg-neutral-900/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
