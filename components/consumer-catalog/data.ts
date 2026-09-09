import { METAL_LIST } from '../../lib/metals';

export type Metal = 'yellow' | 'white' | 'rose';
export type ViewName = 'front' | 'side' | 'back' | 'worn';

export interface RetailerBranding {
  logo?: string;
  brandName: string;
  email?: string;
  phone?: string;
  primaryColor: string;
}

export interface ConsumerProduct {
  id: string;
  category: string;
  description?: string;
  price: number | null;
  active: boolean;
  metals: Metal[];
  images: Partial<Record<Metal, Partial<Record<ViewName, string>>>>;
}

export interface CatalogData {
  token: string;
  name: string;
  available: boolean;
  brand: RetailerBranding;
  products: ConsumerProduct[];
}

export const METAL_LABEL: Record<Metal, string> = {
  yellow: 'Yellow gold',
  white: 'White gold',
  rose: 'Rose gold',
};

export function metalHex(m: Metal): string {
  const found = METAL_LIST.find((x) => x.id === m);
  return found ? found.hex : '#C6CFE0';
}

const IMG = [
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=1&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20yellow%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20yellow%20gold%20back%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=3&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20yellow%20gold%20worn%20on%20a%20hand%20on-body%20lifestyle%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=4&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20white%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=5&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20white%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=6&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20white%20gold%20back%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=7&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20white%20gold%20worn%20on%20a%20hand%20on-body%20lifestyle%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=8&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20rose%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=9&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20rose%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=10&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20rose%20gold%20back%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=11&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20ring%20in%20rose%20gold%20worn%20on%20a%20hand%20on-body%20lifestyle%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=12&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20halo%20cluster%20ring%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=13&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20halo%20cluster%20ring%20in%20yellow%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=14&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20halo%20cluster%20ring%20in%20yellow%20gold%20back%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=15&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20halo%20cluster%20ring%20in%20yellow%20gold%20worn%20on%20a%20hand%20on-body%20lifestyle%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=16&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pav%C3%A9%20band%20ring%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=17&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pav%C3%A9%20band%20ring%20in%20rose%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=18&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20teardrop%20pendant%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=19&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20teardrop%20pendant%20in%20yellow%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=20&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20teardrop%20pendant%20in%20yellow%20gold%20back%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=21&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20teardrop%20pendant%20in%20yellow%20gold%20worn%20on-body%20lifestyle%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=22&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20teardrop%20pendant%20in%20white%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=23&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20stud%20earring%20pair%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=24&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20stud%20earring%20pair%20in%20rose%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=25&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20fine%20chain%20necklace%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=26&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20tennis%20bracelet%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=27&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20tennis%20bracelet%20in%20rose%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=28&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20floral%20spray%20brooch%20in%20yellow%20gold%20front%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=29&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20floral%20spray%20brooch%20in%20yellow%20gold%20side%20profile%20view%20on%20a%20plain%20pale%20off-white%20studio%20background%20soft%20even%20lighting%20minimalist%20luxury%20jewelry%20shot%20crisp%20focus%20clean%20composition&width=560&height=560&seq=30&orientation=squarish',
];

function buildCatalog(
  token: string,
  name: string,
  brand: RetailerBranding,
  available: boolean,
  specs: {
    cat: string;
    desc?: string;
    price: number | null;
    metals: Metal[];
    omitWorn?: boolean;
    img: number[];
  }[],
): CatalogData {
  const products: ConsumerProduct[] = specs.map((s, i) => {
    const images: ConsumerProduct['images'] = {};
    const views: ViewName[] = ['front', 'side', 'back'];
    if (!s.omitWorn) views.push('worn');
    for (const m of s.metals) {
      images[m] = {};
      views.forEach((v, k) => {
        const idx = s.img[s.metals.indexOf(m) * 4 + k];
        if (idx !== undefined) images[m]![v] = IMG[idx];
      });
    }
    return {
      id: `p${i + 1}`,
      category: s.cat,
      description: s.desc,
      price: s.price,
      active: true,
      metals: s.metals,
      images,
    };
  });
  return { token, name, available, brand, products };
}

