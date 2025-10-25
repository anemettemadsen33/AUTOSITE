export interface Vehicle {
  id: number;
  slug: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  condition: 'new' | 'used' | 'certified';
  engine_capacity: number;
  power_hp: number;
  location_country: string;
  location_city: string;
  is_featured: boolean;
  views_count: number;
  images?: Array<{
    id: number;
    url: string;
    thumb_url: string;
  }>;
  dealer?: Dealer;
}

export interface Dealer {
  id: number;
  company_name: string;
  phone: string;
  email: string;
  location_country: string;
  location_city: string;
  is_verified: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'buyer' | 'dealer' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
