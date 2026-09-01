import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('renders its label and defaults to type="button"', () => {
    render(<Button>Book a Session</Button>);

    const button = screen.getByRole('button', { name: 'Book a Session' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls the click handler', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and marked busy while loading', () => {
    render(<Button isLoading>Sending</Button>);

    const button = screen.getByRole('button', { name: /sending/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
