import { motion } from 'framer-motion';

import { fadeInUp, staggerContainerTight, VIEWPORT } from '@/constants/animation';
import { statistics } from '@/data';

import { AnimatedCounter } from '../ui/AnimatedCounter';

/** Four animated counters summarising the studio's track record. */
export function StatsGrid() {
  return (
    <motion.ul
      variants={staggerContainerTight}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {statistics.map(({ id, label, value, suffix, icon: Icon }) => (
        <motion.li
          key={id}
          variants={fadeInUp}
          className="flex flex-col gap-3 rounded-2xl border border-hairline bg-elevated/60 p-6 transition-colors duration-500 ease-cinematic hover:border-accent/40"
        >
          <Icon aria-hidden="true" className="size-5 text-accent" />
          <AnimatedCounter
            value={value}
            suffix={suffix}
            className="font-display text-display-sm text-ink"
          />
          <span className="text-xs tracking-[0.2em] text-subtle uppercase">{label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
