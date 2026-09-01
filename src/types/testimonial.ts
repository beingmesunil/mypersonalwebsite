import type { Identifiable, ImageAsset } from './common';

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Testimonial extends Identifiable {
  readonly name: string;
  readonly role: string;
  readonly rating: Rating;
  readonly quote: string;
  readonly avatar: ImageAsset;
}
