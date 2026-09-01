import type { PortfolioCategory, PortfolioFilter, PortfolioItem } from '@/types';

/** Filters gallery items by category; `all` returns the collection unchanged. */
export function filterByCategory(
  items: readonly PortfolioItem[],
  filter: PortfolioFilter,
): PortfolioItem[] {
  if (filter === 'all') return [...items];

  return items.filter((item) => item.category === filter);
}

/** Counts how many items belong to each category. */
export function countByCategory(
  items: readonly PortfolioItem[],
): Record<PortfolioCategory | 'all', number> {
  return items.reduce(
    (counts, item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
      counts.all += 1;
      return counts;
    },
    { all: 0 } as Record<PortfolioCategory | 'all', number>,
  );
}

/** Wraps an index so gallery navigation loops in both directions. */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;

  return ((index % length) + length) % length;
}
