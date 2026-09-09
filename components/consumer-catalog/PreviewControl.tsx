'use client';

import StateSwitcherPanel from '../ui/StateSwitcherPanel';

export interface PreviewScenario {
  id: string;
  label: string;
}

export default function PreviewControl({
  label = 'Preview',
  scenarios,
  value,
  onChange,
}: {
  label?: string;
  scenarios: PreviewScenario[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <StateSwitcherPanel
      title={label}
      icon="ri-eye-line"
      hint="Switch how the customer sees this page"
      position="right"
      groups={[{ options: scenarios.map((s) => ({ value: s.id, label: s.label })) }]}
      active={(v) => value === v}
      onSelect={onChange}
    />
  );
}