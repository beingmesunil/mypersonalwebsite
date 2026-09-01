export interface PixelSize {
  readonly width: number;
  readonly height: number;
}

/**
 * Reads the pixel dimensions out of an image file's header.
 *
 * Supports the formats a photographer actually exports for the web (JPEG, PNG,
 * WebP) without pulling in an image-processing dependency. Returns `null` when
 * the format is unknown or the header is truncated.
 */
export function readImageSize(bytes: Uint8Array): PixelSize | null {
  return readPng(bytes) ?? readJpeg(bytes) ?? readWebp(bytes);
}

function readUint32(bytes: Uint8Array, offset: number, littleEndian = false): number {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  return view.getUint32(offset, littleEndian);
}

function readUint16(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] << 8) | bytes[offset + 1];
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function readPng(bytes: Uint8Array): PixelSize | null {
  if (bytes.length < 24) return null;
  if (!PNG_SIGNATURE.every((byte, index) => bytes[index] === byte)) return null;

  // IHDR is always the first chunk: width and height are at bytes 16 and 20
  return { width: readUint32(bytes, 16), height: readUint32(bytes, 20) };
}

/** Start-of-frame markers carry the dimensions; these ones do not. */
const JPEG_SKIPPED_MARKERS = new Set([0xc4, 0xc8, 0xcc]);

const EXIF_ORIENTATION_TAG = 0x0112;

/**
 * EXIF orientations 5–8 rotate the image a quarter turn. Browsers apply that
 * rotation when displaying (`image-orientation: from-image` is the default), so
 * for those the stored width and height are the wrong way round for layout.
 */
function isQuarterTurn(orientation: number): boolean {
  return orientation >= 5 && orientation <= 8;
}

/** Reads the EXIF orientation out of a JPEG's APP1 segment; 1 when absent. */
function readJpegOrientation(bytes: Uint8Array, offset: number, segmentLength: number): number {
  const EXIF_HEADER = 'Exif\0\0';
  const headerStart = offset + 4;

  if (headerStart + EXIF_HEADER.length > bytes.length) return 1;
  if (![...EXIF_HEADER].every((c, i) => bytes[headerStart + i] === c.charCodeAt(0))) return 1;

  const tiff = headerStart + EXIF_HEADER.length;
  if (tiff + 8 > bytes.length) return 1;

  const littleEndian = bytes[tiff] === 0x49 && bytes[tiff + 1] === 0x49;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const directory = tiff + view.getUint32(tiff + 4, littleEndian);

  if (directory + 2 > bytes.length) return 1;

  const entryCount = view.getUint16(directory, littleEndian);
  const segmentEnd = Math.min(offset + 2 + segmentLength, bytes.length);

  for (let index = 0; index < entryCount; index += 1) {
    const entry = directory + 2 + index * 12;
    if (entry + 12 > segmentEnd) break;

    if (view.getUint16(entry, littleEndian) === EXIF_ORIENTATION_TAG) {
      return view.getUint16(entry + 8, littleEndian);
    }
  }

  return 1;
}

function readJpeg(bytes: Uint8Array): PixelSize | null {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;

  let offset = 2;
  let orientation = 1;

  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = bytes[offset + 1];
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && !JPEG_SKIPPED_MARKERS.has(marker);

    if (isStartOfFrame) {
      // segment: FF marker, length (2), precision (1), height (2), width (2)
      const width = readUint16(bytes, offset + 7);
      const height = readUint16(bytes, offset + 5);

      // Report the dimensions as the browser will actually display them
      return isQuarterTurn(orientation) ? { width: height, height: width } : { width, height };
    }

    const segmentLength = readUint16(bytes, offset + 2);
    if (segmentLength < 2) return null;

    // APP1 carries EXIF, and always precedes the frame
    if (marker === 0xe1) orientation = readJpegOrientation(bytes, offset, segmentLength);

    offset += 2 + segmentLength;
  }

  return null;
}

function isAscii(bytes: Uint8Array, offset: number, text: string): boolean {
  return [...text].every((character, index) => bytes[offset + index] === character.charCodeAt(0));
}

function readWebp(bytes: Uint8Array): PixelSize | null {
  if (bytes.length < 30 || !isAscii(bytes, 0, 'RIFF') || !isAscii(bytes, 8, 'WEBP')) return null;

  // Lossy: VP8 bitstream, dimensions are 14-bit values after the start code
  if (isAscii(bytes, 12, 'VP8 ')) {
    return {
      width: (bytes[26] | (bytes[27] << 8)) & 0x3fff,
      height: (bytes[28] | (bytes[29] << 8)) & 0x3fff,
    };
  }

  // Lossless: VP8L packs both dimensions into 28 bits, each stored minus one
  if (isAscii(bytes, 12, 'VP8L')) {
    const packed = readUint32(bytes, 21, true);

    return { width: (packed & 0x3fff) + 1, height: ((packed >> 14) & 0x3fff) + 1 };
  }

  // Extended: VP8X stores both dimensions minus one as 24-bit little-endian values
  if (isAscii(bytes, 12, 'VP8X')) {
    return {
      width: (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)) + 1,
      height: (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)) + 1,
    };
  }

  return null;
}
