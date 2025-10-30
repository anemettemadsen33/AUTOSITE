import api from '@/lib/api';

export interface Vehicle {
  id: number;
  title: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel?: string;
  transmission?: string;
  body_type?: string;
  condition: string;
  description?: string;
  images?: Array<{ url: string }>;
  location_city?: string;
  location_country?: string;
  dealer?: {
    id: number;
    name: string;
    verified?: boolean;
  };
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  fuel?: string;
  transmission?: string;
  body_type?: string;
  condition?: string;
  page?: number;
  perPage?: number;
  search?: string;
}

class VehicleService {
  // Get all vehicles with filters
  async getVehicles(filters: VehicleFilters = {}) {
    const response = await api.get('/vehicles', { params: filters });
    return response.data;
  }

  // Get single vehicle by slug
  async getVehicle(slug: string) {
    const response = await api.get(`/vehicles/${slug}`);
    return response.data.data;
  }

  // Create vehicle (requires auth)
  async createVehicle(data: Partial<Vehicle>) {
    const response = await api.post('/vehicles', data);
    return response.data;
  }

  // Update vehicle (requires auth)
  async updateVehicle(id: number, data: Partial<Vehicle>) {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data;
  }

  // Delete vehicle (requires auth)
  async deleteVehicle(id: number) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
}

export const vehicleService = new VehicleService();
