import { Suspense } from 'react';
import ConsumerProductRoute from '../../../../components/consumer-catalog/ConsumerProductRoute';

const PRODUCT_IDS = [
  'broken-preview',
  'p1',
  'p2',
  'p3',
  'p4',
  'p5',
  'p6',
  'p7',
  'p8',
  'p9',
  'p10',
  'p11',
  'p12',
  'p13',
  'p14',
];

export function generateStaticParams() {
  return [
    ...PRODUCT_IDS.map((productId) => ({ token: 'bridal-2026', productId })),
    { token: 'closed-catalog', productId: 'p1' },
    { token: 'closed-catalog', productId: 'p2' },
  ];
}

export const dynamicParams = false;

export default function ConsumerProductPage({
  params,
}: {
  params: { token: string; productId: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerProductRoute
        token={params.token}
        productId={params.productId}
      />
    </Suspense>
  );
}