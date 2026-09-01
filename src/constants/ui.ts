/** Tailwind breakpoints mirrored in TypeScript for `useMediaQuery`. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** Widths requested from the image CDN when building a `srcset`. */
export const IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920] as const;

export const IMAGE_QUALITY = 72;

/** Default `sizes` attribute for images that span the full viewport width. */
export const SIZES_FULL_WIDTH = '100vw';

/** Default `sizes` attribute for the responsive masonry gallery. */
export const SIZES_GALLERY = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

/** Scroll offset (px) after which the header switches to its condensed state. */
export const HEADER_SCROLL_THRESHOLD = 24;

/** Scroll offset (px) after which the "back to top" button appears. */
export const BACK_TO_TOP_THRESHOLD = 480;

/** Animated counters run for this long, in milliseconds. */
export const COUNTER_DURATION_MS = 2000;

/** Testimonial carousel autoplay interval, in milliseconds. */
export const CAROUSEL_INTERVAL_MS = 7000;

/** Number of featured items rendered on the home page gallery. */
export const FEATURED_ITEMS_LIMIT = 9;

/** Number of blog posts previewed on the home page. */
export const BLOG_PREVIEW_LIMIT = 3;
