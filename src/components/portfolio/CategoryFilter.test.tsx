import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CategoryFilter } from './CategoryFilter';

const counts = { all: 15, landscape: 3, portrait: 3, wildlife: 3, travel: 3, street: 3 };

describe('CategoryFilter', () => {
  it('exposes one tab per category plus "All Work"', () => {
    render(<CategoryFilter active="all" counts={counts} onChange={vi.fn()} />);

    expect(screen.getAllByRole('tab')).toHaveLength(6);
    expect(screen.getByRole('tab', { name: /all work/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('marks the active category as selected', () => {
    render(<CategoryFilter active="wildlife" counts={counts} onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: /wildlife/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /all work/i })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('reports the chosen category', async () => {
    const onChange = vi.fn();
    render(<CategoryFilter active="all" counts={counts} onChange={onChange} />);

    await userEvent.click(screen.getByRole('tab', { name: /portrait/i }));

    expect(onChange).toHaveBeenCalledWith('portrait');
  });
});
