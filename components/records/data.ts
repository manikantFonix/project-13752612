import { requests, type Request, type Status } from '../requests/data';

export type RecordKind = 'customer' | 'manufacturer';

export interface CustomerEmail {
  label: string;
  email: string;
}

export interface LinkedProject {
  id: string;
  designNo: string;
  category: string;
  status: Status;
  subtitle: string;
  thumb: string;
  date: string;
}

export interface ActivityItem {
  id: string;
  kind: 'render' | 'design' | 'request';
  title: string;
  project: string;
  time: string;
  date: string;
}

export type MfrStatus = 'available' | 'busy' | 'delayed';

export interface SentRequest {
  designNo: string;
  category: string;
  statusText: string;
  statusTone: 'green' | 'violet' | 'gray';
  date: string;
  thumb: string;
  route: string;
}

export interface TimelineStage {
  label: string;
  date: string;
  done: boolean;
  current?: boolean;
  icon: string;
}

export interface RecordItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  contactName?: string;
  active?: boolean;
  requestIds: string[];
  tag?: string;
  emails?: CustomerEmail[];
  clientSince?: string;
  lastInteraction?: string;
  totalSpent?: string;
  activeProjects?: number;
  linkedProjects?: LinkedProject[];
  activity?: ActivityItem[];
  specialty?: string;
  avgResponse?: string;
  lastActivity?: string;
  totalValue?: string;
  completed?: number;
  pending?: number;
  totalRequests?: number;
  mfrStatus?: MfrStatus;
  sentRequests?: SentRequest[];
  timeline?: TimelineStage[];
  latestNote?: string;
  location?: string;
}

export const CUSTOMER_FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export interface KindConfig {
  kind: RecordKind;
  title: string;
  heading: string;
  searchPlaceholder: string;
  addLabel: string;
  editLabel: string;
  deleteName: string;
  emptyText: string;
  detailLabel: string;
  detailEmailNote: string;
  hasChips: boolean;
  chips: { id: string; label: string }[];
  historyEmpty: string;
}

export const CUSTOMER_CONFIG: KindConfig = {
  kind: 'customer',
  title: 'Customers',
  heading: 'Customers',
  searchPlaceholder: 'Search customers',
  addLabel: 'Add a customer',
  editLabel: 'Edit customer',
  deleteName: 'Delete customer',
  emptyText: 'No customers yet. Add one when you start a commission.',
  detailLabel: 'Customer',
  detailEmailNote: 'The approval link is sent here.',
  hasChips: false,
  chips: [],
  historyEmpty: 'No requests yet.',
};

export const MANUFACTURER_CONFIG: KindConfig = {
  kind: 'manufacturer',
  title: 'Manufacturers',
  heading: 'Manufacturers',
  searchPlaceholder: 'Search manufacturers',
  addLabel: 'Add a manufacturer',
  editLabel: 'Edit manufacturer',
  deleteName: 'Delete manufacturer',
  emptyText: 'No manufacturers yet. Add one before routing a request.',
  detailLabel: 'Manufacturer',
  detailEmailNote: 'The quotation link is sent here.',
  hasChips: true,
  chips: [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ],
  historyEmpty: 'No requests yet.',
};

