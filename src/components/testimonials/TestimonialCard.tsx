import { Quote } from 'lucide-react';

import type { Testimonial } from '@/types';

import { LazyImage } from '../ui/LazyImage';
import { StarRating } from '../ui/StarRating';

interface TestimonialCardProps {
  readonly testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col gap-6 rounded-2xl border border-hairline bg-elevated/60 p-8 transition-colors duration-500 ease-cinematic hover:border-accent/40">
      <Quote aria-hidden="true" className="size-8 text-accent/70" />

      <blockquote className="flex-1">
        <p className="text-base leading-relaxed text-muted">{testimonial.quote}</p>
      </blockquote>

      <StarRating rating={testimonial.rating} />

      <figcaption className="flex items-center gap-4 border-t border-hairline pt-6">
        <LazyImage
          image={testimonial.avatar}
          sizes="64px"
          fallbackWidth={128}
          className="size-14 shrink-0 rounded-full"
        />
        <span className="flex flex-col">
          <span className="font-display text-lg text-ink">{testimonial.name}</span>
          <span className="text-xs tracking-[0.2em] text-subtle uppercase">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
