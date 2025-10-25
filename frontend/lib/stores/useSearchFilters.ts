import { create } from 'zustand';

export interface SearchFilters {
  query?: string;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  fuel?: string;
  transmission?: string;
  bodyType?: string;
  condition?: string;
  locationCountry?: string;
  locationCity?: string;
  isFeatured?: boolean;
  sort?: string;
}

interface SearchFiltersState {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  removeFilter: (key: keyof SearchFilters) => void;
  getActiveFiltersCount: () => number;
}

const initialFilters: SearchFilters = {};

export const useSearchFilters = create<SearchFiltersState>((set, get) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () => set({ filters: initialFilters }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  removeFilter: (key) =>
    set((state) => {
      const newFilters = { ...state.filters };
      delete newFilters[key];
      return { filters: newFilters };
    }),
  getActiveFiltersCount: () => {
    const { filters } = get();
    return Object.keys(filters).filter(
      (key) => filters[key as keyof SearchFilters] !== undefined
    ).length;
  },
}));
