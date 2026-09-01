import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

import type { Plugin } from 'vite';

import { readImageSize } from '../src/utils/imageSize';

/** Photographs dropped in here are picked up automatically — see the folder's README. */
const PHOTO_DIR = 'src/assets/photos';
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

/** Photographs above this are worth re-exporting; they are served as-is. */
const SIZE_WARNING_BYTES = 800 * 1024;

const VIRTUAL_ID = 'virtual:local-photos';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

interface LocalPhoto {
  key: string;
  file: string;
  width: number;
  height: number;
}

function collectPhotos(root: string, warn: (message: string) => void): LocalPhoto[] {
  const directory = join(root, PHOTO_DIR);

  if (!existsSync(directory)) return [];

  return readdirSync(directory)
    .filter((file) => EXTENSIONS.has(extname(file).toLowerCase()))
    .sort()
    .flatMap<LocalPhoto>((file) => {
      const contents = readFileSync(join(directory, file));
      const size = readImageSize(contents);

      if (!size) {
        warn(`could not read the dimensions of ${file}; it will be ignored`);
        return [];
      }

      const bytes = statSync(join(directory, file)).size;

      if (bytes > SIZE_WARNING_BYTES) {
        warn(
          `${file} is ${Math.round(bytes / 1024)} KB — it is served as-is, so re-export it at ~2000px / quality 80`,
        );
      }

      return [{ key: basename(file, extname(file)), file, ...size }];
    });
}

/** Every `localKey` declared across the source tree, so unused files can be reported. */
function collectExpectedKeys(): Set<string> {
  const keys = new Set<string>();

  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(path);
      } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name)) {
        for (const [, key] of readFileSync(path, 'utf8').matchAll(/localKey:\s*'([^']+)'/g)) {
          keys.add(key);
        }
      }
    }
  };

  walk('src');

  return keys;
}

function renderModule(photos: readonly LocalPhoto[]): string {
  const imports = photos.map(
    (photo, index) => `import src${index} from '/${PHOTO_DIR}/${photo.file}';`,
  );

  const entries = photos.map(
    (photo, index) =>
      `  ${JSON.stringify(photo.key)}: { src: src${index}, width: ${photo.width}, height: ${photo.height} },`,
  );

  return [...imports, '', 'export const localPhotos = {', ...entries, '};', ''].join('\n');
}

/**
 * Exposes `src/assets/photos/*` as the virtual module `virtual:local-photos`,
 * with each file's real pixel dimensions read from its header at build time.
 *
 * This is what makes dropping a photograph into that folder enough: no data
 * file has to be edited, and the layout still reserves the correct space.
 */
export function localPhotosPlugin(): Plugin {
  let root = process.cwd();
  const expectedKeys = collectExpectedKeys();

  return {
    name: 'lumen-local-photos',

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_ID) return null;

      const photos = collectPhotos(root, (message) => this.warn(message));
      const unused = photos.filter((photo) => !expectedKeys.has(photo.key));

      // Silently ignoring a photograph someone deliberately added is worse than
      // a noisy build: it bloats the bundle and looks like the site is broken.
      for (const photo of unused) {
        this.warn(
          `${photo.file} matches no localKey, so it is not shown anywhere. Rename it to one of the keys listed by \`npm run photos:list\`.`,
        );
      }

      return renderModule(photos);
    },

    // Adding or removing a photograph while the dev server runs reloads the map
    configureServer(server) {
      const directory = join(root, PHOTO_DIR);
      server.watcher.add(directory);

      const invalidate = (path: string) => {
        if (!path.startsWith(directory)) return;

        const module = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (!module) return;

        server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };

      server.watcher.on('add', invalidate);
      server.watcher.on('unlink', invalidate);
    },
  };
}
