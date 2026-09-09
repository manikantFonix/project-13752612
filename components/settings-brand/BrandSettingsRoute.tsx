'use client';

import { useState } from 'react';
import SettingsLayout from '../settings/SettingsLayout';
import SettingsShell from '../settings/SettingsShell';
import BrandSettings from './BrandSettings';
import PreviewControl from '../settings/PreviewControl';
import { brandStateOptions, type BrandState } from './data';

export default function BrandSettingsRoute() {
  const [state, setState] = useState<BrandState>('default');

  return (
    <SettingsShell>
      <SettingsLayout>
        <BrandSettings key={state} state={state} />
      </SettingsLayout>
      <PreviewControl options={brandStateOptions} value={state} onChange={setState} />
    </SettingsShell>
  );
}