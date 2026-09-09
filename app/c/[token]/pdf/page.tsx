import { Suspense } from 'react';
import ConsumerPdfRoute from '../../../../components/consumer-pdf/ConsumerPdfRoute';

export function generateStaticParams() {
  return [{ token: 'bridal-2026' }, { token: 'closed-catalog' }];
}

export const dynamicParams = false;

export default function ConsumerPdfPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerPdfRoute token={params.token} />
    </Suspense>
  );
}