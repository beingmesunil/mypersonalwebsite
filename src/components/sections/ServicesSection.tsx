import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { fadeInUp, staggerContainerTight, VIEWPORT } from '@/constants/animation';
import { SECTION_IDS } from '@/constants/dom';
import { ROUTES } from '@/constants/routes';
import { services } from '@/data';
import { formatPrice } from '@/utils/format';

import { LinkButton } from '../ui/LinkButton';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

/** Four service cards with pricing and a call to action. */
export function ServicesSection() {
  return (
    <Section
      id={SECTION_IDS.services}
      width="wide"
      ariaLabelledBy="services-heading"
      containerClassName="flex flex-col gap-14"
    >
      <SectionHeading
        id="services-heading"
        eyebrow="What I Offer"
        title="Photography Services"
        description="Clear scopes, honest pricing and a delivery date you can plan around. Every project starts with a conversation about what the images are actually for."
      />

      <motion.ul
        variants={staggerContainerTight}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.li
              key={service.id}
              variants={fadeInUp}
              className="group flex flex-col gap-5 rounded-2xl border border-hairline bg-elevated/60 p-8 transition-all duration-500 ease-cinematic hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-hairline bg-canvas text-accent transition-colors duration-500 group-hover:border-accent/50">
                <Icon aria-hidden="true" className="size-5" />
              </span>

              <h3 className="font-display text-xl text-ink">{service.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-subtle">{service.description}</p>

              <ul className="flex flex-col gap-2 border-t border-hairline pt-5">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="text-xs text-subtle">
                    · {deliverable}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted">
                <span className="text-xs tracking-[0.2em] text-subtle uppercase">From </span>
                <span className="font-display text-2xl text-accent">
                  {formatPrice(service.startingPrice, service.currency)}
                </span>
              </p>

              <LinkButton
                to={`${ROUTES.services}#${service.id}`}
                variant="ghost"
                size="sm"
                className="self-start px-0"
                ariaLabel={`Learn more about ${service.title}`}
              >
                Learn More
                <ArrowRight aria-hidden="true" className="size-4" />
              </LinkButton>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
