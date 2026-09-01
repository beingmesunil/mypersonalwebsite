import type { LucideIcon } from 'lucide-react';

/** Every entity stored in `src/data` is addressable by a stable slug-like id. */
export interface Identifiable {
  readonly id: string;
}

export interface ImageAsset {
  /** Base URL of the image; responsive variants are derived from it. */
  readonly src: string;
  /** Descriptive alternative text — required for WCAG AA compliance. */
  readonly alt: string;
  /** Intrinsic width in pixels, used to reserve layout space (avoids CLS). */
  readonly width: number;
  /** Intrinsic height in pixels, used to reserve layout space (avoids CLS). */
  readonly height: number;
  /** Tiny solid colour used as a placeholder while the image loads. */
  readonly placeholderColor?: string;
  /**
   * Basename of a file in `src/assets/photos`. When that file exists it wins
   * over `src`, and its real dimensions replace the ones declared here.
   */
  readonly localKey?: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** External links open in a new tab and get `rel="noopener noreferrer"`. */
  readonly external?: boolean;
}

export interface SocialLink extends NavLink {
  readonly icon: LucideIcon;
}

export interface Statistic extends Identifiable {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly icon: LucideIcon;
}
