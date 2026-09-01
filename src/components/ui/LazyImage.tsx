import { useState } from 'react';

import { SIZES_GALLERY } from '@/constants/ui';
import type { ImageAsset } from '@/types';
import { cn } from '@/utils/cn';
import { buildImageUrl, buildSrcSet, toAspectRatio } from '@/utils/image';
import { resolvePhoto } from '@/utils/localPhotos';

interface LazyImageProps {
  readonly image: ImageAsset;
  readonly className?: string;
  readonly imgClassName?: string;
  readonly sizes?: string;
  /** Above-the-fold images should load eagerly and skip the fade-in. */
  readonly priority?: boolean;
  /** Width requested for the default `src`; the browser picks from `srcset`. */
  readonly fallbackWidth?: number;
  /** Fills the positioned parent instead of reserving its own aspect-ratio box. */
  readonly fill?: boolean;
}

/**
 * Responsive, lazily decoded image with an intrinsic aspect ratio box so the
 * layout never shifts, plus a tinted placeholder while the file downloads.
 */
export function LazyImage({
  image: declaredImage,
  className,
  imgClassName,
  sizes = SIZES_GALLERY,
  priority = false,
  fallbackWidth = 1024,
  fill = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  // A file in src/assets/photos takes precedence over the placeholder URL
  const image = resolvePhoto(declaredImage);
  const srcSet = buildSrcSet(image.src);

  return (
    <div
      className={cn('relative overflow-hidden bg-elevated', fill && 'size-full', className)}
      style={{
        aspectRatio: fill ? undefined : toAspectRatio(image.width, image.height),
        backgroundColor: image.placeholderColor,
      }}
    >
      {!loaded && !priority ? (
        <span aria-hidden="true" className="absolute inset-0 shimmer-surface" />
      ) : null}

      <img
        src={buildImageUrl(image.src, fallbackWidth)}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'size-full object-cover transition-opacity duration-700 ease-cinematic',
          loaded || priority ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  );
}
