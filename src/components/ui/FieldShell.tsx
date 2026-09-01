import type { ReactNode } from 'react';

interface FieldShellProps {
  readonly label: string;
  readonly fieldId: string;
  readonly error?: string;
  readonly errorId: string;
  readonly children: ReactNode;
}

/** Label + control + error message layout shared by every form field. */
export function FieldShell({ label, fieldId, error, errorId, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-xs font-medium tracking-[0.2em] text-subtle uppercase"
      >
        {label}
      </label>

      {children}

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
