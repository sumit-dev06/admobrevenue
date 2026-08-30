import { CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = "USD",
  compact: boolean = false
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amount * currency.rate;

  if (compact && Math.abs(converted) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(converted);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}

export function formatNumber(num: number, compact: boolean = false): string {
  if (compact && Math.abs(num) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }
  return new Intl.NumberFormat("en-US").format(Math.round(num));
}

export function convertCurrency(
  amountUsd: number,
  targetCurrency: CurrencyCode
): number {
  const currency = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return amountUsd * currency.rate;
}