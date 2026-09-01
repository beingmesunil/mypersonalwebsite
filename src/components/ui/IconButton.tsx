import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon buttons have no visible text, so a label is mandatory. */
  readonly label: string;
  readonly children: ReactNode;
  readonly tone?: 'glass' | 'solid';
}

export function IconButton({
  label,
  children,
  className,
  tone = 'glass',
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full transition-colors duration-300 ease-cinematic',
        tone === 'glass'
          ? 'glass text-ink hover:border-accent/60 hover:text-accent'
          : 'bg-accent text-canvas hover:bg-accent-strong',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
