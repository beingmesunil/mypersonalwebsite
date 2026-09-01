import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

import type { Plugin } from 'vite';

import { readImageSize } from '../src/utils/imageSize';

/** Photographs dropped in here are picked up automatically — see the folder's README. */
const PHOTO_DIR = 'src/assets/photos';
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

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
      const size = readImageSize(readFileSync(join(directory, file)));

      if (!size) {
        warn(`could not read the dimensions of ${file}; it will be ignored`);
        return [];
      }

      return [{ key: basename(file, extname(file)), file, ...size }];
    });
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
