'use client';

import { useEffect, useRef } from 'react';
import { focusRing, type CancelInfo } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  cancelInfo: CancelInfo;
}

export default function CancelDialog({ open, onClose, cancelInfo }: Props) {
  const keepRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      prevRef.current = document.activeElement as HTMLElement | null;
      keepRef.current?.focus();
    } else {
      prevRef.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onClose}
      />
      <div className="relative w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Cancel your subscription?
        </h2>
        <p className="mt-3 text-[13px] text-[#16233E]">
          Your plan runs until {cancelInfo.accessUntil}. On that date:
        </p>
        <ul className="mt-2 space-y-1.5">
          {cancelInfo.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-[13px] text-[#16233E]"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5D6C8A] shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4 bg-[#F3F6FC] rounded-[12px] p-3">
          <p className="text-[13px] text-[#5D6C8A]">
            Nothing is deleted. Your catalogs, products, renders and leads stay
            exactly as they are. If you subscribe again you get access back,
            but catalogs stay unpublished until you publish them again
            yourself.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={keepRef}
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Keep my plan
          </button>
          <button
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Cancel subscription
          </button>
        </div>
      </div>
    </div>
  );
}