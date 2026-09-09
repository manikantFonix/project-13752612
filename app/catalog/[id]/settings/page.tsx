import { notFound } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import CatalogSettings from '../../../../components/CatalogSettings';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function SettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!CATALOG_IDS.includes(id)) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <CatalogSettings />
      </div>
    </div>
  );
}