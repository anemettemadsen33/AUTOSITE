'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useFilterSync } from '@/hooks/useFilterSync';
import { useEffect, useState } from 'react';

interface FilterBarProps {
  onFilterChange?: () => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const {
    search,
    setSearch,
    make,
    setMake,
    priceMin,
    priceMax,
    setPriceRange,
    yearMin,
    yearMax,
    setYearRange,
    bodyType,
    setBodyType,
    fuelType,
    setFuelType,
    transmission,
    setTransmission,
    resetFilters,
    hasActiveFilters,
    activeFiltersCount,
  } = useFilterStore();

  const { syncToURL } = useFilterSync();
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync to URL on filter changes
  useEffect(() => {
    syncToURL();
    onFilterChange?.();
  }, [
    search,
    make,
    priceMin,
    priceMax,
    yearMin,
    yearMax,
    bodyType,
    fuelType,
    transmission,
  ]);

  const handleReset = () => {
    resetFilters();
    syncToURL();
    onFilterChange?.();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vehicles..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden md:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {hasActiveFilters() && (
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="hidden md:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          {/* Make */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Makes</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Audi">Audi</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
            </select>
          </div>

          {/* Body Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body Type
            </label>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Fuels</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (€)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceMin || ''}
                onChange={(e) =>
                  setPriceRange(
                    e.target.value ? parseInt(e.target.value) : null,
                    priceMax
                  )
                }
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={priceMax || ''}
                onChange={(e) =>
                  setPriceRange(
                    priceMin,
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Year Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={yearMin || ''}
                onChange={(e) =>
                  setYearRange(
                    e.target.value ? parseInt(e.target.value) : null,
                    yearMax
                  )
                }
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={yearMax || ''}
                onChange={(e) =>
                  setYearRange(
                    yearMin,
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
