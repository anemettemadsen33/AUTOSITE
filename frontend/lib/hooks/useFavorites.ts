import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import favoriteService from '../services/favorite.service';

export function useFavorites(page = 1) {
  return useQuery({
    queryKey: ['favorites', page],
    queryFn: () => favoriteService.getFavorites(page),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vehicleId: number) => favoriteService.toggleFavorite(vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}

export function useCheckFavorite(vehicleId: number) {
  return useQuery({
    queryKey: ['favorite', vehicleId],
    queryFn: () => favoriteService.checkFavorite(vehicleId),
    enabled: !!vehicleId,
  });
}
