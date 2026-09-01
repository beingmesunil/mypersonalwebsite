import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useCountUp } from './useCountUp';

describe('useCountUp', () => {
  it('starts at zero', () => {
    const { result } = renderHook(() => useCountUp({ end: 480 }));

    expect(result.current).toBe(0);
  });

  it('stays at zero until it is enabled', async () => {
    const { result } = renderHook(() => useCountUp({ end: 480, enabled: false, durationMs: 0 }));

    await act(async () => {});

    expect(result.current).toBe(0);
  });

  it('jumps straight to the final value when the duration is zero', async () => {
    const { result } = renderHook(() => useCountUp({ end: 480, durationMs: 0 }));

    await act(async () => {});

    expect(result.current).toBe(480);
  });
});
