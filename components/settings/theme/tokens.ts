import type { CSSProperties } from 'react';

export const lightTokens = {
  canvas: '#EDF1FA',
  surface: '#FFFFFF',
  muted: '#F3F6FC',
  text: '#16233E',
  textSec: '#5D6C8A',
  mutedText: '#748AB4',
  border: '#DCE3F0',
  borderStrong: '#C6D0E6',
  success: '#3D6B54',
  alert: '#A8552A',
  alertStrong: '#91441E',
  accent: '#152E56',
  accentHover: '#172D54',
  onAccent: '#FFFFFF',
  trackOn: '#152E56',
  trackOff: '#C6D0E6',
  knob: '#FFFFFF',
  focus: '#152E56',
};

export const darkTokens = {
  canvas: '#10151E',
  surface: '#181E2A',
  muted: '#2B3446',
  text: '#E4E9F1',
  textSec: '#AFB9CA',
  mutedText: '#AFB9CA',
  border: '#363F4E',
  borderStrong: '#407CDD',
  success: '#40966B',
  alert: '#D06835',
  alertStrong: '#D06835',
  accent: '#407CDD',
  accentHover: '#407CDD',
  onAccent: '#10151E',
  trackOn: '#407CDD',
  trackOff: '#2B3446',
  knob: '#E4E9F1',
  focus: '#407CDD',
};

export function varsFor(dark: boolean): CSSProperties {
  const t = dark ? darkTokens : lightTokens;
  return {
    '--canvas': t.canvas,
    '--surface': t.surface,
    '--muted': t.muted,
    '--text': t.text,
    '--text-sec': t.textSec,
    '--muted-text': t.mutedText,
    '--border': t.border,
    '--border-strong': t.borderStrong,
    '--success': t.success,
    '--alert': t.alert,
    '--alert-strong': t.alertStrong,
    '--accent': t.accent,
    '--accent-hover': t.accentHover,
    '--on-accent': t.onAccent,
    '--track-on': t.trackOn,
    '--track-off': t.trackOff,
    '--knob': t.knob,
    '--focus': t.focus,
  } as CSSProperties;
}

export const focusRingVar =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]';