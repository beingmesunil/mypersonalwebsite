import { describe, expect, it, vi } from 'vitest';

import type { ImageAsset } from '@/types';

vi.mock('virtual:local-photos', () => ({
  localPhotos: {
    'glacier-veil': { src: '/assets/glacier-veil-abc123.jpg', width: 1400, height: 1050 },
  },
}));

const { hasLocalPhoto, resolvePhoto } = await import('./localPhotos');

const remoteAsset: ImageAsset = {
  src: 'https://picsum.photos/seed/glacier-veil/1600/2000',
  alt: 'Ice cliffs of a glacier',
  width: 1600,
  height: 2000,
  localKey: 'glacier-veil',
};

describe('resolvePhoto', () => {
  it('prefers a local file and adopts its real dimensions', () => {
    expect(resolvePhoto(remoteAsset)).toEqual({
      ...remoteAsset,
      src: '/assets/glacier-veil-abc123.jpg',
      width: 1400,
      height: 1050,
    });
  });

  it('keeps the alt text when swapping in the local file', () => {
    expect(resolvePhoto(remoteAsset).alt).toBe(remoteAsset.alt);
  });

  it('falls back to the declared asset when no file has been added', () => {
    const missing = { ...remoteAsset, localKey: 'not-added-yet' };

    expect(resolvePhoto(missing)).toBe(missing);
  });

  it('falls back when the asset declares no local key', () => {
    const { localKey: _localKey, ...withoutKey } = remoteAsset;

    expect(resolvePhoto(withoutKey)).toBe(withoutKey);
  });
});

describe('hasLocalPhoto', () => {
  it('reports whether a file has been supplied', () => {
    expect(hasLocalPhoto(remoteAsset)).toBe(true);
    expect(hasLocalPhoto({ ...remoteAsset, localKey: 'not-added-yet' })).toBe(false);
  });
});
