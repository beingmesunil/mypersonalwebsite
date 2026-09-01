import { motion } from 'framer-motion';

import { fadeInUp, staggerContainerTight, VIEWPORT } from '@/constants/animation';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  readonly id?: string;
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: 'left' | 'center';
  readonly className?: string;
  readonly as?: 'h1' | 'h2';
}

/** Consistent eyebrow / title / description block used by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainerTight}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          variants={fadeInUp}
          className="text-xs font-medium tracking-[0.35em] text-accent uppercase"
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.div variants={fadeInUp}>
        <Heading id={id} className="text-display-md text-ink">
          {title}
        </Heading>
      </motion.div>

      {description ? (
        <motion.p variants={fadeInUp} className="text-base leading-relaxed text-subtle sm:text-lg">
          {description}
        </motion.p>
      ) : null}

      <motion.span
        variants={fadeInUp}
        aria-hidden="true"
        className="mt-2 block h-px w-16 bg-linear-to-r from-accent to-transparent"
      />
    </motion.div>
  );
}
