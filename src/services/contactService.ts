import { SUBMIT_LATENCY_MS } from '@/constants/validation';
import type { ContactRequest, ContactResponse } from '@/types';

/**
 * Sends a contact request.
 *
 * The demo build resolves locally so the form is fully functional without a
 * backend. Point `VITE_CONTACT_ENDPOINT` at your API (Formspree, Resend, a
 * serverless function…) and the same call posts JSON to it instead.
 */
export async function submitContactRequest(payload: ContactRequest): Promise<ContactResponse> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_LATENCY_MS));

    return {
      success: true,
      message: 'Thank you — your message is on its way. I usually reply within one working day.',
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact request failed with status ${response.status}`);
  }

  return {
    success: true,
    message: 'Thank you — your message is on its way. I usually reply within one working day.',
  };
}
