import type { LucideIcon } from 'lucide-react';

import type { Identifiable } from './common';

export interface PhotographyService extends Identifiable {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  /** Price in the smallest sensible unit of `currency` (whole units, not cents). */
  readonly startingPrice: number;
  readonly currency: string;
  readonly deliverables: readonly string[];
}
