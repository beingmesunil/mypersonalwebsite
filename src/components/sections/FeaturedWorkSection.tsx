import { ArrowRight } from 'lucide-react';

import { SECTION_IDS } from '@/constants/dom';
import { ROUTES } from '@/constants/routes';
import { FEATURED_ITEMS_LIMIT } from '@/constants/ui';
import { portfolioItems } from '@/data';

import { PortfolioGallery } from '../portfolio/PortfolioGallery';
import { LinkButton } from '../ui/LinkButton';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

const featured = portfolioItems.filter((item) => item.featured).slice(0, FEATURED_ITEMS_LIMIT);

/** Home page gallery: filterable masonry grid of the strongest frames. */
export function FeaturedWorkSection() {
  return (
    <Section
      id={SECTION_IDS.portfolio}
      width="wide"
      ariaLabelledBy="featured-work-heading"
      containerClassName="flex flex-col gap-14"
    >
      <SectionHeading
        id="featured-work-heading"
        eyebrow="Selected Work"
        title="Frames Worth Printing Large"
        description="Landscapes, portraits and wildlife from thirteen years of chasing good light. Filter by category, then open any frame full screen."
      />

      <PortfolioGallery items={featured} />

      <Reveal className="flex justify-center">
        <LinkButton to={ROUTES.portfolio} variant="secondary" size="lg">
          Explore the Full Portfolio
          <ArrowRight aria-hidden="true" className="size-4" />
        </LinkButton>
      </Reveal>
    </Section>
  );
}
