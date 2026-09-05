import { CurrencyCode, RunwayInputs, RunwayMonthRow, RunwayResults, RunwayYearRow } from "../types";
import { CURRENCIES } from "../data/geoTiers";

const MIN_PRINCIPAL = 1000;
const MAX_MONTHS = 500 * 12;

const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  INR: "en-IN",
  CAD: "en-CA",
  AUD: "en-AU",
  JPY: "ja-JP",
  BRL: "pt-BR",
  KRW: "ko-KR",
};

export function formatRunwayMoney(value: number, currency: CurrencyCode): string {
  const info = CURRENCIES[currency] || CURRENCIES.USD;
  const locale = CURRENCY_LOCALE[currency] || "en-US";
  const digits = currency === "JPY" || currency === "KRW" ? 0 : 0;
  try {
    return (
      info.symbol +
      Math.round(Number(value) || 0).toLocaleString(locale, { maximumFractionDigits: digits })
    );
  } catch {
    return info.symbol + Math.round(Number(value) || 0).toLocaleString("en-US");
  }
}

/** Compact shorthand: 1.46L / 2.5Cr for INR, 1.45M / 3.2K western. */
export function compactRunway(value: number, currency: CurrencyCode): string {
  const raw = Math.round(Number(value) || 0);
  const n = Math.abs(raw);
  if (n < 1000) return String(raw);
  const indian = currency === "INR";
  const units = indian
    ? [
        { size: 10000000, suffix: "Cr" },
        { size: 100000, suffix: "L" },
        { size: 1000, suffix: "K" },
      ]
    : [
        { size: 1000000000000, suffix: "T" },
        { size: 1000000000, suffix: "B" },
        { size: 1000000, suffix: "M" },
        { size: 1000, suffix: "K" },
      ];
  const format = (index: number): string => {
    const unit = units[index];
    const scaled = n / unit.size;
    const decimals = scaled < 10 ? 2 : scaled < 100 ? 1 : 0;
    let text = scaled.toFixed(decimals);
    const ceiling = indian ? 100 : 1000;
    if (parseFloat(text) >= ceiling && index > 0) return format(index - 1);
    if (text.includes(".")) text = text.replace(/0+$/, "").replace(/\.$/, "");
    return text + unit.suffix;
  };
  const idx = units.findIndex((u) => n >= u.size);
  return (raw < 0 ? "-" : "") + format(idx < 0 ? units.length - 1 : idx);
}

export function yearsAndMonths(totalMonths: number | null): string {
  if (totalMonths == null) return "Does not run out";
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y === 0) return `${m} month${m === 1 ? "" : "s"}`;
  if (m === 0) return `${y} year${y === 1 ? "" : "s"}`;
  return `${y} year${y === 1 ? "" : "s"}, ${m} month${m === 1 ? "" : "s"}`;
}

export function calculateRunway(inputs: RunwayInputs): RunwayResults {
  const p = Math.max(0, Number(inputs.principal) || 0);
  const r = Number(inputs.annualReturn) || 0;
  const w = Math.max(0, Number(inputs.monthlyWithdrawal) || 0);
  const esc = Math.max(0, Number(inputs.yearlyIncrease) || 0);
  const escMode = inputs.increaseMode === "amount" ? "amount" : "percent";
  const monthlyRate = r / 100 / 12;
  const breakeven = Math.max(0, p * monthlyRate);

  if (p > 0 && w > p) {
    return {
      months: null, neverDepletes: false, invalid: true, tooSmall: false,
      overdraw: true, breakeven, totalWithdrawn: 0, totalInterest: 0, rows: [], yearly: [],
    };
  }
  if (p < MIN_PRINCIPAL) {
    return {
      months: null, neverDepletes: false, invalid: true, tooSmall: true,
      overdraw: false, breakeven, totalWithdrawn: 0, totalInterest: 0, rows: [], yearly: [],
    };
  }
  if (w <= 0) {
    return {
      months: null, neverDepletes: false, invalid: true, tooSmall: false,
      overdraw: false, breakeven, totalWithdrawn: 0, totalInterest: 0, rows: [], yearly: [],
    };
  }

  const rows: RunwayMonthRow[] = [];
  let balance = p;
  let month = 0;
  let currentW = w;
  let neverDepletes = false;
  let totalWithdrawn = 0;
  let totalInterest = 0;

  while (balance > 0 && month < MAX_MONTHS) {
    month += 1;
    if (month > 1 && (month - 1) % 12 === 0) {
      currentW = escMode === "percent" ? currentW * (1 + esc / 100) : currentW + esc;
    }
    const interest = balance * monthlyRate;
    const newBalance = balance + interest - currentW;
    rows.push({ month, startBalance: balance, interest, withdrawal: currentW, endBalance: newBalance });
    totalInterest += interest;
    totalWithdrawn += Math.min(currentW, balance + interest);
    if (esc === 0 && newBalance >= balance && interest >= currentW && month > 3) {
      neverDepletes = true;
      break;
    }
    balance = newBalance;
  }
  if (balance > 0 && month >= MAX_MONTHS) neverDepletes = true;

  const yearly: RunwayYearRow[] = [];
  for (let i = 0; i < rows.length; i += 12) {
    const chunk = rows.slice(i, i + 12);
    const year = Math.floor(i / 12) + 1;
    yearly.push({
      year,
      startBalance: chunk[0].startBalance,
      withdrawn: chunk.reduce((s, r) => s + r.withdrawal, 0),
      interest: chunk.reduce((s, r) => s + r.interest, 0),
      endBalance: chunk[chunk.length - 1].endBalance,
    });
    if (yearly.length >= 60) break;
  }

  return {
    months: neverDepletes ? null : month,
    neverDepletes,
    invalid: false,
    tooSmall: false,
    overdraw: false,
    breakeven,
    totalWithdrawn,
    totalInterest,
    rows,
    yearly,
  };
}
