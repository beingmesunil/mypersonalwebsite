import { motion } from 'framer-motion';

import { fadeInUp, staggerContainerTight, VIEWPORT } from '@/constants/animation';
import { PORTFOLIO_CATEGORIES, type PortfolioFilter } from '@/types';
import { cn } from '@/utils/cn';
import { toTitleCase } from '@/utils/format';

const FILTERS: readonly PortfolioFilter[] = ['all', ...PORTFOLIO_CATEGORIES];

interface CategoryFilterProps {
  readonly active: PortfolioFilter;
  readonly counts: Partial<Record<PortfolioFilter, number>>;
  readonly onChange: (filter: PortfolioFilter) => void;
}

/** Tab-style filter bar driving the masonry gallery. */
export function CategoryFilter({ active, counts, onChange }: CategoryFilterProps) {
  return (
    <motion.div
      variants={staggerContainerTight}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      role="tablist"
      aria-label="Filter portfolio by category"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active;

        return (
          <motion.button
            key={filter}
            variants={fadeInUp}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              'rounded-full border px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ease-cinematic',
              isActive
                ? 'border-accent bg-accent text-canvas'
                : 'border-hairline text-subtle hover:border-accent/60 hover:text-accent',
            )}
          >
            {filter === 'all' ? 'All Work' : toTitleCase(filter)}
            {counts[filter] ? (
              <span className="ml-2 text-[0.65rem] opacity-70">{counts[filter]}</span>
            ) : null}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
