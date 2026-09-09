'use client';

import { focusRing } from './data';

type BannerType = 'low' | 'exhausted' | 'payment';

interface Props {
  type: BannerType;
  onTopUp: () => void;
}

const copy: Record<BannerType, { title: string; body: string }> = {
  low: {
    title: 'Your render balance is running low.',
    body: 'About 3 more products left — 48 renders. At zero, the widget on your website stops generating for your customers.',
  },
  exhausted: {
    title: "You're out of renders.",
    body: "The widget on your website has stopped generating, and you can't add products or extend colors until you top up. Your catalogs stay published and nothing has been deleted.",
  },
  payment: {
    title: "We couldn't take payment for this period.",
    body: "Your access hasn't changed. Update your payment method to keep it that way.",
  },
};

export default function UsageBanner({ type, onTopUp }: Props) {
  const c = copy[type];
  return (
    <div className="w-full bg-white border border-[#A8552A] rounded-[12px] p-4 flex items-center justify-between gap-6">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[#A8552A]">{c.title}</p>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">{c.body}</p>
      </div>
      {type === 'payment' ? (
        <button
          className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap shrink-0 ${focusRing}`}
        >
          Update payment method
        </button>
      ) : (
        <button
          onClick={onTopUp}
          className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap shrink-0 ${focusRing}`}
        >
          Top up renders
        </button>
      )}
    </div>
  );
}