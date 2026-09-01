import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { CallToActionSection, PageHero } from '@/components/sections';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';
import { Section } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes';
import { portfolioItems } from '@/data';
import { useStructuredData } from '@/hooks/useStructuredData';
import { buildBreadcrumbSchema } from '@/utils/seo';

const breadcrumbs = buildBreadcrumbSchema([
  { name: 'Home', path: ROUTES.home },
  { name: 'Portfolio', path: ROUTES.portfolio },
]);

export default function PortfolioPage() {
  useStructuredData(breadcrumbs, 'ld-portfolio-breadcrumbs');

  return (
    <PageTransition>
      <Seo
        title="Portfolio"
        description="The complete archive: landscape, portrait, wildlife, travel and street photography from thirteen years of assignments across 37 countries."
        path={ROUTES.portfolio}
      />

      <PageHero
        eyebrow="The Archive"
        title="Every Frame, Filterable"
        description="Fifteen selected series across five disciplines. Filter by category, then open any image full screen — arrow keys move between frames."
      />

      <Section width="wide" className="pt-0">
        <PortfolioGallery items={portfolioItems} />
      </Section>

      <CallToActionSection />
    </PageTransition>
  );
}
