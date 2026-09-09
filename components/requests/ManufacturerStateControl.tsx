'use client';

import { FOCUS_RING } from './data';
import FloatingPanel from './FloatingPanel';

export type MfrScenario =
  | 'before-approval'
  | 'nothing-sent'
  | 'sent'
  | 'one-pending'
  | 'three-pending'
  | 'one-quote-two-pending'
  | 'three-quotes'
  | 'one-declined'
  | 'recorded-quote'
  | 'approved'
  | 'in-production'
  | 'completed';

const OPTIONS: { value: MfrScenario; label: string }[] = [
  { value: 'before-approval', label: 'Before approval' },
  { value: 'nothing-sent', label: 'Nothing sent' },
  { value: 'sent', label: 'Manufacturers sent' },
  { value: 'one-pending', label: 'One pending' },
  { value: 'three-pending', label: 'Three pending' },
  { value: 'one-quote-two-pending', label: 'One quote, two pending' },
  { value: 'three-quotes', label: 'Three quotes' },
  { value: 'one-declined', label: 'One declined' },
  { value: 'recorded-quote', label: 'Recorded quote' },
  { value: 'approved', label: 'One approved, two not selected' },
  { value: 'in-production', label: 'In production' },
  { value: 'completed', label: 'Completed' },
];

interface Props {
  scenario: MfrScenario;
  onChange: (s: MfrScenario) => void;
  saveFails: boolean;
  onSaveFails: (v: boolean) => void;
}

export default function ManufacturerStateControl({
  scenario,
  onChange,
  saveFails,
  onSaveFails,
}: Props) {
  return (
    <FloatingPanel
      title="Manufacturer state"
      icon="ri-building-4-line"
      hint="Ctrl+Alt+M"
      position="left"
    >
      <div className="flex flex-wrap gap-1.5 px-1.5">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              scenario === o.value
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-pressed={saveFails}
        onClick={() => onSaveFails(!saveFails)}
        className={`mt-1 h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
          saveFails ? 'bg-[#A8552A] text-white' : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
        }`}
      >
        Save the decision fails
      </button>
    </FloatingPanel>
  );
}