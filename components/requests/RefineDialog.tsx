'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

interface Props {
  hasAllAngles: boolean;
  onClose: () => void;
  onRefine: (text: string) => void;
}

export default function RefineDialog({ hasAllAngles, onClose, onRefine }: Props) {
  const [text, setText] = useState('');
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

  const empty = text.trim() === '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#16233E]/40" onClick={onClose} aria-hidden />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label="Refine this design"
        className="relative w-full max-w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 className="text-[20px] font-semibold text-[#16233E]">
          Refine this design
        </h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Say what to change — a wider band, a taller setting, fewer stones."
          className={`mt-4 w-full px-3 py-2.5 text-[13px] text-[#16233E] placeholder-[#5D6C8A] bg-white border border-[#DCE3F0] rounded-[12px] outline-none resize-none ${FOCUS_RING}`}
        />
        <p className="mt-2 text-[13px] text-[#5D6C8A]">
          {hasAllAngles
            ? 'Uses at least 12 renders.'
            : 'Uses at least 3 renders.'}
        </p>
        <p className="mt-1 text-[12px] text-[#5D6C8A]">
          This makes a new draft. The side, back and worn views are built from
          the front, so they're made again to match. Your previous draft is
          kept.
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
            disabled={empty}
            onClick={() => onRefine(text.trim())}
            className={`h-9 px-4 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${FOCUS_RING} ${
              empty
                ? 'text-[#5D6C8A] bg-[#EDF1FA] cursor-not-allowed'
                : 'text-white bg-[#152E56] hover:bg-[#172D54]'
            }`}
          >
            Refine
          </button>
        </div>
        {empty && (
          <p className="mt-2 text-[13px] text-[#5D6C8A]">
            Describe what to change to continue.
          </p>
        )}
      </div>
    </div>
  );
}