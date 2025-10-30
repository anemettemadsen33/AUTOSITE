import api from '../lib/api';

export interface FavoriteVehicle {
  id: number;
  vehicle: any; // Vehicle data
  created_at: string;
}

export interface FavoriteToggleResponse {
  success: boolean;
  message: string;
  is_favorite: boolean;
}

class FavoriteService {
  /**
   * Get all favorites for authenticated user
   */
  async getFavorites(): Promise<{ success: boolean; data: FavoriteVehicle[] }> {
    const response = await api.get('/favorites');
    return response.data;
  }

  /**
   * Toggle favorite status (add/remove)
   */
  async toggleFavorite(vehicleId: number): Promise<FavoriteToggleResponse> {
    const response = await api.post('/favorites/toggle', { vehicle_id: vehicleId });
    return response.data;
  }

  /**
   * Check if vehicle is favorited
   */
  async isFavorite(vehicleId: number): Promise<{ is_favorite: boolean }> {
    const response = await api.get(`/favorites/check/${vehicleId}`);
    return response.data;
  }

  /**
   * Remove from favorites
   */
  async removeFavorite(vehicleId: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/favorites/${vehicleId}`);
    return response.data;
  }
}

export default new FavoriteService();
