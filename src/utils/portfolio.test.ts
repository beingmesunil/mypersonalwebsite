import { describe, expect, it } from 'vitest';

import { portfolioItems } from '@/data';

import { countByCategory, filterByCategory, wrapIndex } from './portfolio';

describe('filterByCategory', () => {
  it('returns every item for the "all" filter', () => {
    expect(filterByCategory(portfolioItems, 'all')).toHaveLength(portfolioItems.length);
  });

  it('returns only items of the requested category', () => {
    const result = filterByCategory(portfolioItems, 'wildlife');

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => item.category === 'wildlife')).toBe(true);
  });

  it('does not mutate the source collection', () => {
    const before = [...portfolioItems];
    filterByCategory(portfolioItems, 'portrait');

    expect(portfolioItems).toEqual(before);
  });
});

describe('countByCategory', () => {
  it('counts every item once in the "all" bucket', () => {
    const counts = countByCategory(portfolioItems);

    expect(counts.all).toBe(portfolioItems.length);
    expect(counts.landscape).toBe(
      portfolioItems.filter((item) => item.category === 'landscape').length,
    );
  });
});

describe('wrapIndex', () => {
  it('wraps past the end', () => {
    expect(wrapIndex(5, 5)).toBe(0);
  });

  it('wraps before the start', () => {
    expect(wrapIndex(-1, 5)).toBe(4);
  });

  it('is safe for empty collections', () => {
    expect(wrapIndex(3, 0)).toBe(0);
  });
});
