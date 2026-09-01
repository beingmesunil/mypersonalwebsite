import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

import { DURATION, EASE, fadeInUp, staggerContainer } from '@/constants/animation';
import { SECTION_IDS } from '@/constants/dom';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { SIZES_FULL_WIDTH } from '@/constants/ui';
import type { ImageAsset } from '@/types';

import { Container } from '../ui/Container';
import { LazyImage } from '../ui/LazyImage';
import { LinkButton } from '../ui/LinkButton';

const heroImage: ImageAsset = {
  src: 'https://picsum.photos/seed/lumen-hero/1920/1280',
  alt: '',
  width: 1920,
  height: 1280,
  placeholderColor: '#0b0f16',
};

/** Full-screen opening frame: photograph, name, positioning line and two CTAs. */
export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      {/* Decorative background — the alt text is intentionally empty */}
      <div aria-hidden="true" className="absolute inset-0">
        <LazyImage
          image={heroImage}
          priority
          sizes={SIZES_FULL_WIDTH}
          fallbackWidth={1920}
          className="[aspect-ratio:auto] size-full"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.cinematic, ease: EASE.out }}
          className="absolute inset-0 overlay-cinematic"
        />
      </div>

      <Container width="wide" className="relative z-10 pt-32 pb-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col gap-6"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs tracking-[0.4em] text-accent uppercase sm:text-sm"
          >
            {SITE.address.city} · Worldwide
          </motion.p>

          <motion.h1 variants={fadeInUp} id="hero-heading" className="text-display-xl text-ink">
            {SITE.photographer}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-display text-xl text-accent-strong sm:text-2xl"
          >
            {SITE.tagline}
          </motion.p>

          <motion.p variants={fadeInUp} className="max-w-xl text-base leading-relaxed text-muted">
            {SITE.intro}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-4 flex flex-wrap items-center gap-4">
            <LinkButton to={ROUTES.portfolio} size="lg">
              View Portfolio
              <ArrowRight aria-hidden="true" className="size-4" />
            </LinkButton>
            <LinkButton to={ROUTES.contact} size="lg" variant="secondary">
              <Mail aria-hidden="true" className="size-4" />
              Contact Me
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>

      <a
        href={`#${SECTION_IDS.portfolio}`}
        aria-label="Scroll to featured work"
        className="absolute inset-x-0 bottom-10 z-10 mx-auto flex w-fit flex-col items-center gap-3 text-subtle transition-colors duration-300 hover:text-accent"
      >
        <span className="text-[0.65rem] tracking-[0.35em] uppercase">Scroll</span>
        <span
          aria-hidden="true"
          className="relative flex h-12 w-7 justify-center rounded-full border border-hairline-strong pt-2"
        >
          <span className="block size-1.5 animate-scroll-hint rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
