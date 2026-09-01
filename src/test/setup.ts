import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom implements neither of these browser APIs, and both are used by the
// animation and responsive layers.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

afterEach(() => cleanup());
