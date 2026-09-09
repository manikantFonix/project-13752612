'use client';

import { useState } from 'react';
import SettingsShell from '../settings/SettingsShell';
import SettingsLayout from '../settings/SettingsLayout';
import NotificationsSettings from './NotificationsSettings';
import PreviewControl from '../settings/PreviewControl';
import type { NotifPreview } from './data';

const options: { value: NotifPreview; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'someOff', label: 'Several off' },
  { value: 'saving', label: 'Saving' },
  { value: 'failed', label: 'Save failed' },
];

export default function NotificationsSettingsRoute() {
  const [preview, setPreview] = useState<NotifPreview>('default');

  return (
    <SettingsShell>
      <SettingsLayout>
        <NotificationsSettings key={preview} preview={preview} />
      </SettingsLayout>
      <PreviewControl options={options} value={preview} onChange={setPreview} />
    </SettingsShell>
  );
}