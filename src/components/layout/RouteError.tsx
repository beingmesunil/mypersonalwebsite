import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import { Container } from '../ui/Container';
import { LinkButton } from '../ui/LinkButton';

/** Route-level error boundary — keeps the shell branded when something fails. */
export function RouteError() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : 'Something Went Wrong';

  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 py-40 text-center">
      <p className="text-xs tracking-[0.4em] text-accent uppercase">Unexpected Error</p>
      <h1 className="text-display-md text-ink">{title}</h1>
      <p className="max-w-md leading-relaxed text-subtle">
        The page could not be displayed. Reloading usually fixes it — if it does not, please get in
        touch and I will look into it.
      </p>
      <LinkButton to={ROUTES.home} size="lg">
        Back to Home
      </LinkButton>
    </Container>
  );
}
