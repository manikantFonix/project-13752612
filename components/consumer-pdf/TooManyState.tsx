'use client';

import Link from 'next/link';

export default function TooManyState({
  token,
  chosen,
  cap,
}: {
  token: string;
  chosen: number;
  cap: number;
}) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">
        That's too many pieces for one PDF.
      </h2>
      <p className="mt-2 text-[13px] text-[#16233E]">
        You can include up to {cap} pieces. You've chosen {chosen} — go back
        and remove {chosen - cap}.
      </p>
      <Link
        href={`/c/${token}`}
        className="mt-6 h-11 md:h-9 w-full md:w-auto px-6 text-[13px] font-medium rounded-full bg-white border border-[#DCE3F0] text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
      >
        Back to the catalog
      </Link>
    </div>
  );
}