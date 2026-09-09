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

export default function CustomerRemoveDialog({ open, record, onClose, onConfirm }: Props) {
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
      aria-label="Remove client"
    >
      <div ref={cardRef} className="w-[420px] bg-white border border-[#DCE3F0] rounded-[12px] p-6">
        <h2 className="text-[18px] font-semibold text-[#16233E]">
          Remove {record.name}?
        </h2>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">
          This deletes the customer and all of their info from your records
          instantly. This can't be undone.
        </p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#5D6C8A] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-white bg-[#A8552A] border border-[#A8552A] rounded-full hover:bg-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
          >
            Yes, remove
          </button>
        </div>
      </div>
    </div>
  );
}