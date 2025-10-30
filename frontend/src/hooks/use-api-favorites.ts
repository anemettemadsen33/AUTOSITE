import { useState, useEffect, useCallback } from 'react';
import favoriteService, { FavoriteVehicle } from '../services/favoriteService';

export function useApiFavorites() {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await favoriteService.getFavorites();
      setFavorites(response.data);
      setFavoriteIds(response.data.map((f) => f.vehicle.id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (vehicleId: number) => {
    try {
      const response = await favoriteService.toggleFavorite(vehicleId);
      
      // Update local state optimistically
      if (response.is_favorite) {
        // Added to favorites
        setFavoriteIds((prev) => [...prev, vehicleId]);
      } else {
        // Removed from favorites
        setFavoriteIds((prev) => prev.filter((id) => id !== vehicleId));
      }
      
      // Refresh full list
      await fetchFavorites();
      
      return response;
    } catch (err: any) {
      console.error('Error toggling favorite:', err);
      throw err;
    }
  };

  const isFavorite = (vehicleId: number): boolean => {
    return favoriteIds.includes(vehicleId);
  };

  return {
    favorites,
    favoriteIds,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    refetch: fetchFavorites,
  };
}
