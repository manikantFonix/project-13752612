'use client';

export default function StatCard({
  icon,
  value,
  label,
  hint,
}: {
  icon: string;
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <div className="w-10 h-10 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A]">
        <i className={`${icon} text-[20px]`} />
      </div>
      <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[#16233E]">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-[#5D6C8A]">{label}</div>
      {hint && <div className="mt-1 text-[12px] text-[#5D6C8A]">{hint}</div>}
    </div>
  );
}