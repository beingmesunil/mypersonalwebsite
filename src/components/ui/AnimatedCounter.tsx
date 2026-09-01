import { useRef } from 'react';
import { useInView } from 'framer-motion';

import { useCountUp } from '@/hooks/useCountUp';
import { formatNumber } from '@/utils/format';

interface AnimatedCounterProps {
  readonly value: number;
  readonly suffix?: string;
  readonly className?: string;
}

/** Counts up from zero the first time it scrolls into view. */
export function AnimatedCounter({ value, suffix, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const current = useCountUp({ end: value, enabled: inView });

  return (
    <span ref={ref} className={className}>
      {/* The final value is always announced, so screen readers skip the animation */}
      <span aria-hidden="true">
        {formatNumber(current)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatNumber(value)}
        {suffix}
      </span>
    </span>
  );
}
