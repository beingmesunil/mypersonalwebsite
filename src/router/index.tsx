import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { RouteError } from '@/components/layout/RouteError';
import { ROUTES } from '@/constants/routes';

/**
 * Every page is code-split: the browser downloads a route's chunk only when the
 * visitor navigates to it.
 */
const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/HomePage')).default }),
      },
      {
        path: ROUTES.portfolio,
        lazy: async () => ({ Component: (await import('@/pages/PortfolioPage')).default }),
      },
      {
        path: ROUTES.about,
        lazy: async () => ({ Component: (await import('@/pages/AboutPage')).default }),
      },
      {
        path: ROUTES.services,
        lazy: async () => ({ Component: (await import('@/pages/ServicesPage')).default }),
      },
      {
        path: ROUTES.blog,
        lazy: async () => ({ Component: (await import('@/pages/BlogPage')).default }),
      },
      {
        path: ROUTES.blogPost,
        lazy: async () => ({ Component: (await import('@/pages/BlogPostPage')).default }),
      },
      {
        path: ROUTES.contact,
        lazy: async () => ({ Component: (await import('@/pages/ContactPage')).default }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).default }),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
