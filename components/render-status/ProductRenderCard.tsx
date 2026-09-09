'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ProductRenders, RenderTile } from './data';
import { allTiles, countFlagged } from './data';
import ReplacePhotosDialog from './ReplacePhotosDialog';

const darkRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#407CDD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10151E]';
const lightRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

const stageLabel: Record<string, string> = {
  generating: 'Generating',
  checking: 'Checking',
  correcting: 'Correcting',
};

function CorrectTile({ tile, onOpen }: { tile: RenderTile; onOpen: () => void }) {
  if (tile.status === 'complete') {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={`text-left ${darkRing}`}
      >
        <img
          src={tile.image}
          alt={`${tile.view} render`}
          className="w-full aspect-square rounded-[8px] object-cover"
        />
        <p className="mt-1.5 text-[12px] text-[#AFB9CA]">{tile.view}</p>
      </button>
    );
  }
  return (
    <div>
      <div className="w-full aspect-square rounded-[8px] bg-[#2B3446]" />
      <p className="mt-1.5 text-[12px] text-[#AFB9CA]">{stageLabel[tile.status]}</p>
    </div>
  );
}

function FlaggedTile({ tile }: { tile: RenderTile }) {
  return (
    <div>
      <img
        src={tile.image}
        alt={`${tile.view} render flagged`}
        className="w-full aspect-square rounded-[8px] object-cover opacity-60 border border-[#D06835]"
      />
      <p className="mt-1.5 text-[12px] text-[#D06835]">{tile.view}</p>
    </div>
  );
}

function ReasonBlock({ product }: { product: ProductRenders }) {
  const flag = product.flag!;
  return (
    <div className="mt-4 bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] p-4">
      <h3 className="text-[13px] font-medium text-[#16233E]">
        Why these were flagged
      </h3>
      <div className="mt-2 text-[13px] text-[#16233E]">
        {flag.type === 'quality' && (
          <>
            <p>We compared this against your photograph and these didn't match:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              {(flag.defects ?? []).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-2 text-[#5D6C8A]">
              We tried to correct it and the corrections didn't hold.
            </p>
          </>
        )}
        {flag.type === 'worn' && (
          <p>
            The worn view wasn't attempted, because another view of this piece
            didn't pass. Fix the flagged views and it will generate with them.
          </p>
        )}
        {flag.type === 'balance' && (
          <div className="flex items-center justify-between gap-4">
            <p className="flex-1">
              Correction stopped because your render balance ran out.
            </p>
            <Link
              href="/settings/usage"
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${lightRing}`}
            >
              Top up renders
            </Link>
          </div>
        )}
        {flag.type === 'technical' && (
          <p>
            This image couldn't be produced. Replacing the photographs will try
            again.
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProductRenderCard({
  product,
  flagged,
}: {
  product: ProductRenders;
  flagged: boolean;
}) {
  const [compare, setCompare] = useState<RenderTile | null>(null);
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [angleNotice, setAngleNotice] = useState(false);

  const total = allTiles(product).length;
  const flaggedCount = total ? countFlagged(product) : 0;
  const shownTiles = flagged
    ? product.colors.map((c) => ({
        name: c.name,
        swatch: c.swatch,
        tiles: c.tiles.filter((t) => t.status === 'flagged'),
      }))
    : product.colors;

  return (
    <article className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-[12px] bg-[#E4E9F4]">
            <img
              src={product.thumbnail}
              alt={product.category}
              className="w-full h-full rounded-[12px] object-cover object-top"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-[#16233E]">
              {product.category}
            </p>
            <p className="mt-0.5 text-[13px] text-[#5D6C8A] truncate">
              {product.description}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[13px] font-medium text-[#16233E] tabular-nums">
            Used {product.rendersUsed} renders so far
          </p>
          <p className="mt-0.5 text-[12px] text-[#5D6C8A]">
            Quoted at least 12. Repairs cost extra.
          </p>
          {flagged && (
            <p className="mt-1 text-[13px] font-medium text-[#A8552A] tabular-nums">
              {flaggedCount} of {total} flagged on this piece
            </p>
          )}
        </div>
      </div>

      {angleNotice && (
        <p className="mt-4 text-[13px] text-[#A8552A]">
          Saved, but we couldn't tell these angles apart. Retake the
          photographs to start generating.
        </p>
      )}

      <div className="mt-4 rounded-[12px] bg-[#10151E] border border-[#363F4E] p-5">
        {compare ? (
          <div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Generated', src: compare.image },
                { label: 'Your photograph', src: compare.source },
              ].map((col) => (
                <div key={col.label}>
                  <p className="mb-2 text-[12px] text-[#AFB9CA]">
                    {col.label}
                  </p>
                  <img
                    src={col.src}
                    alt={col.label}
                    className="w-full aspect-square rounded-[8px] object-cover"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCompare(null)}
              className={`mt-4 text-[13px] text-[#AFB9CA] hover:text-[#E4E9F1] transition-colors duration-150 ${darkRing}`}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {shownTiles.map((group) =>
              group.tiles.length === 0 ? null : (
                <div key={group.name}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: group.swatch }}
                    />
                    <p className="text-[12px] font-medium text-[#AFB9CA]">
                      {group.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {group.tiles.map((tile) =>
                      flagged ? (
                        <FlaggedTile key={tile.view} tile={tile} />
                      ) : (
                        <CorrectTile
                          key={tile.view}
                          tile={tile}
                          onOpen={() => setCompare(tile)}
                        />
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {flagged && product.flag && <ReasonBlock product={product} />}

      {flagged && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setReplaceOpen(true)}
            className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${lightRing}`}
          >
            Replace photographs
          </button>
          <p className="text-[13px] text-[#5D6C8A]">
            Replaces all three and regenerates every view in every color.
          </p>
        </div>
      )}

      <ReplacePhotosDialog
        open={replaceOpen}
        onClose={() => {
          setReplaceOpen(false);
          setAngleNotice(false);
        }}
        onAngles={() => setAngleNotice(true)}
      />
    </article>
  );
}