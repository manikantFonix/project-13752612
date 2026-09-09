'use client';

import { useState } from 'react';
import CatalogCard, { type Catalog } from './CatalogCard';
import NewCatalogDialog from './NewCatalogDialog';
import DemoStateControl from './DemoStateControl';

export type DemoState = 'default' | 'loading' | 'empty' | 'error';

interface Props {
  catalogs: Catalog[];
  onCreated: (catalog: Catalog) => void;
}

export const initialCatalogs: Catalog[] = [
  {
    id: 'bridal-2026',
    name: 'Bridal 2026',
    productCount: 128,
    status: 'Live',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20single%20elegant%20gold%20solitaire%20engagement%20ring%20with%20a%20round%20brilliant%20diamond%20centerpiece%2C%20resting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition%2C%20bright%20and%20neutral&width=640&height=400&seq=1&orientation=landscape',
  },
  {
    id: 'everyday-gold',
    name: 'Everyday gold',
    productCount: 64,
    status: 'Live',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20polished%20gold%20bangle%20bracelet%20lying%20flat%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition%2C%20bright%20and%20neutral&width=640&height=400&seq=2&orientation=landscape',
  },
  {
    id: 'solitaire-collection',
    name: 'Solitaire collection',
    productCount: 41,
    status: 'Not published',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20delicate%20gold%20pendant%20necklace%20with%20a%20single%20small%20diamond%20dropping%20from%20a%20fine%20chain%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition%2C%20bright%20and%20neutral&width=640&height=400&seq=3&orientation=landscape',
  },
  {
    id: 'festive-drops',
    name: 'Festive drops',
    productCount: 12,
    status: 'Not published',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pair%20of%20gold%20drop%20earrings%20with%20a%20tiny%20diamond%20accent%20finish%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=640&height=400&seq=4&orientation=landscape',
  },
  {
    id: 'anniversary-bands',
    name: 'Anniversary bands',
    productCount: 37,
    status: 'Live',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20polished%20yellow%20gold%20anniversary%20band%20ring%20with%20a%20row%20of%20small%20diamonds%20along%20the%20top%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=640&height=400&seq=5&orientation=landscape',
  },
  {
    id: 'gemstone-classics',
    name: 'Gemstone classics',
    productCount: 22,
    status: 'Not published',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20ring%20with%20a%20single%20oval%20green%20gemstone%20set%20in%20a%20simple%20bezel%2C%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=640&height=400&seq=6&orientation=landscape',
  },
];

const placeholderCard = (
  <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
    <div className="aspect-[16/10] bg-[#E4E9F4]" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-2/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-1/2 rounded-full bg-[#E4E9F4]" />
    </div>
  </div>
);

export default function CatalogPage({ catalogs, onCreated }: Props) {
  const [state, setState] = useState<DemoState>('default');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div className="mt-8 flex items-center justify-between">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Catalogs
        </h1>
        <button
          onClick={() => setDialogOpen(true)}
          className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          New catalog
        </button>
      </div>

      <div className="mt-6">
        {state === 'loading' && (
          <div className="grid grid-cols-3 gap-5">
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
          </div>
        )}

        {state === 'empty' && (
          <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
            <p className="text-[13px] text-[#16233E] max-w-[360px]">
              No catalogs yet. Create one to turn your stock photographs into
              a catalog you can share.
            </p>
            <button
              onClick={() => setDialogOpen(true)}
              className="mt-4 h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              New catalog
            </button>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
            <p className="text-[13px] text-[#16233E]">We couldn't load your catalogs.</p>
            <button
              onClick={() => setState('default')}
              className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Try again
            </button>
          </div>
        )}

        {state === 'default' && (
          <div className="grid grid-cols-3 gap-5">
            {catalogs.map((c) => (
              <CatalogCard key={c.id} catalog={c} />
            ))}
          </div>
        )}
      </div>

      <DemoStateControl state={state} onChange={setState} />
      <NewCatalogDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={onCreated}
      />
    </div>
  );
}