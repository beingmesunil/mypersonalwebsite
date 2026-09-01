/**
 * Single source of truth for application routes.
 * Consumed by the router, the navigation and the sitemap generator.
 */
export const ROUTES = {
  home: '/',
  portfolio: '/portfolio',
  about: '/about',
  services: '/services',
  blog: '/blog',
  blogPost: '/blog/:slug',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Static routes included in `sitemap.xml`, with their relative crawl priority. */
export const SITEMAP_ROUTES: ReadonlyArray<{
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}> = [
  { path: ROUTES.home, changefreq: 'weekly', priority: 1.0 },
  { path: ROUTES.portfolio, changefreq: 'weekly', priority: 0.9 },
  { path: ROUTES.about, changefreq: 'monthly', priority: 0.7 },
  { path: ROUTES.services, changefreq: 'monthly', priority: 0.8 },
  { path: ROUTES.blog, changefreq: 'weekly', priority: 0.7 },
  { path: ROUTES.contact, changefreq: 'yearly', priority: 0.6 },
];
