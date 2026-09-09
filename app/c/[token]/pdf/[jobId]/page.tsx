import { Suspense } from 'react';
import ConsumerPdfRoute from '../../../../../components/consumer-pdf/ConsumerPdfRoute';

export function generateStaticParams() {
  return [
    { token: 'bridal-2026', jobId: 'preview-job' },
    { token: 'closed-catalog', jobId: 'preview-job' },
  ];
}

export const dynamicParams = false;

export default function ConsumerPdfJobPage({
  params,
}: {
  params: { token: string; jobId: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerPdfRoute token={params.token} jobId={params.jobId} />
    </Suspense>
  );
}