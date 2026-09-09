import type { ThemeChoice } from '../settings/theme/ThemeProvider';

export type AppearancePreview = ThemeChoice;

export const appearanceOptions: { value: ThemeChoice; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Follow system' },
];