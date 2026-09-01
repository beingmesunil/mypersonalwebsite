import { MotionConfig } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';

/**
 * `reducedMotion="user"` makes every Framer Motion animation respect the
 * operating-system accessibility preference automatically.
 */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
