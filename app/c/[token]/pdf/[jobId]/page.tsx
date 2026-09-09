import { Suspense } from 'react';
import ConsumerPdfRoute from '../../../../../components/consumer-pdf/ConsumerPdfRoute';

export function generateStaticParams() {
  return [
    { token: 'bridal-2026', jobId: 'preview-job' },
    { token: 'closed-catalog', jobId: 'preview-job' },
  ];
}

export const dynamicParams = false;

export default async function ConsumerPdfJobPage({
  params,
}: {
  params: Promise<{ token: string; jobId: string }>;
}) {
  const { token, jobId } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EDF1FA]" />}>
      <ConsumerPdfRoute token={token} jobId={jobId} />
    </Suspense>
  );
}