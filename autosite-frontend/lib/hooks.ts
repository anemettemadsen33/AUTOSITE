import useSWR from 'swr';
import type { Vehicle } from './vehicles';
import type { PublicSettings } from './settings';

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

// Custom hooks with SWR

/**
 * Hook for fetching vehicles with caching
 */
export function useVehicles(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  featured?: boolean;
}) {
  const queryString = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const { data, error, isLoading, mutate } = useSWR(
    `/api/v1/vehicles${queryString ? `?${queryString}` : ''}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      revalidateIfStale: false,
    }
  );

  return {
    vehicles: data?.data as Vehicle[] | undefined,
    pagination: data?.pagination,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for fetching single vehicle
 */
export function useVehicle(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/v1/vehicles/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    vehicle: data?.data as Vehicle | undefined,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for fetching public settings with caching
 */
export function usePublicSettings() {
  const { data, error, isLoading } = useSWR(
    '/api/v1/public-settings',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
      revalidateIfStale: false,
    }
  );

  return {
    settings: data as PublicSettings | undefined,
    isLoading,
    isError: error,
  };
}

/**
 * Hook for fetching user favorites
 */
export function useFavorites(token?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    token ? ['/api/v1/favorites', token] : null,
    ([url, token]) => 
      fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
    {
      revalidateOnFocus: true,
      dedupingInterval: 30000, // 30 seconds
    }
  );

  return {
    favorites: data?.data as number[] | undefined,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for search with debouncing
 */
export function useVehicleSearch(query: string, filters?: any) {
  const params = new URLSearchParams({
    ...(query && { search: query }),
    ...filters,
  }).toString();

  const { data, error, isLoading } = useSWR(
    query || filters ? `/api/v1/vehicles/search?${params}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // 5 seconds
      keepPreviousData: true,
    }
  );

  return {
    results: data?.data as Vehicle[] | undefined,
    total: data?.pagination?.total,
    isLoading,
    isError: error,
  };
}
