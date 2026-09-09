export type AnalyticsState =
  | 'default'
  | 'noActivity'
  | 'noCatalogs'
  | 'noWidget'
  | 'deleted'
  | 'archiveEmpty'
  | 'noMatch'
  | 'loading'
  | 'error';

export type PeriodId = '30d' | '90d' | 'year' | 'all';
export type SectionMode = 'ready' | 'loading' | 'error';

export const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export interface PeriodOption {
  id: PeriodId;
  label: string;
  range: string;
}

export const periods: PeriodOption[] = [
  { id: '30d', label: 'Last 30 days', range: '1 August – 30 August 2026' },
  { id: '90d', label: 'Last 90 days', range: '2 June – 30 August 2026' },
  { id: 'year', label: 'This year', range: '1 January – 30 August 2026' },
  { id: 'all', label: 'All time', range: 'Since 14 May 2025' },
];

export const periodFor = (id: PeriodId): PeriodOption =>
  periods.find((p) => p.id === id)!;

export const requestStatusColors = [
  '#152E56',
  '#172D54',
  '#748AB4',
  '#3D6B54',
  '#C6CFE0',
  '#5D6C8A',
];

export const statusOrder = [
  'New',
  'In production',
  'Awaiting quote',
  'Approved',
  'Needs changes',
  'Completed',
];

export interface MonthlyPoint {
  month: string;
  designs: number;
  completed: number;
}

export interface PipelineStage {
  label: string;
  count: number;
}

export interface ProductSlice {
  label: string;
  count: number;
}

export interface Slice {
  label: string;
  count: number;
}

export interface CatalogRow {
  id: string | null;
  name: string;
  visitors: number;
  productsPublished: number;
  inquiries: number;
  deleted: boolean;
}

export interface InquiryGroup {
  label: string;
  count: number;
}

export interface DesignRow {
  id: string;
  number: string;
  category: string;
  description: string;
  customer: string | null;
  outcome: string;
  madeLabel: string;
  thumbnail: string;
}

const thumbs = [
  'https://readdy.ai/api/search-image?query=close-up%20studio%20photograph%20of%20a%20single%20gold%20ring%20with%20a%20round%20diamond%20on%20a%20plain%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20clean%20minimalist%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=41&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20delicate%20gold%20necklace%20with%20a%20small%20round%20pendant%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=42&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20pair%20of%20polished%20gold%20hoop%20earrings%20on%20a%20plain%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=43&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20slim%20gold%20bangle%20bracelet%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=44&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20gold%20teardrop%20pendant%20with%20an%20emerald%20stone%20on%20a%20plain%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=45&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20an%20ornate%20gold%20brooch%20with%20a%20pearl%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=46&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20rose%20gold%20plain%20wedding%20band%20ring%20on%20a%20plain%20white%20background%2C%20soft%20even%20diffused%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=47&orientation=squarish',
  'https://readdy.ai/api/search-image?query=studio%20photograph%20of%20a%20pair%20of%20gold%20stud%20earrings%20with%20small%20diamonds%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting%2C%20clean%20minimalist%20jewelry%20product%20photography%2C%20centered%2C%20high%20realism&width=80&height=80&seq=48&orientation=squarish',
];

