'use client';

import { useState } from 'react';
import { RING } from './tokens';

interface Group {
  label?: string;
  options: { value: string; label: string }[];
}

export default function AuthStateControl({
  groups,
  value,
  onChange,
}: {
  groups: Group[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className={`fixed bottom-6 right-6 z-50 h-9 px-3 rounded-full bg-white border border-[#DCE3F0] flex items-center gap-2 text-[13px] font-medium text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap ${RING}`}
      >
        <span className="w-4 h-4 flex items-center justify-center text-[#5D6C8A]">
          <i className="ri-flask-line text-[16px]" />
        </span>
        Preview state
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(320px,calc(100vw-32px))] bg-white border border-[#DCE3F0] rounded-[16px] p-1">
      <div className="flex items-center gap-2 px-2.5 h-10">
        <span className="w-5 h-5 flex items-center justify-center text-[#5D6C8A]">
          <i className="ri-flask-line text-[16px]" />
        </span>
        <span className="flex-1 text-[13px] font-semibold text-[#16233E]">
          Preview state
        </span>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Minimise preview controls"
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${RING}`}
        >
          <i className="ri-eye-off-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse preview panel' : 'Expand preview panel'}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${RING}`}
        >
          <i
            className={`ri-arrow-up-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
              open ? '' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="p-2 max-h-[50vh] overflow-y-auto">
          {groups.map((g, gi) => (
            <div key={g.label ?? gi} className={gi > 0 ? 'mt-2.5' : ''}>
              {g.label && (
                <div className="px-1.5 mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#748AB4]">
                  {g.label}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const active = value === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => onChange(o.value)}
                      aria-pressed={active}
                      className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${RING} ${
                        active
                          ? 'bg-[#152E56] text-white'
                          : 'text-[#5D6C8A] hover:bg-[#EDF1FA] hover:text-[#16233E]'
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}