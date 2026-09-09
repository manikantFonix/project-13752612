'use client';

export default function PreparingState({
  included,
  catalogName,
}: {
  included: number;
  catalogName: string;
}) {
  return (
    <div aria-live="polite">
      <style>{`
        @keyframes pdfIndeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        .pdf-indeterminate { animation: pdfIndeterminate 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pdf-indeterminate { animation: none; } }
      `}</style>
      <h2 className="text-[20px] font-semibold text-[#16233E]">
        Preparing your PDF
      </h2>
      <p className="mt-2 text-[13px] text-[#5D6C8A]">
        This takes a moment. Keep this page open.
      </p>
      <div
        aria-hidden="true"
        className="mt-6 relative h-1 w-full rounded-full bg-[#E4E9F4] overflow-hidden"
      >
        <div className="pdf-indeterminate absolute top-0 left-0 h-full w-[30%] rounded-full bg-[var(--brand)]" />
      </div>
      <p className="mt-4 text-[13px] text-[#16233E] tabular-nums">
        {included} piece{included === 1 ? '' : 's'} from {catalogName}
      </p>
    </div>
  );
}