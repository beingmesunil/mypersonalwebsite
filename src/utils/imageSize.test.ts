import { describe, expect, it } from 'vitest';

import { readImageSize } from './imageSize';

function pngHeader(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(24);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  const view = new DataView(bytes.buffer);
  view.setUint32(8, 13); // IHDR length
  bytes.set([0x49, 0x48, 0x44, 0x52], 12); // "IHDR"
  view.setUint32(16, width);
  view.setUint32(20, height);
  return bytes;
}

function jpegHeader(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(32);
  const view = new DataView(bytes.buffer);
  bytes.set([0xff, 0xd8], 0); // SOI
  // An APP0 segment the parser has to skip over before reaching the frame
  bytes.set([0xff, 0xe0], 2);
  view.setUint16(4, 6);
  bytes.set([0xff, 0xc0], 10); // SOF0
  view.setUint16(12, 11);
  bytes[14] = 8; // precision
  view.setUint16(15, height);
  view.setUint16(17, width);
  return bytes;
}

function webpLosslessHeader(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(32);
  const encoder = new TextEncoder();
  bytes.set(encoder.encode('RIFF'), 0);
  bytes.set(encoder.encode('WEBP'), 8);
  bytes.set(encoder.encode('VP8L'), 12);
  bytes[20] = 0x2f; // VP8L signature
  const packed = (width - 1) | ((height - 1) << 14);
  new DataView(bytes.buffer).setUint32(21, packed, true);
  return bytes;
}

/**
 * JPEG with an APP1/EXIF segment declaring `orientation`, followed by a frame
 * of `width` x `height` — the shape every phone photograph has.
 */
function jpegWithExif(width: number, height: number, orientation: number): Uint8Array {
  const bytes = new Uint8Array(64);
  const view = new DataView(bytes.buffer);
  const encoder = new TextEncoder();

  bytes.set([0xff, 0xd8], 0); // SOI
  bytes.set([0xff, 0xe1], 2); // APP1
  view.setUint16(4, 30); // segment length
  bytes.set(encoder.encode('Exif\0\0'), 6);

  const tiff = 12;
  bytes.set(encoder.encode('II'), tiff); // little-endian TIFF
  view.setUint16(tiff + 2, 0x2a, true);
  view.setUint32(tiff + 4, 8, true); // offset of IFD0, relative to the TIFF header

  const ifd = tiff + 8;
  view.setUint16(ifd, 1, true); // one entry
  view.setUint16(ifd + 2, 0x0112, true); // Orientation tag
  view.setUint16(ifd + 4, 3, true); // type SHORT
  view.setUint32(ifd + 6, 1, true); // count
  view.setUint16(ifd + 10, orientation, true);

  const sof = 34;
  bytes.set([0xff, 0xc0], sof);
  view.setUint16(sof + 2, 11);
  bytes[sof + 4] = 8; // precision
  view.setUint16(sof + 5, height);
  view.setUint16(sof + 7, width);

  return bytes;
}

describe('readImageSize', () => {
  it('reads PNG dimensions from IHDR', () => {
    expect(readImageSize(pngHeader(1400, 1050))).toEqual({ width: 1400, height: 1050 });
  });

  it('reads JPEG dimensions from the start-of-frame marker', () => {
    expect(readImageSize(jpegHeader(2000, 1333))).toEqual({ width: 2000, height: 1333 });
  });

  it('reads lossless WebP dimensions', () => {
    expect(readImageSize(webpLosslessHeader(1600, 900))).toEqual({ width: 1600, height: 900 });
  });

  it('returns null for an unrecognised format', () => {
    expect(readImageSize(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))).toBeNull();
  });

  it('leaves dimensions alone for an upright EXIF orientation', () => {
    expect(readImageSize(jpegWithExif(4032, 3024, 1))).toEqual({ width: 4032, height: 3024 });
  });

  it('swaps dimensions for a quarter-turn EXIF orientation', () => {
    // Browsers rotate these when displaying, so the layout box must match
    for (const orientation of [5, 6, 7, 8]) {
      expect(readImageSize(jpegWithExif(4032, 3024, orientation))).toEqual({
        width: 3024,
        height: 4032,
      });
    }
  });

  it('returns null for a truncated file', () => {
    expect(readImageSize(pngHeader(800, 600).slice(0, 12))).toBeNull();
  });
});
