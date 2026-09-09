export type LeadSource = 'catalog' | 'widget';
import { METAL_HEX } from '../../lib/metals';

export type LeadStatus = 'new' | 'accepted' | 'rejected';
export type ItemMetal = 'Yellow gold' | 'White gold' | 'Rose gold' | 'Platinum';

export interface CatalogItem {
  category: string;
  description: string;
  image: string;
  metal: ItemMetal;
  quantity: number;
  price: number | null;
}

export interface Estimate {
  metal: string;
  stones: string;
  labor: string;
  low: number;
  high: number;
}

export interface Lead {
  id: string;
  source: LeadSource;
  name: string;
  phone: string;
  email: string;
  address?: string;
  receivedLabel: string;
  receivedFull: string;
  message?: string;
  status: LeadStatus;
  decidedOn?: string;
  catalogName?: string;
  items?: CatalogItem[];
  widgetImage?: string;
  quantity?: number;
  estimate?: Estimate | null;
}

export const metalSwatch: Record<ItemMetal, string> = {
  'Yellow gold': METAL_HEX.yellow,
  'White gold': METAL_HEX.white,
  'Rose gold': METAL_HEX.rose,
  Platinum: '#C6CFE0',
};

export const leads: Lead[] = [
  {
    id: 'c-1001',
    source: 'catalog',
    name: 'Emma Hartley',
    phone: '555-0142',
    email: 'emma.hartley@example.com',
    address: '28 Rosewood Lane, Camden, London',
    receivedLabel: '2 hours ago',
    receivedFull: '8 September 2026 at 1:42 pm',
    message:
      'Hi, I saw the Bridal 2026 catalog and I would love to know more about the solitaire ring. Could you let me know the lead time and whether you can do platinum? I would be looking to order in the next few weeks.',
    status: 'new',
    catalogName: 'Bridal 2026',
    items: [
      {
        category: 'Ring',
        description: 'Bridal solitaire ring with a tapered band, a raised six-prong setting and a brilliant-cut center stone.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20six-prong%20setting%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=31&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 1240,
      },
    ],
  },
  {
    id: 'c-1002',
    source: 'catalog',
    name: 'Daniel Osei',
    phone: '555-0193',
    email: 'daniel.osei@example.com',
    receivedLabel: '5 hours ago',
    receivedFull: '8 September 2026 at 10:18 am',
    message:
      'Hello, I am interested in a set to match a engagement ring I bought from you. I have picked out the halo ring, the eternity band and the stud earrings. Could you quote them together?',
    status: 'accepted',
    decidedOn: '8 September 2026',
    catalogName: 'Solitaire collection',
    items: [
      {
        category: 'Ring',
        description: 'Halo cluster ring with a round center diamond and a row of pavé shoulders.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20halo%20cluster%20ring%20with%20a%20round%20center%20diamond%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=32&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 2180,
      },
      {
        category: 'Ring',
        description: 'Full eternity band ring set with a continuous line of stones.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20full%20eternity%20band%20ring%20with%20a%20continuous%20line%20of%20diamonds%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=33&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 1890,
      },
      {
        category: 'Earring',
        description: 'Gold stud earrings with four-prong settings.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=34&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 760,
      },
    ],
  },
  {
    id: 'c-1003',
    source: 'catalog',
    name: 'Priya Raman',
    phone: '555-0227',
    email: 'priya.raman@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 4:05 pm',
    message:
      'Could you confirm if the gold bangle is available in a smaller size? I only found the standard size in the catalog.',
    status: 'new',
    catalogName: 'Everyday gold',
    items: [
      {
        category: 'Bracelet',
        description: 'Fine gold chain necklace with a solitaire diamond drop.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20bangle%20bracelet%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=35&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 950,
      },
    ],
  },
  {
    id: 'c-1004',
    source: 'catalog',
    name: 'Sophie Turner',
    phone: '555-0168',
    email: 'sophie.turner@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 9:31 am',
    message: 'Is the teardrop pendant available in rose gold?',
    status: 'rejected',
    decidedOn: '7 September 2026',
    catalogName: 'Bridal 2026',
    items: [
      {
        category: 'Pendant',
        description: 'Teardrop pendant with a pavé bail and a floating pear-cut center stone.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20teardrop%20pendant%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=36&orientation=squarish',
        metal: 'Rose gold',
        quantity: 1,
        price: 840,
      },
    ],
  },
  {
    id: 'c-1005',
    source: 'catalog',
    name: 'Marcus Bell',
    phone: '555-0251',
    email: 'marcus.bell@example.com',
    address: '14 Kings Road, Brighton',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 8:12 am',
    message: 'I would like to order two pairs of the gold drop earrings and a matching pendant for a gift.',
    status: 'new',
    catalogName: 'Festive drops',
    items: [
      {
        category: 'Earring',
        description: 'Gold drop earrings with a tiny diamond accent finish.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pair%20of%20gold%20drop%20earrings%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=37&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 2,
        price: 640,
      },
      {
        category: 'Pendant',
        description: 'Delicate gold pendant with a single small diamond dropping from a fine chain.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20drop%20pendant%20necklace%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=38&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 720,
      },
    ],
  },
  {
    id: 'c-1006',
    source: 'catalog',
    name: 'Amelia Grant',
    phone: '555-0189',
    email: 'amelia.grant@example.com',
    receivedLabel: '12 Mar',
    receivedFull: '12 March 2026 at 11:20 am',
    message: 'Could we discuss engraving options for the anniversary band?',
    status: 'accepted',
    decidedOn: '12 March 2026',
    catalogName: 'Anniversary bands',
    items: [
      {
        category: 'Ring',
        description: 'Polished yellow gold anniversary band ring with a row of small diamonds along the top.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20yellow%20gold%20anniversary%20band%20ring%20with%20a%20row%20of%20small%20diamonds%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=39&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 1160,
      },
    ],
  },
  {
    id: 'c-1007',
    source: 'catalog',
    name: 'Hana Kim',
    phone: '555-0273',
    email: 'hana.kim@example.com',
    receivedLabel: '11 Mar',
    receivedFull: '11 March 2026 at 3:55 pm',
    message: 'I am choosing between the gemstone pendant and a pair of matching studs. Do you have a set price?',
    status: 'new',
    catalogName: 'Gemstone classics',
    items: [
      {
        category: 'Ring',
        description: 'Gold ring with a single oval green gemstone set in a simple bezel.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20ring%20with%20an%20oval%20green%20gemstone%20in%20a%20simple%20bezel%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=40&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: null,
      },
      {
        category: 'Earring',
        description: 'Gold stud earrings with a single green gemstone accent.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20a%20green%20gemstone%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=41&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 480,
      },
    ],
  },
  {
    id: 'w-2001',
    source: 'widget',
    name: 'Olivia Bennett',
    phone: '555-0306',
    email: 'olivia.bennett@example.com',
    address: '5 Willow Street, Bath',
    receivedLabel: '1 hour ago',
    receivedFull: '8 September 2026 at 2:20 pm',
    message:
      'I used the design tool on your site and I love the result. Could you tell me if you can make it and what the final cost might be?',
    status: 'new',
    widgetImage:
      'https://readdy.ai/api/search-image?query=Generated%20jewelry%20design%20render%20of%20a%20dainty%20rose%20gold%20ring%20with%20a%20single%20round%20diamond%20and%20a%20twisted%20band%2C%20on%20a%20plain%20warm%20studio%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20design%20preview&width=240&height=240&seq=51&orientation=squarish',
    quantity: 1,
    estimate: {
      metal: 'Rose gold · 3.2 g',
      stones: '1 brilliant · 0.5 ct',
      labor: 'Cast + set',
      low: 2400,
      high: 2640,
    },
  },
  {
    id: 'w-2002',
    source: 'widget',
    name: 'Lucas Meyer',
    phone: '555-0338',
    email: 'lucas.meyer@example.com',
    receivedLabel: '3 hours ago',
    receivedFull: '8 September 2026 at 11:47 am',
    message: 'Would you be able to craft this as a pair of earrings instead?',
    status: 'new',
    widgetImage:
      'https://readdy.ai/api/search-image?query=Generated%20jewelry%20design%20render%20of%20a%20gold%20hoop%20earring%20with%20a%20small%20hidden%20diamond%2C%20on%20a%20plain%20warm%20studio%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20design%20preview&width=240&height=240&seq=52&orientation=squarish',
    quantity: 2,
    estimate: null,
  },
  {
    id: 'w-2003',
    source: 'widget',
    name: 'Chloe Dubois',
    phone: '555-0354',
    email: 'chloe.dubois@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 6:10 pm',
    message: 'I designed a pendant on your site, please let me know if it is possible.',
    status: 'accepted',
    decidedOn: '8 September 2026',
    widgetImage:
      'https://readdy.ai/api/search-image?query=Generated%20jewelry%20design%20render%20of%20a%20white%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%2C%20on%20a%20plain%20warm%20studio%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20design%20preview&width=240&height=240&seq=53&orientation=squarish',
    quantity: 1,
    estimate: {
      metal: 'White gold · 2.8 g',
      stones: '1 pear · 0.4 ct',
      labor: 'Cast + set',
      low: 1980,
      high: 2200,
    },
  },
  {
    id: 'w-2004',
    source: 'widget',
    name: 'Ethan Walker',
    phone: '555-0371',
    email: 'ethan.walker@example.com',
    receivedLabel: '12 Mar',
    receivedFull: '12 March 2026 at 1:02 pm',
    status: 'rejected',
    decidedOn: '12 March 2026',
    widgetImage:
      'https://readdy.ai/api/search-image?query=Generated%20jewelry%20design%20render%20of%20a%20gold%20signet%20ring%20with%20a%20plain%20flat%20face%2C%20on%20a%20plain%20warm%20studio%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20design%20preview&width=240&height=240&seq=54&orientation=squarish',
    quantity: 1,
    estimate: null,
  },
];

export function getLead(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function itemsLabel(l: Lead): string {
  if (l.source === 'widget') return `${l.quantity} item${(l.quantity ?? 0) !== 1 ? 's' : ''}`;
  const n = l.items?.length ?? 0;
  return `${n} item${n !== 1 ? 's' : ''}`;
}