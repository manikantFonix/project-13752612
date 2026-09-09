'use client';

export function SkeletonStat() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5 space-y-3">
      <div className="h-3 w-1/2 rounded-full bg-[#E4E9F4]" />
      <div className="h-7 w-16 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
    </div>
  );
}

export function SkeletonTable({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] divide-y divide-[#DCE3F0]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="h-3 flex-1 rounded-full bg-[#E4E9F4]" />
          <div className="h-3 w-16 rounded-full bg-[#E4E9F4]" />
          <div className="h-3 w-16 rounded-full bg-[#E4E9F4]" />
          <div className="h-3 w-16 rounded-full bg-[#E4E9F4]" />
        </div>
      ))}
    </div>
  );
}