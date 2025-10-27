import api from '../api';

export interface Vehicle {
  id: number;
  slug: string;
  dealer_id: number;
  category: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  engine_size: number;
  power_hp: number;
  body_type: string;
  color: string;
  doors: number;
  seats: number;
  vin: string;
  registration_number?: string;
  first_registration?: string;
  description: string;
  features: string[];
  images: VehicleImage[];
  dealer: Dealer;
  status: 'active' | 'sold' | 'reserved' | 'pending';
  views_count: number;
  favorites_count: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleImage {
  id: number;
  url: string;
  thumbnail_url: string;
  is_primary: boolean;
  order: number;
}

export interface Dealer {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number;
  reviews_count?: number;
}

export interface VehicleFilters {
  category?: string;
  brand?: string;
  model?: string;
  year_from?: number;
  year_to?: number;
  price_from?: number;
  price_to?: number;
  mileage_from?: number;
  mileage_to?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  features?: string[];
  dealer_id?: number;
  sort?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'mileage_asc' | 'mileage_desc' | 'newest' | 'oldest';
  page?: number;
  per_page?: number;
}

export interface VehiclesResponse {
  data: Vehicle[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

class VehicleService {
  async getVehicles(filters?: VehicleFilters): Promise<VehiclesResponse> {
    const response = await api.get('/vehicles', { params: filters });
    return response.data;
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle> {
    const response = await api.get(`/vehicles/${slug}`);
    return response.data.data;
  }

  async createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
    const response = await api.post('/vehicles', data);
    return response.data.data;
  }

  async updateVehicle(id: number, data: Partial<Vehicle>): Promise<Vehicle> {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data.data;
  }

  async deleteVehicle(id: number): Promise<void> {
    await api.delete(`/vehicles/${id}`);
  }

  async uploadVehicleImages(vehicleId: number, files: File[]): Promise<VehicleImage[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images[]', file);
    });

    const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }

  async deleteVehicleImage(vehicleId: number, imageId: number): Promise<void> {
    await api.delete(`/vehicles/${vehicleId}/images/${imageId}`);
  }

  async reorderVehicleImages(vehicleId: number, imageIds: number[]): Promise<void> {
    await api.post(`/vehicles/${vehicleId}/images/reorder`, { order: imageIds });
  }

  async setPrimaryImage(vehicleId: number, imageId: number): Promise<void> {
    await api.post(`/vehicles/${vehicleId}/images/${imageId}/primary`);
  }
}

export default new VehicleService();
