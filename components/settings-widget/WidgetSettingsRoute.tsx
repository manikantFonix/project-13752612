'use client';

import { useState } from 'react';
import SettingsLayout from '../settings/SettingsLayout';
import SettingsShell from '../settings/SettingsShell';
import WidgetSettings from './WidgetSettings';
import { previewGroups, type WidgetState } from './data';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

export default function WidgetSettingsRoute() {
  const [state, setState] = useState<WidgetState>('working');

  return (
    <SettingsShell>
      <SettingsLayout>
        <WidgetSettings state={state} />
      </SettingsLayout>
      <StateSwitcherPanel
        title="Preview state"
        icon="ri-flask-line"
        hint="Switch how the widget settings page looks"
        groups={previewGroups.map((g) => ({ label: g.group, options: g.items.map((p) => ({ value: p.value, label: p.label })) }))}
        active={(v) => state === v}
        onSelect={(v) => setState(v as WidgetState)}
      />
    </SettingsShell>
  );
}