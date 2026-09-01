import { SITE, SITE_ADDRESS_LINE } from '@/constants/site';
import type { BlogPost, PhotographyService } from '@/types';

import { joinUrl } from './url';

/** Builds an absolute URL from a site-relative path, preserving any base path. */
export function absoluteUrl(path: string): string {
  return joinUrl(SITE.url, path);
}

type JsonLd = Record<string, unknown>;

/** `LocalBusiness` schema describing the studio — used on every page. */
export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    image: absoluteUrl(SITE.ogImage),
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    founder: { '@type': 'Person', name: SITE.photographer },
    foundingDate: String(SITE.foundedYear),
    description: SITE.shortDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: 'Worldwide',
    knowsAbout: ['Landscape photography', 'Portrait photography', 'Wildlife photography'],
    slogan: SITE.tagline,
    location: SITE_ADDRESS_LINE,
  };
}

/** `Service` catalogue schema for the services page. */
export function buildServiceSchema(services: readonly PhotographyService[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${SITE.name} photography services`,
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: service.title,
      description: service.description,
      priceCurrency: service.currency,
      price: service.startingPrice,
      availability: 'https://schema.org/InStock',
    })),
  };
}

/** `BlogPosting` schema for an individual journal entry. */
export function buildArticleSchema(post: BlogPost): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover.src,
    datePublished: post.publishedAt,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: SITE.photographer },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

/** Breadcrumb schema improving how deep pages appear in search results. */
export function buildBreadcrumbSchema(
  crumbs: ReadonlyArray<{ name: string; path: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
