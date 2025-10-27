import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Vehicle {
  id: number;
  // Add other vehicle properties as needed
  [key: string]: unknown;
}

interface FavoriteVehicle {
  id: number;
  vehicle: Vehicle;
  created_at: string;
}

interface FavoritesState {
  favorites: FavoriteVehicle[];
  favoriteIds: Set<number>;
  isLoading: boolean;
  
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (vehicleId: number) => Promise<boolean>;
  checkFavorite: (vehicleId: number) => Promise<boolean>;
  removeFavorite: (vehicleId: number) => Promise<void>;
  isFavorited: (vehicleId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      favoriteIds: new Set(),
      isLoading: false,

      fetchFavorites: async () => {
        try {
          set({ isLoading: true });
          
          const token = localStorage.getItem('auth_token');
          if (!token) return;

          const response = await fetch('http://127.0.0.1:8000/api/v1/favorites', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });

          if (!response.ok) throw new Error('Failed to fetch favorites');

          const data = await response.json();
          const favoriteIds = new Set<number>(data.data.map((f: FavoriteVehicle) => f.vehicle.id));

          set({
            favorites: data.data,
            favoriteIds,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error fetching favorites:', error);
          set({ isLoading: false });
        }
      },

      toggleFavorite: async (vehicleId: number) => {
        try {
          const token = localStorage.getItem('auth_token');
          if (!token) {
            console.error('Not authenticated');
            return false;
          }

          const response = await fetch('http://127.0.0.1:8000/api/v1/favorites/toggle', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ vehicle_id: vehicleId }),
          });

          if (!response.ok) throw new Error('Failed to toggle favorite');

          const data = await response.json();
          const { is_favorited } = data;

          const favoriteIds = new Set(get().favoriteIds);
          if (is_favorited) {
            favoriteIds.add(vehicleId);
          } else {
            favoriteIds.delete(vehicleId);
          }

          set({ favoriteIds });
          get().fetchFavorites();

          return is_favorited;
        } catch (error) {
          console.error('Error toggling favorite:', error);
          return false;
        }
      },

      checkFavorite: async (vehicleId: number) => {
        try {
          const token = localStorage.getItem('auth_token');
          if (!token) return false;

          const response = await fetch(`http://127.0.0.1:8000/api/v1/favorites/check/${vehicleId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });

          if (!response.ok) return false;
          const data = await response.json();
          return data.is_favorited;
        } catch (error) {
          console.error('Error checking favorite:', error);
          return false;
        }
      },

      removeFavorite: async (vehicleId: number) => {
        try {
          const token = localStorage.getItem('auth_token');
          if (!token) return;

          const response = await fetch(`http://127.0.0.1:8000/api/v1/favorites/${vehicleId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });

          if (!response.ok) throw new Error('Failed to remove favorite');

          const favoriteIds = new Set(get().favoriteIds);
          favoriteIds.delete(vehicleId);

          set({
            favoriteIds,
            favorites: get().favorites.filter(f => f.vehicle.id !== vehicleId),
          });
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      },

      isFavorited: (vehicleId: number) => {
        return get().favoriteIds.has(vehicleId);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favoriteIds: Array.from(state.favoriteIds) }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.favoriteIds)) {
          state.favoriteIds = new Set(state.favoriteIds);
        }
      },
    }
  )
);
