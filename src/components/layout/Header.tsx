import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { DURATION, EASE } from '@/constants/animation';
import { PRIMARY_NAV } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { HEADER_SCROLL_THRESHOLD } from '@/constants/ui';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { cn } from '@/utils/cn';

import { Container } from '../ui/Container';
import { IconButton } from '../ui/IconButton';
import { LinkButton } from '../ui/LinkButton';
import { Logo } from './Logo';

const MOBILE_MENU_ID = 'mobile-navigation';

function navLinkClasses({ isActive }: { isActive: boolean }): string {
  return cn(
    'relative text-sm tracking-wide transition-colors duration-300 ease-cinematic',
    'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300',
    isActive
      ? 'text-accent after:w-full'
      : 'text-muted after:w-0 hover:text-ink hover:after:w-full',
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollThreshold(HEADER_SCROLL_THRESHOLD);
  const { pathname } = useLocation();

  useLockBodyScroll(isMenuOpen);

  // Close the drawer whenever the route changes
  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic',
        // The open drawer needs an opaque backdrop so page content cannot bleed through
        isMenuOpen && 'border-b border-hairline bg-canvas py-3',
        !isMenuOpen && isScrolled && 'glass py-3',
        !isMenuOpen && !isScrolled && 'border-b border-transparent py-5',
      )}
    >
      <Container width="wide" className="flex items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={navLinkClasses}
              end={link.href === ROUTES.home}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton to={ROUTES.contact} size="sm">
            Book a Session
          </LinkButton>
        </div>

        <IconButton
          label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="lg:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </IconButton>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id={MOBILE_MENU_ID}
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.inOut }}
            className="overflow-hidden bg-canvas lg:hidden"
          >
            <Container width="wide" className="flex flex-col gap-1 py-6">
              {PRIMARY_NAV.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === ROUTES.home}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-3 font-display text-xl transition-colors',
                      isActive ? 'text-accent' : 'text-muted hover:text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <LinkButton to={ROUTES.contact} className="mt-4 w-full">
                Book a Session
              </LinkButton>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
