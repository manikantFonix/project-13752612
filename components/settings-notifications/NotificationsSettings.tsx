'use client';

import { useState } from 'react';
import Link from 'next/link';
import Switch from './Switch';
import { initialPrefs, type ChannelPref, type NotifEvent, type NotifPreview } from './data';
import { focusRingVar } from '../settings/theme/tokens';

const channelMeta = [
  { key: 'inApp', label: 'In the app' },
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' },
];

export default function NotificationsSettings({ preview }: { preview: NotifPreview }) {
  const [prefs, setPrefs] = useState<Record<string, NotifEvent>>(() =>
    initialPrefs(preview)
  );
  const failed = preview === 'failed';
  const [saveMsg, setSaveMsg] = useState('');

  const runSave = () => {
    if (failed) {
      setSaveMsg('');
      return;
    }
    setSaveMsg('Saving…');
    window.setTimeout(() => {
      setSaveMsg('Saved');
      window.setTimeout(() => setSaveMsg(''), 1800);
    }, 700);
  };

  const toggle = (id: string, channel: string) => {
    setPrefs((p) =>
      p.map((ev) => {
        if (ev.id !== id) return ev;
        const col = ev[channel as keyof NotifEvent] as ChannelPref;
        return { ...ev, [channel]: { ...col, on: !col.on } } as NotifEvent;
      })
    );
    runSave();
  };

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[var(--text)]">Notifications</h2>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Choose how you hear about things. You'll always see everything in the app.
      </p>

      {failed && (
        <p className="mt-5 text-[13px] text-[var(--alert)]">
          We couldn't save that. Nothing has changed — try again.
        </p>
      )}

      <div className="mt-5 max-w-[720px]">
        <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] overflow-hidden">
          <div className="grid grid-cols-[1fr_96px_96px_96px] items-center h-11 px-4 border-b border-[var(--border)]">
            <div />
            {channelMeta.map((c) => (
              <div
                key={c.key}
                className="text-right text-[13px] font-medium text-[var(--text-sec)]"
              >
                {c.label}
              </div>
            ))}
          </div>

          <div className="divide-y divide-[var(--border)]">
            {prefs.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-[1fr_96px_96px_96px] items-center px-4 min-h-[72px]"
              >
                <div>
                  <div className="text-[13px] font-medium text-[var(--text)]">
                    {e.name}
                  </div>
                  <div className="mt-0.5 text-[12px] text-[var(--text-sec)]">
                    {e.desc}
                  </div>
                </div>
                {channelMeta.map((c) => {
                  const col = e[c.key as keyof NotifEvent] as ChannelPref;
                  return (
                    <div
                      key={c.key}
                      className="flex flex-col items-end justify-center gap-1"
                    >
                      <Switch
                        checked={col.on}
                        locked={col.locked}
                        disabled={failed}
                        onChange={() => toggle(e.id, c.key)}
                        label={`${c.label} for ${e.name}`}
                      />
                      {col.locked && (
                        <span className="text-[12px] text-[var(--text-sec)]">
                          Always on
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="p-3">
            <div className="bg-[var(--muted)] rounded-[12px] p-3 space-y-1">
              <p className="text-[12px] text-[var(--text-sec)]">
                You'll always see these in the app, so nothing gets lost if an
                email or text doesn't arrive.
              </p>
              <p className="text-[12px] text-[var(--text-sec)]">
                Billing emails can't be switched off. If a payment fails and you
                miss the notice, your published catalogs go offline — that's too
                big to be silenced by a setting.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-4 max-w-[720px] flex flex-wrap items-center gap-3">
        <p className="text-[13px] text-[var(--text-sec)]">
          Emails go to the address on your account. Texts go to the phone number
          on your account.
        </p>
        <Link
          href="/settings/brand"
          className={`h-9 px-4 text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${focusRingVar}`}
        >
          Change these
        </Link>
      </div>

      <span aria-live="polite" className="sr-only">
        {saveMsg ? `Notifications ${saveMsg.toLowerCase()}.` : ''}
      </span>
    </div>
  );
}