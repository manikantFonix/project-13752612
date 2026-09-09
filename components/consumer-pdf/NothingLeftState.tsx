'use client';

import Link from 'next/link';

export default function NothingLeftState({ token }: { token: string }) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">
        None of the pieces you chose are available any more.
      </h2>
      <p className="mt-2 text-[13px] text-[#5D6C8A]">
        The jeweler may have taken them down. Have another look at the catalog.
      </p>
      <Link
        href={`/c/${token}`}
        style={{ backgroundColor: 'var(--brand)' }}
        className="mt-6 h-11 md:h-9 w-full md:w-auto px-6 text-[13px] font-medium rounded-full text-white hover:opacity-90 transition-opacity duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
      >
        Back to the catalog
      </Link>
    </div>
  );
}