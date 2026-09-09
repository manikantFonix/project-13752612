'use client';

import { useMemo, useState } from 'react';
import {
  catalogFacets,
  servableProducts,
  type CatalogData,
  type ConsumerProduct,
} from './data';
import FilterChips, { emptyFilters, type Filters } from './FilterChips';
import ProductTile from './ProductTile';

const brokenProduct: ConsumerProduct = {
  id: 'broken-preview',
  category: 'Ring',
  price: 1240,
  active: true,
  metals: ['yellow'],
  images: { yellow: { front: '' } },
};

function SkeletonTile() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
      <div className="aspect-square bg-[#E4E9F4] animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-[#E4E9F4] rounded-full animate-pulse" />
        <div className="h-3 w-12 bg-[#E4E9F4] rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default function CatalogGrid({
  catalog,
  scenario,
  brandColor,
}: {
  catalog: CatalogData;
  scenario: string;
  brandColor: string;
}) {
  const base = useMemo(() => servableProducts(catalog), [catalog]);
  const facets = useMemo(() => catalogFacets(base), [base]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const activeFilters: Filters =
    scenario === 'filtered'
      ? { ...filters, category: facets.categories[0]?.value ?? null }
      : filters;

  const filtered = useMemo(() => {
    return base.filter((p) => {
      if (activeFilters.category && p.category !== activeFilters.category)
        return false;
      if (activeFilters.metal && !p.metals.includes(activeFilters.metal))
        return false;
      if (
        activeFilters.priceMin != null &&
        (p.price ?? 0) < activeFilters.priceMin
      )
        return false;
      if (
        activeFilters.priceMax != null &&
        (p.price ?? Infinity) > activeFilters.priceMax
      )
        return false;
      return true;
    });
  }, [base, activeFilters]);

  const loading = scenario === 'loading';
  const catalogEmpty = scenario === 'empty' || base.length === 0;
  const noMatch =
    !loading &&
    !catalogEmpty &&
    (scenario === 'nomatch' || filtered.length === 0);

  function gridList(): ConsumerProduct[] {
    if (loading) return [];
    if (scenario === 'broken') return [brokenProduct, ...filtered];
    return filtered;
  }

  return (
    <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-8 pb-32">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-semibold text-[#16233E]">
            {catalog.name}
          </h1>
          <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">
            {scenario === 'empty' ? 0 : base.length} piece{scenario === 'empty' || base.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {!loading && !catalogEmpty && (
        <div className="mt-5">
          <FilterChips
            facets={facets}
            filters={activeFilters}
            onChange={setFilters}
            brandColor={brandColor}
          />
        </div>
      )}

      {loading && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonTile key={i} />
          ))}
        </div>
      )}

      {catalogEmpty && (
        <div className="min-h-[320px] flex items-center justify-center">
          <p className="text-[13px] text-[#16233E]">
            There's nothing in this catalog yet.
          </p>
        </div>
      )}

      {noMatch && (
        <div className="min-h-[320px] flex flex-col items-center justify-center text-center gap-4">
          <p className="text-[13px] text-[#16233E]">
            No pieces match what you've chosen.
          </p>
          <button
            onClick={() => setFilters(emptyFilters)}
            className="h-9 px-4 text-[13px] font-medium rounded-full bg-white border border-[#DCE3F0] text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Clear filters
          </button>
        </div>
      )}

      {!loading && !catalogEmpty && !noMatch && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {gridList().map((p) => (
            <ProductTile key={p.id} product={p} token={catalog.token} />
          ))}
        </div>
      )}
    </div>
  );
}