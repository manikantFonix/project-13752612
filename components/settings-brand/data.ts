export type BrandState =
  | 'default'
  | 'noLogo'
  | 'noContact'
  | 'logoType'
  | 'logoSize'
  | 'logoDims'
  | 'nameEmpty'
  | 'colorPass'
  | 'colorFail'
  | 'saving'
  | 'failed'
  | 'loading';

export interface BrandPreset {
  name: string;
  hex: string;
}

export const presets: BrandPreset[] = [
  { name: 'Navy', hex: '#152E56' },
  { name: 'Charcoal', hex: '#2B2B2B' },
  { name: 'Teal', hex: '#0F5257' },
  { name: 'Forest', hex: '#1F5137' },
  { name: 'Burgundy', hex: '#6B2233' },
  { name: 'Plum', hex: '#5A2A5E' },
  { name: 'Bronze', hex: '#6B4A1F' },
  { name: 'Rust', hex: '#8A3A18' },
];

export interface BrandValues {
  brandName: string;
  email: string;
  phone: string;
  color: string;
  logo: string | null;
}

export const demoLogo =
  'https://readdy.ai/api/search-image?query=elegant%20minimalist%20gold%20jewelry%20brand%20logo%20emblem%20on%20a%20plain%20white%20background%2C%20simple%20refined%20serif%20monogram%20letterform%20in%20a%20badge%20shape%2C%20clean%20vector%20mark%2C%20soft%20neutral%20tones%2C%20high%20detail&width=400&height=140&seq=92&orientation=landscape';

export const baseline: BrandValues = {
  brandName: 'Harlowe & Wren',
  email: 'studio@harlowewren.com',
  phone: '+44 20 7946 0958',
  color: '#152E56',
  logo: demoLogo,
};

export function initialValues(state: BrandState): BrandValues {
  const base: BrandValues = {
    brandName: 'Harlowe & Wren',
    email: 'studio@harlowewren.com',
    phone: '+44 20 7946 0958',
    color: '#152E56',
    logo: demoLogo,
  };
  switch (state) {
    case 'noLogo':
    case 'logoType':
    case 'logoSize':
    case 'logoDims':
      return { ...base, logo: null };
    case 'noContact':
      return { ...base, email: '', phone: '' };
    case 'nameEmpty':
      return { ...base, brandName: '' };
    case 'colorPass':
      return { ...base, color: '#274061' };
    case 'colorFail':
      return { ...base, color: '#C6CFE0' };
    default:
      return base;
  }
}

export type LogoRefusal = 'type' | 'size' | 'dims' | null;

export const refusalFor = (state: BrandState): LogoRefusal =>
  state === 'logoType'
    ? 'type'
    : state === 'logoSize'
    ? 'size'
    : state === 'logoDims'
    ? 'dims'
    : null;

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const full =
    h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return 0;
  const f = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return (
    0.2126 * f(parseInt(full.slice(0, 2), 16) / 255) +
    0.7152 * f(parseInt(full.slice(2, 4), 16) / 255) +
    0.0722 * f(parseInt(full.slice(4, 6), 16) / 255)
  );
}

export function isHex(v: string): boolean {
  return /^#?[0-9a-fA-F]{3}$/.test(v.trim()) || /^#?[0-9a-fA-F]{6}$/.test(v.trim());
}

export function normalizeHex(v: string): string | null {
  const cleaned = v.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return '#' + cleaned.split('').map((c) => c + c).join('');
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return '#' + cleaned.toUpperCase();
  }
  return null;
}

export function contrastVsWhite(hex: string): number {
  const L = luminance(hex);
  return 1.05 / (L + 0.05);
}

export const brandStateOptions: { value: BrandState; label: string }[] = [
  { value: 'default', label: 'Everything set' },
  { value: 'noLogo', label: 'No logo' },
  { value: 'noContact', label: 'No contact details' },
  { value: 'logoType', label: 'Logo — bad type' },
  { value: 'logoSize', label: 'Logo — too large' },
  { value: 'logoDims', label: 'Logo — too small' },
  { value: 'nameEmpty', label: 'Empty brand name' },
  { value: 'colorPass', label: 'Custom color passes' },
  { value: 'colorFail', label: 'Custom color fails' },
  { value: 'saving', label: 'Saving' },
  { value: 'failed', label: 'Save failed' },
  { value: 'loading', label: 'Loading' },
];

export const loadingBar =
  'h-4 rounded-full bg-[#E4E9F4] animate-pulse';