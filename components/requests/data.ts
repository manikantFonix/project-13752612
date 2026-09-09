export type Status =
  | 'draft'
  | 'ready'
  | 'sent'
  | 'approved'
  | 'manufacturer'
  | 'completed';

export type ViewKey = 'front' | 'side' | 'back' | 'worn';

export const VIEWS: { key: ViewKey; label: string }[] = [
  { key: 'front', label: 'Front' },
  { key: 'side', label: 'Side' },
  { key: 'back', label: 'Back' },
  { key: 'worn', label: 'Worn' },
];

export interface RequestVersion {
  id: string;
  date: string;
  current: boolean;
}

export interface ViewSet {
  front: string;
  side: string;
  back: string;
  worn: string;
}

export interface Quote {
  amount: number;
  notes?: string;
  submitted: string;
  status: 'offered' | 'accepted' | 'rejected';
  decidedOn?: string;
}

export interface Decision {
  outcome: 'approved' | 'rejected';
  date: string;
  by: 'customer' | 'retailer';
  customerName: string;
}

export interface Request {
  id: string;
  designNo: string;
  category: string;
  status: Status;
  rejected?: boolean;
  quoteWaiting?: boolean;
  cancelled?: boolean;
  customer?: { name: string; phone: string; email: string };
  manufacturer?: { name: string; phone: string; email: string };
  linkState?: 'waiting' | 'expired' | 'used';
  decision?: Decision;
  views: ViewSet;
  viewVersions: Record<ViewKey, RequestVersion[]>;
  quote?: Quote;
  quoteHistory?: Quote[];
  description: string;
  createdDate: string;
  createdFull: string;
  updatedLabel: string;
  updatedFull: string;
  cancelLabel?: string;
}

export const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export const statusLabel: Record<Status, string> = {
  draft: 'Draft',
  ready: 'Ready',
  sent: 'Sent to Customer',
  approved: 'Approved',
  manufacturer: 'Sent to Manufacturer',
  completed: 'Completed',
};

export const locked = (s: Status) =>
  s === 'approved' || s === 'manufacturer' || s === 'completed';

const one = (date: string): RequestVersion[] => [
  { id: 'v', date, current: true },
];

const two = (d1: string, d2: string): RequestVersion[] => [
  { id: 'v1', date: d1, current: false },
  { id: 'v2', date: d2, current: true },
];

const vv = (
  front: RequestVersion[],
  rest: string
): Record<ViewKey, RequestVersion[]> => ({
  front,
  side: one(rest),
  back: one(rest),
  worn: one(rest),
});

const ringViews: ViewSet = {
  front:
    'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20raised%20six-prong%20setting%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render%2C%20clean%20composition&width=400&height=400&seq=201&orientation=squarish',
  side:
    'https://readdy.ai/api/search-image?query=Professional%20side%20profile%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20showing%20the%20band%20and%20setting%20height%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=202&orientation=squarish',
  back:
    'https://readdy.ai/api/search-image?query=Professional%20rear%20view%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20from%20behind%20the%20setting%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=203&orientation=squarish',
  worn:
    'https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20worn%20on%20a%20hand%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=204&orientation=squarish',
};

const pendantViews: ViewSet = {
  front:
    'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20teardrop%20pendant%20with%20a%20pav%C3%A9%20bail%20on%20a%20fine%20chain%20against%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=205&orientation=squarish',
  side:
    'https://readdy.ai/api/search-image?query=Professional%20side%20profile%20photograph%20of%20a%20gold%20teardrop%20pendant%20showing%20the%20bail%20profile%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=206&orientation=squarish',
  back:
    'https://readdy.ai/api/search-image?query=Professional%20rear%20view%20photograph%20of%20a%20gold%20teardrop%20pendant%20from%20behind%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=207&orientation=squarish',
  worn:
    'https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20gold%20teardrop%20pendant%20worn%20on%20a%20neck%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=208&orientation=squarish',
};

