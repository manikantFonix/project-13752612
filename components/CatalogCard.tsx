'use client';

import Link from 'next/link';

export interface Catalog {
  id: string;
  name: string;
  productCount: number;
  status: 'Live' | 'Not published';
  image?: string;
}

interface Props {
  catalog: Catalog;
}

export default function CatalogCard({ catalog }: Props) {
  const live = catalog.status === 'Live';
  return (
    <Link
      href={`/catalog/${catalog.id}?name=${encodeURIComponent(catalog.name)}`}
      className="group bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden block text-left transition-colors duration-150 hover:border-[#C6D0E6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E4E9F4]">
        {catalog.image && (
          <img
            src={catalog.image}
            alt={catalog.name}
            className="w-full h-full object-cover"
          />
        )}
        <span
          className={`absolute top-2 right-2 inline-flex items-center h-6 px-2 rounded-full text-xs font-medium ${
            live ? 'text-[#3D6B54]' : 'text-[#5D6C8A]'
          } bg-white`}
        >
          {catalog.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#16233E]">
          {catalog.name}
        </h3>
        <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">
          {catalog.productCount} products
        </p>
      </div>
    </Link>
  );
}