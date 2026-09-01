export interface SeoMeta {
  readonly title: string;
  readonly description: string;
  /** Path relative to the site origin, e.g. `/portfolio`. */
  readonly path: string;
  readonly image?: string;
  readonly type?: 'website' | 'article';
  readonly publishedAt?: string;
  readonly noIndex?: boolean;
}
