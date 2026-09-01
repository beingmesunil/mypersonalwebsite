import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MAIN_CONTENT_ID } from '@/constants/dom';
import { useStructuredData } from '@/hooks/useStructuredData';
import { buildOrganizationSchema } from '@/utils/seo';

import { BackToTop } from './BackToTop';
import { Footer } from './Footer';
import { Header } from './Header';
import { RouteFallback } from './RouteFallback';
import { ScrollToTop } from './ScrollToTop';
import { SkipLink } from './SkipLink';

const organizationSchema = buildOrganizationSchema();

/** Application shell shared by every route. */
export function RootLayout() {
  useStructuredData(organizationSchema, 'ld-organization');

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <SkipLink />
      <ScrollToTop />
      <Header />

      <main id={MAIN_CONTENT_ID} className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
