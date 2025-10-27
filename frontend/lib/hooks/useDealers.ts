import { useQuery } from '@tanstack/react-query';
import dealerService, { DealerFilters } from '../services/dealer.service';

export function useDealers(filters?: DealerFilters) {
  return useQuery({
    queryKey: ['dealers', filters],
    queryFn: () => dealerService.getDealers(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useDealer(id: number) {
  return useQuery({
    queryKey: ['dealer', id],
    queryFn: () => dealerService.getDealerById(id),
    enabled: !!id,
  });
}
