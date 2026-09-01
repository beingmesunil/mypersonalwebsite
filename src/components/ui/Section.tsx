import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { Container } from './Container';

interface SectionProps {
  readonly id?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly width?: 'narrow' | 'default' | 'wide';
  /** Alternating surfaces give the long home page a sense of depth. */
  readonly tone?: 'canvas' | 'surface' | 'elevated';
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
}

const TONES = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  elevated: 'bg-elevated',
} as const;

/** Vertical rhythm wrapper — every page section uses the same spacing scale. */
export function Section({
  id,
  children,
  className,
  containerClassName,
  width = 'default',
  tone = 'canvas',
  ariaLabelledBy,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn('py-section lg:py-section-lg', TONES[tone], className)}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
