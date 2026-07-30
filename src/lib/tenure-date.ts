// Parses the Tenures sheet's `Year` column, which is either a plain academic
// year range ("2025/2026") or a month-aware range ("August 2025/August 2026",
// hyphens also accepted: "August 2025-August 2026"). A single date with no
// range separator ("2026") is also accepted.

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DatePart {
  year: number;
  /** 0-11, or null when only a year was given. */
  month: number | null;
}

function parseDatePart(part: string): DatePart | null {
  const trimmed = part.trim();

  const withMonth = trimmed.match(/^([A-Za-z]+)\.?,?\s+(\d{4})$/);
  if (withMonth) {
    const [, monthWord, yearStr] = withMonth;
    if (monthWord.length >= 3) {
      const month = MONTH_NAMES.findIndex((name) =>
        name.toLowerCase().startsWith(monthWord.toLowerCase()),
      );
      if (month !== -1) return { year: Number(yearStr), month };
    }
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) return { year: Number(yearOnly[1]), month: null };

  return null;
}

function formatDatePart({ year, month }: DatePart): string {
  return month === null ? String(year) : `${MONTH_NAMES[month]}, ${year}`;
}

/** Best-effort fallback for a `Year` value that doesn't match the expected shape. */
function fallbackSortKey(raw: string): number {
  const years = raw.match(/\d{4}/g);
  if (!years) return 0;
  return Number(years[years.length - 1]) * 12;
}

export interface TenureYearInfo {
  /** Full range for display, e.g. "2025/2026" or "August, 2025 – August, 2026". */
  yearLabel: string;
  /** End of the range only, e.g. "2026" or "August, 2026". Used on the timeline. */
  endLabel: string;
  /** Monotonic key (larger = later) for sorting tenures newest-first. */
  sortKey: number;
}

export function parseTenureYearRange(raw: string): TenureYearInfo {
  const parts = raw.split(/\s*[/-]\s*/).filter(Boolean);
  const isRange = parts.length > 1;

  const start = parseDatePart(parts[0] ?? "");
  const end = isRange ? parseDatePart(parts[1]) : start;

  if (!start || !end) {
    return { yearLabel: raw, endLabel: raw, sortKey: fallbackSortKey(raw) };
  }

  const endLabel = formatDatePart(end);

  if (!isRange) {
    return { yearLabel: endLabel, endLabel, sortKey: end.year * 12 + (end.month ?? 0) };
  }

  const yearLabel =
    start.month === null && end.month === null
      ? `${start.year}/${end.year}`
      : `${formatDatePart(start)} – ${endLabel}`;

  return { yearLabel, endLabel, sortKey: end.year * 12 + (end.month ?? 0) };
}
