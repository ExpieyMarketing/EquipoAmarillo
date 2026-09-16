const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "EUR";
const LOCALE = "es-ES";

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(Math.round(value));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(value);
}

export function formatCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY, maximumFractionDigits: 2 }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return new Intl.NumberFormat(LOCALE, { style: "percent", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, { day: "2-digit", month: "short" }).format(new Date(`${iso}T00:00:00Z`));
}

export function safeDiv(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}
