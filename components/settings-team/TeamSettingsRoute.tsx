'use client';

import { useState } from 'react';
import SettingsLayout from '../settings/SettingsLayout';
import SettingsShell from '../settings/SettingsShell';
import TeamSettings from './TeamSettings';
import PreviewControl from '../settings/PreviewControl';
import { teamOptions, type TeamPreview } from './data';

export default function TeamSettingsRoute() {
  const [preview, setPreview] = useState<TeamPreview>('members');

  return (
    <SettingsShell>
      <SettingsLayout>
        <TeamSettings key={preview} preview={preview} />
      </SettingsLayout>
      <PreviewControl options={teamOptions} value={preview} onChange={setPreview} />
    </SettingsShell>
  );
}