import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { contactSchema, submitContactRequest, type ContactFormValues } from '@/services';

import { Button } from '../ui/Button';
import { TextAreaField } from '../ui/TextAreaField';
import { TextField } from '../ui/TextField';

type SubmitState = { status: 'idle' } | { status: 'success' | 'error'; message: string };

const GENERIC_ERROR =
  'Something went wrong sending your message. Please try again, or email me directly.';

/** Accessible, fully validated enquiry form (React Hook Form + Zod). */
export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: 'idle' });

    try {
      const response = await submitContactRequest(values);
      setSubmitState({ status: 'success', message: response.message });
      reset();
    } catch {
      setSubmitState({ status: 'error', message: GENERIC_ERROR });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Name"
          placeholder="Your full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextField
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <TextField
        label="Subject"
        placeholder="Wedding in September, editorial commission…"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <TextAreaField
        label="Message"
        placeholder="Tell me about the shoot: dates, location, and what matters most to you."
        rows={6}
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" isLoading={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Message'}
          {!isSubmitting ? <Send aria-hidden="true" className="size-4" /> : null}
        </Button>

        <p className="text-xs text-subtle">Typical reply time: one working day.</p>
      </div>

      {/* Submission feedback is announced to assistive technology */}
      <div aria-live="polite" role="status">
        {submitState.status === 'success' ? (
          <p className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
            <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
            {submitState.message}
          </p>
        ) : null}

        {submitState.status === 'error' ? (
          <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {submitState.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
