import { formatDate, formatDuration, formatRange, shortHash, sortKey } from './format';

describe('format utils', () => {
  it('formats month and year-only dates', () => {
    expect(formatDate('2022-11')).toBe('Nov 2022');
    expect(formatDate('2023')).toBe('2023');
  });

  it('formats ranges, using "Present" when there is no end', () => {
    expect(formatRange('2022-11', '2023-03')).toBe('Nov 2022 – Mar 2023');
    expect(formatRange('2024-01')).toBe('Jan 2024 – Present');
  });

  it('orders dates chronologically', () => {
    expect(sortKey('2023')).toBeGreaterThan(sortKey('2022-11'));
    expect(sortKey('2022-11')).toBeGreaterThan(sortKey('2022-03'));
  });

  it('counts durations inclusively', () => {
    expect(formatDuration('2022-11', '2023-03')).toBe('5 mos');
    expect(formatDuration('2022-03', '2023-04')).toBe('1 yr 2 mos');
    expect(formatDuration('2020', '2023')).toBe('3 yrs');
    expect(formatDuration('2024-01', undefined, new Date(2024, 0, 15))).toBe('1 mo');
  });

  it('creates stable 7-character hashes', () => {
    expect(shortHash('webaikon-intern')).toMatch(/^[0-9a-f]{7}$/);
    expect(shortHash('webaikon-intern')).toBe(shortHash('webaikon-intern'));
    expect(shortHash('webaikon-intern')).not.toBe(shortHash('ardent-intern'));
  });
});
