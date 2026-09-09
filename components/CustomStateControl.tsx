'use client';

import type { LibraryState } from './DesignLibrary';
import StateSwitcherPanel from './ui/StateSwitcherPanel';

export type CustomState =
  | 'default'
  | 'type-selected'
  | 'ready'
  | 'more-expanded'
  | 'attachment'
  | 'has-sketch'
  | 'voice'
  | 'low-balance'
  | 'video-refused'
  | 'generating'
  | 'library-empty'
  | 'library-loading'
  | 'library-error';

const states: CustomState[] = [
  'default',
  'type-selected',
  'ready',
  'more-expanded',
  'attachment',
  'has-sketch',
  'voice',
  'low-balance',
  'video-refused',
  'generating',
  'library-empty',
  'library-loading',
  'library-error',
];

const label = (s: CustomState) =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

interface Props {
  state: CustomState;
  onChange: (s: CustomState) => void;
}

export default function CustomStateControl({ state, onChange }: Props) {
  return (
    <StateSwitcherPanel
      title="Design state"
      icon="ri-brush-3-line"
      hint="Switch how the design tool looks"
      groups={[{ options: states.map((s) => ({ value: s, label: label(s) })) }]}
      active={(v) => state === v}
      onSelect={(v) => onChange(v as CustomState)}
    />
  );
}

export type { LibraryState };