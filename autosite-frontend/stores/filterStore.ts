import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleClass, VehicleSubCategoryCode } from '@/lib/vehicleSubCategories';

interface FilterState {
  mainCategory?: VehicleClass;
  subCategory?: VehicleSubCategoryCode;
  setMainCategory: (category?: VehicleClass) => void;
  setSubCategory: (subCategory?: VehicleSubCategoryCode) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      mainCategory: undefined,
      subCategory: undefined,
      
      setMainCategory: (category) =>
        set({
          mainCategory: category,
          // Reset subcategory when main category changes
          subCategory: undefined,
        }),
      
      setSubCategory: (subCategory) =>
        set({ subCategory }),
      
      resetFilters: () =>
        set({
          mainCategory: undefined,
          subCategory: undefined,
        }),
    }),
    {
      name: 'vehicle-filters-storage',
    }
  )
);
