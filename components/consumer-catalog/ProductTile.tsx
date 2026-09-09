'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ConsumerProduct } from './data';

export default function ProductTile({
  product,
  token,
}: {
  product: ConsumerProduct;
  token: string;
}) {
  const [err, setErr] = useState(false);
  const front = product.images[product.metals[0]]?.front;
  return (
    <Link
      href={`/c/${token}/${product.id}`}
      className="group block bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden hover:border-[#C6D0E6] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
    >
      <div className="aspect-square bg-[#E4E9F4]">
        {front && !err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={front}
            alt={`${product.category} front view`}
            onError={() => setErr(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      <div className="p-3">
        <p className="text-[13px] font-medium text-[#16233E]">
          {product.category}
        </p>
        {product.price !== null && product.price > 0 ? (
          <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
            ${product.price.toLocaleString('en-US')}
          </p>
        ) : (
          <p className="mt-1 text-[13px] text-[#5D6C8A]">Price on request</p>
        )}
      </div>
    </Link>
  );
}