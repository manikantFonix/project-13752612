'use client';

import { useEffect, useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelDialog({ open, onClose, onConfirm }: Props) {
  const keepRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef, keepRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    keepRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-[#16233E]/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        className="relative w-full max-w-[460px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2
          id="cancel-title"
          className="text-[18px] font-semibold text-[#16233E]"
        >
          Cancel this request?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E] leading-relaxed">
          The request stops here and can't be reopened. The design, its versions
          and everything on the record are kept.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            ref={keepRef}
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Keep it
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel request
          </button>
        </div>
      </div>
    </div>
  );
}