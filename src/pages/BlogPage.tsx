import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections';
import { BlogCard } from '@/components/ui/BlogCard';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes';
import { blogPosts } from '@/data';

export default function BlogPage() {
  return (
    <PageTransition>
      <Seo
        title="Journal"
        description="Essays on planning arctic shoots, lighting portraits with a single source, building a winter wildlife kit and editing with restraint."
        path={ROUTES.blog}
      />

      <PageHero
        eyebrow="Journal"
        title="Notes From the Field"
        description="How the work actually gets made — planning, light, gear that survives winter, and the discipline of a restrained edit."
      />

      <Section width="wide" className="pt-0">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal as="li" key={post.id} delay={Math.min(index, 5) * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </PageTransition>
  );
}
