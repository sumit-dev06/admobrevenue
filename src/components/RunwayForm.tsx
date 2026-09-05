import React, { useMemo } from "react";
import { Wallet, CalendarClock, Banknote } from "lucide-react";
import { RunwayInputs, CurrencyCode } from "../types";
import { CURRENCIES, COUNTRIES } from "../data/geoTiers";
import { SearchableSelect } from "./SearchableSelect";
import { compactRunway } from "../utils/runwayCalculations";

interface RunwayCalculatorProps {
  inputs: RunwayInputs;
  onChange: (inputs: RunwayInputs) => void;
  currency: CurrencyCode;
  onCurrencyChange?: (code: CurrencyCode) => void;
}

function NumberRow({
  id,
  label,
  value,
  min,
  max,
  step,
  sliderMax,
  onChange,
  approx,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  sliderMax: number;
  onChange: (v: number) => void;
  approx?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-mono">
        <label htmlFor={id} className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          {approx && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-dashed border-amber-500/40">
              ≈ {approx}
            </span>
          )}
          <input
            id={id}
            aria-label={`${label} number input`}
            type="number"
            min={min}
            max={max}
            step={step}
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-32 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
          />
        </div>
      </div>
      <input
        id={`${id}-slider`}
        aria-label={`${label} range slider`}
        type="range"
        min={min}
        max={sliderMax}
        step={step}
        value={Math.min(value, sliderMax)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );
}

export const RunwayCalculator: React.FC<RunwayCalculatorProps> = ({
  inputs,
  onChange,
  currency,
  onCurrencyChange,
}) => {
  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name} (${c.code})`,
      })),
    []
  );

  return (
    <div className="space-y-4">
      {/* 1. Starting Balance & Growth */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Starting Balance & Growth
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {CURRENCIES[currency]?.symbol} {currency}
          </span>
        </div>

        <NumberRow
          id="runway-principal"
          label="Total Savings (Principal)"
          value={inputs.principal}
          min={0}
          max={1000000000}
          step={10000}
          sliderMax={20000000}
          approx={compactRunway(inputs.principal, currency)}
          onChange={(v) => onChange({ ...inputs, principal: v })}
        />
        <NumberRow
          id="runway-rate"
          label="Expected Annual Return (%)"
          value={inputs.annualReturn}
          min={0}
          max={30}
          step={0.1}
          sliderMax={15}
          onChange={(v) => onChange({ ...inputs, annualReturn: v })}
        />
      </div>

      {/* 2. Withdrawal Plan */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Monthly Withdrawal Plan
            </span>
          </div>
        </div>

        <NumberRow
          id="runway-withdrawal"
          label="Monthly Withdrawal"
          value={inputs.monthlyWithdrawal}
          min={0}
          max={10000000}
          step={500}
          sliderMax={500000}
          approx={compactRunway(inputs.monthlyWithdrawal, currency)}
          onChange={(v) => onChange({ ...inputs, monthlyWithdrawal: v })}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <label htmlFor="runway-escalation" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
              Yearly Increase (Inflation)
            </label>
            <div className="flex items-center gap-1.5">
              <div className="flex rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 overflow-hidden text-[10px] font-mono font-bold">
                {(["percent", "amount"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onChange({ ...inputs, increaseMode: m })}
                    className={`px-2 py-1 cursor-pointer transition-colors ${
                      inputs.increaseMode === m
                        ? "bg-amber-500 text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                    aria-pressed={inputs.increaseMode === m}
                  >
                    {m === "percent" ? "%" : "+Amt"}
                  </button>
                ))}
              </div>
              <input
                id="runway-escalation"
                aria-label="Yearly increase number input"
                type="number"
                min={0}
                max={100}
                step={0.25}
                inputMode="decimal"
                value={inputs.yearlyIncrease}
                onChange={(e) => onChange({ ...inputs, yearlyIncrease: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-20 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
              />
            </div>
          </div>
          <input
            id="runway-escalation-slider"
            aria-label="Yearly increase range slider"
            type="range"
            min={0}
            max={10}
            step={0.25}
            value={Math.min(inputs.yearlyIncrease, 10)}
            onChange={(e) => onChange({ ...inputs, yearlyIncrease: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {inputs.yearlyIncrease === 0
              ? "Flat withdrawal — matches a fixed SWP mandate."
              : inputs.increaseMode === "percent"
                ? `Withdrawal rises ${inputs.yearlyIncrease}% every year — models inflation like the 4% rule.`
                : `Withdrawal rises by a fixed amount every year.`}
          </p>
        </div>
      </div>

      {/* 3. Currency & Region */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Currency & Region
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">Auto-detected</span>
        </div>

        {onCurrencyChange && (
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onCurrencyChange(code)}
                className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold border border-dashed cursor-pointer transition-colors ${
                  currency === code
                    ? "bg-amber-500 text-white border-amber-500"
                    : "text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-amber-500"
                }`}
                aria-pressed={currency === code}
              >
                {CURRENCIES[code].symbol} {code}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="runway-account-country" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
              Account Country
            </label>
            <SearchableSelect
              id="runway-account-country"
              aria-label="Account country"
              options={countryOptions}
              value={inputs.accountCountry || "US"}
              onChange={(v) => onChange({ ...inputs, accountCountry: v })}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="runway-target-country" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
              Living / Spending In
            </label>
            <SearchableSelect
              id="runway-target-country"
              aria-label="Spending country"
              options={countryOptions}
              value={inputs.targetCountry || "US"}
              onChange={(v) => onChange({ ...inputs, targetCountry: v })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

