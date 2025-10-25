import api from './api';

export interface Dealer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  logo?: string;
  description?: string;
  website?: string;
  vehicles_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DealerFilters {
  country?: string;
  city?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

export interface DealerListResponse {
  data: Dealer[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

/**
 * Fetch list of dealers with optional filters
 */
export const getDealers = async (filters?: DealerFilters): Promise<DealerListResponse> => {
  const { data } = await api.get<DealerListResponse>('/dealers', { params: filters });
  return data;
};

/**
 * Fetch a single dealer by ID
 */
export const getDealer = async (id: number): Promise<{ data: Dealer }> => {
  const { data } = await api.get(`/dealers/${id}`);
  return data;
};
