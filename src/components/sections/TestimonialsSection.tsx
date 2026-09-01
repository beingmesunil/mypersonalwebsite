import { SECTION_IDS } from '@/constants/dom';
import { testimonials } from '@/data';

import { TestimonialCarousel } from '../testimonials/TestimonialCarousel';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

export function TestimonialsSection() {
  return (
    <Section
      id={SECTION_IDS.testimonials}
      tone="surface"
      width="wide"
      ariaLabelledBy="testimonials-heading"
      containerClassName="flex flex-col gap-14"
    >
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Kind Words"
        title="What Clients Say"
        description="Couples, editors and brands who trusted the studio with a day that only happens once."
      />

      <TestimonialCarousel testimonials={testimonials} />
    </Section>
  );
}
