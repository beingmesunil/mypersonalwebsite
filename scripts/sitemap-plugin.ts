import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Plugin, ResolvedConfig } from 'vite';

import { SITEMAP_ROUTES } from '../src/constants/routes';
import { SITE } from '../src/constants/site';
import { blogPosts } from '../src/data/blogData';
import { joinUrl } from '../src/utils/url';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function toAbsolute(path: string): string {
  return joinUrl(SITE.url, path);
}

function collectEntries(buildDate: string): SitemapEntry[] {
  const staticEntries = SITEMAP_ROUTES.map((route) => ({
    loc: toAbsolute(route.path),
    lastmod: buildDate,
    changefreq: route.changefreq,
    priority: route.priority.toFixed(1),
  }));

  const postEntries = blogPosts.map((post) => ({
    loc: toAbsolute(`/blog/${post.slug}`),
    lastmod: post.publishedAt,
    changefreq: 'yearly',
    priority: '0.5',
  }));

  return [...staticEntries, ...postEntries];
}

function renderSitemap(entries: readonly SitemapEntry[]): string {
  const urls = entries
    .map((entry) =>
      [
        '  <url>',
        `    <loc>${entry.loc}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function renderRobots(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${toAbsolute('/sitemap.xml')}`, ''].join('\n');
}

function renderManifest(base: string): string {
  return `${JSON.stringify(
    {
      name: `${SITE.name} — ${SITE.photographer} Photography`,
      short_name: SITE.name,
      description: SITE.shortDescription,
      start_url: base,
      scope: base,
      display: 'standalone',
      background_color: '#050505',
      theme_color: '#050505',
      icons: [
        {
          src: `${base}favicon.svg`,
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    },
    null,
    2,
  )}\n`;
}

/**
 * Emits the files that must stay in sync with `SITE.url` and Vite's `base`:
 * `sitemap.xml`, `robots.txt`, the web manifest, and the `404.html` copy of the
 * shell that lets GitHub Pages serve deep links into the SPA.
 */
export function sitemapPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'lumen-site-files',
    apply: 'build',

    configResolved(resolved) {
      config = resolved;
    },

    generateBundle() {
      const buildDate = new Date().toISOString().slice(0, 10);
      const entries = collectEntries(buildDate);

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(entries) });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() });

      console.info(`[lumen-site-files] generated sitemap.xml with ${entries.length} URLs`);
    },

    // Runs after the HTML and the public directory have been written to disk
    closeBundle() {
      const outDir = join(config.root, config.build.outDir);

      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
      writeFileSync(join(outDir, 'site.webmanifest'), renderManifest(config.base), 'utf8');

      console.info(
        `[lumen-site-files] wrote 404.html and site.webmanifest for base ${config.base}`,
      );
    },
  };
}
