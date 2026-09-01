import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { BREAKPOINTS, CAROUSEL_INTERVAL_MS } from '@/constants/ui';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Testimonial } from '@/types';
import { cn } from '@/utils/cn';
import { wrapIndex } from '@/utils/portfolio';

import { IconButton } from '../ui/IconButton';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialCarouselProps {
  readonly testimonials: readonly Testimonial[];
}

/**
 * One component, two behaviours: a snap-scrolling swipeable track on touch
 * devices, and an auto-advancing carousel with controls on desktop.
 */
export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const prefersReducedMotion = useReducedMotion();

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      const slide = track?.children[index] as HTMLElement | undefined;
      if (!track || !slide) return;

      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto',
      });
      setActiveIndex(index);
    },
    [prefersReducedMotion],
  );

  const goTo = useCallback(
    (offset: number) => scrollToIndex(wrapIndex(activeIndex + offset, testimonials.length)),
    [activeIndex, scrollToIndex, testimonials.length],
  );

  // Keep the dots in sync when the visitor swipes the track directly
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const nearest = slides.reduce(
        (closest, slide, index) => {
          const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );

      setActiveIndex(nearest.index);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay on pointer devices only, and never while the visitor is interacting
  useEffect(() => {
    if (!isDesktop || isPaused || prefersReducedMotion || testimonials.length < 2) return;

    const timer = window.setInterval(
      () => scrollToIndex(wrapIndex(activeIndex + 1, testimonials.length)),
      CAROUSEL_INTERVAL_MS,
    );

    return () => window.clearInterval(timer);
  }, [activeIndex, isDesktop, isPaused, prefersReducedMotion, scrollToIndex, testimonials.length]);

  return (
    <div
      className="flex flex-col gap-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <ul
        ref={trackRef}
        aria-label="Client testimonials"
        className="-mx-gutter flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth px-gutter pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show testimonial from ${testimonial.name}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500 ease-cinematic',
                index === activeIndex
                  ? 'w-10 bg-accent'
                  : 'w-4 bg-hairline-strong hover:bg-accent/60',
              )}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <IconButton label="Previous testimonial" onClick={() => goTo(-1)}>
            <ChevronLeft aria-hidden="true" className="size-5" />
          </IconButton>
          <IconButton label="Next testimonial" onClick={() => goTo(1)}>
            <ChevronRight aria-hidden="true" className="size-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
