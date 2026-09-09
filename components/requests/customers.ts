export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
}

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Elena Marchetti',
    email: 'elena.marchetti@example.com',
    phone: '555-0177',
    company: 'Marchetti & Co.',
    location: 'Milan, Italy',
  },
  {
    id: 'c2',
    name: 'Oliver Bennett',
    email: 'oliver.bennett@example.com',
    phone: '555-0241',
    company: 'Bennett Jewels',
    location: 'London, United Kingdom',
  },
  {
    id: 'c3',
    name: 'Mia Taylor',
    email: 'mia.taylor@example.com',
    phone: '555-0139',
    location: 'Sydney, Australia',
  },
  {
    id: 'c4',
    name: 'Ava Clarke',
    email: 'ava.clarke@example.com',
    phone: '555-0228',
    company: 'Clarke Gems',
    location: 'Toronto, Canada',
  },
  {
    id: 'c5',
    name: 'Sophia Reed',
    email: 'sophia.reed@example.com',
    phone: '555-0206',
    location: 'Paris, France',
  },
  {
    id: 'c6',
    name: 'Ethan Walker',
    email: 'ethan.walker@example.com',
    phone: '555-0256',
    company: 'Walker Fine Jewelry',
    location: 'New York, United States',
  },
  {
    id: 'c7',
    name: 'Grace Hall',
    email: 'grace.hall@example.com',
    phone: '555-0194',
    location: 'Dublin, Ireland',
  },
];

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}