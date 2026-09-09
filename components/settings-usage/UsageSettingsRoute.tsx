'use client';

import { useState } from 'react';
import SettingsLayout from '../settings/SettingsLayout';
import SettingsShell from '../settings/SettingsShell';
import UsageSettings from './UsageSettings';
import { type UsageState } from './data';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

const previews: { value: UsageState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'lowBalance', label: 'Low balance' },
  { value: 'exhausted', label: 'Exhausted' },
  { value: 'paymentFailed', label: 'Payment failed' },
  { value: 'cancelling', label: 'Cancelling' },
  { value: 'loading', label: 'Loading' },
  { value: 'emptyHistory', label: 'Empty history' },
  { value: 'error', label: 'Error' },
];

export default function UsageSettingsRoute() {
  const [preview, setPreview] = useState<UsageState>('default');

  return (
    <SettingsShell>
      <SettingsLayout>
        <UsageSettings state={preview} />
      </SettingsLayout>
      <StateSwitcherPanel
        title="Preview state"
        icon="ri-line-chart-line"
        hint="Switch how the plan page looks"
        groups={[{ options: previews.map((p) => ({ value: p.value, label: p.label })) }]}
        active={(v) => preview === v}
        onSelect={(v) => setPreview(v as UsageState)}
      />
    </SettingsShell>
  );
}