import { type Balance } from './data';

export default function BalanceCard({ balance }: { balance: Balance }) {
  const pct =
    balance.allowanceTotal > 0
      ? Math.round((balance.allowanceRemaining / balance.allowanceTotal) * 100)
      : 0;

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
        Render balance
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-[#F3F6FC] rounded-[12px] p-4">
          <p className="text-[12px] text-[#5D6C8A]">Included allowance</p>
          <p className="mt-1 text-[26px] font-semibold text-[#16233E] tabular-nums">
            {balance.allowanceRemaining}
          </p>
          <p className="text-[13px] text-[#5D6C8A]">
            of {balance.allowanceTotal} this period
          </p>
          <div className="mt-3 h-1 rounded-[999px] bg-[#E4E9F4] overflow-hidden">
            <div
              className="h-full bg-[#152E56] rounded-[999px]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="bg-[#F3F6FC] rounded-[12px] p-4">
          <p className="text-[12px] text-[#5D6C8A]">Top-up packs</p>
          <p className="mt-1 text-[26px] font-semibold text-[#16233E] tabular-nums">
            {balance.topUpRemaining}
          </p>
          <p className="text-[13px] text-[#5D6C8A]">
            across {balance.topUpPacks}{' '}
            {balance.topUpPacks === 1 ? 'pack' : 'packs'}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-[#5D6C8A]">
        Your included allowance is used first, then top-up packs, oldest first.
        Unused included allowance doesn't carry into the next period.
      </p>
    </section>
  );
}