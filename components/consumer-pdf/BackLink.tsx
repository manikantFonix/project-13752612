'use client';

import Link from 'next/link';

export default function BackLink({ token }: { token: string }) {
  return (
    <Link
      href={`/c/${token}`}
      className="inline-flex items-center gap-1 text-[13px] text-[var(--brand)] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
    >
      <i className="ri-arrow-left-s-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
      Back to the catalog
    </Link>
  );
}