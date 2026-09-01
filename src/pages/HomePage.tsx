import { Seo } from '@/components/layout/Seo';
import { PageTransition } from '@/components/layout/PageTransition';
import {
  AboutSection,
  BlogPreviewSection,
  ContactSection,
  FeaturedWorkSection,
  HeroSection,
  ServicesSection,
  TestimonialsSection,
} from '@/components/sections';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export default function HomePage() {
  return (
    <PageTransition>
      <Seo
        title={`${SITE.photographer} — ${SITE.name}`}
        description={SITE.shortDescription}
        path={ROUTES.home}
      />

      <HeroSection />
      <FeaturedWorkSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ContactSection />
    </PageTransition>
  );
}
