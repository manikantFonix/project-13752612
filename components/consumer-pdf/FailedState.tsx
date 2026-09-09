'use client';

export default function FailedState({ onRetry }: { onRetry: () => void }) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">
        We couldn't make your PDF.
      </h2>
      <p className="mt-2 text-[13px] text-[#5D6C8A]">
        Nothing was lost — your selection is still there.
      </p>
      <button
        onClick={onRetry}
        style={{ backgroundColor: 'var(--brand)' }}
        className="mt-6 h-11 md:h-9 w-full md:w-auto px-6 text-[13px] font-medium rounded-full text-white hover:opacity-90 transition-opacity duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
      >
        Try again
      </button>
    </div>
  );
}