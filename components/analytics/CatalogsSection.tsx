'use client';

import Link from 'next/link';
import SectionLabel from './SectionLabel';
import ErrorBlock from './ErrorBlock';
import { SkeletonTable } from './SkeletonStat';
import { focusRing, type CatalogRow, type SectionMode } from './data';

export default function CatalogsSection({
  mode,
  catalogs,
}: {
  mode: SectionMode;
  catalogs: CatalogRow[];
}) {
  const header = (
    <thead>
      <tr className="h-11">
        <th className="text-left text-[13px] font-medium text-[#5D6C8A]">Catalog</th>
        <th className="w-32 text-right text-[13px] font-medium text-[#5D6C8A]">Visitors</th>
        <th className="w-40 text-right text-[13px] font-medium text-[#5D6C8A]">Products published</th>
        <th className="w-28 text-right text-[13px] font-medium text-[#5D6C8A]">Inquiries</th>
      </tr>
    </thead>
  );

  return (
    <section>
      <SectionLabel>Catalogs</SectionLabel>
      <div className="mt-4">
      {mode === 'loading' ? (
        <SkeletonTable rows={3} />
      ) : mode === 'error' ? (
        <ErrorBlock />
      ) : catalogs.length === 0 ? (
        <p className="text-[13px] text-[#5D6C8A]">No catalogs published in this period.</p>
      ) : (
        <>
          <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
            <table className="w-full">
              {header}
              <tbody className="divide-y divide-[#DCE3F0]">
                {catalogs.map((c) => {
                  const name = (
                    <span className="text-[13px] font-medium text-[#16233E]">{c.name}</span>
                  );
                  return (
                    <tr key={c.name}>
                      <td className="py-3.5 pr-4">
                        {c.deleted ? (
                          <span className="inline-flex items-center gap-2">
                            {name}
                            <span className="text-[12px] text-[#5D6C8A]">Deleted</span>
                          </span>
                        ) : (
                          <Link
                            href={`/catalog/${c.id}`}
                            className={`inline-flex ${focusRing} rounded-[8px]`}
                          >
                            {name}
                          </Link>
                        )}
                      </td>
                      <td className="py-3.5 text-right text-[13px] tabular-nums text-[#16233E]">
                        {c.visitors.toLocaleString('en-US')}
                      </td>
                      <td className="py-3.5 text-right text-[13px] tabular-nums text-[#16233E]">
                        {c.productsPublished}
                      </td>
                      <td className="py-3.5 text-right text-[13px] tabular-nums text-[#16233E]">
                        {c.inquiries}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-[#5D6C8A]">
            Counted once per visit, so this is people rather than page loads.
          </p>
        </>
      )}
      </div>
    </section>
  );
}