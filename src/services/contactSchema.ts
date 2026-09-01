import { z } from 'zod';

import { CONTACT_LIMITS } from '@/constants/validation';

/** Validation contract for the contact form — the single source of truth. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.nameMin, `Please enter at least ${CONTACT_LIMITS.nameMin} characters.`)
    .max(
      CONTACT_LIMITS.nameMax,
      `Please keep your name under ${CONTACT_LIMITS.nameMax} characters.`,
    ),
  email: z
    .string()
    .trim()
    .min(1, 'An email address is required.')
    .email('Please enter a valid email address.')
    .max(CONTACT_LIMITS.emailMax, 'That email address is too long.'),
  subject: z
    .string()
    .trim()
    .min(
      CONTACT_LIMITS.subjectMin,
      `Please describe your enquiry in at least ${CONTACT_LIMITS.subjectMin} characters.`,
    )
    .max(
      CONTACT_LIMITS.subjectMax,
      `Please keep the subject under ${CONTACT_LIMITS.subjectMax} characters.`,
    ),
  message: z
    .string()
    .trim()
    .min(
      CONTACT_LIMITS.messageMin,
      `Please tell me a little more — at least ${CONTACT_LIMITS.messageMin} characters.`,
    )
    .max(
      CONTACT_LIMITS.messageMax,
      `Please keep your message under ${CONTACT_LIMITS.messageMax} characters.`,
    ),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