export const customers: RecordItem[] = [
  {
    id: 'c1',
    name: 'Elena Whitmore',
    email: 'elena.whitmore@luxebrand.com',
    tag: 'VIP Client',
    emails: [
      { label: 'Design', email: 'elena@luxebrand.com' },
      { label: 'Procurement', email: 'procurement@luxebrand.com' },
      { label: 'Finance', email: 'billing@luxebrand.com' },
    ],
    phone: '+1 (310) 884-2201',
    address: 'Beverly Hills, CA',
    clientSince: 'Jan 12, 2026',
    lastInteraction: 'Apr 28, 2026',
    totalSpent: '$48.2k',
    activeProjects: 3,
    notes: 'Commissioning a pendant for an anniversary. Prefers polished gold. Very high-end briefs, timed product drops.',
    requestIds: ['r2', 'r1', 'r4'],
  },
  {
    id: 'c2',
    name: 'Marcus Hale',
    email: 'marcus@craftindustries.com',
    tag: 'Wholesale',
    emails: [{ label: 'Work', email: 'marcus@craftindustries.com' }],
    phone: '+1 (212) 555-0148',
    address: 'Tribeca, New York',
    clientSince: 'Feb 3, 2026',
    lastInteraction: 'Apr 21, 2026',
    totalSpent: '$21k',
    activeProjects: 1,
    requestIds: ['r4'],
  },
  {
    id: 'c3',
    name: 'Sophia Laurent',
    email: 'design@lumiere-group.fr',
    tag: 'Retail',
    emails: [{ label: 'Work', email: 'design@lumiere-group.fr' }],
    phone: '+33 1 44 55 90 12',
    address: 'Paris, France',
    clientSince: 'Mar 9, 2026',
    lastInteraction: 'Apr 18, 2026',
    totalSpent: '$15.4k',
    activeProjects: 2,
    requestIds: ['r5'],
  },
  {
    id: 'c4',
    name: 'Isabelle Chan',
    email: 'isabelle.chan@ateliermoi.com',
    tag: 'VIP Client',
    emails: [{ label: 'Work', email: 'isabelle.chan@ateliermoi.com' }],
    phone: '+852 5550 4417',
    address: 'Central, Hong Kong',
    clientSince: 'Jan 27, 2026',
    lastInteraction: 'Apr 16, 2026',
    totalSpent: '$32.9k',
    activeProjects: 1,
    requestIds: ['r6'],
  },
  {
    id: 'c5',
    name: 'Amara Osei',
    email: 'amara.osei@outlook.com',
    tag: 'Private',
    emails: [{ label: 'Personal', email: 'amara.osei@outlook.com' }],
    phone: '+1 (404) 555-0198',
    address: 'Atlanta, GA',
    clientSince: 'Mar 22, 2026',
    lastInteraction: 'Apr 12, 2026',
    totalSpent: '$8.1k',
    activeProjects: 1,
    requestIds: ['r7'],
  },
  {
    id: 'c6',
    name: 'Valentina Romano',
    email: 'valentina@valentini-group.it',
    tag: 'Wholesale',
    emails: [{ label: 'Work', email: 'valentina@valentini-group.it' }],
    phone: '+39 02 5550 1188',
    address: 'Milan, Italy',
    clientSince: 'Apr 2, 2026',
    lastInteraction: 'Apr 10, 2026',
    totalSpent: '$19.7k',
    activeProjects: 2,
    requestIds: ['r8'],
  },
  {
    id: 'c7',
    name: 'Nadia Al-Rashidi',
    email: 'nadia.alrashidi@aurelia.ae',
    tag: 'VIP Client',
    emails: [{ label: 'Work', email: 'nadia.alrashidi@aurelia.ae' }],
    phone: '+971 4 555 0192',
    address: 'Dubai, UAE',
    clientSince: 'Jan 18, 2026',
    lastInteraction: 'Apr 6, 2026',
    totalSpent: '$61k',
    activeProjects: 3,
    requestIds: ['r9', 'r12'],
  },
  {
    id: 'c8',
    name: 'Jennifer Park',
    email: 'jennifer.lux@kinpearl.com',
    tag: 'Private',
    emails: [{ label: 'Work', email: 'jennifer.lux@kinpearl.com' }],
    phone: '+1 (415) 555-0233',
    address: 'San Francisco, CA',
    clientSince: 'Apr 14, 2026',
    lastInteraction: 'Apr 2, 2026',
    totalSpent: '$6.4k',
    activeProjects: 0,
    requestIds: ['r12'],
  },
  {
    id: 'c9',
    name: 'Liam Foster',
    email: 'liam.foster@example.com',
    phone: '555-0338',
    notes: 'Recently moved to a new address.',
    requestIds: ['r10'],
  },
  {
    id: 'c10',
    name: 'Isla Grant',
    email: 'isla.grant@example.com',
    phone: '555-0362',
    requestIds: [],
  },
];

