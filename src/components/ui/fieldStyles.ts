import { cn } from '@/utils/cn';

/** Shared input/textarea styling, including the invalid state. */
export function fieldClasses(hasError: boolean): string {
  return cn(
    'w-full rounded-xl border bg-elevated/60 px-4 py-3 text-sm text-ink transition-colors duration-300 ease-cinematic',
    'placeholder:text-subtle/60 hover:border-hairline-strong focus:border-accent focus:outline-none',
    hasError ? 'border-red-400/70' : 'border-hairline',
  );
}
