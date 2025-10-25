export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  condition: 'new' | 'used' | 'certified';
  color: string;
  doors: number;
  seats: number;
  power: number;
  engineSize: number;
  location: {
    country: string;
    city: string;
  };
  dealer: Dealer;
  images: string[];
  features: string[];
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Dealer {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  location: {
    country: string;
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description?: string;
  vehicleCount: number;
}

export interface Review {
  id: string;
  dealerId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export type Locale = 'en' | 'ro' | 'de' | 'es';
