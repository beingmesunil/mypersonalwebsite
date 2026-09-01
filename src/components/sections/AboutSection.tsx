import { Check } from 'lucide-react';

import { SECTION_IDS } from '@/constants/dom';
import { aboutHighlights, aboutMission, aboutPortrait, aboutStory } from '@/data';

import { LazyImage } from '../ui/LazyImage';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

import { StatsGrid } from './StatsGrid';

const PORTRAIT_SIZES = '(min-width: 1024px) 40vw, 100vw';

/** Biography, mission statement, highlights and the animated statistics. */
export function AboutSection() {
  return (
    <Section
      id={SECTION_IDS.about}
      tone="surface"
      width="wide"
      ariaLabelledBy="about-heading"
      containerClassName="flex flex-col gap-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <LazyImage
            image={aboutPortrait}
            sizes={PORTRAIT_SIZES}
            className="rounded-3xl border border-hairline"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 hidden size-32 rounded-3xl border border-accent/30 lg:block"
          />
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="text-xs font-medium tracking-[0.35em] text-accent uppercase">
              About the Studio
            </span>
          </Reveal>

          <Reveal>
            <h2 id="about-heading" className="text-display-md text-ink">
              Thirteen Years Chasing the Last Twenty Minutes of Light
            </h2>
          </Reveal>

          {aboutStory.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="leading-relaxed text-subtle">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal>
            <blockquote className="border-l-2 border-accent pl-5">
              <p className="font-display text-lg text-muted italic">{aboutMission}</p>
            </blockquote>
          </Reveal>

          <Reveal>
            <ul className="mt-2 flex flex-col gap-3">
              {aboutHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-subtle">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <StatsGrid />
    </Section>
  );
}