const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Brooches'];
const outcomes = ['Approved', 'Completed', 'Needs changes', 'Awaiting quote', 'In production', 'New'];
const customers = [
  'Priya Menon', 'Daniel Okafor', 'Sofia Alvarez', 'James Whitfield', 'Neha Patel',
  'Lucia Rossi', 'Marcus Lee', 'Amelia Grant', 'Rafael Souza', 'Grace Kim',
  'Elena Petrova', 'Ethan Brooks',
];
const descriptions = [
  'Diamond solitaire engagement ring', 'Pearl drop wedding necklace',
  'Halo stud earrings', 'Custom engraved signet ring', 'Layered chain necklace',
  'Tennis bracelet with sapphires', 'Emerald teardrop pendant', 'Victorian style brooch',
  'Rose gold band with channel set stones', 'Pearl cluster hoop earrings',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmtMade(daysBack: number): string {
  const dt = new Date(Date.UTC(2026, 7, 30) - daysBack * 86400000);
  return `${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
}

export const archiveRows: DesignRow[] = Array.from({ length: 58 }, (_, i) => ({
  id: `r${i + 1}`,
  number: `DF-${1042 + i}`,
  category: categories[i % categories.length],
  description: descriptions[i % descriptions.length],
  customer: i % 4 === 0 ? null : customers[i % customers.length],
  outcome: outcomes[i % outcomes.length],
  madeLabel: fmtMade(i * 3),
  thumbnail: thumbs[i % thumbs.length],
}));

export interface PeriodData {
  activity: {
    designsGenerated: number;
    refinements: number;
    approvals: number;
    rejections: number;
    quotesReceived: number;
    quotesAccepted: number;
  };
  requestsByStatus: Slice[];
  monthly: MonthlyPoint[];
  pipeline: PipelineStage[];
  productMix: ProductSlice[];
  cards: {
    approvalDays: number;
    refinementsPerDesign: number;
    reachingProduction: number;
  };
  catalogs: CatalogRow[];
  inquiries: {
    received: number;
    decided: number;
    byOrigin: InquiryGroup[];
    byDecision: InquiryGroup[];
  };
  widget: {
    designsGenerated: number;
    estimatesProduced: number;
    inquiriesRaised: number;
  };
}

const MONTHLY_30D: MonthlyPoint[] = [
  { month: 'Apr', designs: 6, completed: 3 },
  { month: 'May', designs: 9, completed: 5 },
  { month: 'Jun', designs: 8, completed: 4 },
  { month: 'Jul', designs: 12, completed: 7 },
  { month: 'Aug', designs: 13, completed: 8 },
];

const PIPELINE_30D: PipelineStage[] = [
  { label: 'Draft', count: 73 },
  { label: 'Ready', count: 68 },
  { label: 'Sent to customer', count: 61 },
  { label: 'Approved', count: 49 },
  { label: 'With a manufacturer', count: 33 },
  { label: 'Completed', count: 22 },
];

const PRODUCT_MIX_30D: ProductSlice[] = [
  { label: 'Rings', count: 16 },
  { label: 'Necklaces', count: 11 },
  { label: 'Earrings', count: 9 },
  { label: 'Bracelets', count: 6 },
  { label: 'Pendants', count: 4 },
  { label: 'Brooches', count: 2 },
];

const base30d: PeriodData = {
  activity: {
    designsGenerated: 48,
    refinements: 12,
    approvals: 31,
    rejections: 9,
    quotesReceived: 20,
    quotesAccepted: 17,
  },
  requestsByStatus: [
    { label: 'New', count: 8 },
    { label: 'In production', count: 11 },
    { label: 'Awaiting quote', count: 6 },
    { label: 'Approved', count: 17 },
    { label: 'Needs changes', count: 9 },
    { label: 'Completed', count: 22 },
  ],
  monthly: MONTHLY_30D,
  pipeline: PIPELINE_30D,
  productMix: PRODUCT_MIX_30D,
  cards: {
    approvalDays: 4.2,
    refinementsPerDesign: 0.6,
    reachingProduction: 24,
  },
  catalogs: [
    { id: 'c1', name: 'Bridal Collection', visitors: 214, productsPublished: 36, inquiries: 58 },
    { id: 'c2', name: 'Everyday Gold', visitors: 120, productsPublished: 24, inquiries: 31 },
  ],
  inquiries: {
    received: 89,
    decided: 64,
    byOrigin: [
      { label: 'From your catalog', count: 61 },
      { label: 'From your website widget', count: 28 },
    ],
    byDecision: [
      { label: 'Accepted', count: 42 },
      { label: 'Rejected', count: 13 },
      { label: 'Not decided yet', count: 25 },
    ],
  },
  widget: { designsGenerated: 21, estimatesProduced: 9, inquiriesRaised: 12 },
};

const scaled: Record<Exclude<PeriodId, '30d'>, PeriodData> = {
  '90d': {
    activity: {
      designsGenerated: 138,
      refinements: 39,
      approvals: 91,
      rejections: 26,
      quotesReceived: 58,
      quotesAccepted: 49,
    },
    requestsByStatus: [
      { label: 'New', count: 24 },
      { label: 'In production', count: 33 },
      { label: 'Awaiting quote', count: 17 },
      { label: 'Approved', count: 48 },
      { label: 'Needs changes', count: 27 },
      { label: 'Completed', count: 64 },
    ],
    monthly: [
      { month: 'Jun', designs: 32, completed: 16 },
      { month: 'Jul', designs: 44, completed: 22 },
      { month: 'Aug', designs: 62, completed: 30 },
    ],
    pipeline: [
      { label: 'Draft', count: 138 },
      { label: 'Ready', count: 129 },
      { label: 'Sent to customer', count: 117 },
      { label: 'Approved', count: 98 },
      { label: 'With a manufacturer', count: 67 },
      { label: 'Completed', count: 64 },
    ],
    productMix: [
      { label: 'Rings', count: 46 },
      { label: 'Necklaces', count: 33 },
      { label: 'Earrings', count: 27 },
      { label: 'Bracelets', count: 19 },
      { label: 'Pendants', count: 9 },
      { label: 'Brooches', count: 4 },
    ],
    cards: {
      approvalDays: 4.8,
      refinementsPerDesign: 0.6,
      reachingProduction: 24,
    },
    catalogs: [
      { id: 'c1', name: 'Bridal Collection', visitors: 601, productsPublished: 36, inquiries: 172 },
      { id: 'c2', name: 'Everyday Gold', visitors: 349, productsPublished: 24, inquiries: 88 },
      { id: 'c3', name: 'Statement Pieces', visitors: 96, productsPublished: 12, inquiries: 30 },
    ],
    inquiries: {
      received: 247,
      decided: 183,
      byOrigin: [
        { label: 'From your catalog', count: 169 },
        { label: 'From your website widget', count: 78 },
      ],
      byDecision: [
        { label: 'Accepted', count: 121 },
        { label: 'Rejected', count: 38 },
        { label: 'Not decided yet', count: 64 },
      ],
    },
    widget: { designsGenerated: 63, estimatesProduced: 27, inquiriesRaised: 34 },
  },
  year: {
    activity: {
      designsGenerated: 486,
      refinements: 141,
      approvals: 322,
      rejections: 91,
      quotesReceived: 204,
      quotesAccepted: 172,
    },
    requestsByStatus: [
      { label: 'New', count: 85 },
      { label: 'In production', count: 117 },
      { label: 'Awaiting quote', count: 60 },
      { label: 'Approved', count: 169 },
      { label: 'Needs changes', count: 95 },
      { label: 'Completed', count: 226 },
    ],
    monthly: [
      { month: 'Jan', designs: 48, completed: 22 },
      { month: 'Feb', designs: 52, completed: 26 },
      { month: 'Mar', designs: 61, completed: 30 },
      { month: 'Apr', designs: 66, completed: 33 },
      { month: 'May', designs: 73, completed: 40 },
      { month: 'Jun', designs: 63, completed: 35 },
      { month: 'Jul', designs: 68, completed: 39 },
      { month: 'Aug', designs: 55, completed: 28 },
    ],
    pipeline: [
      { label: 'Draft', count: 486 },
      { label: 'Ready', count: 455 },
      { label: 'Sent to customer', count: 411 },
      { label: 'Approved', count: 345 },
      { label: 'With a manufacturer', count: 236 },
      { label: 'Completed', count: 226 },
    ],
    productMix: [
      { label: 'Rings', count: 162 },
      { label: 'Necklaces', count: 117 },
      { label: 'Earrings', count: 95 },
      { label: 'Bracelets', count: 66 },
      { label: 'Pendants', count: 31 },
      { label: 'Brooches', count: 15 },
    ],
    cards: {
      approvalDays: 5.1,
      refinementsPerDesign: 0.6,
      reachingProduction: 24,
    },
    catalogs: [
      { id: 'c1', name: 'Bridal Collection', visitors: 2143, productsPublished: 36, inquiries: 640 },
      { id: 'c2', name: 'Everyday Gold', visitors: 1205, productsPublished: 24, inquiries: 322 },
      { id: 'c3', name: 'Statement Pieces', visitors: 356, productsPublished: 12, inquiries: 108 },
      { id: 'c4', name: 'Vintage Revival', visitors: 189, productsPublished: 8, inquiries: 54 },
    ],
    inquiries: {
      received: 871,
      decided: 648,
      byOrigin: [
        { label: 'From your catalog', count: 601 },
        { label: 'From your website widget', count: 270 },
      ],
      byDecision: [
        { label: 'Accepted', count: 428 },
        { label: 'Rejected', count: 135 },
        { label: 'Not decided yet', count: 223 },
      ],
    },
    widget: { designsGenerated: 224, estimatesProduced: 96, inquiriesRaised: 122 },
  },
  all: {
    activity: {
      designsGenerated: 1247,
      refinements: 389,
      approvals: 851,
      rejections: 244,
      quotesReceived: 538,
      quotesAccepted: 451,
    },
    requestsByStatus: [
      { label: 'New', count: 218 },
      { label: 'In production', count: 304 },
      { label: 'Awaiting quote', count: 160 },
      { label: 'Approved', count: 436 },
      { label: 'Needs changes', count: 247 },
      { label: 'Completed', count: 602 },
    ],
    monthly: [
      { month: 'Sep', designs: 74, completed: 34 },
      { month: 'Oct', designs: 82, completed: 38 },
      { month: 'Nov', designs: 79, completed: 36 },
      { month: 'Dec', designs: 68, completed: 31 },
      { month: 'Jan', designs: 92, completed: 44 },
      { month: 'Feb', designs: 104, completed: 49 },
      { month: 'Mar', designs: 121, completed: 58 },
      { month: 'Apr', designs: 137, completed: 66 },
      { month: 'May', designs: 149, completed: 72 },
      { month: 'Jun', designs: 128, completed: 61 },
      { month: 'Jul', designs: 116, completed: 57 },
      { month: 'Aug', designs: 97, completed: 46 },
    ],
    pipeline: [
      { label: 'Draft', count: 1247 },
      { label: 'Ready', count: 1166 },
      { label: 'Sent to customer', count: 1054 },
      { label: 'Approved', count: 884 },
      { label: 'With a manufacturer', count: 604 },
      { label: 'Completed', count: 602 },
    ],
    productMix: [
      { label: 'Rings', count: 416 },
      { label: 'Necklaces', count: 301 },
      { label: 'Earrings', count: 244 },
      { label: 'Bracelets', count: 169 },
      { label: 'Pendants', count: 79 },
      { label: 'Brooches', count: 38 },
    ],
    cards: {
      approvalDays: 5.4,
      refinementsPerDesign: 0.6,
      reachingProduction: 24,
    },
    catalogs: [
      { id: 'c1', name: 'Bridal Collection', visitors: 5290, productsPublished: 36, inquiries: 1601 },
      { id: 'c2', name: 'Everyday Gold', visitors: 3048, productsPublished: 24, inquiries: 803 },
      { id: 'c3', name: 'Statement Pieces', visitors: 912, productsPublished: 12, inquiries: 270 },
      { id: 'c4', name: 'Vintage Revival', visitors: 477, productsPublished: 8, inquiries: 138 },
      { id: 'c5', name: 'Trial Catalog', visitors: 122, productsPublished: 6, inquiries: 36 },
    ],
    inquiries: {
      received: 2214,
      decided: 1689,
      byOrigin: [
        { label: 'From your catalog', count: 1540 },
        { label: 'From your website widget', count: 674 },
      ],
      byDecision: [
        { label: 'Accepted', count: 1116 },
        { label: 'Rejected', count: 352 },
        { label: 'Not decided yet', count: 525 },
      ],
    },
    widget: { designsGenerated: 582, estimatesProduced: 249, inquiriesRaised: 316 },
  },
};

export function getData(period: PeriodId): PeriodData {
  if (period === '30d') return base30d;
  return scaled[period];
}

export interface ViewData {
  period: PeriodOption;
  activity: PeriodData['activity'];
  requestsByStatus: Slice[];
  monthly: MonthlyPoint[];
  pipeline: PipelineStage[];
  productMix: ProductSlice[];
  cards: PeriodData['cards'];
  catalogs: CatalogRow[];
  inquiries: PeriodData['inquiries'];
  widget: { installed: boolean } & PeriodData['widget'];
  archiveRows: DesignRow[];
  archiveEmpty: boolean;
  archiveNoMatch: boolean;
}

const zeroActivity: PeriodData['activity'] = {
  designsGenerated: 0,
  refinements: 0,
  approvals: 0,
  rejections: 0,
  quotesReceived: 0,
  quotesAccepted: 0,
};

export function getViewData(state: AnalyticsState, period: PeriodId): ViewData {
  const base = getData(period);
  let activity = base.activity;
  let requestsByStatus = base.requestsByStatus;
  let monthly = base.monthly;
  let pipeline = base.pipeline;
  let productMix = base.productMix;
  let cards = base.cards;
  let catalogs = base.catalogs;
  let inquiries = base.inquiries;
  let widget = { installed: true, ...base.widget };
  let archiveEmpty = false;
  let archiveNoMatch = false;

  switch (state) {
    case 'noActivity':
      activity = zeroActivity;
      requestsByStatus = [];
      monthly = [];
      pipeline = [];
      productMix = [];
      cards = { approvalDays: 0, refinementsPerDesign: 0, reachingProduction: 0 };
      catalogs = [];
      inquiries = { received: 0, decided: 0, byOrigin: [], byDecision: [] };
      break;
    case 'noCatalogs':
      catalogs = [];
      break;
    case 'noWidget':
      widget = { installed: false, designsGenerated: 0, estimatesProduced: 0, inquiriesRaised: 0 };
      break;
    case 'deleted':
      catalogs = catalogs.map((c, i) => (i === 0 ? { ...c, deleted: true } : c));
      break;
    case 'archiveEmpty':
      archiveEmpty = true;
      break;
    case 'noMatch':
      archiveNoMatch = true;
      break;
    default:
      break;
  }

  return {
    period: periodFor(period),
    activity,
    requestsByStatus,
    monthly,
    pipeline,
    productMix,
    cards,
    catalogs,
    inquiries,
    widget,
    archiveRows,
    archiveEmpty,
    archiveNoMatch,
  };
}