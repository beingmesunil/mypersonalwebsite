import { Maximize2 } from 'lucide-react';

import type { PortfolioItem } from '@/types';
import { toTitleCase } from '@/utils/format';

import { Badge } from '../ui/Badge';
import { LazyImage } from '../ui/LazyImage';

interface PortfolioCardProps {
  readonly item: PortfolioItem;
  readonly onOpen: (item: PortfolioItem) => void;
  /** The first row of images is fetched eagerly to protect the LCP. */
  readonly priority?: boolean;
}

/** A single gallery tile. Activating it opens the lightbox. */
export function PortfolioCard({ item, onOpen, priority = false }: PortfolioCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title} — ${toTitleCase(item.category)}, ${item.location}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-hairline text-left transition-colors duration-500 ease-cinematic hover:border-accent/40"
    >
      <LazyImage
        image={item.image}
        priority={priority}
        imgClassName="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-105"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 overlay-card opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="absolute top-4 left-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Badge>{toTitleCase(item.category)}</Badge>
      </span>

      <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full glass text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 aria-hidden="true" className="size-4" />
      </span>

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 transition-transform duration-500 ease-cinematic group-hover:-translate-y-1">
        <span className="font-display text-xl text-ink">{item.title}</span>
        <span className="text-xs tracking-[0.2em] text-subtle uppercase">
          {item.location} · {item.year}
        </span>
      </span>
    </button>
  );
}
