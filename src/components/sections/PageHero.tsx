import { motion } from 'framer-motion';

import { fadeInUp, staggerContainerTight } from '@/constants/animation';

import { Container } from '../ui/Container';

interface PageHeroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

/** Compact hero used by the inner pages, mirroring the home page's rhythm. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section aria-labelledby="page-hero-heading" className="relative overflow-hidden pt-40 pb-16">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(212,165,116,0.12),transparent_70%)]"
      />

      <Container width="wide" className="relative">
        <motion.div
          variants={staggerContainerTight}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col gap-5"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-medium tracking-[0.35em] text-accent uppercase"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            id="page-hero-heading"
            className="text-display-lg text-ink"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="max-w-2xl text-lg leading-relaxed text-subtle">
            {description}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
