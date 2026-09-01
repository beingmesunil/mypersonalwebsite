import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

import type { NavLink, SocialLink } from '@/types';

import { ROUTES } from './routes';

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Portfolio', href: ROUTES.portfolio },
  { label: 'About', href: ROUTES.about },
  { label: 'Services', href: ROUTES.services },
  { label: 'Journal', href: ROUTES.blog },
  { label: 'Contact', href: ROUTES.contact },
];

export const FOOTER_NAV: readonly NavLink[] = [
  { label: 'Portfolio', href: ROUTES.portfolio },
  { label: 'Services', href: ROUTES.services },
  { label: 'About', href: ROUTES.about },
  { label: 'Journal', href: ROUTES.blog },
  { label: 'Contact', href: ROUTES.contact },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/lumenstudio',
    icon: Instagram,
    external: true,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@lumenstudio',
    icon: Youtube,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/lumenstudio',
    icon: Linkedin,
    external: true,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/lumenstudio',
    icon: Facebook,
    external: true,
  },
];
