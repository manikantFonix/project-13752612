'use client';

export default function ReadyState({
  included,
  size,
  downloaded,
  onDownload,
}: {
  included: number;
  size: string;
  downloaded: boolean;
  onDownload: () => void;
}) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">
        Your PDF is ready
      </h2>
      <p className="mt-2 text-[13px] text-[#5D6C8A] tabular-nums">
        {included} piece{included === 1 ? '' : 's'} · {size}
      </p>
      <button
        onClick={onDownload}
        style={{ backgroundColor: 'var(--brand)' }}
        className="mt-6 h-11 md:h-9 w-full md:w-auto px-6 text-[13px] font-medium rounded-full text-white hover:opacity-90 transition-opacity duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
      >
        {downloaded ? 'Download again' : 'Download PDF'}
      </button>
      <p className="mt-3 text-[12px] text-[#5D6C8A]">
        This link stays available for a limited time. Download it while you
        can.
      </p>
    </div>
  );
}