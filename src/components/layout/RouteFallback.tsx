import { LoaderCircle } from 'lucide-react';

/** Shown while a lazily loaded route chunk is downloading. */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-dvh items-center justify-center bg-canvas"
    >
      <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-accent" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
