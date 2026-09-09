export type PublicationState =
  | 'not-published'
  | 'published'
  | 'publishing'
  | 'deleting';

export interface PublishCounts {
  servable: number;
  generating: number;
  flagged: number;
  inactive: number;
}

export interface PublicationData {
  published: boolean;
  firstPublish: boolean;
  counts: PublishCounts;
  shareLink: string;
  productCount: number;
  photographs: number;
  renders: number;
  rendersGenerating: number;
}

export const defaultPublication = (
  published: boolean,
  counts: PublishCounts = { servable: 0, generating: 0, flagged: 0, inactive: 0 }
): PublicationData => ({
  published,
  firstPublish: !published,
  counts,
  shareLink: 'https://catalog.craftsmans.ai/c/bridal-2026',
  productCount: 128,
  photographs: 128,
  renders: 1536,
  rendersGenerating: 24,
});

export const catalogNameFor = (id: string, fallback: string) =>
  id === 'new-catalog' ? 'New catalog' : fallback;

export const canPublishFrom = (counts: PublishCounts) =>
  counts.servable + counts.generating + counts.flagged + counts.inactive > 0;