const earringViews: ViewSet = {
  front:
    'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20pair%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=209&orientation=squarish',
  side:
    'https://readdy.ai/api/search-image?query=Professional%20side%20profile%20photograph%20of%20a%20pair%20of%20gold%20stud%20earrings%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=210&orientation=squarish',
  back:
    'https://readdy.ai/api/search-image?query=Professional%20rear%20view%20photograph%20of%20a%20pair%20of%20gold%20stud%20earrings%20showing%20the%20posts%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=211&orientation=squarish',
  worn:
    'https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20gold%20stud%20earring%20worn%20on%20an%20ear%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=212&orientation=squarish',
};

const braceletViews: ViewSet = {
  front:
    'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20tennis%20bracelet%20with%20channel-set%20diamonds%20laid%20flat%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=213&orientation=squarish',
  side:
    'https://readdy.ai/api/search-image?query=Professional%20side%20profile%20photograph%20of%20a%20gold%20tennis%20bracelet%20curved%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=214&orientation=squarish',
  back:
    'https://readdy.ai/api/search-image?query=Professional%20rear%20view%20photograph%20of%20a%20gold%20tennis%20bracelet%20showing%20the%20clasp%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=215&orientation=squarish',
  worn:
    'https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20gold%20tennis%20bracelet%20worn%20on%20a%20wrist%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=216&orientation=squarish',
};

const necklaceViews: ViewSet = {
  front:
    'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20with%20a%20solitaire%20diamond%20drop%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=217&orientation=squarish',
  side:
    'https://readdy.ai/api/search-image?query=Professional%20side%20profile%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20draped%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=218&orientation=squarish',
  back:
    'https://readdy.ai/api/search-image?query=Professional%20rear%20view%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20showing%20the%20clasp%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=219&orientation=squarish',
  worn:
    'https://readdy.ai/api/search-image?query=Professional%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20hanging%20on%20a%20neck%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=400&height=400&seq=220&orientation=squarish',
};

