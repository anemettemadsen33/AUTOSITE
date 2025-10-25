import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Vehicle } from '@/lib/vehicles';

interface CompareState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (vehicleId: number) => void;
  clearAll: () => void;
  isInComparison: (vehicleId: number) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      
      addVehicle: (vehicle: Vehicle) => {
        const { vehicles } = get();
        // Limit to 3 vehicles for comparison
        if (vehicles.length >= 3) {
          return;
        }
        // Don't add if already exists
        if (vehicles.some(v => v.id === vehicle.id)) {
          return;
        }
        set({ vehicles: [...vehicles, vehicle] });
      },
      
      removeVehicle: (vehicleId: number) => {
        set(state => ({
          vehicles: state.vehicles.filter(v => v.id !== vehicleId),
        }));
      },
      
      clearAll: () => {
        set({ vehicles: [] });
      },
      
      isInComparison: (vehicleId: number) => {
        return get().vehicles.some(v => v.id === vehicleId);
      },
    }),
    {
      name: 'compare-storage',
    }
  )
);
