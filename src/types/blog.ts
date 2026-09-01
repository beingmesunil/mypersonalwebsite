import type { Identifiable, ImageAsset } from './common';

export interface BlogPost extends Identifiable {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  /** ISO-8601 date string (`YYYY-MM-DD`). */
  readonly publishedAt: string;
  readonly readingTimeMinutes: number;
  readonly tags: readonly string[];
  readonly cover: ImageAsset;
  /** Body copy, one entry per paragraph. */
  readonly content: readonly string[];
}
