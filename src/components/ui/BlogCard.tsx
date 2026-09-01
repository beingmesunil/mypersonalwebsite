import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { BlogPost } from '@/types';
import { formatDate } from '@/utils/format';

import { LazyImage } from './LazyImage';

interface BlogCardProps {
  readonly post: BlogPost;
}

const CARD_SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-elevated/50 transition-all duration-500 ease-cinematic hover:-translate-y-1 hover:border-accent/40">
      <LazyImage
        image={post.cover}
        sizes={CARD_SIZES}
        imgClassName="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-105"
      />

      <div className="flex flex-1 flex-col gap-4 p-7">
        <p className="flex items-center gap-3 text-xs tracking-[0.2em] text-subtle uppercase">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="size-3" />
            {post.readingTimeMinutes} min
          </span>
        </p>

        <h3 className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-accent-strong">
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-subtle">{post.excerpt}</p>

        <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-accent uppercase">
          Read More
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
