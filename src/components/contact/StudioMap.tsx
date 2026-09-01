import { MapPin } from 'lucide-react';

import { SITE, SITE_ADDRESS_LINE } from '@/constants/site';

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`;

/**
 * Renders a Google Maps embed when `VITE_MAP_EMBED_URL` is configured, and an
 * on-brand placeholder otherwise — so no third-party script is loaded by default.
 */
export function StudioMap() {
  const embedUrl = import.meta.env.VITE_MAP_EMBED_URL;

  if (embedUrl) {
    return (
      <iframe
        title={`Map showing ${SITE.name} in ${SITE.address.city}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full rounded-2xl border border-hairline grayscale-[40%]"
      />
    );
  }

  return (
    <div className="relative flex h-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-hairline bg-elevated/60 text-center">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,165,116,0.16),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]"
      />

      <MapPin aria-hidden="true" className="relative size-8 text-accent" />
      <p className="relative font-display text-lg text-ink">{SITE.name}</p>
      <p className="relative max-w-xs text-xs text-subtle">{SITE_ADDRESS_LINE}</p>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative text-xs tracking-[0.2em] text-accent uppercase underline-offset-8 hover:underline"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
