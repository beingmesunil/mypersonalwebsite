import { useEffect, useState } from 'react';

/** Returns `true` once the window has scrolled past `threshold` pixels. */
export function useScrollThreshold(threshold: number): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const update = () => setPassed(window.scrollY > threshold);

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return passed;
}
