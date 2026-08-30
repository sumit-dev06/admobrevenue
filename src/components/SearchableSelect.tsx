import React, { useState, useRef, useEffect, useId } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";

export interface SearchableOption {
  value: string;
  label: string;
  subLabel?: string;
  badge?: string;
}

interface SearchableSelectProps {
  id?: string;
  label?: string;
  options: SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id: externalId,
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Type to search...",
  className = "",
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const autoId = useId();
  const id = externalId || autoId;
  const listboxId = `${id}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opt.subLabel && opt.subLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (opt.badge && opt.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" && filteredOptions.length > 0 && isOpen) {
      e.preventDefault();
      onChange(filteredOptions[0].value);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full font-mono ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1.5 cursor-pointer"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 text-left hover:border-emerald-500/80 dark:hover:border-emerald-500/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 text-neutral-400">
          {selectedOption?.badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-500" : ""}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Dropdown Menu / Mobile Bottom Sheet */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed inset-x-3 bottom-3 top-auto max-h-[75vh] z-50 bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:absolute sm:inset-x-0 sm:top-full sm:bottom-auto sm:mt-1 sm:max-h-72 sm:rounded-xl sm:border sm:shadow-xl animate-in fade-in zoom-in-95 duration-150"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="p-2.5 border-b border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/90 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Filter options"
                className="w-full bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Options List */}
            <div
              id={listboxId}
              role="listbox"
              aria-label={label || placeholder}
              className="overflow-y-auto p-1.5 space-y-0.5 max-h-60 overscroll-contain"
            >
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  No matches for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                      }`}
                    >
                      <div className="truncate flex items-center gap-2">
                        <span>{option.label}</span>
                        {option.subLabel && (
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                            {option.subLabel}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {option.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                            {option.badge}
                          </span>
                        )}
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Search count footer on mobile */}
            <div className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900 border-t border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 dark:text-neutral-400 flex justify-between items-center sm:hidden">
              <span>{filteredOptions.length} of {options.length} options</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
