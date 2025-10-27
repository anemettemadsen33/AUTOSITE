// Vehicle categories configuration
export const categories = [
  {
    id: 'cars',
    name: 'Cars',
    slug: 'cars',
    icon: '🚗',
    count: 0,
    bodyTypes: ['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'minivan'],
  },
  {
    id: 'motorcycles',
    name: 'Motorcycles',
    slug: 'motorcycles',
    icon: '🏍️',
    count: 0,
    bodyTypes: ['sport', 'cruiser', 'touring', 'adventure', 'scooter'],
  },
  {
    id: 'trucks',
    name: 'Trucks & Vans',
    slug: 'trucks',
    icon: '🚚',
    count: 0,
    bodyTypes: ['pickup', 'van', 'box_truck', 'flatbed', 'dump_truck'],
  },
  {
    id: 'campers',
    name: 'Campers & RVs',
    slug: 'campers',
    icon: '🚙',
    count: 0,
    bodyTypes: ['motorhome', 'camper_van', 'travel_trailer', 'fifth_wheel'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    slug: 'commercial',
    icon: '🚛',
    count: 0,
    bodyTypes: ['bus', 'trailer', 'construction'],
  },
  {
    id: 'agricultural',
    name: 'Agricultural',
    slug: 'agricultural',
    icon: '🚜',
    count: 0,
    bodyTypes: ['tractor', 'harvester', 'equipment'],
  },
  {
    id: 'boats',
    name: 'Boats & Marine',
    slug: 'boats',
    icon: '⛵',
    count: 0,
    bodyTypes: ['sailboat', 'motorboat', 'yacht', 'jetski'],
  },
  {
    id: 'parts',
    name: 'Parts & Accessories',
    slug: 'parts',
    icon: '🔧',
    count: 0,
    bodyTypes: ['engine', 'transmission', 'suspension', 'electronics', 'body_parts', 'wheels'],
  },
];

export const VEHICLE_CATEGORIES = {
  cars: categories[0],
  motorcycles: categories[1],
  trucks: categories[2],
  campers: categories[3],
  commercial: categories[4],
  agricultural: categories[5],
  boats: categories[6],
  parts: categories[7],
} as const;

export type CategoryId = keyof typeof VEHICLE_CATEGORIES;

export function getCategoryName(categoryId: string): string {
  const cat = categories.find(c => c.id === categoryId);
  return cat?.name || categoryId;
}

export function getAllCategories() {
  return categories;
}

export function getCategoryById(id: string) {
  return categories.find(c => c.id === id || c.slug === id) || null;
}
