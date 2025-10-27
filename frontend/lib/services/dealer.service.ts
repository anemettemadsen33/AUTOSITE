import api from '../api';

export interface Dealer {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  rating?: number;
  reviews_count?: number;
  vehicles_count?: number;
  created_at: string;
  updated_at: string;
}

export interface DealerFilters {
  search?: string;
  city?: string;
  country?: string;
  sort?: 'name' | 'rating' | 'newest';
  page?: number;
  per_page?: number;
}

export interface DealersResponse {
  data: Dealer[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

class DealerService {
  async getDealers(filters?: DealerFilters): Promise<DealersResponse> {
    const response = await api.get('/dealers', { params: filters });
    return response.data;
  }

  async getDealerById(id: number): Promise<Dealer> {
    const response = await api.get(`/dealers/${id}`);
    return response.data.data;
  }
}

export default new DealerService();
