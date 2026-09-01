import { useId, type InputHTMLAttributes, type Ref } from 'react';

import { cn } from '@/utils/cn';

import { FieldShell } from './FieldShell';
import { fieldClasses } from './fieldStyles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: string;
  readonly ref?: Ref<HTMLInputElement>;
}

/** Labelled text input wired for screen readers and React Hook Form. */
export function TextField({ label, error, className, id, ref, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <FieldShell label={label} fieldId={fieldId} error={error} errorId={errorId}>
      <input
        id={fieldId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses(Boolean(error)), className)}
        {...rest}
      />
    </FieldShell>
  );
}
