import { ArrowLeft, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { CallToActionSection } from '@/components/sections';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { LazyImage } from '@/components/ui/LazyImage';
import { Section } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes';
import { SIZES_FULL_WIDTH } from '@/constants/ui';
import { getPostBySlug } from '@/data';
import { useStructuredData } from '@/hooks/useStructuredData';
import { formatDate } from '@/utils/format';
import { buildArticleSchema } from '@/utils/seo';

import NotFoundPage from './NotFoundPage';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useStructuredData(post ? buildArticleSchema(post) : null, 'ld-article');

  if (!post) return <NotFoundPage />;

  return (
    <PageTransition>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover.src}
        type="article"
        publishedAt={post.publishedAt}
      />

      <article>
        <Container width="narrow" className="pt-40 pb-12">
          <Link
            to={ROUTES.blog}
            className="mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-subtle uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Journal
          </Link>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              {post.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-display-lg text-ink">{post.title}</h1>

            <p className="flex items-center gap-3 text-xs tracking-[0.2em] text-subtle uppercase">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden="true" className="size-3" />
                {post.readingTimeMinutes} min read
              </span>
            </p>
          </div>
        </Container>

        <Container width="wide">
          <LazyImage
            image={post.cover}
            priority
            sizes={SIZES_FULL_WIDTH}
            fallbackWidth={1440}
            className="rounded-3xl border border-hairline"
          />
        </Container>

        <Section width="narrow">
          <div className="flex flex-col gap-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      </article>

      <CallToActionSection
        title="Planning a Shoot of Your Own?"
        description="If something here was useful and you would like the same thinking applied to your project, the studio diary is open."
      />
    </PageTransition>
  );
}
