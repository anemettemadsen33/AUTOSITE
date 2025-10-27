import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Vehicle } from '@/lib/types';

interface UseVehiclesParams {
  brand?: string;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  sortBy?: string;
  page?: number;
  perPage?: number;
}

interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export function useVehicles(params: UseVehiclesParams = {}): UseVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const queryParams = new URLSearchParams();
      
      if (params.brand) queryParams.append('brand', params.brand);
      if (params.fuelType) queryParams.append('fuel', params.fuelType);
      if (params.transmission) queryParams.append('transmission', params.transmission);
      if (params.bodyType) queryParams.append('body_type', params.bodyType);
      if (params.minPrice) queryParams.append('min_price', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('max_price', params.maxPrice.toString());
      if (params.minYear) queryParams.append('min_year', params.minYear.toString());
      if (params.maxYear) queryParams.append('max_year', params.maxYear.toString());
      if (params.sortBy) queryParams.append('sort', params.sortBy);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.perPage) queryParams.append('per_page', params.perPage.toString());

      const response = await api.get(`/vehicles?${queryParams.toString()}`);
      
      setVehicles(response.data.data || []);
      setTotal(response.data.meta?.total || response.data.data?.length || 0);
    } catch (err: any) {
      console.error('Error fetching vehicles:', err);
      setError(err.response?.data?.message || 'Failed to fetch vehicles');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [
    params.brand,
    params.fuelType,
    params.transmission,
    params.bodyType,
    params.minPrice,
    params.maxPrice,
    params.minYear,
    params.maxYear,
    params.sortBy,
    params.page,
    params.perPage,
  ]);

  return {
    vehicles,
    loading,
    error,
    total,
    refetch: fetchVehicles,
  };
}
