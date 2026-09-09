'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, countCorrect, countFlagged } from './data';
import ProductRenderCard from './ProductRenderCard';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

export type Preview =
  | 'correct'
  | 'flagged'
  | 'loading'
  | 'correctEmpty'
  | 'flaggedEmpty'
  | 'error';

const previews: { value: Preview; label: string }[] = [
  { value: 'correct', label: 'Correct' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'loading', label: 'Loading' },
  { value: 'correctEmpty', label: 'Correct empty' },
  { value: 'flaggedEmpty', label: 'Flagged empty' },
  { value: 'error', label: 'Error' },
];

export default function RenderStatusBoard({
  catalogId,
  catalogName,
  productCount,
  initialView = 'correct',
}: {
  catalogId: string;
  catalogName: string;
  productCount: number;
  initialView?: 'correct' | 'flagged';
}) {
  const [preview, setPreview] = useState<Preview>(
    initialView === 'flagged' ? 'flagged' : 'correct'
  );

  const flaggedPage = preview === 'flagged' || preview === 'flaggedEmpty';
  const emptyCatalog = productCount === 0;

  let list = products;
  if (emptyCatalog) list = [];

  const correctTotal = list.reduce((s, p) => s + countCorrect(p), 0);
  const flaggedTotal = list.reduce((s, p) => s + countFlagged(p), 0);
  const flaggedList = list.filter((p) => countFlagged(p) > 0);

  const focusRing =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

  const renderBody = () => {
    if (preview === 'loading') {
      return (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-[#DCE3F0] rounded-[12px] p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[12px] bg-[#E4E9F4]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-1/3 rounded-full bg-[#E4E9F4]" />
                  <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
                </div>
                <div className="w-24 h-3 rounded-full bg-[#E4E9F4]" />
              </div>
              <div className="mt-5 rounded-[12px] bg-[#10151E] border border-[#363F4E] p-5">
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="aspect-square bg-[#2B3446] rounded-[8px]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (preview === 'error') {
      return (
        <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
          <p className="text-[13px] text-[#16233E]">
            We couldn't load the render status.
          </p>
          <button
            onClick={() => setPreview('correct')}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Try again
          </button>
        </div>
      );
    }

    if (preview === 'correctEmpty' || (emptyCatalog && preview === 'correct')) {
      return (
        <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
          <p className="text-[13px] text-[#16233E]">
            Nothing has finished yet. Renders appear here as they complete.
          </p>
        </div>
      );
    }

    if (preview === 'flaggedEmpty') {
      return (
        <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
          <p className="text-[13px] text-[#3D6B54]">
            Nothing is flagged. Every render in this catalog came out right.
          </p>
          <Link
            href={`/catalog/${catalogId}`}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${focusRing}`}
          >
            Back to products
          </Link>
        </div>
      );
    }

    const shown = flaggedPage ? flaggedList : list;
    return (
      <div className="flex flex-col gap-4">
        {shown.map((p) => (
          <ProductRenderCard key={p.id} product={p} flagged={flaggedPage} />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5D6C8A]">
          <Link
            href="/"
            className={`hover:text-[#16233E] transition-colors duration-150 ${focusRing}`}
          >
            Catalogs
          </Link>
          <span className="mx-1">/</span>
          <Link
            href={`/catalog/${catalogId}`}
            className={`hover:text-[#16233E] transition-colors duration-150 ${focusRing}`}
          >
            {catalogName}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[#16233E]">Render status</span>
        </nav>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
              Render status
            </h1>
            <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">
              {catalogName} · {productCount} products
            </p>
          </div>
          <Link
            href={`/catalog/${catalogId}`}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${focusRing}`}
          >
            Back to products
          </Link>
        </div>

        <div
          role="radiogroup"
          aria-label="Render status page"
          className="mt-5 inline-flex items-center gap-1 bg-white border border-[#DCE3F0] rounded-full p-1 h-9"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!flaggedPage}
            onClick={() => setPreview('correct')}
            className={`h-7 px-3 text-[13px] font-medium rounded-full flex items-center gap-2 transition-colors duration-150 whitespace-nowrap ${focusRing} ${
              !flaggedPage
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:text-[#16233E]'
            }`}
          >
            Correct
            <span
              className={`inline-flex items-center justify-center min-w-[16px] h-5 px-1 rounded-full text-[11px] font-medium tabular-nums ${
                !flaggedPage
                  ? 'bg-white text-[#152E56]'
                  : 'bg-[#152E56]/10 text-[#16233E]'
              }`}
            >
              {correctTotal}
            </span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={flaggedPage}
            onClick={() => setPreview('flagged')}
            className={`h-7 px-3 text-[13px] font-medium rounded-full flex items-center gap-2 transition-colors duration-150 whitespace-nowrap ${focusRing} ${
              flaggedPage
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:text-[#16233E]'
            }`}
          >
            Flagged
            <span
              className={`inline-flex items-center justify-center min-w-[16px] h-5 px-1 rounded-full text-[11px] font-medium tabular-nums ${
                flaggedPage
                  ? 'bg-white text-[#152E56]'
                  : 'bg-[#152E56]/10 text-[#16233E]'
              }`}
            >
              {flaggedTotal}
            </span>
          </button>
        </div>

        <div className="mt-6" aria-live="polite">
          {renderBody()}
        </div>
      </div>

      <StateSwitcherPanel
        title="Preview state"
        icon="ri-image-2-line"
        hint="Switch how the render status page looks"
        groups={[{ options: previews.map((p) => ({ value: p.value, label: p.label })) }]}
        active={(v) => preview === v}
        onSelect={(v) => setPreview(v as Preview)}
      />
    </main>
  );
}