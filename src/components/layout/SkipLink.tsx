import { MAIN_CONTENT_ID } from '@/constants/dom';

/** First tab stop on every page — lets keyboard users bypass the navigation. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
    >
      Skip to main content
    </a>
  );
}
