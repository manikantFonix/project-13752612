import { ThemeProvider } from '../../../components/settings/theme/ThemeProvider';
import NotificationsSettingsRoute from '../../../components/settings-notifications/NotificationsSettingsRoute';

export default function NotificationsPage() {
  return (
    <ThemeProvider>
      <NotificationsSettingsRoute />
    </ThemeProvider>
  );
}