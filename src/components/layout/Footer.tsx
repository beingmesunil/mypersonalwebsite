import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { FOOTER_NAV, SOCIAL_LINKS } from '@/constants/navigation';
import { SITE, SITE_ADDRESS_LINE } from '@/constants/site';
import { scrollToTop } from '@/utils/scroll';

import { Container } from '../ui/Container';
import { Logo } from './Logo';

const currentYear = new Date().getFullYear();

const CONTACT_ROWS = [
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: MapPin, label: SITE_ADDRESS_LINE, href: undefined },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <Container width="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-subtle">{SITE.shortDescription}</p>
          </div>

          <nav aria-labelledby="footer-links-heading" className="flex flex-col gap-4">
            <h2 id="footer-links-heading" className="text-sm tracking-[0.25em] text-ink uppercase">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-subtle transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-heading" className="flex flex-col gap-4">
            <h2
              id="footer-contact-heading"
              className="text-sm tracking-[0.25em] text-ink uppercase"
            >
              Studio
            </h2>
            <ul className="flex flex-col gap-3">
              {CONTACT_ROWS.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-subtle">
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {href ? (
                    <a href={href} className="transition-colors duration-300 hover:text-accent">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-social-heading" className="flex flex-col gap-4">
            <h2 id="footer-social-heading" className="text-sm tracking-[0.25em] text-ink uppercase">
              Follow
            </h2>
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
            <p className="text-xs text-subtle">{SITE.studioHours}</p>
          </section>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-xs text-subtle">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-subtle uppercase transition-colors duration-300 hover:text-accent"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
