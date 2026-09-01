import type { ElementType, ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface ContainerProps {
  readonly as?: ElementType;
  readonly children: ReactNode;
  readonly className?: string;
  /** `wide` is used for full-bleed galleries, `narrow` for long-form reading. */
  readonly width?: 'narrow' | 'default' | 'wide';
}

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[110rem]',
} as const;

/** Horizontal layout shell — the only place page gutters are defined. */
export function Container({
  as: Tag = 'div',
  children,
  className,
  width = 'default',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-gutter sm:px-8 lg:px-12', WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
