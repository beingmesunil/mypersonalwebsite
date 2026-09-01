import { IMAGE_QUALITY, IMAGE_WIDTHS } from '@/constants/ui';

/**
 * Sample content ships with Lorem Picsum URLs so the project renders real
 * photographs out of the box. Swapping in an Unsplash / Cloudinary / self-hosted
 * URL inside `src/data` is enough — the responsive `srcset` keeps working.
 */
const PICSUM_PATTERN = /^https:\/\/picsum\.photos\/seed\/([^/]+)\/(\d+)\/(\d+)\/?$/;
const UNSPLASH_HOST = 'images.unsplash.com';

/** True when responsive variants of `src` can be requested from the CDN. */
export function isResizableImage(src: string): boolean {
  return PICSUM_PATTERN.test(src) || src.includes(UNSPLASH_HOST);
}

/**
 * Returns `src` rendered at `width` pixels, preserving its aspect ratio.
 * Sources we cannot resize (local assets, unknown hosts) are returned untouched.
 */
export function buildImageUrl(src: string, width: number): string {
  const picsum = PICSUM_PATTERN.exec(src);

  if (picsum) {
    const [, seed, baseWidth, baseHeight] = picsum;
    const height = Math.round((width * Number(baseHeight)) / Number(baseWidth));
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  }

  if (src.includes(UNSPLASH_HOST)) {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('q', String(IMAGE_QUALITY));
    url.searchParams.set('w', String(width));
    return url.toString();
  }

  return src;
}

/** Builds a `srcset` covering every width in {@link IMAGE_WIDTHS}. */
export function buildSrcSet(src: string, widths: readonly number[] = IMAGE_WIDTHS): string {
  if (!isResizableImage(src)) return '';

  return widths.map((width) => `${buildImageUrl(src, width)} ${width}w`).join(', ');
}

/** Aspect ratio as a CSS-friendly `width / height` string. */
export function toAspectRatio(width: number, height: number): string {
  return `${width} / ${height}`;
}
