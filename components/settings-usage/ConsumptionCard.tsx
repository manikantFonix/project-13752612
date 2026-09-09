import { type ConsumptionRow } from './data';

export default function ConsumptionCard({ rows }: { rows: ConsumptionRow[] }) {
  const total = rows.reduce((s, r) => s + r.count, 0);

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Where your renders went
        </h2>
        <span className="text-[13px] text-[#5D6C8A]">This period</span>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-[1fr_110px] items-center gap-4 px-2 h-9 border-b border-[#DCE3F0]">
          <span className="text-[13px] font-medium text-[#5D6C8A]">Cause</span>
          <span className="text-[13px] font-medium text-[#5D6C8A] text-right">
            Renders
          </span>
        </div>
        {rows.map((r) => (
          <div
            key={r.cause}
            className={`grid grid-cols-[1fr_110px] items-center gap-4 px-2 py-2.5 border-b border-[#DCE3F0] last:border-b-0 ${
              r.highlighted ? 'bg-[#F3F6FC]' : ''
            }`}
          >
            <div>
              <p className="text-[13px] text-[#16233E]">{r.cause}</p>
              <p className="text-[12px] text-[#5D6C8A]">{r.subline}</p>
            </div>
            <p className="text-[13px] font-medium text-[#16233E] tabular-nums text-right">
              {r.count}
            </p>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_110px] items-center gap-4 px-2 pt-3">
          <span className="text-[13px] font-semibold text-[#16233E]">Total</span>
          <span className="text-[13px] font-semibold text-[#16233E] tabular-nums text-right">
            {total}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[13px] text-[#5D6C8A] max-w-[760px]">
        Repairs are the ones you can't predict. When a render doesn't match your
        photograph the system corrects it and rechecks, and each attempt costs a
        render. That's why a product quoted at least 12 can end up costing more.
      </p>
    </section>
  );
}