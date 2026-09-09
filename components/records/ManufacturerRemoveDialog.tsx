'use client';

import { useEffect, useRef } from 'react';
import { CUSTOMER_FOCUS_RING, type RecordItem } from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';

interface Props {
  open: boolean;
  record: RecordItem;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ManufacturerRemoveDialog({ open, record, onClose, onConfirm }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16233E]/30"
      role="dialog"
      aria-modal="true"
      aria-label="Remove manufacturer"
    >
      <div ref={cardRef} className="w-[440px] bg-white border border-[#DCE3F0] rounded-[16px] p-8 text-center">
        <span className="mx-auto w-14 h-14 rounded-full bg-[#FCF0F0] flex items-center justify-center text-[#C0392B]">
          <i className="ri-building-2-line text-[24px] w-7 h-7 flex items-center justify-center" />
        </span>
        <h2 className="mt-4 text-[18px] font-semibold text-[#16233E]">
          Remove Manufacturer?
        </h2>
        <p className="mt-2 text-[13px] text-[#5D6C8A] leading-relaxed">
          Are you sure you want to remove <span className="text-[#16233E] font-medium">{record.name}</span> from your
          manufacturer list? This action cannot be undone.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`h-11 px-8 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-[10px] hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-11 px-8 text-[13px] font-medium text-white bg-[#D63031] border border-[#D63031] rounded-[10px] hover:bg-[#C0392B] hover:border-[#C0392B] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}