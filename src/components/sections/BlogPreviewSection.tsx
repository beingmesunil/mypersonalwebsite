import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { fadeInUp, staggerContainerTight, VIEWPORT } from '@/constants/animation';
import { SECTION_IDS } from '@/constants/dom';
import { ROUTES } from '@/constants/routes';
import { BLOG_PREVIEW_LIMIT } from '@/constants/ui';
import { blogPosts } from '@/data';

import { BlogCard } from '../ui/BlogCard';
import { LinkButton } from '../ui/LinkButton';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

const latestPosts = blogPosts.slice(0, BLOG_PREVIEW_LIMIT);

export function BlogPreviewSection() {
  return (
    <Section
      id={SECTION_IDS.journal}
      width="wide"
      ariaLabelledBy="journal-heading"
      containerClassName="flex flex-col gap-14"
    >
      <SectionHeading
        id="journal-heading"
        eyebrow="From the Journal"
        title="Notes on Light, Gear & Fieldcraft"
        description="Long-form posts about how the work actually gets made — planning, lighting, and the unglamorous parts nobody films."
      />

      <motion.ul
        variants={staggerContainerTight}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {latestPosts.map((post) => (
          <motion.li key={post.id} variants={fadeInUp}>
            <BlogCard post={post} />
          </motion.li>
        ))}
      </motion.ul>

      <Reveal className="flex justify-center">
        <LinkButton to={ROUTES.blog} variant="secondary" size="lg">
          Read the Journal
          <ArrowRight aria-hidden="true" className="size-4" />
        </LinkButton>
      </Reveal>
    </Section>
  );
}
