'use client';

import { useState } from 'react';
import { METAL_LABEL, metalHex, type Metal } from './data';

export interface Filters {
  category: string | null;
  metal: Metal | null;
  priceMin: number | null;
  priceMax: number | null;
}

export const emptyFilters: Filters = {
  category: null,
  metal: null,
  priceMin: null,
  priceMax: null,
};

export interface Facets {
  categories: { value: string; count: number }[];
  price: { min: number; max: number } | null;
  metals: Metal[];
}

export default function FilterChips({
  facets,
  filters,
  onChange,
  brandColor,
}: {
  facets: Facets;
  filters: Filters;
  onChange: (f: Filters) => void;
  brandColor: string;
}) {
  const [open, setOpen] = useState<'category' | 'price' | 'metal' | null>(null);
  const ring =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

  const activeStyle = (active: boolean) =>
    active
      ? { borderColor: brandColor, color: brandColor }
      : undefined;
  const baseChip =
    'h-9 px-3 text-[13px] font-medium rounded-full border border-[#DCE3F0] bg-white inline-flex items-center gap-1 whitespace-nowrap hover:border-[#C6D0E6] transition-colors duration-150 ' +
    ring;

  const showCategory = facets.categories.length > 1;
  const showMetal = facets.metals.length > 1;

  const panel =
    'absolute top-11 left-0 z-30 min-w-[200px] bg-white border border-[#DCE3F0] rounded-[12px] p-2';

  return (
    <div className="flex items-center gap-2">
      {showCategory && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === 'category' ? null : 'category')}
            style={activeStyle(!!filters.category)}
            className={baseChip}
            aria-expanded={open === 'category'}
          >
            {filters.category ?? 'Category'}
            <i className="ri-arrow-down-s-line text-[16px]" />
          </button>
          {open === 'category' && (
            <div className={panel}>
              <button
                onClick={() => {
                  onChange({ ...filters, category: null });
                  setOpen(null);
                }}
                className={`block w-full text-left px-3 h-9 rounded-[8px] text-[13px] hover:bg-[#EDF1FA] ${
                  filters.category === null
                    ? 'font-medium text-[#16233E]'
                    : 'text-[#5D6C8A]'
                } ${ring}`}
              >
                All categories
              </button>
              {facets.categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    onChange({ ...filters, category: c.value });
                    setOpen(null);
                  }}
                  className={`block w-full text-left px-3 h-9 rounded-[8px] text-[13px] hover:bg-[#EDF1FA] ${
                    filters.category === c.value
                      ? 'font-medium text-[#16233E]'
                      : 'text-[#5D6C8A]'
                  } ${ring}`}
                >
                  {c.value}{' '}
                  <span className="tabular-nums text-[#5D6C8A]">
                    ({c.count})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {facets.price && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === 'price' ? null : 'price')}
            style={activeStyle(
              filters.priceMin != null || filters.priceMax != null,
            )}
            className={baseChip}
            aria-expanded={open === 'price'}
          >
            Price
            <i className="ri-arrow-down-s-line text-[16px]" />
          </button>
          {open === 'price' && (
            <div className={`${panel} w-[220px]`}>
              <div className="p-2 space-y-3">
                <label className="block">
                  <span className="text-[12px] text-[#5D6C8A]">Minimum</span>
                  <input
                    type="number"
                    value={filters.priceMin ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...filters,
                        priceMin:
                          e.target.value === ''
                            ? null
                            : Number(e.target.value),
                      })
                    }
                    placeholder={String(facets.price.min)}
                    className="mt-1 w-full h-9 px-3 text-[13px] bg-white border border-[#DCE3F0] rounded-full text-[#16233E] outline-none placeholder-[#C6CFE0] tabular-nums focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] text-[#5D6C8A]">Maximum</span>
                  <input
                    type="number"
                    value={filters.priceMax ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...filters,
                        priceMax:
                          e.target.value === ''
                            ? null
                            : Number(e.target.value),
                      })
                    }
                    placeholder={String(facets.price.max)}
                    className="mt-1 w-full h-9 px-3 text-[13px] bg-white border border-[#DCE3F0] rounded-full text-[#16233E] outline-none placeholder-[#C6CFE0] tabular-nums focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {showMetal && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === 'metal' ? null : 'metal')}
            style={activeStyle(!!filters.metal)}
            className={baseChip}
            aria-expanded={open === 'metal'}
          >
            {filters.metal ? METAL_LABEL[filters.metal] : 'Metal'}
            <i className="ri-arrow-down-s-line text-[16px]" />
          </button>
          {open === 'metal' && (
            <div className={panel}>
              {facets.metals.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    onChange({
                      ...filters,
                      metal: filters.metal === m ? null : m,
                    });
                    setOpen(null);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-3 h-9 rounded-[8px] text-[13px] hover:bg-[#EDF1FA] ${
                    filters.metal === m
                      ? 'font-medium text-[#16233E]'
                      : 'text-[#5D6C8A]'
                  } ${ring}`}
                >
                  <span
                    aria-hidden
                    className="w-4 h-4 rounded-full border border-[#DCE3F0]"
                    style={{ backgroundColor: metalHex(m) }}
                  />
                  {METAL_LABEL[m]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}