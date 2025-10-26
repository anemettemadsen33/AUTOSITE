// Vehicle categories configuration
export const VEHICLE_CATEGORIES = {
  cars: {
    id: 'cars',
    name: {
      en: 'Cars',
      ro: 'Mașini',
      de: 'Autos'
    },
    icon: '🚗',
    bodyTypes: ['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'minivan'],
  },
  motorcycles: {
    id: 'motorcycles',
    name: {
      en: 'Motorcycles',
      ro: 'Motociclete',
      de: 'Motorräder'
    },
    icon: '🏍️',
    bodyTypes: ['sport', 'cruiser', 'touring', 'adventure', 'scooter'],
  },
  trucks: {
    id: 'trucks',
    name: {
      en: 'Trucks & Vans',
      ro: 'Camioane & Autoutilitare',
      de: 'LKW & Transporter'
    },
    icon: '🚚',
    bodyTypes: ['pickup', 'van', 'box_truck', 'flatbed', 'dump_truck'],
  },
  campers: {
    id: 'campers',
    name: {
      en: 'Campers & RVs',
      ro: 'Rulote & Caravane',
      de: 'Wohnmobile'
    },
    icon: '🚐',
    bodyTypes: ['motorhome', 'camper_van', 'travel_trailer', 'fifth_wheel'],
  },
  parts: {
    id: 'parts',
    name: {
      en: 'Parts & Accessories',
      ro: 'Piese & Accesorii',
      de: 'Teile & Zubehör'
    },
    icon: '🔧',
    bodyTypes: ['engine', 'transmission', 'suspension', 'electronics', 'body_parts', 'wheels'],
  },
} as const;

export type CategoryId = keyof typeof VEHICLE_CATEGORIES;

export function getCategoryName(categoryId: CategoryId, locale: string = 'en'): string {
  return VEHICLE_CATEGORIES[categoryId]?.name[locale as keyof typeof VEHICLE_CATEGORIES[CategoryId]['name']] || categoryId;
}

export function getAllCategories() {
  return Object.values(VEHICLE_CATEGORIES);
}

export function getCategoryById(id: string): typeof VEHICLE_CATEGORIES[CategoryId] | null {
  return VEHICLE_CATEGORIES[id as CategoryId] || null;
}
