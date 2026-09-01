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
  /**
   * Absolute site URL, including any base path. This single value drives
   * canonical URLs, Open Graph tags, the sitemap, the web manifest and Vite's
   * `base` — moving to a custom domain means editing this line and nothing else.
   */
  url: 'https://beingmesunil.github.io/mypersonalwebsite',
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
