import { METAL_HEX } from '../../lib/metals';

export type ViewName = 'Front' | 'Side' | 'Back' | 'Worn';
export type TileStatus = 'complete' | 'generating' | 'checking' | 'correcting' | 'flagged';
export type ColorName = 'Yellow gold' | 'White gold' | 'Rose gold';
export type FlagType = 'quality' | 'worn' | 'balance' | 'technical';
export type TileStage = 'generating' | 'checking' | 'correcting';

export interface RenderTile {
  view: ViewName;
  status: TileStatus;
  image?: string;
  source?: string;
}

export interface ColorGroup {
  name: ColorName;
  swatch: string;
  tiles: RenderTile[];
}

export interface ProductRenders {
  id: string;
  category: string;
  description: string;
  thumbnail: string;
  rendersUsed: number;
  flaggedTotal?: number;
  flag?: { type: FlagType; defects?: string[] };
  colors: ColorGroup[];
}

const sourceImg = {
  Front: 'https://readdy.ai/api/search-image?query=Retailer%20uploaded%20photograph%20of%20a%20diamond%20ring%20front%20view%20on%20a%20plain%20pale%20studio%20background%2C%20even%20soft%20lighting%2C%20real%20jewellery%20product%20photo%2C%20clean%20composition&width=640&height=640&seq=201&orientation=squarish',
  Side: 'https://readdy.ai/api/search-image?query=Retailer%20uploaded%20photograph%20of%20a%20diamond%20ring%20side%20view%20on%20a%20plain%20pale%20studio%20background%2C%20even%20soft%20lighting%2C%20real%20jewellery%20product%20photo%2C%20clean%20composition&width=640&height=640&seq=202&orientation=squarish',
  Back: 'https://readdy.ai/api/search-image?query=Retailer%20uploaded%20photograph%20of%20a%20diamond%20ring%20back%20view%20on%20a%20plain%20pale%20studio%20background%2C%20even%20soft%20lighting%2C%20real%20jewellery%20product%20photo%2C%20clean%20composition&width=640&height=640&seq=203&orientation=squarish',
  Worn: 'https://readdy.ai/api/search-image?query=Retailer%20uploaded%20photograph%20of%20a%20diamond%20ring%20worn%20view%20on%20a%20plain%20pale%20studio%20background%2C%20even%20soft%20lighting%2C%20real%20jewellery%20product%20photo%2C%20clean%20composition&width=640&height=640&seq=204&orientation=squarish',
};

const renderImg: Record<string, string> = {
  yellowFront: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20yellow%20gold%20ring%20front%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20warm%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=101&orientation=squarish',
  yellowSide: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20yellow%20gold%20ring%20side%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20warm%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=102&orientation=squarish',
  yellowBack: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20yellow%20gold%20ring%20back%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20warm%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=103&orientation=squarish',
  yellowWorn: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20yellow%20gold%20ring%20worn%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20warm%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=104&orientation=squarish',
  whiteFront: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20white%20gold%20ring%20front%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20cool%20silver%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=105&orientation=squarish',
  whiteSide: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20white%20gold%20ring%20side%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20cool%20silver%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=106&orientation=squarish',
  whiteBack: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20white%20gold%20ring%20back%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20cool%20silver%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=107&orientation=squarish',
  whiteWorn: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20white%20gold%20ring%20worn%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20cool%20silver%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=108&orientation=squarish',
  roseFront: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20rose%20gold%20ring%20front%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20blush%20pink%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=109&orientation=squarish',
  roseSide: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20rose%20gold%20ring%20side%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20blush%20pink%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=110&orientation=squarish',
  roseBack: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20rose%20gold%20ring%20back%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20blush%20pink%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=111&orientation=squarish',
  roseWorn: 'https://readdy.ai/api/search-image?query=Generated%20render%20of%20a%20rose%20gold%20ring%20worn%20view%20on%20a%20dark%20neutral%20studio%20background%2C%20blush%20pink%20metal%20tone%2C%20crisp%20focus%2C%20jewellery%20product%20render&width=640&height=640&seq=112&orientation=squarish',
};

type CKey = 'yellow' | 'white' | 'rose';
const colorMeta: Record<CKey, { name: ColorName; swatch: string }> = {
  yellow: { name: 'Yellow gold', swatch: METAL_HEX.yellow },
  white: { name: 'White gold', swatch: METAL_HEX.white },
  rose: { name: 'Rose gold', swatch: METAL_HEX.rose },
};

const srcByView: Record<ViewName, string> = {
  Front: sourceImg.Front,
  Side: sourceImg.Side,
  Back: sourceImg.Back,
  Worn: sourceImg.Worn,
};

