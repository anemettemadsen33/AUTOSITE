import api from '../api';
import type { Vehicle } from './vehicle.service';

export interface FavoritesResponse {
  data: Vehicle[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

class FavoriteService {
  async getFavorites(page = 1): Promise<FavoritesResponse> {
    const response = await api.get('/favorites', { params: { page } });
    return response.data;
  }

  async toggleFavorite(vehicleId: number): Promise<{ is_favorited: boolean }> {
    const response = await api.post('/favorites/toggle', { vehicle_id: vehicleId });
    return response.data.data;
  }

  async checkFavorite(vehicleId: number): Promise<boolean> {
    const response = await api.get(`/favorites/check/${vehicleId}`);
    return response.data.data.is_favorited;
  }

  async removeFavorite(vehicleId: number): Promise<void> {
    await api.delete(`/favorites/${vehicleId}`);
  }
}

export default new FavoriteService();
