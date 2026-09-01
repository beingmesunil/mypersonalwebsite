import { SECTION_IDS } from '@/constants/dom';

import { ContactDetails } from '../contact/ContactDetails';
import { ContactForm } from '../contact/ContactForm';
import { StudioMap } from '../contact/StudioMap';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

/** Two-column enquiry section: validated form on the left, studio details right. */
export function ContactSection() {
  return (
    <Section
      id={SECTION_IDS.contact}
      tone="surface"
      width="wide"
      ariaLabelledBy="contact-heading"
      containerClassName="flex flex-col gap-14"
    >
      <SectionHeading
        id="contact-heading"
        eyebrow="Get in Touch"
        title="Let's Make Something Worth Keeping"
        description="Tell me about the shoot — the date, the place, and what you want to remember about it. I reply to every enquiry personally."
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="rounded-3xl border border-hairline bg-elevated/40 p-6 sm:p-10">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-10">
          <ContactDetails />
          <StudioMap />
        </Reveal>
      </div>
    </Section>
  );
}
