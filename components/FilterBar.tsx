'use client';

import { useState } from 'react';
import Dropdown from './Dropdown';

export interface Filters {
  category: string | null;
  status: string | null;
  renderState: string | null;
}

export const emptyFilters: Filters = {
  category: null,
  status: null,
  renderState: null,
};

const CATEGORIES = [
  'Ring',
  'Necklace',
  'Pendant',
  'Earring',
  'Bracelet',
  'Body jewelry',
  'Brooch',
  'Grillz',
  'Watch',
  'Bail',
  'Clasp',
  'Buckle',
  'Cufflink',
];

const STATUSES = ['Active', 'Inactive'];

const RENDER_STATES = ['Complete', 'Generating', 'Flagged'];

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const applied =
    filters.category !== null ||
    filters.status !== null ||
    filters.renderState !== null;

  const trigger = (active: boolean, label: string) => (
    <button
      onClick={() => setOpen((o) => (o === label ? null : label))}
      className={`h-9 px-3 text-[13px] font-medium border rounded-full flex items-center gap-2 transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
        active
          ? 'border-[#152E56] text-[#152E56] bg-white'
          : 'border-[#DCE3F0] text-[#5D6C8A] bg-white hover:border-[#C6D0E6]'
      }`}
    >
      {label}
      <span
        className={`w-4 h-4 flex items-center justify-center text-[16px] ${
          open === label ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
        }`}
      />
    </button>
  );

  return (
    <div className="flex items-center gap-2">
      <Dropdown
        open={open === 'Category'}
        onToggle={(o) => setOpen(o ? 'Category' : null)}
        trigger={trigger(filters.category !== null, 'Category')}
        panelClass="w-[220px] max-h-72 overflow-auto"
      >
        <button
          onClick={() => {
            onChange({ ...filters, category: null });
            setOpen(null);
          }}
          className="w-full text-left px-3 h-9 text-[13px] text-[#5D6C8A] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          All categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => {
              onChange({ ...filters, category: c });
              setOpen(null);
            }}
            className="w-full text-left px-3 h-9 text-[13px] text-[#16233E] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            {c}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        open={open === 'Status'}
        onToggle={(o) => setOpen(o ? 'Status' : null)}
        trigger={trigger(filters.status !== null, 'Status')}
        panelClass="w-[180px]"
      >
        <button
          onClick={() => {
            onChange({ ...filters, status: null });
            setOpen(null);
          }}
          className="w-full text-left px-3 h-9 text-[13px] text-[#5D6C8A] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          Any status
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => {
              onChange({ ...filters, status: s });
              setOpen(null);
            }}
            className="w-full text-left px-3 h-9 text-[13px] text-[#16233E] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            {s}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        open={open === 'Render state'}
        onToggle={(o) => setOpen(o ? 'Render state' : null)}
        trigger={trigger(filters.renderState !== null, 'Render state')}
        panelClass="w-[220px]"
      >
        <button
          onClick={() => {
            onChange({ ...filters, renderState: null });
            setOpen(null);
          }}
          className="w-full text-left px-3 h-9 text-[13px] text-[#5D6C8A] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          Any render state
        </button>
        {RENDER_STATES.map((s) => (
          <button
            key={s}
            onClick={() => {
              onChange({ ...filters, renderState: s });
              setOpen(null);
            }}
            className="w-full text-left px-3 h-9 text-[13px] text-[#16233E] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            {s}
          </button>
        ))}
      </Dropdown>

      {applied && (
        <button
          onClick={() => onChange(emptyFilters)}
          className="ml-1 h-9 px-2 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}