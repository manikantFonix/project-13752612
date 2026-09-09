'use client';

import { FOCUS_RING } from './data';
import FloatingPanel from './FloatingPanel';

export type CustomerScenario =
  | 'no-customer'
  | 'send-dialog-open'
  | 'not-shared'
  | 'waiting'
  | 'expired'
  | 'approved-customer'
  | 'approved-retailer'
  | 'rejected-customer'
  | 'rejected-retailer';

const OPTIONS: { value: CustomerScenario; label: string }[] = [
  { value: 'no-customer', label: 'No customer' },
  { value: 'send-dialog-open', label: 'Send dialog' },
  { value: 'not-shared', label: 'Added, not shared' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'expired', label: 'Expired' },
  { value: 'approved-customer', label: 'Approved by customer' },
  { value: 'approved-retailer', label: 'Approved by retailer' },
  { value: 'rejected-customer', label: 'Rejected by customer' },
  { value: 'rejected-retailer', label: 'Rejected by retailer' },
];

interface Props {
  scenario: CustomerScenario;
  onChange: (s: CustomerScenario) => void;
  saveFails: boolean;
  onSaveFails: (v: boolean) => void;
}

export default function CustomerStateControl({
  scenario,
  onChange,
  saveFails,
  onSaveFails,
}: Props) {
  return (
    <FloatingPanel
      title="Customer state"
      icon="ri-user-3-line"
      hint="Ctrl+Alt+C"
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