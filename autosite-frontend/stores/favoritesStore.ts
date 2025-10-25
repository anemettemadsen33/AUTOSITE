import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: number[];
  addFavorite: (vehicleId: number) => void;
  removeFavorite: (vehicleId: number) => void;
  isFavorite: (vehicleId: number) => boolean;
  toggleFavorite: (vehicleId: number) => void;
  setFavorites: (ids: number[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (vehicleId) =>
        set((state) => ({
          favoriteIds: [...new Set([...state.favoriteIds, vehicleId])],
        })),

      removeFavorite: (vehicleId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== vehicleId),
        })),

      isFavorite: (vehicleId) => get().favoriteIds.includes(vehicleId),

      toggleFavorite: (vehicleId) => {
        if (get().isFavorite(vehicleId)) {
          get().removeFavorite(vehicleId);
        } else {
          get().addFavorite(vehicleId);
        }
      },

      setFavorites: (ids) => set({ favoriteIds: ids }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
