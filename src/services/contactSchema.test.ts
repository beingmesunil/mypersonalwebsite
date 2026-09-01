import { describe, expect, it } from 'vitest';

import { CONTACT_LIMITS } from '@/constants/validation';

import { contactSchema } from './contactSchema';

const validRequest = {
  name: 'Elena Marsh',
  email: 'elena@example.com',
  subject: 'Wedding in September',
  message: 'We are getting married in the highlands and would love to talk about coverage.',
};

describe('contactSchema', () => {
  it('accepts a well-formed enquiry', () => {
    expect(contactSchema.safeParse(validRequest).success).toBe(true);
  });

  it('rejects a malformed email address', () => {
    const result = contactSchema.safeParse({ ...validRequest, email: 'elena@' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(['email']);
  });

  it('rejects a message that is too short', () => {
    const result = contactSchema.safeParse({ ...validRequest, message: 'Hi' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain(String(CONTACT_LIMITS.messageMin));
  });

  it('trims surrounding whitespace', () => {
    const result = contactSchema.safeParse({ ...validRequest, name: '  Elena Marsh  ' });

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe('Elena Marsh');
  });

  it('rejects an empty submission', () => {
    const result = contactSchema.safeParse({ name: '', email: '', subject: '', message: '' });

    const fieldsWithIssues = new Set(result.error?.issues.map((issue) => issue.path[0]));

    expect(result.success).toBe(false);
    expect(fieldsWithIssues).toEqual(new Set(['name', 'email', 'subject', 'message']));
  });
});
