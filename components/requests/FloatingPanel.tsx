'use client';

import { useState } from 'react';
import { FOCUS_RING } from './data';
import { toggleDemoVisible } from '../../lib/demoVisibility';
import { useDemoVisible } from './useDemoVisible';

interface Props {
  title: string;
  icon: string;
  hint: string;
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export default function FloatingPanel({
  title,
  icon,
  hint,
  position = 'right',
  children,
}: Props) {
  const visible = useDemoVisible();
  const [open, setOpen] = useState(true);
  if (!visible) return null;

  const pos = position === 'left' ? 'left-6' : 'right-6';

  return (
    <div
      className={`fixed bottom-6 ${pos} z-40 flex flex-col w-[300px] bg-white border border-[#DCE3F0] rounded-[12px] p-1.5`}
    >
      <div className="flex items-center gap-2 h-9 px-1.5">
        <span className="w-5 h-5 flex items-center justify-center text-[#5D6C8A]">
          <i className={`${icon} text-[16px]`} />
        </span>
        <span className="flex-1 text-[13px] font-semibold text-[#16233E]">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse preview panel' : 'Expand preview panel'}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${FOCUS_RING}`}
        >
          <i
            className={`ri-arrow-up-s-line text-[16px] transition-transform duration-150 ${
              open ? '' : 'rotate-180'
            }`}
          />
        </button>
        <button
          type="button"
          onClick={toggleDemoVisible}
          aria-label="Hide preview controls"
          title={`Hide (${hint})`}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${FOCUS_RING}`}
        >
          <i className="ri-eye-off-line text-[16px]" />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 max-h-[52vh] overflow-y-auto pr-1">
          {children}
        </div>
      )}

      {open && (
        <div className="mt-1 px-1.5 pt-1.5 border-t border-[#DCE3F0]">
          <span className="text-[11px] text-[#5D6C8A]">
            {hint} to hide all preview controls
          </span>
        </div>
      )}
    </div>
  );
}