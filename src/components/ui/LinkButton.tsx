import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { getButtonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles';

interface LinkButtonProps {
  readonly to: string;
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly external?: boolean;
  readonly ariaLabel?: string;
}

/** A `<Link>` (or external anchor) that looks exactly like a `<Button>`. */
export function LinkButton({
  to,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  ariaLabel,
}: LinkButtonProps) {
  const classes = getButtonClasses(variant, size, className);

  if (external) {
    return (
      <a
        href={to}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
