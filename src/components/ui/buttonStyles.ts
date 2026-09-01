import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-cinematic disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-canvas hover:bg-accent-strong hover:shadow-glow',
  secondary:
    'glass text-ink hover:border-accent/60 hover:text-accent-strong hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-accent underline-offset-8 hover:underline',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm sm:text-base',
};

/** Shared styling for `<Button>` and router-aware `<LinkButton>`. */
export function getButtonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}
