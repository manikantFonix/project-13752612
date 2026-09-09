'use client';

import { FOCUS_RING } from './data';
import FloatingPanel from './FloatingPanel';

export type DesignState =
  | 'front-generating'
  | 'front-failed'
  | 'front-only'
  | 'angles-generating'
  | 'chain-failed'
  | 'ready'
  | 'one-draft'
  | 'three-drafts'
  | 'older-draft'
  | 'locked'
  | 'refine-dialog'
  | 'angles-confirm';

const OPTIONS: { value: DesignState; label: string }[] = [
  { value: 'front-generating', label: 'Front generating' },
  { value: 'front-failed', label: 'Front failed' },
  { value: 'front-only', label: 'Front only' },
  { value: 'angles-generating', label: 'Angles generating' },
  { value: 'chain-failed', label: 'Chain failed' },
  { value: 'ready', label: 'Ready' },
  { value: 'one-draft', label: 'One draft' },
  { value: 'three-drafts', label: 'Three drafts' },
  { value: 'older-draft', label: 'Older draft' },
  { value: 'locked', label: 'Locked' },
  { value: 'refine-dialog', label: 'Refine dialog' },
  { value: 'angles-confirm', label: 'Angles confirm' },
];

interface Props {
  state: DesignState | null;
  onChange: (s: DesignState) => void;
}

export default function DesignStateControl({ state, onChange }: Props) {
  return (
    <FloatingPanel
      title="Design state"
      icon="ri-palette-line"
      hint="Ctrl+Alt+P"
      position="left"
    >
      <div className="flex flex-wrap gap-1.5 px-1.5">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              state === o.value
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </FloatingPanel>
  );
}