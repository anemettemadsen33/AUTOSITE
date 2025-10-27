// Mock vehicle data for development
export interface Vehicle {
  id: number;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  color: string;
  power: number; // HP
  engineSize: number; // CC
  doors: number;
  seats: number;
  condition: 'new' | 'used';
  location: string;
  dealerName: string;
  dealerId: number;
  images: string[];
  features: string[];
  description: string;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
}

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    slug: 'bmw-seria-3-2022',
    title: 'BMW Seria 3 320d xDrive',
    brand: 'BMW',
    model: 'Seria 3',
    year: 2022,
    price: 42500,
    currency: 'EUR',
    mileage: 28000,
    fuel: 'Diesel',
    transmission: 'Automată',
    bodyType: 'Sedan',
    color: 'Negru',
    power: 190,
    engineSize: 1995,
    doors: 4,
    seats: 5,
    condition: 'used',
    location: 'București',
    dealerName: 'Premium Auto',
    dealerId: 1,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1617531653660-79d629702b99?w=800',
    ],
    features: ['Pilot automat', 'Scaune încălzite', 'Navigație', 'Camera marsarier', 'Senzori parcare'],
    description: 'BMW Seria 3 în stare impecabilă, un singur proprietar, service complet la reprezentanță.',
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-10-15T10:00:00Z',
  },
  {
    id: 2,
    slug: 'mercedes-c-class-2021',
    title: 'Mercedes-Benz C-Class C200',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 38900,
    currency: 'EUR',
    mileage: 35000,
    fuel: 'Benzină',
    transmission: 'Automată',
    bodyType: 'Sedan',
    color: 'Argintiu',
    power: 184,
    engineSize: 1497,
    doors: 4,
    seats: 5,
    condition: 'used',
    location: 'Cluj-Napoca',
    dealerName: 'Star Motors',
    dealerId: 2,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    ],
    features: ['MBUX infotainment', 'LED Headlights', 'Cruise control', 'Keyless entry'],
    description: 'Mercedes C-Class cu echipare completă, întreținere la zi.',
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-10-14T09:30:00Z',
  },
  {
    id: 3,
    slug: 'audi-a4-2023',
    title: 'Audi A4 40 TDI S-Line',
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 47800,
    currency: 'EUR',
    mileage: 12000,
    fuel: 'Diesel',
    transmission: 'Automată',
    bodyType: 'Sedan',
    color: 'Gri',
    power: 204,
    engineSize: 1968,
    doors: 4,
    seats: 5,
    condition: 'used',
    location: 'Timișoara',
    dealerName: 'Audi Center',
    dealerId: 3,
    images: [
      'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    ],
    features: ['Virtual Cockpit', 'Matrix LED', 'Bang & Olufsen', 'S-Line package', 'Quattro'],
    description: 'Audi A4 S-Line aproape nou, garanție extinsă.',
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-10-13T14:20:00Z',
  },
  {
    id: 4,
    slug: 'volkswagen-golf-8-2022',
    title: 'Volkswagen Golf 8 GTI',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    price: 35600,
    currency: 'EUR',
    mileage: 18500,
    fuel: 'Benzină',
    transmission: 'Manuală',
    bodyType: 'Hatchback',
    color: 'Roșu',
    power: 245,
    engineSize: 1984,
    doors: 5,
    seats: 5,
    condition: 'used',
    location: 'București',
    dealerName: 'VW Premium',
    dealerId: 4,
    images: [
      'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
    ],
    features: ['Performance package', 'DCC adaptive suspension', 'Digital Cockpit Pro', 'Sports seats'],
    description: 'Golf GTI în configurație completă, performance package inclus.',
    isFeatured: false,
    isAvailable: true,
    createdAt: '2024-10-12T11:00:00Z',
  },
  {
    id: 5,
    slug: 'porsche-911-2021',
    title: 'Porsche 911 Carrera S',
    brand: 'Porsche',
    model: '911',
    year: 2021,
    price: 125000,
    currency: 'EUR',
    mileage: 8500,
    fuel: 'Benzină',
    transmission: 'Automată',
    bodyType: 'Coupe',
    color: 'Albastru',
    power: 450,
    engineSize: 2981,
    doors: 2,
    seats: 4,
    condition: 'used',
    location: 'București',
    dealerName: 'Porsche Center',
    dealerId: 5,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    ],
    features: ['Sport Chrono', 'PASM', 'Bose Surround', 'Sport Exhaust', 'Full leather'],
    description: 'Porsche 911 Carrera S cu pachet Sport Chrono, stare impecabilă.',
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-10-11T16:45:00Z',
  },
  {
    id: 6,
    slug: 'tesla-model-3-2023',
    title: 'Tesla Model 3 Long Range',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 52900,
    currency: 'EUR',
    mileage: 5000,
    fuel: 'Electric',
    transmission: 'Automată',
    bodyType: 'Sedan',
    color: 'Alb',
    power: 450,
    engineSize: 0,
    doors: 4,
    seats: 5,
    condition: 'used',
    location: 'Cluj-Napoca',
    dealerName: 'Tesla Store',
    dealerId: 6,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    ],
    features: ['Autopilot', 'Premium audio', 'Glass roof', 'Dual motor AWD', '580km range'],
    description: 'Tesla Model 3 Long Range, autonomie 580km, aproape nou.',
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-10-10T08:15:00Z',
  },
];

export const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche', 'Tesla', 'Ford', 'Toyota', 'Honda'];
export const fuelTypes = ['Benzină', 'Diesel', 'Electric', 'Hibrid', 'Plug-in Hibrid'];
export const transmissions = ['Manuală', 'Automată'];
export const bodyTypes = ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Break', 'Cabrio', 'Monovolum'];
export const conditions = ['new', 'used'];
