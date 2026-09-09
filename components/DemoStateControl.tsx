'use client';

import type { DemoState } from './CatalogPage';
import StateSwitcherPanel from './ui/StateSwitcherPanel';

interface Props {
  state: DemoState;
  onChange: (state: DemoState) => void;
}

const states: DemoState[] = ['default', 'loading', 'empty', 'error'];

export default function DemoStateControl({ state, onChange }: Props) {
  return (
    <StateSwitcherPanel
      title="Preview state"
      hint="Switch how the catalog page looks"
      groups={[{ options: states.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })) }]}
      active={(v) => state === v}
      onSelect={(v) => onChange(v as DemoState)}
    />
  );
}