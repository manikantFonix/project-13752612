'use client';

import StateSwitcherPanel from '../ui/StateSwitcherPanel';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
}

export default function PreviewControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <StateSwitcherPanel
      title="Preview state"
      hint="Switch how this settings page looks"
      groups={[{ options: options.map((o) => ({ value: o.value, label: o.label })) }]}
      active={(v) => value === v}
      onSelect={(v) => onChange(v as T)}
    />
  );
}