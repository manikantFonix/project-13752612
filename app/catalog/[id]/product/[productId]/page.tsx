import { notFound } from 'next/navigation';
import Sidebar from '../../../../../components/Sidebar';
import ProductDetail from '../../../../../components/ProductDetail';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.flatMap((id) =>
    Array.from({ length: 8 }, (_, i) => ({ id, productId: String(i + 1) }))
  );
}

export const dynamicParams = false;

export default function ProductPage({
  params,
}: {
  params: { id: string; productId: string };
}) {
  if (!CATALOG_IDS.includes(params.id)) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <ProductDetail productId={params.productId} />
      </div>
    </div>
  );
}