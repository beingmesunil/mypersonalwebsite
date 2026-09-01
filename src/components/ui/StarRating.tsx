import { Star } from 'lucide-react';

import type { Rating } from '@/types';
import { cn } from '@/utils/cn';

const MAX_RATING = 5;

interface StarRatingProps {
  readonly rating: Rating;
  readonly className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="img"
      aria-label={`Rated ${rating} out of ${MAX_RATING} stars`}
    >
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            'size-4',
            index < rating ? 'fill-accent text-accent' : 'text-hairline-strong',
          )}
        />
      ))}
    </div>
  );
}