function makeTiles(
  color: CKey,
  overrides: Partial<Record<ViewName, TileStatus>> = {}
): RenderTile[] {
  const views: ViewName[] = ['Front', 'Side', 'Back', 'Worn'];
  return views.map((v) => {
    const status = overrides[v] ?? 'complete';
    return {
      view: v,
      status,
      image: renderImg[`${color}${v}`],
      source: srcByView[v],
    };
  });
}

const swatches: Record<CKey, string> = {
  yellow: colorMeta.yellow.swatch,
  white: colorMeta.white.swatch,
  rose: colorMeta.rose.swatch,
};

export const products: ProductRenders[] = [
  {
    id: 'solitaire-ring',
    category: 'Ring',
    description: 'Bridal solitaire ring with a tapered band, a raised six-prong setting and a brilliant-cut center stone.',
    thumbnail: renderImg.yellowFront,
    rendersUsed: 40,
    flaggedTotal: 3,
    flag: {
      type: 'quality',
      defects: [
        'The band details are too soft to read.',
        'The prongs are missing on the back view.',
        'The center stone reflections are off.',
      ],
    },
    colors: [
      { name: colorMeta.yellow.name, swatch: swatches.yellow, tiles: makeTiles('yellow', { Back: 'flagged' }) },
      { name: colorMeta.white.name, swatch: swatches.white, tiles: makeTiles('white', { Back: 'flagged' }) },
      { name: colorMeta.rose.name, swatch: swatches.rose, tiles: makeTiles('rose', { Back: 'flagged' }) },
    ],
  },
  {
    id: 'halo-cluster',
    category: 'Ring',
    description: 'Halo cluster ring with a round center diamond and a row of pavé shoulders.',
    thumbnail: renderImg.whiteFront,
    rendersUsed: 24,
    flaggedTotal: 1,
    flag: { type: 'worn' },
    colors: [
      { name: colorMeta.yellow.name, swatch: swatches.yellow, tiles: makeTiles('yellow', { Front: 'flagged' }) },
      { name: colorMeta.white.name, swatch: swatches.white, tiles: makeTiles('white', { Worn: 'generating' }) },
    ],
  },
  {
    id: 'teardrop-pendant',
    category: 'Pendant',
    description: 'Teardrop pendant with a pavé bail and a floating pear-cut center stone.',
    thumbnail: renderImg.roseFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.rose.name, swatch: swatches.rose, tiles: makeTiles('rose', { Back: 'correcting' }) },
    ],
  },
  {
    id: 'fine-chain',
    category: 'Necklace',
    description: 'Fine gold chain necklace with a solitaire diamond drop.',
    thumbnail: renderImg.yellowFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.yellow.name, swatch: swatches.yellow, tiles: makeTiles('yellow', { Front: 'checking' }) },
    ],
  },
  {
    id: 'stud-earrings',
    category: 'Earring',
    description: 'Gold stud earrings with four-prong settings.',
    thumbnail: renderImg.whiteFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.white.name, swatch: swatches.white, tiles: makeTiles('white') },
    ],
  },
  {
    id: 'tennis-bracelet',
    category: 'Bracelet',
    description: 'Gold tennis bracelet with channel-set diamonds.',
    thumbnail: renderImg.yellowFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.yellow.name, swatch: swatches.yellow, tiles: makeTiles('yellow', { Worn: 'generating' }) },
    ],
  },
  {
    id: 'eternity-band',
    category: 'Ring',
    description: 'Full eternity band ring set with a continuous line of stones.',
    thumbnail: renderImg.roseFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.rose.name, swatch: swatches.rose, tiles: makeTiles('rose') },
    ],
  },
  {
    id: 'floral-brooch',
    category: 'Brooch',
    description: 'Floral spray brooch with mixed colored stones.',
    thumbnail: renderImg.whiteFront,
    rendersUsed: 12,
    colors: [
      { name: colorMeta.white.name, swatch: swatches.white, tiles: makeTiles('white') },
      { name: colorMeta.rose.name, swatch: swatches.rose, tiles: makeTiles('rose', { Front: 'generating' }) },
    ],
  },
];

export function allTiles(p: ProductRenders): RenderTile[] {
  return p.colors.flatMap((c) => c.tiles);
}

export function countCorrect(p: ProductRenders): number {
  return allTiles(p).filter((t) => t.status === 'complete').length;
}

export function countFlagged(p: ProductRenders): number {
  return allTiles(p).filter((t) => t.status === 'flagged').length;
}