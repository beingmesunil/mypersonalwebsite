import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { SOCIAL_LINKS } from '@/constants/navigation';
import { SITE, SITE_ADDRESS_LINE } from '@/constants/site';

const DETAILS = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: MapPin, label: 'Studio', value: SITE_ADDRESS_LINE, href: undefined },
  { icon: Clock, label: 'Hours', value: SITE.studioHours, href: undefined },
] as const;

export function ContactDetails() {
  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-6">
        {DETAILS.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-hairline bg-elevated/60 text-accent">
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-xs tracking-[0.25em] text-subtle uppercase">{label}</span>
              {href ? (
                <a
                  href={href}
                  className="text-sm text-ink transition-colors duration-300 hover:text-accent"
                >
                  {value}
                </a>
              ) : (
                <span className="text-sm text-ink">{value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <h3 className="text-xs tracking-[0.25em] text-subtle uppercase">Follow the work</h3>
        <ul className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE.name} on ${label}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-subtle transition-all duration-300 ease-cinematic hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
