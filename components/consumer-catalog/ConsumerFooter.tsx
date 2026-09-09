'use client';

import type { RetailerBranding } from './data';

export default function ConsumerFooter({ brand }: { brand: RetailerBranding }) {
  if (!brand.email && !brand.phone) return null;
  return (
    <footer className="bg-white border-t border-[#DCE3F0] mt-16">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 py-8 text-center space-y-1 text-[13px] text-[#5D6C8A]">
        {brand.email && (
          <p>
            <a
              href={`mailto:${brand.email}`}
              className="hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
            >
              {brand.email}
            </a>
          </p>
        )}
        {brand.phone && (
          <p>
            <a
              href={`tel:${brand.phone}`}
              className="hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
            >
              {brand.phone}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}