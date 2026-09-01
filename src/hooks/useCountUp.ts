import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { COUNTER_DURATION_MS } from '@/constants/ui';

interface UseCountUpOptions {
  /** Final value of the counter. */
  readonly end: number;
  /** Animation starts only once this flips to `true` (e.g. on scroll into view). */
  readonly enabled?: boolean;
  readonly durationMs?: number;
}

/** Ease-out cubic — fast start, gentle settle. */
function easeOut(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

/**
 * Animates a number from zero to `end`.
 * Users who prefer reduced motion get the final value immediately.
 */
export function useCountUp({
  end,
  enabled = true,
  durationMs = COUNTER_DURATION_MS,
}: UseCountUpOptions): number {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (prefersReducedMotion || durationMs <= 0) {
      setValue(end);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(easeOut(progress) * end));

      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [durationMs, enabled, end, prefersReducedMotion]);

  return value;
}
