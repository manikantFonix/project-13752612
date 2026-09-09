'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import SegmentedControl from '../components/SegmentedControl';
import CatalogPage, { initialCatalogs } from '../components/CatalogPage';
import type { Catalog } from '../components/CatalogCard';
import CustomDesign from '../components/CustomDesign';

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<'custom' | 'catalog'>('custom');
  const [catalogs, setCatalogs] = useState<Catalog[]>(initialCatalogs);
  const [pendingCatalog, setPendingCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    if (!pendingCatalog) return;
    const target = `/catalog/new-catalog?name=${encodeURIComponent(pendingCatalog.name)}`;
    setPendingCatalog(null);
    router.push(target);
  }, [pendingCatalog, router]);

  const handleCreated = (catalog: Catalog) => {
    setCatalogs((prev) => [{ ...catalog, id: 'new-catalog' }, ...prev]);
    setPendingCatalog(catalog);
  };

  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px]">
        <main className="min-h-screen bg-[#EDF1FA] pb-16">
          <div className="max-w-[1180px] mx-auto px-8 pt-8">
            <div className="flex justify-center">
              <SegmentedControl mode={mode} onChange={setMode} count={catalogs.length} />
            </div>
            {mode === 'custom' ? (
              <CustomDesign />
            ) : (
              <CatalogPage catalogs={catalogs} onCreated={handleCreated} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}