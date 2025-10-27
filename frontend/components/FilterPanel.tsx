'use client';

import { useState } from 'react';
import { XMarkIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  onFilterChange: (filters: VehicleFilters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export interface VehicleFilters {
  priceRange: [number, number];
  yearRange: [number, number];
  kmRange: [number, number];
  fuelType: string[];
  transmission: string[];
  bodyType: string[];
  brand: string[];
  sortBy: string;
}

const defaultFilters: VehicleFilters = {
  priceRange: [0, 100000],
  yearRange: [2000, 2024],
  kmRange: [0, 300000],
  fuelType: [],
  transmission: [],
  bodyType: [],
  brand: [],
  sortBy: 'date-desc'
};

const fuelTypes = ['Benzină', 'Diesel', 'Electric', 'Hibrid', 'GPL', 'Hibrid Plug-in'];
const transmissions = ['Manuală', 'Automată', 'Semi-automată'];
const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Break', 'Coupe', 'Cabrio', 'Monovolum'];
const popularBrands = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Škoda', 'Opel', 'Ford', 'Toyota', 'Honda', 'Mazda'];

export default function FilterPanel({ onFilterChange, onClose, isMobile = false }: FilterPanelProps) {
  const [filters, setFilters] = useState<VehicleFilters>(defaultFilters);
  const [showMoreBrands, setShowMoreBrands] = useState(false);

  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'fuelType' | 'transmission' | 'bodyType' | 'brand', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFiltersCount = 
    filters.fuelType.length + 
    filters.transmission.length + 
    filters.bodyType.length + 
    filters.brand.length;

  return (
    <div className={`bg-white ${isMobile ? 'h-full overflow-y-auto' : 'rounded-lg shadow-lg'} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Filtre</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Preț (€)
        </label>
        <div className="flex gap-3 mb-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [+e.target.value, filters.priceRange[1]])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], +e.target.value])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], +e.target.value])}
          className="w-full"
        />
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          An fabricație
        </label>
        <div className="flex gap-3">
          <select
            value={filters.yearRange[0]}
            onChange={(e) => updateFilter('yearRange', [+e.target.value, filters.yearRange[1]])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={filters.yearRange[1]}
            onChange={(e) => updateFilter('yearRange', [filters.yearRange[0], +e.target.value])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kilometers Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Kilometri (km)
        </label>
        <div className="flex gap-3 mb-2">
          <input
            type="number"
            value={filters.kmRange[0]}
            onChange={(e) => updateFilter('kmRange', [+e.target.value, filters.kmRange[1]])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Min"
            step="1000"
          />
          <input
            type="number"
            value={filters.kmRange[1]}
            onChange={(e) => updateFilter('kmRange', [filters.kmRange[0], +e.target.value])}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Max"
            step="1000"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Combustibil
        </label>
        <div className="space-y-2">
          {fuelTypes.map(fuel => (
            <label key={fuel} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.fuelType.includes(fuel)}
                onChange={() => toggleArrayFilter('fuelType', fuel)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Transmisie
        </label>
        <div className="space-y-2">
          {transmissions.map(trans => (
            <label key={trans} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.transmission.includes(trans)}
                onChange={() => toggleArrayFilter('transmission', trans)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{trans}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Caroserie
        </label>
        <div className="grid grid-cols-2 gap-2">
          {bodyTypes.map(body => (
            <button
              key={body}
              onClick={() => toggleArrayFilter('bodyType', body)}
              className={`px-3 py-2 text-sm rounded-lg border-2 transition ${
                filters.bodyType.includes(body)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              {body}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Marcă
        </label>
        <div className="space-y-2">
          {popularBrands.slice(0, showMoreBrands ? undefined : 5).map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => toggleArrayFilter('brand', brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
        {popularBrands.length > 5 && (
          <button
            onClick={() => setShowMoreBrands(!showMoreBrands)}
            className="text-sm text-blue-600 hover:text-blue-700 mt-2"
          >
            {showMoreBrands ? 'Mai puțin' : `+ ${popularBrands.length - 5} mărci`}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t space-y-3">
        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Resetează Filtre
        </button>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Aplică Filtre
          </button>
        )}
      </div>
    </div>
  );
}
