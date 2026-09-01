/**
 * Global site configuration. Change the values here to re-brand the whole
 * website — no component needs to be touched.
 */
export const SITE = {
  name: 'Lumen Studio',
  photographer: 'Aria Lindqvist',
  tagline: 'Cinematic Photography for People, Places & Wild Things',
  intro:
    'I chase the last twenty minutes of daylight across five continents — turning fleeting light into images that still feel alive a decade from now.',
  shortDescription:
    'Award-winning landscape, portrait and wildlife photographer based in Reykjavík, available worldwide.',
  /** Absolute origin used for canonical URLs, Open Graph tags and the sitemap. */
  url: 'https://lumenstudio.example.com',
  locale: 'en_US',
  language: 'en',
  foundedYear: 2013,
  email: 'hello@lumenstudio.example.com',
  phone: '+354 555 0142',
  phoneHref: '+3545550142',
  address: {
    street: 'Hverfisgata 42',
    city: 'Reykjavík',
    region: 'Capital Region',
    postalCode: '101',
    country: 'Iceland',
  },
  studioHours: 'Mon – Fri · 09:00 – 18:00 (GMT)',
  /** Approximate studio coordinates, used by the map placeholder link. */
  geo: { latitude: 64.1466, longitude: -21.9426 },
  ogImage: '/og-image.svg',
} as const;

export const SITE_ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.country}`;
