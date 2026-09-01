import type { Plugin } from 'vite';

import { SITEMAP_ROUTES } from '../src/constants/routes';
import { SITE } from '../src/constants/site';
import { blogPosts } from '../src/data/blogData';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function toAbsolute(path: string): string {
  return new URL(path, SITE.url).toString();
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

/**
 * Emits `sitemap.xml` and `robots.txt` at build time from the route table and
 * the journal data, so neither file can drift out of sync with the site.
 */
export function sitemapPlugin(): Plugin {
  return {
    name: 'lumen-sitemap',
    apply: 'build',
    generateBundle() {
      const buildDate = new Date().toISOString().slice(0, 10);
      const entries = collectEntries(buildDate);

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(entries) });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() });

      console.info(`[lumen-sitemap] generated sitemap.xml with ${entries.length} URLs`);
    },
  };
}
