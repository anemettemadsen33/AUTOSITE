import api from './api';

export interface Vehicle {
  id: number;
  slug: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  vin?: string;
  title?: Record<string, string>;
  description?: Record<string, string>;
  meta_title?: string;
  meta_description?: string;
  price: {
    amount: number;
    currency: string;
    converted?: {
      amount: number;
      currency: string;
    };
  };
  location: {
    country?: string;
    city?: string;
  };
  status: string;
  published_at?: string;
  dealer?: {
    id?: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  images?: Array<{ url: string; thumb: string }>;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_min?: number;
  mileage_max?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  country?: string;
  city?: string;
  sort?: string;
  page?: number;
  per_page?: number;
}

export interface VehicleListResponse {
  data: Vehicle[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export const getVehicles = async (filters?: VehicleFilters): Promise<VehicleListResponse> => {
  const { data } = await api.get<VehicleListResponse>('/vehicles', { params: filters });
  return data;
};

export const getVehicle = async (idOrSlug: number | string, currency?: string): Promise<{ data: Vehicle }> => {
  const { data } = await api.get(`/vehicles/${idOrSlug}`, { params: { currency } });
  return data;
};

export const createVehicle = async (formData: FormData): Promise<Vehicle> => {
  const { data } = await api.post<Vehicle>('/vehicles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateVehicle = async (id: number, formData: FormData): Promise<Vehicle> => {
  // Use POST with _method spoofing for multipart forms
  formData.append('_method', 'PUT');
  const { data } = await api.post<Vehicle>(`/vehicles/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteVehicle = async (id: number): Promise<void> => {
  await api.delete(`/vehicles/${id}`);
};
