import { ArrowRight } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import { LinkButton } from '../ui/LinkButton';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

interface CallToActionSectionProps {
  readonly title?: string;
  readonly description?: string;
}

/** Closing prompt reused at the bottom of the inner pages. */
export function CallToActionSection({
  title = 'Dates Book Out Around Four Months Ahead',
  description = 'If you have a date in mind — a wedding, a campaign, an expedition — the earlier we talk, the more light we get to work with.',
}: CallToActionSectionProps) {
  return (
    <Section tone="elevated" ariaLabel="Booking enquiry">
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-display-md text-ink">{title}</h2>
        <p className="max-w-2xl leading-relaxed text-subtle">{description}</p>
        <LinkButton to={ROUTES.contact} size="lg">
          Start a Conversation
          <ArrowRight aria-hidden="true" className="size-4" />
        </LinkButton>
      </Reveal>
    </Section>
  );
}
