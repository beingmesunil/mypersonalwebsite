import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

import { fadeInUp, VIEWPORT } from '@/constants/animation';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly variants?: Variants;
  readonly delay?: number;
  readonly as?: 'div' | 'li' | 'article' | 'span';
}

/**
 * Plays an entrance animation the first time the element scrolls into view.
 * Framer Motion's `MotionConfig` disables it for reduced-motion users.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
