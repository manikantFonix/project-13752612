'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from './ProductTable';
import Dropdown from './Dropdown';
import SelectCheckbox from './ui/SelectCheckbox';

const makeMenu = (id: string) => [
  <Link
    key="edit"
    href={`/catalog/bridal-2026/product/${id}`}
    className="block w-full text-left px-3 h-9 text-[13px] text-[#16233E] hover:bg-[#EDF1FA] rounded-[8px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
  >
    Edit
  </Link>,
  <button
    key="del"
    onClick={() => {}}
    className="w-full text-left px-3 h-9 text-[13px] text-[#A8552A] hover:bg-[#EDF1FA] rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
  >
    Delete
  </button>,
];

function Chip({ status }: { status: Product['renderStatus'] }) {
  const styles: Record<Product['renderStatus'], string> = {
    complete: 'bg-[#E8F1EC] text-[#3D6B54]',
    generating: 'bg-[#F3F6FC] text-[#5D6C8A]',
    flagged: 'bg-[#F3F6FC] text-[#A8552A]',
    pending: 'bg-[#F3F6FC] text-[#5D6C8A]',
  };
  const label: Record<Product['renderStatus'], string> = {
    complete: 'Complete',
    generating: 'Generating',
    flagged: 'Flagged',
    pending: 'Pending',
  };
  return (
    <span
      className={`inline-flex items-center px-2 h-6 rounded-full text-[11px] font-medium whitespace-nowrap ${styles[status]}`}
    >
      {label[status]}
    </span>
  );
}

function Toggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className="relative w-9 h-5 rounded-full transition-colors duration-150 bg-[#C6CFE0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
    >
      <span
        className={`absolute top-[2px] block h-4 w-4 rounded-full bg-white transition-all duration-150 ${
          active ? 'left-[18px]' : 'left-[2px]'
        }`}
      />
    </button>
  );
}

export default function ProductGrid({
  products,
  onToggle,
  selectMode,
  selectedIds,
  onSelect,
}: {
  products: Product[];
  onToggle: (id: string, active: boolean) => void;
  selectMode?: boolean;
  selectedIds?: Set<string>;
  onSelect?: (id: string) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((p) => (
        <div
          key={p.id}
          className={`bg-white border border-[#DCE3F0] rounded-[12px] p-3 transition-colors duration-150 ${
            selectMode && selectedIds?.has(p.id)
              ? 'border-[#152E56] bg-[#EDF1FA]'
              : ''
          }`}
        >
          <div className="relative">
            <img
              src={p.image}
              alt={p.category}
              className="w-full aspect-square rounded-[10px] object-cover object-top"
            />
            {selectMode && (
              <div className="absolute top-2 left-2">
                <SelectCheckbox
                  checked={!!selectedIds?.has(p.id)}
                  onChange={() => onSelect?.(p.id)}
                  label={`Select ${p.category}`}
                />
              </div>
            )}
            {p.angleWarning && (
              <span className="absolute top-2 left-2 inline-flex items-center px-2 h-6 rounded-full bg-[#16233E]/80 text-white text-[11px] font-medium whitespace-nowrap">
                Angle unknown
              </span>
            )}
            <div className="absolute top-2 right-2">
              <Dropdown
                open={menuId === p.id}
                onToggle={(o) => setMenuId(o ? p.id : null)}
                align="right"
                panelClass="w-[120px]"
                trigger={
                  <button
                    onClick={() => setMenuId(menuId === p.id ? null : p.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-[#5D6C8A] hover:bg-[#EDF1FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  >
                    <i className="ri-more-2-fill text-[18px]" />
                  </button>
                }
              >
                {makeMenu(p.id)}
              </Dropdown>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-medium text-[#16233E]">
                {p.category}
              </p>
              <Chip status={p.renderStatus} />
            </div>
            <p className="mt-1 text-[13px] text-[#5D6C8A] line-clamp-2">
              {p.description}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[13px] font-medium text-[#16233E] tabular-nums">
                {p.price !== null
                  ? `$${p.price.toLocaleString('en-US')}`
                  : 'Price on request'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#5D6C8A]">
                  {p.active ? 'Active' : 'Inactive'}
                </span>
                <Toggle
                  active={p.active}
                  onToggle={() => onToggle(p.id, p.active)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}