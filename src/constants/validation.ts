/** Field limits shared by the Zod schema and the form's helper text. */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  subjectMin: 4,
  subjectMax: 120,
  messageMin: 20,
  messageMax: 1200,
  emailMax: 254,
} as const;

/** Simulated network latency for the demo submission handler, in milliseconds. */
export const SUBMIT_LATENCY_MS = 900;
