export type NotifPreview = 'default' | 'someOff' | 'saving' | 'failed';

export interface ChannelPref {
  locked: boolean;
  on: boolean;
}

export interface NotifEvent {
  id: string;
  name: string;
  desc: string;
  inApp: ChannelPref;
  email: ChannelPref;
  sms: ChannelPref;
}

export const events: NotifEvent[] = [
  {
    id: 'inquiry',
    name: 'New inquiry received',
    desc: 'Someone sent a request from your catalog or widget.',
    inApp: { locked: true, on: true },
    email: { locked: false, on: true },
    sms: { locked: false, on: true },
  },
  {
    id: 'renders',
    name: 'Renders finished',
    desc: 'A batch of product renders completed.',
    inApp: { locked: true, on: true },
    email: { locked: false, on: true },
    sms: { locked: false, on: false },
  },
  {
    id: 'flagged',
    name: 'Renders flagged',
    desc: "A render didn't match its photograph and needs new photos.",
    inApp: { locked: true, on: true },
    email: { locked: false, on: true },
    sms: { locked: false, on: false },
  },
  {
    id: 'balance',
    name: 'Render balance running low',
    desc: "You're close to running out of renders.",
    inApp: { locked: true, on: true },
    email: { locked: false, on: true },
    sms: { locked: false, on: true },
  },
  {
    id: 'billing',
    name: 'Subscription and billing',
    desc: 'Payments, renewals and anything about your plan.',
    inApp: { locked: true, on: true },
    email: { locked: true, on: true },
    sms: { locked: false, on: false },
  },
];

export function initialPrefs(preview: NotifPreview): NotifEvent[] {
  return events.map((e) => {
    let email = e.email;
    let sms = e.sms;
    if (preview === 'someOff') {
      if (e.id === 'renders') email = { ...email, on: false };
      if (e.id === 'flagged') email = { ...email, on: false };
      if (e.id === 'inquiry') sms = { ...sms, on: false };
    }
    return { ...e, email, sms };
  });
}