import { Suspense } from 'react';
import ConsumerCatalogRoute from '../../../components/consumer-catalog/ConsumerCatalogRoute';

export function generateStaticParams() {
  return [{ token: 'bridal-2026' }, { token: 'closed-catalog' }];
}

export const dynamicParams = false;

export default function ConsumerCatalogPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerCatalogRoute token={params.token} />
    </Suspense>
  );
}