'use client';

import type { ReactNode } from 'react';

interface Props {
  selectedCount: number;
  onClear: () => void;
  onDone: () => void;
  onGeneratePdf: () => void;
  onDelete: () => void;
}

const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export default function ProductSelectionBar({
  selectedCount,
  onClear,
  onDone,
  onGeneratePdf,
  onDelete,
}: Props) {
  const empty = selectedCount === 0;
  return (
    <div className="mt-4 flex items-center justify-between gap-4 bg-[#152E56] text-white rounded-[12px] px-4 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
          <i className="ri-checkbox-multiple-line text-[16px] w-4 h-4 flex items-center justify-center" />
        </span>
        <span className="text-[13px] font-medium text-white tabular-nums whitespace-nowrap">
          {selectedCount} selected
        </span>
        <button
          onClick={onClear}
          disabled={empty}
          className="px-2 h-8 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56]"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onGeneratePdf}
          disabled={empty}
          className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56]"
        >
          <i className="ri-file-download-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
          Generate PDF
        </button>
        <button
          onClick={onDelete}
          disabled={empty}
          className="h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:bg-[#EDF1FA] hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56]"
        >
          <i className="ri-delete-bin-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
          Delete
        </button>
        <button
          onClick={onDone}
          className="px-3 h-9 text-[13px] font-medium text-white bg-white/10 border border-white/25 rounded-full hover:bg-white/20 transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56]"
        >
          Done
        </button>
      </div>
    </div>
  );
}