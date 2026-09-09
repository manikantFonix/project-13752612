export const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export type InstallStatus = 'waiting' | 'working' | 'dormant' | 'suspended';
export type ThemeStatus = 'notRead' | 'matched' | 'partial' | 'outdated' | 'neutral';

export type WidgetState =
  | 'waitingNoOrigins'
  | 'waitingWithOrigins'
  | 'working'
  | 'dormant'
  | 'suspended'
  | 'originsFull'
  | 'wildcardRefused'
  | 'duplicateRefused'
  | 'invalidRefused'
  | 'confirmRemoveLast'
  | 'snippetCopied'
  | 'rotateConfirm'
  | 'rotating'
  | 'themeNotRead'
  | 'themeMatched'
  | 'themePartial'
  | 'themeOutdated'
  | 'themeNeutral'
  | 'themeReReading'
  | 'reReadDisabled'
  | 'loading'
  | 'error';

export const defaultHosts = ['shop.example.com', 'www.example.com'];

export const fullHosts = Array.from({ length: 10 }, (_, i) => `shop${i}.example.com`);

export function originsFor(state: WidgetState): string[] {
  if (state === 'waitingNoOrigins') return [];
  if (state === 'originsFull') return fullHosts;
  if (state === 'confirmRemoveLast') return ['shop.example.com'];
  return defaultHosts;
}

export function installStatusFor(state: WidgetState): InstallStatus {
  if (state === 'working') return 'working';
  if (state === 'dormant') return 'dormant';
  if (state === 'suspended') return 'suspended';
  return 'waiting';
}

export const installCopy: Record<
  InstallStatus,
  { label: string; color: string; explanation: string }
> = {
  waiting: {
    label: 'Waiting to be installed',
    color: '#5D6C8A',
    explanation:
      "We haven't seen the widget load on your site yet. Paste the snippet in and it'll switch over on its own.",
  },
  working: {
    label: 'Working',
    color: '#3D6B54',
    explanation: 'Last seen 12 minutes ago.',
  },
  dormant: {
    label: 'Dormant',
    color: '#A8552A',
    explanation:
      "We haven't seen it load since 3 March. It may have been removed from your site, or the page it's on isn't getting visitors.",
  },
  suspended: {
    label: 'Suspended',
    color: '#A8552A',
    explanation:
      "This installation has been suspended and the widget isn't showing on your site. Get in touch with us.",
  },
};

export function themeStatusFor(state: WidgetState): ThemeStatus {
  if (state === 'themeNotRead') return 'notRead';
  if (state === 'themeMatched') return 'matched';
  if (state === 'themePartial') return 'partial';
  if (state === 'themeOutdated') return 'outdated';
  if (state === 'themeNeutral') return 'neutral';
  return 'matched';
}

export const themeCopy: Record<
  ThemeStatus,
  { label: string; color: string; explanation: string }
> = {
  notRead: {
    label: 'Not read yet',
    color: '#5D6C8A',
    explanation: "We'll read your site the first time the widget loads on it.",
  },
  matched: {
    label: 'Matched to your site',
    color: '#3D6B54',
    explanation: 'Read on 3 March.',
  },
  partial: {
    label: 'Using what we could read',
    color: '#5D6C8A',
    explanation:
      "Some of your site's styling came through and we filled in the rest. It looks complete to your customers.",
  },
  outdated: {
    label: 'Out of date',
    color: '#A8552A',
    explanation:
      "We couldn't re-read your site last time we tried. Your customers still see the version we already had, so nothing is broken.",
  },
  neutral: {
    label: 'Neutral',
    color: '#5D6C8A',
    explanation:
      "We couldn't read your site, so the widget uses its own plain styling. It's a complete look, not a broken one — your customers can't tell.",
  },
};

export function forcedRefusal(state: WidgetState): string | null {
  if (state === 'wildcardRefused')
    return "Wildcards aren't accepted. Add shop.example.com on its own line instead of *.example.com.";
  if (state === 'duplicateRefused') return "That's already on the list.";
  if (state === 'invalidRefused')
    return "That doesn't look like a website address. Try something like shop.example.com.";
  return null;
}

export const SNIPPET =
  '<script src="https://widget.craftsman.ai/embed.js" data-embed-key="cm_live_7f3a92b8c1" async></script>';

export const EMBED_KEY = 'cm_live_7f3a92b8c1';

export const previewGroups: {
  group: string;
  items: { value: WidgetState; label: string }[];
}[] = [
  {
    group: 'Install',
    items: [
      { value: 'waitingNoOrigins', label: 'Waiting · no origins' },
      { value: 'waitingWithOrigins', label: 'Waiting · with origins' },
      { value: 'working', label: 'Working' },
      { value: 'dormant', label: 'Dormant' },
      { value: 'suspended', label: 'Suspended' },
    ],
  },
  {
    group: 'Websites',
    items: [
      { value: 'originsFull', label: 'Ten listed' },
      { value: 'wildcardRefused', label: 'Wildcard refused' },
      { value: 'duplicateRefused', label: 'Duplicate refused' },
      { value: 'invalidRefused', label: 'Invalid refused' },
      { value: 'confirmRemoveLast', label: 'Last-origin confirm' },
    ],
  },
  {
    group: 'Snippet',
    items: [
      { value: 'snippetCopied', label: 'Copied' },
      { value: 'rotateConfirm', label: 'Rotate confirm' },
      { value: 'rotating', label: 'Rotating' },
    ],
  },
  {
    group: 'Theme',
    items: [
      { value: 'themeNotRead', label: 'Not read' },
      { value: 'themeMatched', label: 'Matched' },
      { value: 'themePartial', label: 'Partial' },
      { value: 'themeOutdated', label: 'Out of date' },
      { value: 'themeNeutral', label: 'Neutral' },
      { value: 'themeReReading', label: 'Re-reading' },
      { value: 'reReadDisabled', label: 'Re-read disabled' },
    ],
  },
  {
    group: 'Page',
    items: [
      { value: 'loading', label: 'Loading' },
      { value: 'error', label: 'Error' },
    ],
  },
];

export const STATUS_LABEL = {
  wildcardRefusal:
    "Wildcards aren't accepted. Add shop.example.com on its own line instead of *.example.com.",
  duplicateRefusal: "That's already on the list.",
  invalidRefusal:
    "That doesn't look like a website address. Try something like shop.example.com.",
  noOriginBlock:
    'Nothing will load yet. Add your website below before you paste in the snippet — until then every request is refused.',
  websitesDescription:
    'The widget only runs on the websites you list here. Anyone can copy the snippet out of your page source, so this list is what stops it being used somewhere else.',
  exactNote: 'Exact addresses only. Up to ten.',
  subdomainNote:
    "Subdomains aren't included automatically. If the widget also runs on www.example.com, add that too.",
  maxNote: "That's the maximum of ten. Remove one to add another.",
  keyNote:
    "This key is meant to be public — it's visible in your page source. Your list of websites is what keeps it safe.",
  rotateNote: 'Only do this if you think the key has been misused. It doesn\'t fix anything else.',
  reReadNote: 'It reads your site on its own from time to time. This just does it now.',
  reReadDisabledNote: 'We need to see the widget load on your site first.',
} as const;