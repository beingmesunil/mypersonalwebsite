import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { DURATION } from '@/constants/animation';
import { BACK_TO_TOP_THRESHOLD } from '@/constants/ui';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { scrollToTop } from '@/utils/scroll';

import { IconButton } from '../ui/IconButton';

/** Floating shortcut that appears once the visitor has scrolled a screen or two. */
export function BackToTop() {
  const isVisible = useScrollThreshold(BACK_TO_TOP_THRESHOLD);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: DURATION.fast }}
          className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8"
        >
          <IconButton label="Back to top" onClick={scrollToTop}>
            <ArrowUp aria-hidden="true" className="size-5" />
          </IconButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
