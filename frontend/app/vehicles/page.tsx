'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VehicleCard from '@/components/ui/VehicleCard';
import api from '@/lib/api';
import { Vehicle, PaginatedResponse } from '@/lib/types';
import { AdjustmentsHorizontalIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ALL_BRANDS, getModelsForBrand, fuelTypes, transmissionTypes, bodyTypes, conditions } from '@/lib/car-data';

function VehiclesContent() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Filters
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    price_min: searchParams.get('price_min') || '',
    price_max: searchParams.get('price_max') || '',
    year_min: searchParams.get('year_min') || '',
    year_max: searchParams.get('year_max') || '',
    mileage_max: searchParams.get('mileage_max') || '',
    fuel_type: searchParams.get('fuel') || '',
    transmission: searchParams.get('transmission') || '',
    body_type: searchParams.get('body_type') || '',
    condition: searchParams.get('condition') || '',
    query: searchParams.get('query') || '',
  });

  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [page, filters]);

  useEffect(() => {
    // Update available models when make changes
    if (filters.make) {
      const models = getModelsForBrand(filters.make);
      setAvailableModels(models);
    } else {
      setAvailableModels([]);
    }
  }, [filters.make]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('per_page', '12');

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await api.get(`/vehicles?${params.toString()}`);
      setVehicles(response.data.data || []);
      setTotal(response.data.meta?.total || 0);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      // Reset model when make changes
      if (key === 'make' && value !== prev.make) {
        newFilters.model = '';
      }
      return newFilters;
    });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      make: '',
      model: '',
      price_min: '',
      price_max: '',
      year_min: '',
      year_max: '',
      mileage_max: '',
      fuel_type: '',
      transmission: '',
      body_type: '',
      condition: '',
      query: '',
    });
    setAvailableModels([]);
    setPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Toate Vehiculele
          </h1>
          <p className="text-gray-600">
            {total} {total === 1 ? 'vehicul găsit' : 'vehicule găsite'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="w-5 h-5 text-blue-600" />
                  <h2 className="font-black text-xl text-gray-900 dark:text-white">Filtre Avansate</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold flex items-center space-x-1 hover:underline"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {/* Make */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">🏭</span>
                    Marcă
                  </label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  >
                    <option value="">Toate mărcile</option>
                    {ALL_BRANDS.map((make) => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Model - Dynamic based on make */}
                {filters.make && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                      <span className="mr-2">🚗</span>
                      Model
                    </label>
                    <select
                      value={filters.model}
                      onChange={(e) => handleFilterChange('model', e.target.value)}
                      className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    >
                      <option value="">Toate modelele</option>
                      {availableModels.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">💰</span>
                    Preț (EUR)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.price_min}
                      onChange={(e) => handleFilterChange('price_min', e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.price_max}
                      onChange={(e) => handleFilterChange('price_max', e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">📅</span>
                    An fabricație
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.year_min}
                      onChange={(e) => handleFilterChange('year_min', e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.year_max}
                      onChange={(e) => handleFilterChange('year_max', e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Mileage */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">🛣️</span>
                    Kilometraj maxim
                  </label>
                  <input
                    type="number"
                    placeholder="ex: 100000"
                    value={filters.mileage_max}
                    onChange={(e) => handleFilterChange('mileage_max', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">⛽</span>
                    Combustibil
                  </label>
                  <select
                    value={filters.fuel_type}
                    onChange={(e) => handleFilterChange('fuel_type', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  >
                    <option value="">Toate tipurile</option>
                    {fuelTypes.map((fuel) => (
                      <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">⚙️</span>
                    Transmisie
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  >
                    <option value="">Toate tipurile</option>
                    {transmissionTypes.map((trans) => (
                      <option key={trans.value} value={trans.value}>{trans.label}</option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">🏎️</span>
                    Caroserie
                  </label>
                  <select
                    value={filters.body_type}
                    onChange={(e) => handleFilterChange('body_type', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  >
                    <option value="">Toate tipurile</option>
                    {bodyTypes.map((body) => (
                      <option key={body.value} value={body.value}>
                        {body.icon} {body.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                    <span className="mr-2">✨</span>
                    Stare
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                  >
                    <option value="">Toate</option>
                    {conditions.map((cond) => (
                      <option key={cond.value} value={cond.value}>{cond.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-4 w-full bg-white rounded-lg shadow-sm px-4 py-3 flex items-center justify-center space-x-2"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span>Filtre</span>
            </button>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
                ))}
              </div>
            ) : vehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {/* Pagination */}
                {total > 12 && (
                  <div className="mt-8 flex justify-center space-x-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                      Anterior
                    </button>
                    <span className="px-4 py-2 bg-white rounded-lg shadow-sm">
                      Pagina {page}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={vehicles.length < 12}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                      Următorul
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500 text-lg">Nu s-au găsit vehicule.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Resetează filtrele
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
