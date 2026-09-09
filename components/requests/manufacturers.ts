export type MfrAvailability = 'busy' | 'available' | 'delayed';

export interface MfrPick {
  id: string;
  name: string;
  specialty: string;
  location: string;
  initials: string;
  status: MfrAvailability;
  hours: string;
  requests: number;
  completed: number;
  email?: string;
  phone?: string;
}

export const MANUFACTURER_POOL: MfrPick[] = [
  {
    id: 'artisan',
    name: 'ArtisanGold Co.',
    specialty: 'Gold Specialist',
    location: 'Milan, Italy',
    initials: 'AG',
    status: 'busy',
    hours: '10 hrs',
    requests: 4,
    completed: 2,
    email: 'orders@artisangold.co',
  },
  {
    id: 'gemcraft',
    name: 'GemCraft Paris',
    specialty: 'Gemstone Specialist',
    location: 'Paris, France',
    initials: 'GC',
    status: 'busy',
    hours: '13 hrs',
    requests: 3,
    completed: 0,
    email: 'studio@gemcraftparis.fr',
  },
  {
    id: 'platinum',
    name: 'PlatinumCraft Ltd.',
    specialty: 'Platinum Specialist',
    location: 'Zurich, Switzerland',
    initials: 'PC',
    status: 'available',
    hours: '8 hrs',
    requests: 4,
    completed: 1,
    email: 'craft@platinumcraft.ch',
  },
  {
    id: 'diamondset',
    name: 'DiamondSet Inc.',
    specialty: 'Diamond Setting',
    location: 'Antwerp, Belgium',
    initials: 'DS',
    status: 'delayed',
    hours: '32 hrs',
    requests: 3,
    completed: 0,
    email: 'setting@diamondset.be',
  },
  {
    id: 'rubymasters',
    name: 'RubyMasters Florence',
    specialty: 'Colored Gemstones',
    location: 'Florence, Italy',
    initials: 'RM',
    status: 'available',
    hours: '14 hrs',
    requests: 4,
    completed: 1,
    email: 'studio@rubymasters.it',
  },
  {
    id: 'pearlhouse',
    name: 'PearlHouse Tokyo',
    specialty: 'Pearl Jewelry',
    location: 'Tokyo, Japan',
    initials: 'PH',
    status: 'available',
    hours: '16 hrs',
    requests: 2,
    completed: 0,
    email: 'pearl@pearlhouse.jp',
  },
];

export const SPECIALTIES = [
  'Gold Specialist',
  'Platinum Specialist',
  'Gemstone Specialist',
  'Diamond Setting',
  'Colored Gemstones',
  'Pearl Jewelry',
  'Certified Goldsmith',
];

export function availabilityPill(status: MfrAvailability): {
  label: string;
  cls: string;
} {
  if (status === 'available')
    return { label: 'Available', cls: 'bg-[#E8F1EC] text-[#3D6B54]' };
  if (status === 'delayed')
    return {
      label: 'Delayed',
      cls: 'bg-[#E8F1EC] text-[#3D6B54]',
    };
  return { label: 'Busy', cls: 'bg-[#E8F1EC] text-[#3D6B54]' };
}