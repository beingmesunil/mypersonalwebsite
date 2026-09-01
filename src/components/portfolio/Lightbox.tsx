import { useCallback, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { lightboxBackdrop, lightboxPanel } from '@/constants/animation';
import { SIZES_FULL_WIDTH } from '@/constants/ui';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useKeyboardShortcuts, type KeyHandlerMap } from '@/hooks/useKeyboardShortcuts';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { PortfolioItem } from '@/types';
import { toTitleCase } from '@/utils/format';

import { IconButton } from '../ui/IconButton';
import { LazyImage } from '../ui/LazyImage';

interface LightboxProps {
  readonly items: readonly PortfolioItem[];
  /** Index of the open image, or `null` when the lightbox is closed. */
  readonly index: number | null;
  readonly onClose: () => void;
  readonly onNavigate: (nextIndex: number) => void;
}

const TITLE_ID = 'lightbox-title';
const DESCRIPTION_ID = 'lightbox-description';

/**
 * Accessible full-screen gallery viewer.
 * Keyboard: `Escape` closes, `←`/`→` move, `Home`/`End` jump to the ends.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;
  const item = isOpen ? items[index] : undefined;

  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef, isOpen);

  const goTo = useCallback(
    (offset: number) => {
      if (index === null || items.length === 0) return;
      onNavigate((index + offset + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  const shortcuts = useMemo<KeyHandlerMap>(
    () => ({
      Escape: onClose,
      ArrowLeft: () => goTo(-1),
      ArrowRight: () => goTo(1),
      Home: () => onNavigate(0),
      End: () => onNavigate(items.length - 1),
    }),
    [goTo, items.length, onClose, onNavigate],
  );

  useKeyboardShortcuts(shortcuts, isOpen);

  return (
    <AnimatePresence>
      {isOpen && item ? (
        <motion.div
          variants={lightboxBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-100 flex items-center justify-center bg-canvas/95 backdrop-blur-md"
        >
          {/* Clicking the backdrop closes; the panel below stops propagation */}
          <button
            type="button"
            aria-label="Close gallery"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            aria-describedby={DESCRIPTION_ID}
            variants={lightboxPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex max-h-dvh w-full max-w-6xl flex-col gap-4 p-4 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs tracking-[0.3em] text-subtle uppercase">
                {index + 1} / {items.length}
              </p>
              <IconButton label="Close gallery" onClick={onClose}>
                <X aria-hidden="true" className="size-5" />
              </IconButton>
            </div>

            <LazyImage
              key={item.id}
              image={item.image}
              priority
              sizes={SIZES_FULL_WIDTH}
              fallbackWidth={1440}
              className="max-h-[70dvh] rounded-2xl border border-hairline"
              imgClassName="object-contain"
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-2">
                <h2 id={TITLE_ID} className="font-display text-2xl text-ink">
                  {item.title}
                </h2>
                <p className="text-xs tracking-[0.2em] text-accent uppercase">
                  {toTitleCase(item.category)} · {item.location} · {item.year}
                </p>
                <p id={DESCRIPTION_ID} className="max-w-2xl text-sm leading-relaxed text-subtle">
                  {item.description}
                </p>
              </div>

              <div className="flex shrink-0 gap-3">
                <IconButton label="Previous image" onClick={() => goTo(-1)}>
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </IconButton>
                <IconButton label="Next image" onClick={() => goTo(1)}>
                  <ChevronRight aria-hidden="true" className="size-5" />
                </IconButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
