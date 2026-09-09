'use client';

import { useState } from 'react';

export interface SwitchOption {
  value: string;
  label: string;
}

export interface SwitchGroup {
  label?: string;
  options: SwitchOption[];
}

interface Props {
  title?: string;
  icon?: string;
  hint?: string;
  groups: SwitchGroup[];
  active: (value: string) => boolean;
  onSelect: (value: string) => void;
  position?: 'left' | 'right';
}

const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export default function StateSwitcherPanel({
  title = 'Preview state',
  icon = 'ri-flask-line',
  hint = 'Switch between scenarios',
  groups,
  active,
  onSelect,
  position = 'right',
}: Props) {
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const pos = position === 'left' ? 'left-6' : 'right-6';

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className={`fixed bottom-6 ${pos} z-50 h-9 px-3 rounded-full bg-white border border-[#DCE3F0] flex items-center gap-2 text-[13px] font-medium text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap ${ring}`}
      >
        <span className="w-4 h-4 flex items-center justify-center text-[#5D6C8A]">
          <i className={`${icon} text-[16px]`} />
        </span>
        {title}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 ${pos} z-50 w-[min(388px,calc(100vw-32px))] bg-white border border-[#DCE3F0] rounded-[16px]`}
    >
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#DCE3F0]">
        <span className="w-6 h-6 rounded-full bg-[#EDF1FA] flex items-center justify-center text-[#5D6C8A]">
          <i className={`${icon} text-[14px] w-3.5 h-3.5 flex items-center justify-center`} />
        </span>
        <span className="flex-1 text-[13px] font-semibold text-[#16233E]">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Minimise preview controls"
          title="Minimise"
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${ring}`}
        >
          <i className="ri-eye-off-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse preview panel' : 'Expand preview panel'}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${ring}`}
        >
          <i
            className={`ri-arrow-up-s-line text-[16px] w-4 h-4 flex items-center justify-center transition-transform duration-150 ${
              open ? '' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="p-2.5 max-h-[56vh] overflow-y-auto">
          {groups.map((g, gi) => (
            <div key={g.label ?? gi} className={gi > 0 ? 'mt-3' : ''}>
              {g.label && (
                <div className="px-1.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#748AB4]">
                  {g.label}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const isActive = active(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => onSelect(o.value)}
                      aria-pressed={isActive}
                      className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${ring} ${
                        isActive
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

      <div className="px-3 py-1.5 border-t border-[#DCE3F0]">
        <span className="text-[11px] text-[#748AB4]">{hint}</span>
      </div>
    </div>
  );
}