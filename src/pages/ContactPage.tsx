import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { ContactSection, PageHero } from '@/components/sections';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export default function ContactPage() {
  return (
    <PageTransition>
      <Seo
        title="Contact"
        description={`Enquire about weddings, portraits, commercial and travel assignments with ${SITE.photographer}. Based in ${SITE.address.city}, available worldwide.`}
        path={ROUTES.contact}
      />

      <PageHero
        eyebrow="Say Hello"
        title="Start a Conversation"
        description="Weddings, editorial commissions, brand campaigns and expedition workshops. Tell me what you are planning and I will come back to you personally."
      />

      <ContactSection />
    </PageTransition>
  );
}
