'use client';

import { useEffect, useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

interface Props {
  open: boolean;
  customerName: string;
  outcome: 'approved' | 'rejected';
  onConfirm: () => void;
  onClose: () => void;
}

export default function RecordDecisionDialog({
  open,
  customerName,
  outcome,
  onConfirm,
  onClose,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    cancelRef.current?.focus();
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
        aria-labelledby="record-title"
        className="relative w-full max-w-[460px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 id="record-title" className="text-[18px] font-semibold text-[#16233E]">
          Record that {customerName}{' '}
          {outcome === 'approved' ? 'approved' : 'rejected'} this design?
        </h2>
        <p className="mt-2 text-[13px] text-[#5D6C8A] leading-relaxed">
          This locks the design at the current version, exactly as if{' '}
          {customerName} had approved through the link.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            ref={cancelRef}
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Keep recording
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              outcome === 'approved'
                ? 'text-white bg-[#152E56] border-[#152E56] hover:bg-[#172D54]'
                : 'text-[#A8552A] bg-white border-[#A8552A] hover:text-[#91441E] hover:border-[#91441E]'
            }`}
          >
            Record {outcome}
          </button>
        </div>
      </div>
    </div>
  );
}