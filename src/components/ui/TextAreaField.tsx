import { useId, type Ref, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import { FieldShell } from './FieldShell';
import { fieldClasses } from './fieldStyles';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label: string;
  readonly error?: string;
  readonly ref?: Ref<HTMLTextAreaElement>;
}

export function TextAreaField({
  label,
  error,
  className,
  id,
  rows = 5,
  ref,
  ...rest
}: TextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <FieldShell label={label} fieldId={fieldId} error={error} errorId={errorId}>
      <textarea
        id={fieldId}
        ref={ref}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses(Boolean(error)), 'resize-y', className)}
        {...rest}
      />
    </FieldShell>
  );
}
