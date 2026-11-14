import { YearMonth } from '../data/portfolio.models';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface Parsed {
  year: number;
  /** 1–12, or null when only the year was given. */
  month: number | null;
}

function parse(value: YearMonth): Parsed {
  const [year, month] = value.split('-').map(Number);
  return { year, month: month >= 1 && month <= 12 ? month : null };
}

/** '2022-11' → 'Nov 2022', '2023' → '2023'. */
export function formatDate(value: YearMonth): string {
  const { year, month } = parse(value);
  return month ? `${MONTHS[month - 1]} ${year}` : `${year}`;
}

/** 'Nov 2022 – Mar 2023', or '… – Present' when there is no end. */
export function formatRange(start: YearMonth, end?: YearMonth): string {
  return `${formatDate(start)} – ${end ? formatDate(end) : 'Present'}`;
}

/** Number that grows with time, for sorting. */
export function sortKey(value: YearMonth): number {
  const { year, month } = parse(value);
  return year * 12 + (month ?? 0);
}

/** '5 mos', '1 yr 2 mos', '3 yrs'. */
export function formatDuration(
  start: YearMonth,
  end?: YearMonth,
  now: Date = new Date(),
): string {
  const from = parse(start);
  const to = end
    ? parse(end)
    : { year: now.getFullYear(), month: from.month ? now.getMonth() + 1 : null };

  if (from.month === null || to.month === null) {
    const years = Math.max(1, to.year - from.year);
    return plural(years, 'yr');
  }

  // Inclusive of both the first and the last month.
  const total = Math.max(1, (to.year - from.year) * 12 + (to.month - from.month) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years ? plural(years, 'yr') : '', months ? plural(months, 'mo') : '']
    .filter(Boolean)
    .join(' ');
}

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'}`;
}

/** Stable 7-character hex string, used as a commit-style hash. */
export function shortHash(seed: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}
