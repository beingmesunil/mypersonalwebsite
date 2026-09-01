import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { AboutSection, CallToActionSection, PageHero } from '@/components/sections';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export default function AboutPage() {
  return (
    <PageTransition>
      <Seo
        title="About"
        description={`Meet ${SITE.photographer} — the story, the mission and the numbers behind ${SITE.name}.`}
        path={ROUTES.about}
      />

      <PageHero eyebrow="The Photographer" title={SITE.photographer} description={SITE.intro} />

      <AboutSection />
      <CallToActionSection />
    </PageTransition>
  );
}
