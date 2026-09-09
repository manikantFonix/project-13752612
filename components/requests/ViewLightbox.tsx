'use client';

import { useEffect, useRef } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING, VIEWS, type RequestVersion, type ViewKey } from './data';

interface Props {
  open: boolean;
  viewKey: ViewKey | null;
  image: string;
  versions: RequestVersion[];
  currentId: string;
  canSwitch: boolean;
  reason: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function ViewLightbox({
  open,
  viewKey,
  image,
  versions,
  currentId,
  canSwitch,
  reason,
  onSelect,
  onClose,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef, closeRef);

  useEffect(() => {
    if (!open) return;
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

  if (!open || !viewKey) return null;
  const label = VIEWS.find((v) => v.key === viewKey)?.label ?? '';
  const current = versions.find((v) => v.id === currentId);

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
        aria-label={`${label} view`}
        className="relative w-full max-w-[640px] bg-white border border-[#DCE3F0] rounded-[12px] p-6"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#EDF1FA] transition-colors duration-150 ${FOCUS_RING}`}
        >
          <i className="ri-close-line text-[18px] w-5 h-5 flex items-center justify-center" />
        </button>
        <p className="text-[13px] font-medium text-[#16233E]">{label}</p>
        <img
          src={image}
          alt={`${label} view`}
          className="mt-3 w-full aspect-square rounded-[12px] object-cover bg-[#E4E9F4]"
        />

        <div className="mt-5">
          <p className="text-[13px] font-medium text-[#5D6C8A]">
            Version history
          </p>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-webkit-scrollbar:none] [&::-webkit-scrollbar]:hidden">
            {versions.map((v) => {
              const isCurrent = v.id === currentId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => canSwitch && onSelect(v.id)}
                  disabled={!canSwitch}
                  className={`${FOCUS_RING} text-left ${canSwitch ? '' : 'cursor-default'}`}
                >
                  <img
                    src={image}
                    alt={`Version ${v.id}`}
                    className={`w-16 h-16 rounded-[8px] object-cover bg-[#E4E9F4] ${
                      isCurrent ? 'ring-2 ring-[#152E56] ring-offset-2 ring-offset-white' : ''
                    } ${canSwitch ? 'hover:opacity-80' : 'opacity-70'}`}
                  />
                  <p
                    className={`mt-1.5 text-[11px] whitespace-nowrap ${
                      isCurrent ? 'font-medium text-[#16233E]' : 'text-[#5D6C8A]'
                    }`}
                  >
                    {isCurrent ? 'Current' : v.date}
                  </p>
                </button>
              );
            })}
          </div>
          {!canSwitch && (
            <p className="mt-3 text-[13px] text-[#5D6C8A]">{reason}</p>
          )}
        </div>
      </div>
    </div>
  );
}