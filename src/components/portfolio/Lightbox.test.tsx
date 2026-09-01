import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { portfolioItems } from '@/data';

import { Lightbox } from './Lightbox';

const items = portfolioItems.slice(0, 3);

describe('Lightbox', () => {
  it('renders nothing while closed', () => {
    render(<Lightbox items={items} index={null} onClose={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes an accessible dialog for the open image', () => {
    render(<Lightbox items={items} index={0} onClose={vi.fn()} onNavigate={vi.fn()} />);

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: items[0].title })).toBeInTheDocument();
    expect(screen.getByText(`1 / ${items.length}`)).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(<Lightbox items={items} index={1} onClose={onClose} onNavigate={vi.fn()} />);

    await userEvent.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('navigates with the arrow keys and wraps around', async () => {
    const onNavigate = vi.fn();
    const { unmount } = render(
      <Lightbox items={items} index={0} onClose={vi.fn()} onNavigate={onNavigate} />,
    );

    await userEvent.keyboard('{ArrowRight}');
    expect(onNavigate).toHaveBeenLastCalledWith(1);

    await userEvent.keyboard('{ArrowLeft}');
    expect(onNavigate).toHaveBeenLastCalledWith(items.length - 1);

    unmount();
  });

  it('navigates with the on-screen controls', async () => {
    const onNavigate = vi.fn();
    render(<Lightbox items={items} index={0} onClose={vi.fn()} onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole('button', { name: /next image/i }));

    expect(onNavigate).toHaveBeenCalledWith(1);
  });
});