export const manufacturers: RecordItem[] = [
  {
    id: 'm1',
    name: 'ArtisanGold Co.',
    email: 'orders@artisangold.it',
    contactName: 'Marco Benetti',
    active: true,
    specialty: 'Gold Specialist',
    emails: [
      { label: 'Orders', email: 'orders@artisangold.it' },
      { label: 'Production', email: 'production@artisangold.it' },
    ],
    phone: '+39 02 4567 8901',
    address: 'Milan, Italy',
    location: 'Milan, Italy',
    avgResponse: '18 hrs',
    lastActivity: 'Apr 28, 2026',
    totalRequests: 6,
    completed: 2,
    totalValue: '$28,400',
    pending: 1,
    mfrStatus: 'busy',
    sentRequests: [
      {
        designNo: 'JCJ-136',
        category: 'Pendant',
        statusText: 'In Production',
        statusTone: 'violet',
        date: 'Apr 20, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20teardrop%20pendant%20with%20a%20pav%C3%A9%20bail%20on%20a%20fine%20chain%20against%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=192&height=192&seq=501&orientation=squarish',
        route: '/requests/r9',
      },
      {
        designNo: 'JCJ-122',
        category: 'Ring',
        statusText: 'Completed',
        statusTone: 'green',
        date: 'Mar 12, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20raised%20six-prong%20setting%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=192&height=192&seq=502&orientation=squarish',
        route: '/requests/r8',
      },
      {
        designNo: 'JCJ-118',
        category: 'Earring',
        statusText: 'Completed',
        statusTone: 'green',
        date: 'Feb 18, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20pair%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20render&width=192&height=192&seq=503&orientation=squarish',
        route: '/requests/r10',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Apr 20, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Apr 21, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 23, 2026', done: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: 'Apr 23, 2026', done: true, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: 'Apr 25, 2026', done: true, current: true, icon: 'ri-tools-line' },
      { label: 'Completed', date: 'Est. Apr 30, 2026', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote:
      'Casting completed. Stone setting begins tomorrow. Estimated completion Apr 30.',
    requestIds: ['r8', 'r10'],
  },
  {
    id: 'm2',
    name: 'GemCraft Pa...',
    email: 'studio@gemcraftparis.fr',
    contactName: 'Imogen Vale',
    active: true,
    specialty: 'Gemstone Specialist',
    emails: [{ label: 'Studio', email: 'studio@gemcraftparis.fr' }],
    phone: '+33 1 4455 9087',
    address: 'Paris, France',
    location: 'Paris, France',
    avgResponse: '12 hrs',
    lastActivity: 'Apr 25, 2026',
    totalRequests: 5,
    completed: 1,
    totalValue: '$19,800',
    pending: 1,
    mfrStatus: 'available',
    sentRequests: [
      {
        designNo: 'JCJ-131',
        category: 'Pendant',
        statusText: 'Quote Received',
        statusTone: 'gray',
        date: 'Apr 16, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20oval%20diamond%20pendant%20on%20a%20fine%20chain%20set%20east-west%20in%20a%20minimal%20bezel%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20render&width=192&height=192&seq=504&orientation=squarish',
        route: '/requests/r9',
      },
      {
        designNo: 'JCJ-115',
        category: 'Earring',
        statusText: 'Completed',
        statusTone: 'green',
        date: 'Feb 27, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20gold%20drop%20earrings%20with%20a%20brushed%20gold%20bar%20holding%20a%20single%20round%20diamond%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20luxury%20jewelry%20render&width=192&height=192&seq=505&orientation=squarish',
        route: '/requests/r12',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Apr 16, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Apr 17, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 19, 2026', done: true, current: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: '—', done: false, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: '—', done: false, icon: 'ri-tools-line' },
      { label: 'Completed', date: '—', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote: 'Awaiting approval on the quote before casting begins.',
    notes: 'Quick on small castings. Strong on minimal bezels.',
    requestIds: ['r9'],
  },
  {
    id: 'm3',
    name: 'PlatinumCraft L...',
    email: 'orders@platinumcraft.ch',
    contactName: 'Leo Sanchez',
    active: true,
    specialty: 'Platinum Specialist',
    emails: [{ label: 'Orders', email: 'orders@platinumcraft.ch' }],
    phone: '+41 44 555 0188',
    address: 'Zürich, Switzerland',
    location: 'Zürich, Switzerland',
    avgResponse: '20 hrs',
    lastActivity: 'Apr 22, 2026',
    totalRequests: 4,
    completed: 1,
    totalValue: '$17,200',
    pending: 0,
    mfrStatus: 'delayed',
    sentRequests: [
      {
        designNo: 'JCJ-129',
        category: 'Ring',
        statusText: 'In Production',
        statusTone: 'violet',
        date: 'Apr 11, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20wide%20gold%20band%20with%20a%20channel%20of%20small%20diamonds%20and%20a%20brushed%20finish%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20luxury%20jewelry%20render&width=192&height=192&seq=506&orientation=squarish',
        route: '/requests/r8',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Apr 11, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Apr 12, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 14, 2026', done: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: 'Apr 14, 2026', done: true, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: 'Apr 16, 2026', done: true, current: true, icon: 'ri-tools-line' },
      { label: 'Completed', date: 'Est. May 4, 2026', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote: 'Polishing backlog. Estimated finish pushed to May 4.',
    requestIds: ['r8'],
  },
  {
    id: 'm4',
    name: 'DiamondSet L...',
    email: 'hello@diamondset.io',
    contactName: 'Priya Shah',
    active: true,
    specialty: 'Diamond Setting',
    emails: [{ label: 'Work', email: 'hello@diamondset.io' }],
    phone: '+1 (212) 555-0143',
    address: 'New York, USA',
    location: 'New York, USA',
    avgResponse: '15 hrs',
    lastActivity: 'Apr 19, 2026',
    totalRequests: 3,
    completed: 0,
    totalValue: '$11,600',
    pending: 1,
    mfrStatus: 'available',
    sentRequests: [
      {
        designNo: 'JCJ-124',
        category: 'Bracelet',
        statusText: 'Quote Received',
        statusTone: 'gray',
        date: 'Apr 8, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20tennis%20bracelet%20with%20channel-set%20diamonds%20laid%20flat%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20luxury%20jewelry%20render&width=192&height=192&seq=507&orientation=squarish',
        route: '/requests/r6',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Apr 8, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Apr 9, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 10, 2026', done: true, current: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: '—', done: false, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: '—', done: false, icon: 'ri-tools-line' },
      { label: 'Completed', date: '—', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote: 'Awaiting approval on the quote.',
    requestIds: ['r6'],
  },
  {
    id: 'm5',
    name: 'RubyMasters Flore...',
    email: 'craft@rubymasters.it',
    contactName: 'Noah Reed',
    active: true,
    specialty: 'Colored Gemstones',
    emails: [{ label: 'Orders', email: 'craft@rubymasters.it' }],
    phone: '+39 055 555 0122',
    address: 'Florence, Italy',
    location: 'Florence, Italy',
    avgResponse: '22 hrs',
    lastActivity: 'Apr 15, 2026',
    totalRequests: 4,
    completed: 0,
    totalValue: '$9,900',
    pending: 2,
    mfrStatus: 'busy',
    sentRequests: [
      {
        designNo: 'JCJ-135',
        category: 'Ring',
        statusText: 'Quote Received',
        statusTone: 'gray',
        date: 'Apr 3, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20gold%20ring%20set%20with%20a%20ruby%20center%20stone%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20luxury%20jewelry%20render&width=192&height=192&seq=509&orientation=squarish',
        route: '/requests/r7',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Apr 3, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Apr 4, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 6, 2026', done: true, current: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: '—', done: false, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: '—', done: false, icon: 'ri-tools-line' },
      { label: 'Completed', date: '—', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote: 'Waiting on stone sourcing confirmation.',
    requestIds: [],
  },
  {
    id: 'm6',
    name: 'PearlHouse To...',
    email: 'orders@pearlhouse.jp',
    contactName: 'Aiko Tanaka',
    active: true,
    specialty: 'Pearl Jewelry',
    emails: [{ label: 'Orders', email: 'orders@pearlhouse.jp' }],
    phone: '+81 3 5550 0199',
    address: 'Tokyo, Japan',
    location: 'Tokyo, Japan',
    avgResponse: '16 hrs',
    lastActivity: 'Apr 12, 2026',
    totalRequests: 2,
    completed: 0,
    totalValue: '$7,400',
    pending: 1,
    mfrStatus: 'available',
    sentRequests: [
      {
        designNo: 'JCJ-121',
        category: 'Necklace',
        statusText: 'Quote Received',
        statusTone: 'gray',
        date: 'Mar 29, 2026',
        thumb: 'https://readdy.ai/api/search-image?query=Professional%20front%20view%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20with%20a%20single%20pearl%20pendant%20on%20a%20pure%20white%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20luxury%20jewelry%20render&width=192&height=192&seq=508&orientation=squarish',
        route: '/requests/r4',
      },
    ],
    timeline: [
      { label: 'Request Sent', date: 'Mar 29, 2026', done: true, icon: 'ri-send-plane-line' },
      { label: 'Manufacturer Viewed', date: 'Mar 30, 2026', done: true, icon: 'ri-eye-line' },
      { label: 'Quote Submitted', date: 'Apr 1, 2026', done: true, current: true, icon: 'ri-file-chart-line' },
      { label: 'Approved', date: '—', done: false, icon: 'ri-check-double-line' },
      { label: 'Production Started', date: '—', done: false, icon: 'ri-tools-line' },
      { label: 'Completed', date: '—', done: false, icon: 'ri-checkbox-blank-circle-line' },
    ],
    latestNote: 'Awaiting approval on the quote.',
    requestIds: [],
  },
];

export interface HistoryItem {
  id: string;
  designNo: string;
  category: string;
  status: Status;
  cancelled?: boolean;
  thumb: string;
  date: string;
}

export function historyFor(record: RecordItem): HistoryItem[] {
  return record.requestIds
    .map((id) => requests.find((r) => r.id === id))
    .filter((r): r is Request => !!r)
    .map((r) => ({
      id: r.id,
      designNo: r.designNo,
      category: r.category,
      status: r.status,
      cancelled: r.cancelled,
      thumb: r.views.front,
      date: r.createdDate,
    }));
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function primaryEmail(record: RecordItem): string {
  return record.emails?.[0]?.email ?? record.email;
}

export function linkedProjects(record: RecordItem): LinkedProject[] {
  const byDate = requests
    .filter((r) => record.requestIds.includes(r.id))
    .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1))
    .slice(0, 3);
  return byDate.map((r) => ({
    id: r.id,
    designNo: r.designNo,
    category: r.category,
    status: r.status,
    subtitle:
      r.status === 'draft'
        ? 'Draft'
        : r.status === 'approved'
        ? 'Approved'
        : 'Shared with customer',
    thumb: r.views.front,
    date: r.createdDate,
  }));
}

export function activityFor(record: RecordItem): ActivityItem[] {
  const byDate = requests
    .filter((r) => record.requestIds.includes(r.id))
    .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  const items: ActivityItem[] = [];
  if (byDate[0]) {
    items.push({
      id: `${byDate[0].id}-render`,
      kind: 'render',
      title: 'Render completed',
      project: `${byDate[0].designNo} ${byDate[0].category} 3D render finished.`,
      time: '9:15 AM',
      date: 'Apr 28, 2026',
    });
  }
  if (byDate[1]) {
    items.push({
      id: `${byDate[1].id}-design`,
      kind: 'design',
      title: 'Design started',
      project: `${byDate[1].designNo} ${byDate[1].category} design work began.`,
      time: '11:00 AM',
      date: 'Apr 28, 2026',
    });
  }
  if (byDate[2]) {
    items.push({
      id: `${byDate[2].id}-request`,
      kind: 'request',
      title: 'New request',
      project: `${byDate[2].designNo} ${byDate[2].category} request created.`,
      time: '2:30 PM',
      date: 'Apr 28, 2026',
    });
  }
  return items;
}