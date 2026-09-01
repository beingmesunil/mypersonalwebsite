import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on navigation, except when linking to an anchor. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [hash, pathname]);

  return null;
}
