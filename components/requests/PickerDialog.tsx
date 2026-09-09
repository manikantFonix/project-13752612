'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

export interface PickOption {
  name: string;
  detail?: string;
}

interface Props {
  open: boolean;
  title: string;
  options: PickOption[];
  onSelect: (name: string) => void;
  onClose: () => void;
}

export default function PickerDialog({
  open,
  title,
  options,
  onSelect,
  onClose,
}: Props) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef, inputRef);

  useEffect(() => {
    if (!open) return;
    setQ('');
    inputRef.current?.focus();
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

  const noun = title.toLowerCase().includes('manufacturer')
    ? 'manufacturer'
    : 'customer';
  const filtered = options.filter((o) =>
    o.name.toLowerCase().includes(q.trim().toLowerCase())
  );

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
        aria-labelledby="picker-title"
        className="relative w-full max-w-[420px] bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden"
      >
        <div className="p-5 pb-0">
          <h2
            id="picker-title"
            className="text-[18px] font-semibold text-[#16233E]"
          >
            {title}
          </h2>
          <div className="relative mt-4">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A]" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className={`w-full h-10 pl-9 pr-3 text-[13px] text-[#16233E] bg-[#F3F6FC] border border-[#DCE3F0] rounded-full outline-none placeholder:text-[#5D6C8A] ${FOCUS_RING}`}
            />
          </div>
        </div>
        <div className="mt-3 max-h-[260px] overflow-y-auto px-3 pb-2">
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-[13px] text-[#16233E]">
              No matches.
            </p>
          )}
          {filtered.map((o) => (
            <button
              key={o.name}
              onClick={() => {
                onSelect(o.name);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-[8px] flex flex-col transition-colors duration-150 ${FOCUS_RING} hover:bg-[#EDF1FA]`}
            >
              <span className="text-[13px] font-medium text-[#16233E]">
                {o.name}
              </span>
              {o.detail && (
                <span className="text-[13px] text-[#5D6C8A]">{o.detail}</span>
              )}
            </button>
          ))}
        </div>
        <div className="border-t border-[#DCE3F0] p-2">
          <button
            onClick={() => onSelect('__create__')}
            className={`w-full text-left px-3 h-10 text-[13px] font-medium text-[#152E56] rounded-[8px] hover:bg-[#EDF1FA] transition-colors duration-150 ${FOCUS_RING}`}
          >
            Create a new {noun}
          </button>
        </div>
      </div>
    </div>
  );
}