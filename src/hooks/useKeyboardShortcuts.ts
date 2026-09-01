import { useEffect } from 'react';

export type KeyHandlerMap = Record<string, (event: KeyboardEvent) => void>;

/**
 * Binds `KeyboardEvent.key` values to handlers on `window` while `enabled`.
 * Used for lightbox navigation (Escape, ArrowLeft, ArrowRight, Home, End).
 */
export function useKeyboardShortcuts(handlers: KeyHandlerMap, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = handlers[event.key];
      if (!handler) return;

      event.preventDefault();
      handler(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handlers]);
}
