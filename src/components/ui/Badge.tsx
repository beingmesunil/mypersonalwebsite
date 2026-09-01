import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: 'accent' | 'neutral';
}

export function Badge({ children, className, tone = 'accent' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-medium tracking-[0.2em] uppercase',
        tone === 'accent'
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-hairline bg-elevated/70 text-subtle',
        className,
      )}
    >
      {children}
    </span>
  );
}
