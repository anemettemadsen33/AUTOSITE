'use client';

import { useState, useCallback, useMemo } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import VehicleCard from '@/components/ui/VehicleCard';
import { brands, fuelTypes, transmissions, bodyTypes } from '@/lib/mockData';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useVehicles } from '@/hooks/useVehicles';

export default function VehiclesPage() {
  // Filters state
  const [brand, setBrand] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);

  // Zustand stores
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  // Fetch vehicles from API with filters
  const { vehicles: filteredVehicles, loading, error, total } = useVehicles({
    brand: brand || undefined,
    fuelType: fuelType || undefined,
    transmission: transmission || undefined,
    bodyType: bodyType || undefined,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    minYear: minYear ? parseInt(minYear) : undefined,
    maxYear: maxYear ? parseInt(maxYear) : undefined,
    sortBy: sortBy || undefined,
  });

  const clearFilters = useCallback(() => {
    setBrand('');
    setFuelType('');
    setTransmission('');
    setBodyType('');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (brand) count++;
    if (fuelType) count++;
    if (transmission) count++;
    if (bodyType) count++;
    if (minPrice || maxPrice) count++;
    if (minYear || maxYear) count++;
    return count;
  }, [brand, fuelType, transmission, bodyType, minPrice, maxPrice, minYear, maxYear]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                Vehicule disponibile
              </h1>
              <p className="text-sm text-gray-600">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicul găsit' : 'vehicule găsite'}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filtre {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          {/* Sort & View Options */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="newest">Cele mai noi</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
              <option value="year-desc">An fabricație (desc)</option>
              <option value="mileage-asc">Kilometraj crescător</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Filtre</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Resetează
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marcă
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Toate</option>
                    {brands.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Combustibil
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Toate</option>
                    {fuelTypes.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmisie
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Toate</option>
                    {transmissions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caroserie
                  </label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Toate</option>
                    {bodyTypes.map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preț (EUR)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    An fabricație
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      value={maxYear}
                      onChange={(e) => setMaxYear(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Vehicles Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Încearcă din nou
                </button>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">Nu am găsit vehicule cu filtrele selectate.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Resetează filtrele
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={isFavorite(vehicle.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
