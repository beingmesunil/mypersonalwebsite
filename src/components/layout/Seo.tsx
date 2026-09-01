import { SITE } from '@/constants/site';
import type { SeoMeta } from '@/types';
import { absoluteUrl } from '@/utils/seo';

/**
 * Document metadata for the current route.
 * React 19 hoists these tags into `<head>` automatically.
 */
export function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedAt,
  noIndex,
}: SeoMeta) {
  const fullTitle = path === '/' ? title : `${title} — ${SITE.name}`;
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image ?? SITE.ogImage);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content={SITE.photographer} />

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={`${SITE.name} — ${title}`} />
      <meta property="og:locale" content={SITE.locale} />
      {publishedAt ? <meta property="article:published_time" content={publishedAt} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}
