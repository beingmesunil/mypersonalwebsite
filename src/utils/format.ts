/** Formats a whole-unit price, e.g. `1200` → `$1,200`. */
export function formatPrice(amount: number, currency: string, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formats an ISO date string, e.g. `2026-03-18` → `18 March 2026`. */
export function formatDate(isoDate: string, locale = 'en-US'): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Formats a number with thousand separators, e.g. `12000` → `12,000`. */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Turns a slug or key into a human readable label, e.g. `wildlife` → `Wildlife`. */
export function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
