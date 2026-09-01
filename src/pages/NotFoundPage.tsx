import { ArrowLeft } from 'lucide-react';

import { PageTransition } from '@/components/layout/PageTransition';
import { Seo } from '@/components/layout/Seo';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/LinkButton';
import { ROUTES } from '@/constants/routes';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <Seo
        title="Page Not Found"
        description="The page you were looking for has moved or never existed."
        path="/404"
        noIndex
      />

      <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 py-40 text-center">
        <p className="text-xs tracking-[0.4em] text-accent uppercase">Error 404</p>
        <h1 className="text-display-lg text-ink">This Frame Was Never Developed</h1>
        <p className="max-w-md leading-relaxed text-subtle">
          The page you were looking for has moved, or the link was mistyped. The portfolio is still
          exactly where you left it.
        </p>
        <LinkButton to={ROUTES.home} size="lg">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Home
        </LinkButton>
      </Container>
    </PageTransition>
  );
}
