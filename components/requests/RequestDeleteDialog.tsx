'use client';

import { useEffect, useRef } from 'react';
import type { Request } from './data';
import { FOCUS_RING } from './data';

interface Props {
  open: boolean;
  request: Request | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function RequestDeleteDialog({
  open,
  request,
  onCancel,
  onConfirm,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

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

  if (!open || !request) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onCancel}
      />
      <div className="relative w-[460px] bg-white border border-[#DCE3F0] rounded-[12px] p-6">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Delete {request.designNo} permanently?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E] leading-relaxed">
          This removes the request, its {request.category} design and all the
          photographs and generated renders on it. This can't be undone.
        </p>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">
          Any replies already linked to this request will still be readable in
          your lead inbox.
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className={`px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`h-9 px-4 text-[13px] font-medium text-white bg-[#A8552A] border border-[#A8552A] rounded-full hover:bg-[#91441E] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 ${FOCUS_RING}`}
          >
            <i className="ri-delete-bin-6-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            Delete permanently
          </button>
        </div>
      </div>
    </div>
  );
}