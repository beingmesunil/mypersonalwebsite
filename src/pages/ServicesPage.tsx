import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { CallToActionSection, PageHero, ServicesSection } from '@/components/sections';
import { ROUTES } from '@/constants/routes';
import { services } from '@/data';
import { useStructuredData } from '@/hooks/useStructuredData';
import { buildServiceSchema } from '@/utils/seo';

const serviceSchema = buildServiceSchema(services);

export default function ServicesPage() {
  useStructuredData(serviceSchema, 'ld-services');

  return (
    <PageTransition>
      <Seo
        title="Services & Pricing"
        description="Wedding, portrait, commercial and travel photography — scopes, deliverables and starting prices for every service."
        path={ROUTES.services}
      />

      <PageHero
        eyebrow="Working Together"
        title="Services & Pricing"
        description="Four ways to work with the studio. Every project includes pre-production planning, hand-edited delivery and a clear licence."
      />

      <ServicesSection />
      <CallToActionSection />
    </PageTransition>
  );
}