const BRAND: RetailerBranding = {
  brandName: 'Aurora & Co',
  email: 'hello@auroraco.com',
  phone: '+1 (555) 014-2210',
  primaryColor: '#6D28D9',
};

export const CATALOGS: Record<string, CatalogData> = {
  'bridal-2026': buildCatalog('bridal-2026', 'Bridal 2026', BRAND, true, [
    { cat: 'Ring', price: 1240, metals: ['yellow', 'white', 'rose'], img: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], desc: 'Solitaire, six-prong setting. A single round stone set high in the metal you choose, finished by hand.' },
    { cat: 'Ring', price: 2180, metals: ['yellow'], img: [12, 13, 14, 15], desc: 'Halo cluster with a round center stone.' },
    { cat: 'Ring', price: 1890, metals: ['yellow', 'rose'], img: [0, 1, 2, 3, 8, 9, 10, 11], desc: 'Full eternity band, channelset across the whole circumference.' },
    { cat: 'Ring', price: 960, metals: ['yellow'], img: [16, 1, 2], omitWorn: true, desc: 'Pavé band, fine stones set flush for a continuous line of sparkle.' },
    { cat: 'Ring', price: null, metals: ['yellow'], img: [0, 1, 2, 3], desc: 'Made to order. Contact us to discuss the design and stone options.' },
    { cat: 'Pendant', price: 780, metals: ['yellow', 'white'], img: [18, 19, 20, 21, 22, 19, 20, 21], desc: 'Teardrop pendant with a pavé bail.' },
    { cat: 'Pendant', price: 1120, metals: ['yellow'], img: [18, 19, 20, 21], desc: 'Solitaire drop on a fine chain.' },
    { cat: 'Pendant', price: null, metals: ['rose'], img: [18, 19, 20, 21], desc: 'Made to order. Contact us to discuss the design and stone options.' },
    { cat: 'Earrings', price: 940, metals: ['yellow', 'white', 'rose'], img: [23, 1, 2, 3, 23, 1, 2, 3, 24, 9, 10, 11], desc: 'Stud pair, four-prong setting.' },
    { cat: 'Earrings', price: 1450, metals: ['yellow'], img: [23, 1, 2, 3], desc: 'Drop earrings with a single stone each.' },
    { cat: 'Necklace', price: 2100, metals: ['yellow', 'white'], img: [25, 1, 2, 3, 25, 1, 2, 3], desc: 'Fine chain with a solitaire drop.' },
    { cat: 'Bracelet', price: 3600, metals: ['yellow'], img: [26, 1, 2, 3], desc: 'Tennis bracelet, channelset.' },
    { cat: 'Bracelet', price: null, metals: ['yellow', 'rose'], img: [26, 1, 2, 3, 27, 9, 10, 11], desc: 'Made to order. Contact us to discuss the design and stone options.' },
    { cat: 'Brooch', price: 1450, metals: ['yellow'], img: [28, 29, 2, 3], desc: 'Floral spray with mixed stones.' },
  ]),
  'closed-catalog': buildCatalog('closed-catalog', 'Retired Collection', BRAND, false, []),
};

export function resolveCatalog(token: string): CatalogData | undefined {
  return CATALOGS[token];
}

export function servableProducts(catalog: CatalogData): ConsumerProduct[] {
  return catalog.products.filter((p) => p.active);
}

export function catalogFacets(products: ConsumerProduct[]) {
  const categories = Array.from(new Set(products.map((p) => p.category))).map((c) => ({
    value: c,
    count: products.filter((p) => p.category === c).length,
  }));
  const priced = products.filter((p) => p.price !== null && p.price > 0);
  const price: { min: number; max: number } | null = priced.length
    ? {
        min: Math.min(...priced.map((p) => p.price as number)),
        max: Math.max(...priced.map((p) => p.price as number)),
      }
    : null;
  const metals = Array.from(new Set(products.flatMap((p) => p.metals)));
  return { categories, price, metals };
}