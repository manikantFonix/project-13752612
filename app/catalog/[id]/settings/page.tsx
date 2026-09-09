import { notFound } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import CatalogSettings from '../../../../components/CatalogSettings';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

export default function SettingsPage({ params }: { params: { id: string } }) {
  if (!CATALOG_IDS.includes(params.id)) {
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