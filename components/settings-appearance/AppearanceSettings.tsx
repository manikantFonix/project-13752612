'use client';

import { useTheme, type ThemeChoice } from '../settings/theme/ThemeProvider';
import { focusRingVar } from '../settings/theme/tokens';

const options: {
  value: ThemeChoice;
  name: string;
  desc: string;
  canvas: string;
  bar: string;
  bar2: string;
  line: string;
}[] = [
  {
    value: 'light',
    name: 'Light',
    desc: 'The default.',
    canvas: '#EDF1FA',
    bar: '#FFFFFF',
    bar2: '#152E56',
    line: '#DCE3F0',
  },
  {
    value: 'dark',
    name: 'Dark',
    desc: 'Easier in a dim room.',
    canvas: '#10151E',
    bar: '#181E2A',
    bar2: '#407CDD',
    line: '#363F4E',
  },
  {
    value: 'system',
    name: 'Follow my system',
    desc: 'Matches your device setting.',
    canvas: '#EDF1FA',
    bar: '#FFFFFF',
    bar2: '#152E56',
    line: '#DCE3F0',
  },
];

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[var(--text)]">Appearance</h2>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        How this app looks on this device.
      </p>

      <div
        role="radiogroup"
        aria-label="Appearance theme"
        className="mt-5 flex flex-wrap gap-4"
      >
        {options.map((o) => {
          const selected = theme === o.value;
          const cardId = `appearance-${o.value}`;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              id={cardId}
              aria-checked={selected}
              onClick={() => setTheme(o.value)}
              className={`w-[200px] text-left rounded-[12px] p-4 transition-colors duration-150 ${focusRingVar} ${
                selected
                  ? 'border-2 border-[var(--accent)] bg-[var(--muted)]'
                  : 'border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div
                aria-hidden="true"
                className="h-[120px] rounded-[8px] flex gap-2 p-2"
                style={{ background: o.canvas }}
              >
                <div
                  className="w-[28px] rounded-[4px]"
                  style={{ background: o.bar2 }}
                />
                <div className="flex-1 flex flex-col gap-2">
                  <div
                    className="h-3 rounded-[3px] w-2/3"
                    style={{ background: o.bar }}
                  />
                  <div
                    className="h-3 rounded-[3px] w-full"
                    style={{ background: o.line }}
                  />
                </div>
              </div>
              <div className="mt-3 text-[13px] font-medium text-[var(--text)]">
                {o.name}
              </div>
              <div className="mt-0.5 text-[12px] text-[var(--text-sec)]">{o.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 max-w-[720px] space-y-1">
        <p className="text-[13px] text-[var(--text-sec)]">
          This only changes the app. Your shared catalog, your PDFs and the links
          you send customers always look the same to them.
        </p>
        <p className="text-[13px] text-[var(--text-sec)]">
          The render review area stays dark in both, so metal color always looks
          the same when you're judging it.
        </p>
      </div>
    </div>
  );
}