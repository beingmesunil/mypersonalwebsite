#!/usr/bin/env node
/**
 * Prints every photograph the site is looking for and whether a file has been
 * dropped into `src/assets/photos` yet.
 *
 * Usage: npm run photos:list
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const ROOT = process.cwd();
const PHOTO_DIR = join(ROOT, 'src/assets/photos');
const SOURCE_DIR = join(ROOT, 'src');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const LOCAL_KEY = /localKey:\s*'([^']+)'/g;

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    if (statSync(path).isDirectory()) return walk(path);

    const isSource = /\.tsx?$/.test(entry) && !/\.(test|spec)\.tsx?$/.test(entry);

    return isSource ? [path] : [];
  });
}

function collectExpectedKeys() {
  const keys = new Map();

  for (const file of walk(SOURCE_DIR)) {
    const contents = readFileSync(file, 'utf8');

    for (const [, key] of contents.matchAll(LOCAL_KEY)) {
      if (!keys.has(key)) keys.set(key, relative(ROOT, file));
    }
  }

  return [...keys].sort(([a], [b]) => a.localeCompare(b));
}

function collectSuppliedFiles() {
  if (!existsSync(PHOTO_DIR)) return new Map();

  return new Map(
    readdirSync(PHOTO_DIR)
      .filter((file) => EXTENSIONS.includes(extname(file).toLowerCase()))
      .map((file) => [file.slice(0, file.length - extname(file).length), file]),
  );
}

const expected = collectExpectedKeys();
const supplied = collectSuppliedFiles();

let missing = 0;

console.log(`\nPhotographs expected by the site (${expected.length}):\n`);

for (const [key, source] of expected) {
  const file = supplied.get(key);

  if (file) {
    const { size } = statSync(join(PHOTO_DIR, file));
    console.log(`  ✔ ${key.padEnd(28)} ${file} (${Math.round(size / 1024)} KB)`);
  } else {
    missing += 1;
    console.log(`  · ${key.padEnd(28)} not supplied — placeholder in use (${source})`);
  }
}

const unused = [...supplied.keys()].filter((key) => !expected.some(([name]) => name === key));

if (unused.length > 0) {
  console.log(`\nFiles that match no key (they will be ignored):\n`);
  for (const key of unused) console.log(`  ! ${supplied.get(key)}`);
}

console.log(
  `\n${expected.length - missing} of ${expected.length} supplied, ${missing} still using placeholders.\n`,
);
