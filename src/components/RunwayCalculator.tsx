import React, { useMemo } from "react";
import {
  Wallet,
  TrendingUp,
  Banknote,
  CalendarClock,
  Infinity as InfinityIcon,
  TriangleAlert,
} from "lucide-react";
import { RunwayInputs, CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import { SearchableSelect } from "./SearchableSelect";
import { COUNTRIES } from "../data/geoTiers";
import {
  calculateRunway,
  formatRunwayMoney,
  compactRunway,
  yearsAndMonths,
} from "../utils/runwayCalculations";

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

export const RunwaySummary: React.FC<{ inputs: RunwayInputs; currency: CurrencyCode }> = ({
  inputs,
  currency,
}) => {
  const results = useMemo(() => calculateRunway(inputs), [inputs]);

  const chart = useMemo(() => {
    if (results.invalid || results.yearly.length === 0) return null;
    const pts = results.yearly.slice(0, 40);
    const maxBal = Math.max(...pts.map((y) => y.startBalance), 1);
    const W = 600, H = 180, pad = 8;
    const stepX = (W - pad * 2) / Math.max(pts.length - 1, 1);
    const path = pts
      .map((y, i) => {
        const x = pad + i * stepX;
        const h = Math.max(0, (Math.max(y.endBalance, 0) / maxBal) * (H - pad * 2));
        const yy = H - pad - h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`;
      })
      .join(" ");
    const area = `${path} L${(pad + (pts.length - 1) * stepX).toFixed(1)},${H - pad} L${pad},${H - pad} Z`;
    return { path, area, W, H };
  }, [results]);

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-2xl p-5 border border-dashed border-neutral-700 dark:border-neutral-300 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
          <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Estimated Runway</span>
        </div>
        {results.invalid ? (
          <div className="flex items-start gap-2 text-xs font-mono leading-relaxed">
            <TriangleAlert className="w-4 h-4 shrink-0 text-amber-400" aria-hidden="true" />
            <span>
              {results.overdraw
                ? "Monthly withdrawal exceeds the entire balance."
                : results.tooSmall
                  ? "Enter at least 1,000 as starting balance for a meaningful projection."
                  : "Enter a monthly withdrawal above zero to project your runway."}
            </span>
          </div>
        ) : results.neverDepletes ? (
          <>
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black font-mono tracking-tight">
              <InfinityIcon className="w-8 h-8 text-emerald-400" aria-hidden="true" />
              <span>Never runs out</span>
            </div>
            <p className="text-xs font-mono opacity-70 leading-relaxed">
              Monthly interest covers your {formatRunwayMoney(inputs.monthlyWithdrawal, currency)} withdrawal.
              Breakeven is {formatRunwayMoney(results.breakeven, currency)}/mo.
            </p>
          </>
        ) : (
          <>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
              {yearsAndMonths(results.months)}
            </div>
            <p className="text-xs font-mono opacity-70 leading-relaxed">
              until {formatRunwayMoney(inputs.principal, currency)} reaches zero at{" "}
              {formatRunwayMoney(inputs.monthlyWithdrawal, currency)}/mo.
            </p>
          </>
        )}

        {!results.invalid && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dashed border-white/20 dark:border-neutral-950/20 text-center">
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Breakeven/mo</div>
              <div className="text-sm font-mono font-bold">{compactRunway(results.breakeven, currency)}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Total paid out</div>
              <div className="text-sm font-mono font-bold">{compactRunway(results.totalWithdrawn, currency)}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Interest earned</div>
              <div className="text-sm font-mono font-bold">{compactRunway(results.totalInterest, currency)}</div>
            </div>
          </div>
        )}
      </div>

      {chart && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Balance Depletion Curve
          </div>
          <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="w-full h-auto" role="img" aria-label="Balance depletion over time">
            <path d={chart.area} fill="#f59e0b" opacity="0.15" />
            <path d={chart.path} fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="flex justify-between text-[10px] font-mono text-neutral-500">
            <span>Today</span>
            <span>{results.neverDepletes ? "Steady state" : yearsAndMonths(results.months)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const RunwaySeoSection: React.FC = () => {
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono overflow-hidden">
      <div className="p-4 sm:p-7 space-y-5">
        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            How the Money Runway Math Works
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            Every month the balance earns interest, then your withdrawal is subtracted and the
            remainder carries forward. The calculator repeats this loop —{" "}
            <strong>interest = balance × monthly rate, closing balance = balance + interest − withdrawal</strong>{" "}
            — until the balance reaches zero. The number of loops is your runway. Withdrawals step up
            once a year when you set a yearly increase, which is how inflation is modelled.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            The Breakeven Rule: Live Off Interest Forever
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            If your monthly interest covers your withdrawal, the balance never falls. To live on
            interest alone you need <strong>1,200 ÷ your annual return percent</strong> times your
            monthly withdrawal saved:
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-left text-[10px] uppercase text-neutral-500 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <th className="py-1.5 pr-3">Return</th>
                  <th className="py-1.5 pr-3">Multiple needed</th>
                  <th className="py-1.5 text-right">On 3,000/mo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["4%", "300× monthly withdrawal", "900,000"],
                  ["6%", "200× monthly withdrawal", "600,000"],
                  ["8%", "150× monthly withdrawal", "450,000"],
                  ["10%", "120× monthly withdrawal", "360,000"],
                  ["12%", "100× monthly withdrawal", "300,000"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-dashed border-neutral-100 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                    <td className="py-1.5 pr-3 font-bold text-neutral-900 dark:text-white">{row[0]}</td>
                    <td className="py-1.5 pr-3">{row[1]}</td>
                    <td className="py-1.5 text-right">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            What This Model Ignores
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            <li><strong>Steady returns.</strong> Real markets swing; a bad run early in retirement (sequence risk) hurts far more than the same run later.</li>
            <li><strong>Tax.</strong> Interest and capital gains are taxable — spendable income is lower than gross figures.</li>
            <li><strong>Lumpy costs.</strong> Withdrawals step up yearly, but medical bills and weddings don't follow schedules.</li>
            <li><strong>Other income.</strong> No pension, rent or salary — a pure drawdown from one pot.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Runway FAQs
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Is this an SWP calculator?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Yes. A Systematic Withdrawal Plan redeems a fixed amount monthly while the rest stays
                invested — exactly the arithmetic modelled here. Real SWPs redeem fund units at
                fluctuating NAVs and attract capital gains tax, which this tool does not model.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Does it handle inflation?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Set a yearly increase and withdrawals rise each year, like the 4% rule intends. ₹1 crore
                at 8% withdrawing ₹50,000 flat never depletes — with a 6% yearly rise it lasts 21 years
                and 6 months.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Is my data sent anywhere?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                No. Everything computes in your browser; only your currency choice is remembered on
                your own device.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-neutral-500">Related:</span>
          <a href="/youtube" className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400">YouTube revenue →</a>
          <a href="/adsense" className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400">AdSense RPM →</a>
          <a href="/kick" className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400">Kick split →</a>
        </div>
      </div>
    </article>
  );
};

export const RunwayBreakdown: React.FC<{ inputs: RunwayInputs; currency: CurrencyCode }> = ({
  inputs,
  currency,
}) => {
  const results = useMemo(() => calculateRunway(inputs), [inputs]);
  const rows = useMemo(() => {
    if (results.invalid || results.yearly.length === 0) return [];
    const y = results.yearly;
    if (y.length <= 12) return y;
    return [...y.slice(0, 8), ...y.slice(-4)];
  }, [results]);

  if (results.invalid || rows.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
      <div className="pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
          Year-by-Year Breakdown
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-left text-[10px] uppercase text-neutral-500 border-b border-dashed border-neutral-200 dark:border-neutral-800">
              <th className="py-1.5 pr-3 font-semibold">Year</th>
              <th className="py-1.5 pr-3 font-semibold text-right">Start</th>
              <th className="py-1.5 pr-3 font-semibold text-right">Withdrawn</th>
              <th className="py-1.5 pr-3 font-semibold text-right">Interest</th>
              <th className="py-1.5 font-semibold text-right">End</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.year} className="border-b border-dashed border-neutral-100 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                <td className="py-1.5 pr-3 font-bold text-neutral-900 dark:text-white">Yr {r.year}</td>
                <td className="py-1.5 pr-3 text-right">{formatRunwayMoney(r.startBalance, currency)}</td>
                <td className="py-1.5 pr-3 text-right">{formatRunwayMoney(r.withdrawn, currency)}</td>
                <td className="py-1.5 pr-3 text-right text-emerald-600 dark:text-emerald-400">+{formatRunwayMoney(r.interest, currency)}</td>
                <td className="py-1.5 text-right font-bold">{formatRunwayMoney(Math.max(r.endBalance, 0), currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
        Simplified model: fixed {inputs.annualReturn}% return, {formatRunwayMoney(inputs.monthlyWithdrawal, currency)}/mo
        {inputs.yearlyIncrease > 0 ? ` rising ${inputs.yearlyIncrease}${inputs.increaseMode === "percent" ? "%" : ""}/yr` : " flat"}. Ignores tax & market volatility.
      </p>
    </div>
  );
};
