'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelection } from './SelectionProvider';
import { METAL_LABEL, type ConsumerProduct, type Metal, type RetailerBranding } from './data';
import Gallery from './Gallery';
import MetalSwitcher from './MetalSwitcher';

export function WithdrawnView({ token }: { token: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-5">
      <p className="text-[15px] text-[#16233E]">
        That piece isn't available any more.
      </p>
      <Link
        href={`/c/${token}`}
        className="h-11 px-6 text-[13px] font-medium rounded-full text-white inline-flex items-center justify-center whitespace-nowrap transition-opacity duration-150 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        style={{ backgroundColor: 'var(--brand)' }}
      >
        Back to the catalog
      </Link>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
      <div className="aspect-square bg-[#E4E9F4] rounded-[12px] animate-pulse" />
      <div className="space-y-3">
        <div className="h-5 w-24 bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="h-4 w-16 bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="h-3 w-full bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="h-3 w-2/3 bg-[#E4E9F4] rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default function ProductDetailView({
  product,
  token,
  withdrawn = false,
  loading = false,
}: {
  product: ConsumerProduct;
  token: string;
  withdrawn?: boolean;
  loading?: boolean;
}) {
  const { selected, toggle } = useSelection();
  const [metal, setMetal] = useState<Metal>(product.metals[0]);

  if (withdrawn) return <WithdrawnView token={token} />;
  if (loading) return <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-6 pb-32"><DetailSkeleton /></div>;

  const images = product.images[metal] || {};
  const inSelection = selected.includes(product.id);
  const hasPrice = product.price !== null && product.price > 0;

  return (
    <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-6 pb-32">
      <Link
        href={`/c/${token}`}
        className="inline-flex items-center gap-1 text-[13px] text-[var(--brand)] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        <i className="ri-arrow-left-s-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
        Back to the catalog
      </Link>

      <div className="mt-5 grid lg:grid-cols-2 gap-6 lg:gap-10">
        <Gallery metal={metal} images={images} category={product.category} />

        <div>
          <h1 className="text-[20px] font-semibold text-[#16233E]">
            {product.category}
          </h1>
          {hasPrice ? (
            <p className="mt-1 text-[18px] font-medium text-[#16233E] tabular-nums">
              ${product.price?.toLocaleString('en-US')}
            </p>
          ) : (
            <p className="mt-1 text-[15px] text-[#5D6C8A]">Price on request</p>
          )}

          {product.description && (
            <p className="mt-3 text-[13px] text-[#16233E]">
              {product.description}
            </p>
          )}

          <div className="mt-6">
            <MetalSwitcher
              metals={product.metals}
              value={metal}
              onChange={setMetal}
              brandColor="var(--brand)"
            />
            {product.metals.length > 1 && (
              <p className="mt-3 text-[12px] text-[#5D6C8A] font-medium">
                {METAL_LABEL[metal]}
              </p>
            )}
          </div>

          <button
            onClick={() => toggle(product.id)}
            aria-pressed={inSelection}
            className={
              inSelection
                ? 'mt-6 h-11 px-6 text-[13px] font-medium rounded-full bg-white border border-[#DCE3F0] text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]'
                : 'mt-6 h-11 px-6 text-[13px] font-medium rounded-full text-white hover:opacity-90 transition-opacity duration-150 whitespace-nowrap inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]'
            }
            style={inSelection ? undefined : { backgroundColor: 'var(--brand)' }}
          >
            {inSelection ? 'Remove from selection' : 'Add to selection'}
          </button>
        </div>
      </div>
    </div>
  );
}