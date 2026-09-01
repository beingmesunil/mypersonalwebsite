import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { pageTransition } from '@/constants/animation';

interface PageTransitionProps {
  readonly children: ReactNode;
}

/** Wraps route content so pages fade between each other. */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">
      {children}
    </motion.div>
  );
}
