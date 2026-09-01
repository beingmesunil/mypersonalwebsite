import { useCallback, useMemo, useState } from 'react';

import type { PortfolioFilter, PortfolioItem } from '@/types';
import { countByCategory, filterByCategory } from '@/utils/portfolio';

import { CategoryFilter } from './CategoryFilter';
import { Lightbox } from './Lightbox';
import { PortfolioGrid } from './PortfolioGrid';

interface PortfolioGalleryProps {
  readonly items: readonly PortfolioItem[];
  readonly showFilter?: boolean;
}

/**
 * Owns gallery state: the active category filter and the open lightbox index.
 * Presentation lives in the three child components.
 */
export function PortfolioGallery({ items, showFilter = true }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<PortfolioFilter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const counts = useMemo(() => countByCategory(items), [items]);
  const visibleItems = useMemo(() => filterByCategory(items, filter), [filter, items]);

  const handleFilterChange = useCallback((next: PortfolioFilter) => {
    setFilter(next);
    setOpenIndex(null);
  }, []);

  const handleOpen = useCallback(
    (item: PortfolioItem) => {
      setOpenIndex(visibleItems.findIndex((candidate) => candidate.id === item.id));
    },
    [visibleItems],
  );

  return (
    <div className="flex flex-col gap-10">
      {showFilter ? (
        <CategoryFilter active={filter} counts={counts} onChange={handleFilterChange} />
      ) : null}

      <PortfolioGrid items={visibleItems} onOpen={handleOpen} />

      <Lightbox
        items={visibleItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
