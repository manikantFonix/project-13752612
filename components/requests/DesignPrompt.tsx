'use client';

import { useState } from 'react';
import { FOCUS_RING, statusLabel, type Request } from './data';

const STATUS_ACCENT: Record<string, string> = {
  Draft: 'text-[#5D6C8A] bg-[#EDF1FA]',
  Ready: 'text-[#152E56] bg-[#F3F6FC]',
  'Sent to Customer': 'text-[#A8552A] bg-white border border-[#A8552A]',
  Approved: 'text-[#3D6B54] bg-[#E8F1EC]',
  'Sent to Manufacturer': 'text-[#5D6C8A] bg-[#F3F6FC]',
  Completed: 'text-[#16233E] bg-[#F3F6FC]',
};

const CATEGORY_ICON: Record<string, string> = {
  Ring: 'ri-vip-crown-line',
  Pendant: 'ri-sparkling-2-line',
  Earring: 'ri-sparkling-line',
  Necklace: 'ri-sword-line',
  Bracelet: 'ri-refund-2-line',
};

interface Props {
  req: Request;
}

export default function DesignPrompt({ req }: Props) {
  const [open, setOpen] = useState(false);
  const status = statusLabel[req.status];
  const icon = CATEGORY_ICON[req.category] ?? 'ri-sparkling-2-line';
  const words = req.description.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="border border-[#DCE3F0] rounded-[12px] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full px-4 py-3 flex items-center justify-between text-left gap-3 ${FOCUS_RING}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 shrink-0 rounded-[12px] bg-[#E4E9F4] flex items-center justify-center">
            <i className="ri-magic-line text-[18px] w-5 h-5 flex items-center justify-center text-[#5D6C8A]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#16233E]">
              Design prompt
            </p>
            <p className="truncate text-[12px] text-[#5D6C8A]">
              The brief this design was drawn from
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`hidden sm:inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center whitespace-nowrap ${STATUS_ACCENT[status]}`}>
            {status}
          </span>
          <span className="inline-flex h-6 px-2.5 rounded-full text-[11px] font-medium items-center whitespace-nowrap bg-[#F3F6FC] text-[#5D6C8A]">
            {req.category}
          </span>
          <i
            className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A] transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[#DCE3F0]">
          <div className="pt-3 flex items-start gap-3">
            <span className="w-8 h-8 shrink-0 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center">
              <i className={`${icon} text-[17px] w-5 h-5 flex items-center justify-center text-[#5D6C8A]`} />
            </span>
            <p className="text-[13px] leading-relaxed text-[#16233E]">
              {req.description}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="flex flex-col rounded-[12px] bg-[#F3F6FC] border border-[#DCE3F0] px-3 py-2.5">
              <span className="text-[11px] text-[#5D6C8A]">Design no.</span>
              <span className="mt-0.5 text-[13px] font-semibold text-[#16233E] tabular-nums">
                {req.designNo}
              </span>
            </span>
            <span className="flex flex-col rounded-[12px] bg-[#F3F6FC] border border-[#DCE3F0] px-3 py-2.5">
              <span className="text-[11px] text-[#5D6C8A]">Created</span>
              <span className="mt-0.5 text-[13px] font-semibold text-[#16233E] text-ellipsis overflow-hidden whitespace-nowrap">
                {req.createdFull}
              </span>
            </span>
            <span className="flex flex-col rounded-[12px] bg-[#F3F6FC] border border-[#DCE3F0] px-3 py-2.5">
              <span className="text-[11px] text-[#5D6C8A]">Word count</span>
              <span className="mt-0.5 text-[13px] font-semibold text-[#16233E] tabular-nums">
                {words} words
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}