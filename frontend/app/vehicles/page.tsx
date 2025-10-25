'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VehicleCard from '@/components/ui/VehicleCard';
import api from '@/lib/api';
import { Vehicle, PaginatedResponse } from '@/lib/types';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function VehiclesPage() {
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
    setFilters((prev) => ({ ...prev, [key]: value }));
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
      fuel_type: '',
      transmission: '',
      body_type: '',
      condition: '',
      query: '',
    });
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
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filtre</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Resetează
                </button>
              </div>

              <div className="space-y-4">
                {/* Make */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marcă
                  </label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toate mărcile</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Porsche">Porsche</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preț (EUR)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.price_min}
                      onChange={(e) => handleFilterChange('price_min', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.price_max}
                      onChange={(e) => handleFilterChange('price_max', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    An fabricație
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.year_min}
                      onChange={(e) => handleFilterChange('year_min', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.year_max}
                      onChange={(e) => handleFilterChange('year_max', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Combustibil
                  </label>
                  <select
                    value={filters.fuel_type}
                    onChange={(e) => handleFilterChange('fuel_type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toate tipurile</option>
                    <option value="petrol">Benzină</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hibrid</option>
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmisie
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toate tipurile</option>
                    <option value="manual">Manuală</option>
                    <option value="automatic">Automată</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stare
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toate</option>
                    <option value="new">Nou</option>
                    <option value="used">Second Hand</option>
                    <option value="certified">Certificat</option>
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
