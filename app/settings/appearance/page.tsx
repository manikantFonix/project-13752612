import { ThemeProvider } from '../../../components/settings/theme/ThemeProvider';
import AppearanceSettingsRoute from '../../../components/settings-appearance/AppearanceSettingsRoute';

export default function AppearancePage() {
  return (
    <ThemeProvider>
      <AppearanceSettingsRoute />
    </ThemeProvider>
  );
}