'use client';

import { useEffect, useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';
import type { MfrQuote } from './ManufacturerTab';

interface Props {
  open: boolean;
  manufacturerName: string;
  quote?: MfrQuote;
  otherCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ApproveQuoteDialog({
  open,
  manufacturerName,
  quote,
  otherCount,
  onConfirm,
  onClose,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
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
        aria-labelledby="approve-mfr-title"
        className="relative w-full max-w-[480px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 id="approve-mfr-title" className="text-[18px] font-semibold text-[#16233E]">
          Approve {manufacturerName}&#39;s quote?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E]">
          {quote
            ? `${'$' + quote.amount.toLocaleString('en-US')}${
                quote.deliveryDays !== undefined
                  ? `, ${quote.deliveryDays} days`
                  : ''
              }. Production starts with them.`
            : 'Production starts with them.'}
        </p>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">
          The other {otherCount}{' '}
          {otherCount === 1 ? 'manufacturer is' : 'manufacturers are'} closed out
          and their links stop working. Their quotes stay on the record.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            ref={cancelRef}
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
            Approve quote
          </button>
        </div>
      </div>
    </div>
  );
}