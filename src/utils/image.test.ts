import { describe, expect, it } from 'vitest';

import { IMAGE_WIDTHS } from '@/constants/ui';

import { buildImageUrl, buildSrcSet, isResizableImage, toAspectRatio } from './image';

const PICSUM = 'https://picsum.photos/seed/glacier/1600/2000';
const UNSPLASH = 'https://images.unsplash.com/photo-1506905925346';
const LOCAL = '/assets/portrait.jpg';

describe('isResizableImage', () => {
  it('recognises supported CDNs', () => {
    expect(isResizableImage(PICSUM)).toBe(true);
    expect(isResizableImage(UNSPLASH)).toBe(true);
  });

  it('rejects local assets', () => {
    expect(isResizableImage(LOCAL)).toBe(false);
  });
});

describe('buildImageUrl', () => {
  it('preserves the aspect ratio when resizing a Picsum source', () => {
    expect(buildImageUrl(PICSUM, 800)).toBe('https://picsum.photos/seed/glacier/800/1000');
  });

  it('adds sizing parameters to an Unsplash source', () => {
    const url = new URL(buildImageUrl(UNSPLASH, 1024));

    expect(url.searchParams.get('w')).toBe('1024');
    expect(url.searchParams.get('auto')).toBe('format');
  });

  it('returns unknown sources untouched', () => {
    expect(buildImageUrl(LOCAL, 800)).toBe(LOCAL);
  });
});

describe('buildSrcSet', () => {
  it('emits one candidate per configured width', () => {
    const candidates = buildSrcSet(PICSUM).split(', ');

    expect(candidates).toHaveLength(IMAGE_WIDTHS.length);
    expect(candidates[0]).toContain(`${IMAGE_WIDTHS[0]}w`);
  });

  it('is empty for sources that cannot be resized', () => {
    expect(buildSrcSet(LOCAL)).toBe('');
  });
});

describe('toAspectRatio', () => {
  it('formats a CSS aspect ratio', () => {
    expect(toAspectRatio(1600, 900)).toBe('1600 / 900');
  });
});
