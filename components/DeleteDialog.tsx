'use client';

import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  count?: number;
}

export default function DeleteDialog({ open, onCancel, onConfirm, count }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const n = count && count > 1 ? count : 1;

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onCancel}
      />
      <div className="relative w-[460px] bg-white border border-[#DCE3F0] rounded-[12px] p-6">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#16233E]">
          {n > 1
            ? `Delete these ${n} products permanently?`
            : 'Delete this product permanently?'}
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E] leading-relaxed">
          Their photographs and all generated images will be removed. This
          can't be undone.
        </p>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">
          Any inquiries about these products will still be readable in your
          lead inbox.
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-9 px-4 text-[13px] font-medium text-white bg-[#A8552A] border border-[#A8552A] rounded-full hover:bg-[#91441E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Delete permanently
          </button>
        </div>
      </div>
    </div>
  );
}