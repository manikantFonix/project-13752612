'use client';

import { useState } from 'react';
import CancelDialog from './CancelDialog';
import { focusRing, type CancelInfo, type Plan } from './data';

interface Props {
  plan: Plan;
  cancelInfo: CancelInfo;
}

export default function PlanCard({ plan, cancelInfo }: Props) {
  const [open, setOpen] = useState(false);
  const cancelling = plan.status === 'cancelling';

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
        Your plan
      </h2>
      <div className="mt-4 flex items-center gap-3">
        <p className="text-[18px] font-medium text-[#16233E]">{plan.name}</p>
        {cancelling ? (
          <span className="inline-flex items-center text-[13px] font-medium text-[#A8552A] border border-[#A8552A] rounded-full h-6 px-2.5 whitespace-nowrap">
            Cancels {plan.cancelDate}
          </span>
        ) : (
          <span className="inline-flex items-center text-[13px] font-medium text-[#3D6B54] bg-[#E8F1EC] rounded-full h-6 px-2.5 whitespace-nowrap">
            Active
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-[15px] text-[#16233E] tabular-nums">${plan.price}</p>
        <p className="text-[13px] text-[#5D6C8A]">{plan.interval}</p>
      </div>
      <div className="my-5 h-px bg-[#DCE3F0]" />
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-[12px] text-[#5D6C8A]">Billing period</p>
          <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
            {plan.billingPeriod}
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[#5D6C8A]">Included each period</p>
          <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
            {plan.includedRenders} renders
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[#5D6C8A]">
            {cancelling ? 'Access ends' : 'Next renewal'}
          </p>
          <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
            {plan.renewalDate}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => setOpen(true)}
          className={`text-[13px] font-medium text-[#A8552A] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
        >
          Cancel subscription
        </button>
      </div>
      <CancelDialog open={open} onClose={() => setOpen(false)} cancelInfo={cancelInfo} />
    </section>
  );
}