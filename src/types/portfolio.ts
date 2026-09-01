import type { Identifiable, ImageAsset } from './common';

export const PORTFOLIO_CATEGORIES = [
  'landscape',
  'portrait',
  'wildlife',
  'travel',
  'street',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/** `all` is the default filter shown in the portfolio category bar. */
export type PortfolioFilter = PortfolioCategory | 'all';

export interface PortfolioItem extends Identifiable {
  readonly title: string;
  readonly category: PortfolioCategory;
  readonly location: string;
  readonly year: number;
  readonly description: string;
  readonly image: ImageAsset;
  /** Featured items are surfaced on the home page grid. */
  readonly featured: boolean;
}
