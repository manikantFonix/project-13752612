'use client';

import SettingsShell from '../settings/SettingsShell';
import SettingsLayout from '../settings/SettingsLayout';
import AppearanceSettings from './AppearanceSettings';
import PreviewControl from '../settings/PreviewControl';
import { appearanceOptions } from './data';
import { useTheme } from '../settings/theme/ThemeProvider';

export default function AppearanceSettingsRoute() {
  const { theme, setTheme } = useTheme();

  return (
    <SettingsShell>
      <SettingsLayout>
        <AppearanceSettings />
      </SettingsLayout>
      <PreviewControl options={appearanceOptions} value={theme} onChange={setTheme} />
    </SettingsShell>
  );
}