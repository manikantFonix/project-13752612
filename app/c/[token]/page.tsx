import { Suspense } from 'react';
import ConsumerCatalogRoute from '../../../components/consumer-catalog/ConsumerCatalogRoute';

export function generateStaticParams() {
  return [{ token: 'bridal-2026' }, { token: 'closed-catalog' }];
}

export const dynamicParams = false;

export default async function ConsumerCatalogPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerCatalogRoute token={token} />
    </Suspense>
  );
}