export const requests: Request[] = [
  {
    id: 'r1',
    designNo: 'JCX-102',
    category: 'Ring',
    status: 'draft',
    views: ringViews,
    viewVersions: vv(two('2 Sep 2026', '4 Sep 2026'), '4 Sep 2026'),
    description:
      'A six-prong solitaire engagement ring in polished gold with a knife-edged band. A single round brilliant stone set tall to maximise light.',
    createdDate: '2 Sep 2026',
    createdFull: '2 September 2026',
    updatedLabel: '2 hours ago',
    updatedFull: '8 September 2026 at 1:42 pm',
  },
  {
    id: 'r2',
    designNo: 'JCX-108',
    category: 'Pendant',
    status: 'draft',
    rejected: true,
    customer: { name: 'Elena Marchetti', phone: '555-0177', email: 'elena.marchetti@example.com' },
    views: pendantViews,
    viewVersions: vv(two('1 Sep 2026', '3 Sep 2026'), '3 Sep 2026'),
    description:
      'A teardrop pendant with a pavé-set bail on a fine cable chain. The drop is held on a hidden loop so it sits flush against the chest.',
    createdDate: '1 Sep 2026',
    createdFull: '1 September 2026',
    decision: { outcome: 'rejected', date: '6 September 2026', by: 'customer', customerName: 'Elena Marchetti' },
    linkState: 'used',
    updatedLabel: '1 day ago',
    updatedFull: '7 September 2026 at 4:05 pm',
  },
  {
    id: 'r3',
    designNo: 'JCX-115',
    category: 'Earring',
    status: 'draft',
    views: earringViews,
    viewVersions: vv(one('3 Sep 2026'), '3 Sep 2026'),
    description:
      'A pair of four-prong stud earrings in gold with a short post and a butterfly catch. Designed to sit flat and catch light from every angle.',
    createdDate: '3 Sep 2026',
    createdFull: '3 September 2026',
    updatedLabel: '3 days ago',
    updatedFull: '5 September 2026 at 9:31 am',
  },
  {
    id: 'r4',
    designNo: 'JCX-119',
    category: 'Necklace',
    status: 'ready',
    customer: { name: 'Oliver Bennett', phone: '555-0241', email: 'oliver.bennett@example.com' },
    views: necklaceViews,
    viewVersions: vv(two('4 Sep 2026', '6 Sep 2026'), '6 Sep 2026'),
    description:
      'A fine gold chain dropping a single round brilliant diamond. The stone is set low in a bezel so the chain reads as one continuous line.',
    createdDate: '4 Sep 2026',
    createdFull: '4 September 2026',
    updatedLabel: '5 hours ago',
    updatedFull: '8 September 2026 at 10:18 am',
  },
  {
    id: 'r5',
    designNo: 'JCX-121',
    category: 'Ring',
    status: 'sent',
    customer: { name: 'Mia Taylor', phone: '555-0139', email: 'mia.taylor@example.com' },
    views: ringViews,
    viewVersions: vv(one('5 Sep 2026'), '5 Sep 2026'),
    description:
      'A slim gold band set with a half-carat round brilliant in a raised basket. The profile is kept low for comfort with a glinting table.',
    createdDate: '5 Sep 2026',
    createdFull: '5 September 2026',
    linkState: 'waiting',
    updatedLabel: 'Yesterday',
    updatedFull: '7 September 2026 at 6:10 pm',
  },
  {
    id: 'r6',
    designNo: 'JCX-124',
    category: 'Bracelet',
    status: 'sent',
    customer: { name: 'Ava Clarke', phone: '555-0228', email: 'ava.clarke@example.com' },
    views: braceletViews,
    viewVersions: vv(one('5 Sep 2026'), '5 Sep 2026'),
    description:
      'A tennis bracelet of channel-set diamonds on a flexible gold link. Finished with a box clasp and a safety catch for security.',
    createdDate: '5 Sep 2026',
    createdFull: '5 September 2026',
    linkState: 'used',
    updatedLabel: '2 days ago',
    updatedFull: '6 September 2026 at 11:20 am',
  },
  {
    id: 'r7',
    designNo: 'JCX-127',
    category: 'Ring',
    status: 'approved',
    customer: { name: 'Sophia Reed', phone: '555-0206', email: 'sophia.reed@example.com' },
    views: ringViews,
    viewVersions: vv(one('6 Sep 2026'), '6 Sep 2026'),
    description:
      'A cathedral-set solitaire in gold with a tapering band that rises to meet the stone. The gallery is open so light passes behind the diamond.',
    createdDate: '6 Sep 2026',
    createdFull: '6 September 2026',
    decision: { outcome: 'approved', date: '12 March 2026', by: 'customer', customerName: 'Sophia Reed' },
    linkState: 'used',
    updatedLabel: '12 Mar',
    updatedFull: '12 March 2026 at 1:02 pm',
  },
  {
    id: 'r8',
    designNo: 'JCX-129',
    category: 'Ring',
    status: 'manufacturer',
    customer: { name: 'Ethan Walker', phone: '555-0256', email: 'ethan.walker@example.com' },
    manufacturer: { name: 'Atelier Monaco', phone: '555-0401', email: 'craft@ateliermonaco.com' },
    views: ringViews,
    viewVersions: vv(one('6 Sep 2026'), '6 Sep 2026'),
    description:
      'A wide gold band with a channel of small diamonds across the top. A brushed finish with a polished inner face for comfort.',
    createdDate: '6 Sep 2026',
    createdFull: '6 September 2026',
    decision: { outcome: 'approved', date: '11 March 2026', by: 'retailer', customerName: 'Ethan Walker' },
    linkState: 'used',
    updatedLabel: 'Yesterday',
    updatedFull: '7 September 2026 at 2:45 pm',
  },
  {
    id: 'r9',
    designNo: 'JCX-131',
    category: 'Pendant',
    status: 'manufacturer',
    quoteWaiting: true,
    customer: { name: 'Grace Hall', phone: '555-0194', email: 'grace.hall@example.com' },
    manufacturer: { name: 'Novum Fineworks', phone: '555-0432', email: 'studio@novumfineworks.com' },
    views: pendantViews,
    viewVersions: vv(one('7 Sep 2026'), '7 Sep 2026'),
    description:
      'A pendant of a single oval diamond on a fine gold chain, set east-west in a minimal bezel with a hidden bail.',
    createdDate: '7 Sep 2026',
    createdFull: '7 September 2026',
    decision: { outcome: 'approved', date: '12 March 2026', by: 'customer', customerName: 'Grace Hall' },
    linkState: 'used',
    quote: {
      amount: 2480,
      notes: 'Includes casting, setting the two diamonds and a high-polish finish. Lead time three weeks.',
      submitted: '8 September 2026',
      status: 'offered',
    },
    updatedLabel: '3 hours ago',
    updatedFull: '8 September 2026 at 11:47 am',
  },
  {
    id: 'r12',
    designNo: 'JCX-130',
    category: 'Earring',
    status: 'manufacturer',
    customer: { name: 'Hana Kim', phone: '555-0273', email: 'hana.kim@example.com' },
    manufacturer: { name: 'Craftline Guild', phone: '555-0418', email: 'orders@craftlineguild.com' },
    views: earringViews,
    viewVersions: vv(one('7 Sep 2026'), '7 Sep 2026'),
    description:
      'A pair of drop earrings with a brushed gold bar holding a single round diamond each. A secure lever-back fitting.',
    createdDate: '7 Sep 2026',
    createdFull: '7 September 2026',
    decision: { outcome: 'approved', date: '12 March 2026', by: 'customer', customerName: 'Hana Kim' },
    linkState: 'used',
    quote: {
      amount: 1760,
      notes: 'Pair with matched stones. Finished by hand.',
      submitted: '8 September 2026',
      status: 'accepted',
      decidedOn: '12 March 2026',
    },
    updatedLabel: '1 day ago',
    updatedFull: '7 September 2026 at 9:31 am',
  },
  {
    id: 'r10',
    designNo: 'JCX-133',
    category: 'Earring',
    status: 'completed',
    customer: { name: 'Liam Foster', phone: '555-0338', email: 'liam.foster@example.com' },
    manufacturer: { name: 'Atelier Monaco', phone: '555-0401', email: 'craft@ateliermonaco.com' },
    views: earringViews,
    viewVersions: vv(one('7 Sep 2026'), '7 Sep 2026'),
    description:
      'A pair of hoops with a single diamond set into each end. A hinged closure that locks with a click.',
    createdDate: '7 Sep 2026',
    createdFull: '7 September 2026',
    decision: { outcome: 'approved', date: '12 March 2026', by: 'customer', customerName: 'Liam Foster' },
    quote: {
      amount: 1620,
      notes: 'Completed and polished.',
      submitted: '12 March 2026',
      status: 'accepted',
      decidedOn: '12 March 2026',
    },
    updatedLabel: '4 days ago',
    updatedFull: '8 September 2026 at 4:05 pm',
  },
  {
    id: 'r11',
    designNo: 'JCX-135',
    category: 'Ring',
    status: 'draft',
    cancelled: true,
    views: ringViews,
    viewVersions: vv(one('1 Sep 2026'), '1 Sep 2026'),
    description:
      'A plain polished gold band with a slight dome profile. Simple, everyday and timeless.',
    createdDate: '1 Sep 2026',
    createdFull: '1 September 2026',
    updatedLabel: '1 week ago',
    updatedFull: '1 September 2026 at 3:55 pm',
    cancelLabel: '1 Sep 2026',
  },
];

let newRequest: Request | null = null;

export function registerNewRequest(category: string, description: string) {
  newRequest = {
    id: 'new-request',
    designNo: 'JCX-139',
    category,
    status: 'draft',
    views: ringViews,
    viewVersions: vv(one('8 Sep 2026'), '8 Sep 2026'),
    description,
    createdDate: '8 Sep 2026',
    createdFull: '8 September 2026',
    updatedLabel: 'just now',
    updatedFull: '8 September 2026',
  };
}

const fallbackNewRequest: Request = {
  id: 'new-request',
  designNo: 'JCX-139',
  category: 'Ring',
  status: 'draft',
  views: ringViews,
  viewVersions: vv(one('8 Sep 2026'), '8 Sep 2026'),
  description:
    'A single round brilliant set in a raised six-prong basket with a knife-edged band in polished gold.',
  createdDate: '8 Sep 2026',
  createdFull: '8 September 2026',
  updatedLabel: 'just now',
  updatedFull: '8 September 2026',
};

export function getRequest(id: string): Request | undefined {
  if (id === 'new-request') return newRequest ?? fallbackNewRequest;
  return requests.find((r) => r.id === id);
}