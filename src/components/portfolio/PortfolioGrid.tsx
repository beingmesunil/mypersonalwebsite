import { AnimatePresence, motion } from 'framer-motion';

import { DURATION, EASE, STAGGER } from '@/constants/animation';
import type { PortfolioItem } from '@/types';

import { PortfolioCard } from './PortfolioCard';

/** Number of tiles that load eagerly to protect the largest contentful paint. */
const PRIORITY_TILES = 3;

interface PortfolioGridProps {
  readonly items: readonly PortfolioItem[];
  readonly onOpen: (item: PortfolioItem) => void;
}

/**
 * CSS multi-column masonry: no layout library, no absolute positioning, and it
 * degrades to a single column on small screens.
 */
export function PortfolioGrid({ items, onOpen }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <p role="status" className="py-16 text-center text-sm text-subtle">
        No photographs in this category yet — please try another filter.
      </p>
    );
  }

  return (
    <ul className="columns-1 masonry sm:columns-2 lg:columns-3">
      <AnimatePresence mode="popLayout">
        {items.map((item, position) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: DURATION.base,
                ease: EASE.out,
                delay: Math.min(position, 6) * STAGGER.tight,
              },
            }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: DURATION.fast } }}
            className="mb-6 break-inside-avoid"
          >
            <PortfolioCard item={item} onOpen={onOpen} priority={position < PRIORITY_TILES} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
