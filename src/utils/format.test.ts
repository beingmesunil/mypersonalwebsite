import { describe, expect, it } from 'vitest';

import { formatDate, formatNumber, formatPrice, toTitleCase } from './format';

describe('formatPrice', () => {
  it('renders whole-unit currency', () => {
    expect(formatPrice(3200, 'USD')).toBe('$3,200');
  });
});

describe('formatDate', () => {
  it('formats an ISO date', () => {
    expect(formatDate('2026-02-18')).toBe('February 18, 2026');
  });

  it('returns the input when it is not a valid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('formatNumber', () => {
  it('adds thousand separators', () => {
    expect(formatNumber(12000)).toBe('12,000');
  });
});

describe('toTitleCase', () => {
  it('capitalises slugs', () => {
    expect(toTitleCase('wildlife')).toBe('Wildlife');
    expect(toTitleCase('fine-art-print')).toBe('Fine Art Print');
  });
});
