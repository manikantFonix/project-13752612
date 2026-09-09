'use client';

import { useSearchParams } from 'next/navigation';
import RenderStatusBoard from './RenderStatusBoard';

const NAMES: Record<string, string> = {
  'bridal-2026': 'Bridal 2026',
  'everyday-gold': 'Everyday gold',
  'new-catalog': 'New catalog',
};

export default function RenderStatusRoute({ catalogId }: { catalogId: string }) {
  const params = useSearchParams();
  const flagged = params.get('state') === 'flagged';
  const name = NAMES[catalogId] ?? 'Bridal 2026';
  const count = catalogId === 'new-catalog' ? 0 : 8;

  return (
    <RenderStatusBoard
      catalogId={catalogId}
      catalogName={name}
      productCount={count}
      initialView={flagged ? 'flagged' : 'correct'}
    />
  );
}