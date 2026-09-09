import { ThemeProvider } from '../../../components/settings/theme/ThemeProvider';
import TeamSettingsRoute from '../../../components/settings-team/TeamSettingsRoute';

export default function TeamPage() {
  return (
    <ThemeProvider>
      <TeamSettingsRoute />
    </ThemeProvider>
  );
}