'use client';

import { useState } from 'react';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel, { VehicleFilters } from '@/components/FilterPanel';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  MapIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

// Mock data
const mockVehicles = Array.from({ length: 24 }, (_, i) => ({
  id: `vehicle-${i + 1}`,
  title: ['BMW Seria 5', 'Mercedes C-Class', 'Audi A4', 'VW Golf', 'Ford Focus'][i % 5],
  price: 15000 + (i * 2500),
  year: 2018 + (i % 6),
  km: 45000 + (i * 5000),
  fuel: ['Diesel', 'Benzină', 'Hibrid', 'Electric'][i % 4],
  transmission: ['Automată', 'Manuală'][i % 2],
  power: 150 + (i * 10),
  location: 'București',
  dealer: 'Premium Motors',
  images: [`/vehicles/car-${i % 5}.jpg`],
  featured: i % 7 === 0,
  verified: i % 3 === 0
}));

type ViewMode = 'grid' | 'list' | 'map';

export default function VehiclesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<VehicleFilters | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (vehicleId: string) => {
    setCompareList(prev => 
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : prev.length < 4 ? [...prev, vehicleId] : prev
    );
  };

  const activeFiltersCount = filters ? 
    (filters.fuelType.length + filters.transmission.length + filters.bodyType.length + filters.brand.length) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Vehicule Disponibile
          </h1>
          <p className="text-gray-600">
            Găsește mașina perfectă din peste 1,200 de vehicule verificate
          </p>
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel onFilterChange={setFilters} />
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Caută vehicule..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FunnelIcon className="w-5 h-5" />
                  Filtre
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date-desc">Cele mai noi</option>
                  <option value="price-asc">Preț crescător</option>
                  <option value="price-desc">Preț descrescător</option>
                  <option value="km-asc">Kilometri crescător</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    <Squares2X2Icon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    <ListBulletIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              Afișăm <span className="font-semibold text-gray-900">{mockVehicles.length}</span> vehicule
            </div>

            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockVehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onCompare={() => toggleCompare(vehicle.id)}
                    isInCompare={compareList.includes(vehicle.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockVehicles.map(vehicle => (
                  <div key={vehicle.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                    <div className="w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{vehicle.title}</h3>
                      <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                        <div><span className="text-gray-500">An:</span> <span className="font-semibold">{vehicle.year}</span></div>
                        <div><span className="text-gray-500">KM:</span> <span className="font-semibold">{vehicle.km.toLocaleString()}</span></div>
                        <div><span className="text-gray-500">Combustibil:</span> <span className="font-semibold">{vehicle.fuel}</span></div>
                        <div><span className="text-gray-500">Transmisie:</span> <span className="font-semibold">{vehicle.transmission}</span></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-black text-blue-600">€{vehicle.price.toLocaleString()}</div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Vezi Detalii
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
            <div className="container mx-auto flex items-center justify-between">
              <span className="font-semibold">{compareList.length} vehicule selectate</span>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Compară ({compareList.length})
              </button>
            </div>
          </div>
        )}

        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white">
              <FilterPanel onFilterChange={setFilters} onClose={() => setShowFilters(false)} isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
