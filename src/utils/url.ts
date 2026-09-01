/**
 * Joins a site origin (which may itself contain a base path, as GitHub Pages
 * project sites do) with a site-relative path.
 *
 * `new URL('/portfolio', 'https://host/repo')` would drop `/repo`, which is why
 * canonical URLs, Open Graph tags and the sitemap all go through this helper.
 */
export function joinUrl(base: string, path: string): string {
  const trimmedBase = base.replace(/\/+$/, '');

  if (!path || path === '/') return `${trimmedBase}/`;

  return `${trimmedBase}/${path.replace(/^\/+/, '')}`;
}

/** Returns `value` with exactly one trailing slash — the shape Vite wants for `base`. */
export function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}

/** Returns `value` without a trailing slash — the shape React Router wants for `basename`. */
export function stripTrailingSlash(value: string): string {
  const stripped = value.replace(/\/+$/, '');

  return stripped === '' ? '/' : stripped;
}
