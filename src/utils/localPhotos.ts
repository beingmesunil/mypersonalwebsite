import { localPhotos } from 'virtual:local-photos';

import type { ImageAsset } from '@/types';

/**
 * Prefers a photograph from `src/assets/photos` over the placeholder URL in
 * `src/data`, adopting the real file's dimensions so the layout box is exact.
 * Returns the asset untouched when no matching file has been added yet.
 */
export function resolvePhoto(asset: ImageAsset): ImageAsset {
  const local = asset.localKey ? localPhotos[asset.localKey] : undefined;

  if (!local) return asset;

  return { ...asset, src: local.src, width: local.width, height: local.height };
}

/** True when a local file has been supplied for this asset. */
export function hasLocalPhoto(asset: ImageAsset): boolean {
  return Boolean(asset.localKey && localPhotos[asset.localKey]);
}
