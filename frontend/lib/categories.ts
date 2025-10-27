export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  route: string;
}

export const vehicleCategories: VehicleCategory[] = [
  {
    id: 'cars',
    name: 'Mașini',
    slug: 'masini',
    icon: '🚗',
    description: 'Autoturisme de pasageri',
    route: '/vanzari/masini'
  },
  {
    id: 'motorcycles',
    name: 'Motociclete',
    slug: 'motociclete',
    icon: '🏍️',
    description: 'Motociclete și scutere',
    route: '/vanzari/motociclete'
  },
  {
    id: 'trucks',
    name: 'Camioane',
    slug: 'camioane',
    icon: '🚚',
    description: 'Vehicule comerciale grele',
    route: '/vanzari/camioane'
  },
  {
    id: 'vans',
    name: 'Utilitare',
    slug: 'utilitare',
    icon: '🚐',
    description: 'Vehicule utilitare ușoare',
    route: '/vanzari/utilitare'
  },
  {
    id: 'trailers',
    name: 'Rulote',
    slug: 'rulote',
    icon: '🚙',
    description: 'Rulote și campere',
    route: '/vanzari/rulote'
  },
  {
    id: 'parts',
    name: 'Piese Auto',
    slug: 'piese',
    icon: '🔧',
    description: 'Piese și accesorii auto',
    route: '/vanzari/piese'
  },
  {
    id: 'agricultural',
    name: 'Agricole',
    slug: 'agricole',
    icon: '🚜',
    description: 'Tractoare și utilaje agricole',
    route: '/vanzari/agricole'
  },
  {
    id: 'construction',
    name: 'Construcții',
    slug: 'constructii',
    icon: '🏗️',
    description: 'Utilaje pentru construcții',
    route: '/vanzari/constructii'
  }
];

export const getCategory = (slug: string): VehicleCategory | undefined => {
  return vehicleCategories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): VehicleCategory | undefined => {
  return vehicleCategories.find(cat => cat.id === id);
};

// Body types per category
export const bodyTypesByCategory: Record<string, string[]> = {
  cars: ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Break', 'Cabrio', 'Monovolum'],
  motorcycles: ['Sport', 'Cruiser', 'Touring', 'Naked', 'Adventure', 'Scuter'],
  trucks: ['Box Truck', 'Flatbed', 'Tanker', 'Refrigerated', 'Dump Truck'],
  vans: ['Cargo Van', 'Passenger Van', 'Minibus', 'Box Van'],
  trailers: ['Travel Trailer', 'Fifth Wheel', 'Motorhome', 'Camper Van'],
  parts: ['Engine', 'Transmission', 'Suspension', 'Brakes', 'Electrical', 'Body Parts'],
  agricultural: ['Tractor', 'Harvester', 'Planter', 'Sprayer'],
  construction: ['Excavator', 'Bulldozer', 'Crane', 'Loader']
};

// Fuel types per category
export const fuelTypesByCategory: Record<string, string[]> = {
  cars: ['Benzină', 'Diesel', 'Electric', 'Hibrid', 'GPL', 'CNG'],
  motorcycles: ['Benzină', 'Electric'],
  trucks: ['Diesel', 'Electric', 'CNG'],
  vans: ['Diesel', 'Benzină', 'Electric', 'Hibrid'],
  trailers: [],
  parts: [],
  agricultural: ['Diesel'],
  construction: ['Diesel', 'Electric']
};
