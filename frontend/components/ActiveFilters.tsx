'use client';

import { X } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useFilterSync } from '@/hooks/useFilterSync';

export default function ActiveFilters() {
  const {
    getActiveFilters,
    clearFilter,
    resetFilters,
    activeFiltersCount,
  } = useFilterStore();

  const { syncToURL } = useFilterSync();
  const activeFilters = getActiveFilters();

  if (activeFiltersCount === 0) return null;

  const handleClearFilter = (key: string) => {
    clearFilter(key as any);
    syncToURL();
  };

  const handleResetAll = () => {
    resetFilters();
    syncToURL();
  };

  const formatFilterLabel = (key: string, value: any) => {
    const labels: Record<string, string> = {
      search: 'Search',
      priceMin: 'Min Price',
      priceMax: 'Max Price',
      make: 'Make',
      model: 'Model',
      yearMin: 'Min Year',
      yearMax: 'Max Year',
      mileageMin: 'Min Mileage',
      mileageMax: 'Max Mileage',
      bodyType: 'Body Type',
      fuelType: 'Fuel',
      transmission: 'Transmission',
      condition: 'Condition',
      location: 'Location',
    };

    return `${labels[key] || key}: ${value}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-600">
        Active Filters ({activeFiltersCount}):
      </span>

      {Object.entries(activeFilters).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleClearFilter(key)}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
        >
          <span>{formatFilterLabel(key, value)}</span>
          <X className="w-3 h-3" />
        </button>
      ))}

      <button
        onClick={handleResetAll}
        className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors font-medium"
      >
        Clear All
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
