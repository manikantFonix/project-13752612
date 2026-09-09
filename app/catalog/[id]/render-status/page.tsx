import { Suspense } from 'react';
import RenderStatusRoute from '@/components/render-status/RenderStatusRoute';
import { CATALOG_IDS } from '@/lib/catalogs';

export function generateStaticParams() {
  return CATALOG_IDS.map((id) => ({ id }));
}

export default async function RenderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#EDF1FA] pt-8 pb-16" />}
    >
      <RenderStatusRoute catalogId={id} />
    </Suspense>
  );
}