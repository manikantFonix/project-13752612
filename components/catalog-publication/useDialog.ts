'use client';

import { useEffect, type RefObject } from 'react';

export function useDismissOnEsc(
  open: boolean,
  close: () => void,
  disabled = false,
) {
  useEffect(() => {
    if (!open || disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, disabled]);
}

export function useReturnFocus(open: boolean, triggerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    return () => {
      triggerRef.current?.focus();
    };
  }, [open, triggerRef]);
}