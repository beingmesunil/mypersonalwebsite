import type { Transition, Variants } from 'framer-motion';

/** Durations in seconds — keep every motion value in one place. */
export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const EASE = {
  /** Gentle, expensive-feeling deceleration used for entrances. */
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

/** Amount of an element that must be visible before its entrance plays. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

const baseTransition: Transition = { duration: DURATION.base, ease: EASE.out };

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.base } },
};

export const staggerContainerTight: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.tight } },
};

/** Route-level transition used by the page wrapper. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
  exit: { opacity: 0, y: -8, transition: { duration: DURATION.fast, ease: EASE.inOut } },
};

export const lightboxBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const lightboxPanel: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE.out } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: DURATION.fast } },
};
