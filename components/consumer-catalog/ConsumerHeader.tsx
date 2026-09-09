'use client';

import type { RetailerBranding } from './data';

export default function ConsumerHeader({
  brand,
  showLogo = true,
}: {
  brand: RetailerBranding;
  showLogo?: boolean;
}) {
  return (
    <header className="bg-white border-b border-[#DCE3F0]">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 h-16 flex items-center">
        {showLogo && brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.brandName}
            className="max-h-[40px] md:max-h-[48px] w-auto object-contain"
          />
        ) : (
          <span className="text-[18px] font-semibold text-[#16233E]">
            {brand.brandName}
          </span>
        )}
      </div>
    </header>
  );
}