'use client';

import { useEffect, useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export default function AnglesConfirmDialog({ onClose, onConfirm }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(true, cardRef, cancelRef);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#16233E]/40" onClick={onClose} aria-hidden />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label="Generate the other angles"
        className="relative w-full max-w-[480px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 className="text-[20px] font-semibold text-[#16233E]">
          Generate the other angles?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E]">
          This makes the side, back and worn views, each in all three metal
          colors — nine images.
        </p>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">
          Uses at least 9 renders.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Generate angles
          </button>
        </div>
      </div>
    </div>
  );
}