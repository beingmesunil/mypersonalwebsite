import { useSyncExternalStore } from 'react';

function subscribe(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  };
}

/**
 * Tracks a CSS media query.
 * SSR/test-safe: falls back to `false` when `matchMedia` is unavailable.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () =>
      typeof window !== 'undefined' && 'matchMedia' in window
        ? window.matchMedia(query).matches
        : false,
    () => false,
  );
}
