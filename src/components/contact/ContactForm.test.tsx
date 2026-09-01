import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type * as ServicesModule from '@/services';

import { ContactForm } from './ContactForm';

vi.mock('@/services', async (importOriginal) => {
  const actual = await importOriginal<typeof ServicesModule>();

  return {
    ...actual,
    submitContactRequest: vi.fn().mockResolvedValue({ success: true, message: 'Message sent.' }),
  };
});

const { submitContactRequest } = await import('@/services');

async function fillValidForm() {
  await userEvent.type(screen.getByLabelText(/name/i), 'Elena Marsh');
  await userEvent.type(screen.getByLabelText(/email/i), 'elena@example.com');
  await userEvent.type(screen.getByLabelText(/subject/i), 'Wedding in September');
  await userEvent.type(
    screen.getByLabelText(/message/i),
    'We are getting married in the highlands and would love to talk about coverage.',
  );
}

describe('ContactForm', () => {
  it('blocks submission and reports validation errors for an empty form', async () => {
    render(<ContactForm />);

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
    expect(submitContactRequest).not.toHaveBeenCalled();
  });

  it('rejects a malformed email address', async () => {
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'elena@');
    await userEvent.tab();

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it('submits valid values and confirms success', async () => {
    render(<ContactForm />);
    await fillValidForm();

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() =>
      expect(submitContactRequest).toHaveBeenCalledWith({
        name: 'Elena Marsh',
        email: 'elena@example.com',
        subject: 'Wedding in September',
        message: 'We are getting married in the highlands and would love to talk about coverage.',
      }),
    );

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });
});
