import { Aperture } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { cn } from '@/utils/cn';

interface LogoProps {
  readonly className?: string;
  readonly onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to={ROUTES.home}
      onClick={onClick}
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={`${SITE.name} — home`}
    >
      <Aperture
        aria-hidden="true"
        className="size-7 text-accent transition-transform duration-700 ease-cinematic group-hover:rotate-90"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide text-ink">{SITE.name}</span>
        <span className="text-[0.6rem] tracking-[0.32em] text-subtle uppercase">
          {SITE.photographer}
        </span>
      </span>
    </Link>
  );
}
