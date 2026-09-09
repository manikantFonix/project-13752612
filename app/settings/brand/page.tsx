import { ThemeProvider } from '../../../components/settings/theme/ThemeProvider';
import BrandSettingsRoute from '../../../components/settings-brand/BrandSettingsRoute';

export default function BrandPage() {
  return (
    <ThemeProvider>
      <BrandSettingsRoute />
    </ThemeProvider>
  );
}