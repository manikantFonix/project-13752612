'use client';

import { focusRing, type Purchase, type TopUpPack } from './data';

interface Props {
  packs: TopUpPack[];
  purchases: Purchase[];
  emptyHistory: boolean;
}

export default function TopUpCard({ packs, purchases, emptyHistory }: Props) {
  return (
    <section
      id="top-up"
      className="bg-white border border-[#DCE3F0] rounded-[12px] p-5"
    >
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
        Buy more renders
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {packs.map((p) => (
          <div
            key={p.size}
            className="bg-white border border-[#DCE3F0] hover:border-[#C6D0E6] rounded-[12px] p-5 text-center transition-colors duration-150"
          >
            <p className="text-[26px] font-semibold text-[#16233E] tabular-nums">
              {p.size}
            </p>
            <p className="text-[13px] text-[#5D6C8A]">renders</p>
            <p className="mt-2 text-[15px] font-medium text-[#16233E] tabular-nums">
              ${p.price}
            </p>
            <button
              className={`mt-4 w-full h-9 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-[#5D6C8A]">
        Top-up renders are used after your included allowance runs out, oldest
        pack first. They expire if your subscription ends.
      </p>
      <div className="my-5 h-px bg-[#DCE3F0]" />
      <p className="text-[13px] font-medium text-[#5D6C8A]">Purchase history</p>
      {emptyHistory ? (
        <p className="mt-3 text-[13px] text-[#5D6C8A]">
          You haven't bought any top-up packs yet.
        </p>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-[1fr_140px_150px_120px] items-center gap-4 px-2 h-9 border-b border-[#DCE3F0]">
            <span className="text-[13px] font-medium text-[#5D6C8A]">
              Purchased
            </span>
            <span className="text-[13px] font-medium text-[#5D6C8A]">Pack</span>
            <span className="text-[13px] font-medium text-[#5D6C8A]">
              Remaining
            </span>
            <span className="text-[13px] font-medium text-[#5D6C8A] text-right">
              Paid
            </span>
          </div>
          {purchases.map((p) => (
            <div
              key={`${p.date}-${p.pack}`}
              className="grid grid-cols-[1fr_140px_150px_120px] items-center gap-4 px-2 py-3 border-b border-[#DCE3F0] last:border-b-0"
            >
              <p className="text-[13px] text-[#5D6C8A]">{p.date}</p>
              <p className="text-[13px] text-[#16233E]">{p.pack} renders</p>
              <p className="text-[13px] text-[#16233E] tabular-nums">
                {p.remaining} of {p.pack}
              </p>
              <p className="text-[13px] text-[#16233E] tabular-nums text-right">
                ${p.paid}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}