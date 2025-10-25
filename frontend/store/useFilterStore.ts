import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FilterState {
  // Search
  search: string;
  
  // Price
  priceMin: number | null;
  priceMax: number | null;
  
  // Make & Model
  make: string;
  model: string;
  
  // Year
  yearMin: number | null;
  yearMax: number | null;
  
  // Mileage
  mileageMin: number | null;
  mileageMax: number | null;
  
  // Other filters
  bodyType: string;
  fuelType: string;
  transmission: string;
  condition: string;
  
  // Location
  location: string;
  
  // Sorting
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Pagination
  page: number;
  perPage: number;
  
  // Active filters count
  activeFiltersCount: number;
}

interface FilterActions {
  // Set individual filters
  setSearch: (search: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  setYearRange: (min: number | null, max: number | null) => void;
  setMileageRange: (min: number | null, max: number | null) => void;
  setBodyType: (bodyType: string) => void;
  setFuelType: (fuelType: string) => void;
  setTransmission: (transmission: string) => void;
  setCondition: (condition: string) => void;
  setLocation: (location: string) => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  
  // Bulk operations
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  clearFilter: (filterKey: keyof FilterState) => void;
  
  // URL sync
  getURLParams: () => URLSearchParams;
  setFromURLParams: (params: URLSearchParams) => void;
  
  // Utility
  hasActiveFilters: () => boolean;
  getActiveFilters: () => Partial<FilterState>;
  calculateActiveFiltersCount: () => number;
}

const initialState: FilterState = {
  search: '',
  priceMin: null,
  priceMax: null,
  make: '',
  model: '',
  yearMin: null,
  yearMax: null,
  mileageMin: null,
  mileageMax: null,
  bodyType: '',
  fuelType: '',
  transmission: '',
  condition: '',
  location: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
  page: 1,
  perPage: 12,
  activeFiltersCount: 0,
};

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSearch: (search) => {
        set({ search, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setPriceRange: (min, max) => {
        set({ priceMin: min, priceMax: max, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setMake: (make) => {
        set({ make, model: '', page: 1 }); // Reset model when make changes
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setModel: (model) => {
        set({ model, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setYearRange: (min, max) => {
        set({ yearMin: min, yearMax: max, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setMileageRange: (min, max) => {
        set({ mileageMin: min, mileageMax: max, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setBodyType: (bodyType) => {
        set({ bodyType, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setFuelType: (fuelType) => {
        set({ fuelType, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setTransmission: (transmission) => {
        set({ transmission, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setCondition: (condition) => {
        set({ condition, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setLocation: (location) => {
        set({ location, page: 1 });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      setSorting: (sortBy, sortOrder) => {
        set({ sortBy, sortOrder, page: 1 });
      },

      setPage: (page) => {
        set({ page });
      },

      setFilters: (filters) => {
        set({ ...filters });
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      resetFilters: () => {
        set({ ...initialState });
      },

      clearFilter: (filterKey) => {
        const updates: any = { [filterKey]: initialState[filterKey], page: 1 };
        
        // If clearing make, also clear model
        if (filterKey === 'make') {
          updates.model = '';
        }
        
        set(updates);
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      getURLParams: () => {
        const state = get();
        const params = new URLSearchParams();

        // Add non-empty filters to URL
        if (state.search) params.set('search', state.search);
        if (state.priceMin) params.set('price_min', state.priceMin.toString());
        if (state.priceMax) params.set('price_max', state.priceMax.toString());
        if (state.make) params.set('make', state.make);
        if (state.model) params.set('model', state.model);
        if (state.yearMin) params.set('year_min', state.yearMin.toString());
        if (state.yearMax) params.set('year_max', state.yearMax.toString());
        if (state.mileageMin) params.set('mileage_min', state.mileageMin.toString());
        if (state.mileageMax) params.set('mileage_max', state.mileageMax.toString());
        if (state.bodyType) params.set('body_type', state.bodyType);
        if (state.fuelType) params.set('fuel_type', state.fuelType);
        if (state.transmission) params.set('transmission', state.transmission);
        if (state.condition) params.set('condition', state.condition);
        if (state.location) params.set('location', state.location);
        if (state.sortBy !== 'created_at') params.set('sort_by', state.sortBy);
        if (state.sortOrder !== 'desc') params.set('sort_order', state.sortOrder);
        if (state.page > 1) params.set('page', state.page.toString());

        return params;
      },

      setFromURLParams: (params) => {
        const updates: Partial<FilterState> = {};

        const search = params.get('search');
        if (search) updates.search = search;

        const priceMin = params.get('price_min');
        if (priceMin) updates.priceMin = parseInt(priceMin);

        const priceMax = params.get('price_max');
        if (priceMax) updates.priceMax = parseInt(priceMax);

        const make = params.get('make');
        if (make) updates.make = make;

        const model = params.get('model');
        if (model) updates.model = model;

        const yearMin = params.get('year_min');
        if (yearMin) updates.yearMin = parseInt(yearMin);

        const yearMax = params.get('year_max');
        if (yearMax) updates.yearMax = parseInt(yearMax);

        const mileageMin = params.get('mileage_min');
        if (mileageMin) updates.mileageMin = parseInt(mileageMin);

        const mileageMax = params.get('mileage_max');
        if (mileageMax) updates.mileageMax = parseInt(mileageMax);

        const bodyType = params.get('body_type');
        if (bodyType) updates.bodyType = bodyType;

        const fuelType = params.get('fuel_type');
        if (fuelType) updates.fuelType = fuelType;

        const transmission = params.get('transmission');
        if (transmission) updates.transmission = transmission;

        const condition = params.get('condition');
        if (condition) updates.condition = condition;

        const location = params.get('location');
        if (location) updates.location = location;

        const sortBy = params.get('sort_by');
        if (sortBy) updates.sortBy = sortBy;

        const sortOrder = params.get('sort_order');
        if (sortOrder === 'asc' || sortOrder === 'desc') updates.sortOrder = sortOrder;

        const page = params.get('page');
        if (page) updates.page = parseInt(page);

        set(updates);
        set({ activeFiltersCount: get().calculateActiveFiltersCount() });
      },

      hasActiveFilters: () => {
        const state = get();
        return (
          state.search !== '' ||
          state.priceMin !== null ||
          state.priceMax !== null ||
          state.make !== '' ||
          state.model !== '' ||
          state.yearMin !== null ||
          state.yearMax !== null ||
          state.mileageMin !== null ||
          state.mileageMax !== null ||
          state.bodyType !== '' ||
          state.fuelType !== '' ||
          state.transmission !== '' ||
          state.condition !== '' ||
          state.location !== ''
        );
      },

      getActiveFilters: () => {
        const state = get();
        const active: Partial<FilterState> = {};

        if (state.search) active.search = state.search;
        if (state.priceMin) active.priceMin = state.priceMin;
        if (state.priceMax) active.priceMax = state.priceMax;
        if (state.make) active.make = state.make;
        if (state.model) active.model = state.model;
        if (state.yearMin) active.yearMin = state.yearMin;
        if (state.yearMax) active.yearMax = state.yearMax;
        if (state.mileageMin) active.mileageMin = state.mileageMin;
        if (state.mileageMax) active.mileageMax = state.mileageMax;
        if (state.bodyType) active.bodyType = state.bodyType;
        if (state.fuelType) active.fuelType = state.fuelType;
        if (state.transmission) active.transmission = state.transmission;
        if (state.condition) active.condition = state.condition;
        if (state.location) active.location = state.location;

        return active;
      },

      calculateActiveFiltersCount: () => {
        return Object.keys(get().getActiveFilters()).length;
      },
    }),
    {
      name: 'filter-storage',
      partialize: (state) => ({
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        perPage: state.perPage,
      }),
    }
  )
);
