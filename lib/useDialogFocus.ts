'use client';

import { useEffect, useRef } from 'react';

export function useDialogFocus(
  open: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  initialFocus?: React.RefObject<HTMLElement | null>
) {
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => {
      const preferred = initialFocus?.current;
      if (preferred && containerRef.current?.contains(preferred)) {
        preferred.focus();
        return;
      }
      const first = containerRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
      );
      first?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;
      const els = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
        )
      );
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (!container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      prevFocus.current?.focus?.();
    };
  }, [open, containerRef, initialFocus]);
}