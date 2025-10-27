'use client';

import { useState } from 'react';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel, { VehicleFilters } from '@/components/FilterPanel';
import { useVehicles } from '@/lib/hooks/useVehicles';
import { formatPrice, formatMileage } from '@/lib/utils';
import Link from 'next/link';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

type ViewMode = 'grid' | 'list' | 'map';

export default function VehiclesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<VehicleFilters | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // Build API filters from UI filters
  const apiFilters = {
    search: searchQuery || undefined,
    make: filters?.brand?.[0] || undefined,
    fuel_type: filters?.fuelType?.[0] || undefined,
    transmission: filters?.transmission?.[0] || undefined,
    body_type: filters?.bodyType?.[0] || undefined,
    min_price: filters?.priceRange?.[0] || undefined,
    max_price: filters?.priceRange?.[1] || undefined,
    min_year: filters?.yearRange?.[0] || undefined,
    max_year: filters?.yearRange?.[1] || undefined,
    sort_by: sortBy,
    sort_order: sortOrder,
    page,
    per_page: 24,
  };

  const { data, isLoading, error } = useVehicles(apiFilters);
  const vehicles = data?.data || [];
  const pagination = data?.meta;

  const toggleCompare = (vehicleId: string) => {
    setCompareList(prev => 
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : prev.length < 4 ? [...prev, vehicleId] : prev
    );
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-');
    setSortBy(field);
    setSortOrder(order as 'asc' | 'desc');
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
            Găsește mașina perfectă din peste {pagination?.total || 0} vehicule verificate
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
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_at-desc">Cele mai noi</option>
                  <option value="price-asc">Preț crescător</option>
                  <option value="price-desc">Preț descrescător</option>
                  <option value="mileage-asc">Kilometri crescător</option>
                  <option value="year-desc">An descrescător</option>
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Eroare la încărcarea vehiculelor</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reîncearcă
                </button>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Nu au fost găsite vehicule</p>
                <button 
                  onClick={() => { setFilters(null); setSearchQuery(''); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Resetează filtrele
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Afișăm <span className="font-semibold text-gray-900">{vehicles.length}</span> din {pagination?.total || 0} vehicule
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {vehicles.map((vehicle: any) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={{
                          id: vehicle.id,
                          title: `${vehicle.make} ${vehicle.model}`,
                          price: vehicle.price,
                          year: vehicle.year,
                          km: vehicle.mileage,
                          fuel: vehicle.fuel_type,
                          transmission: vehicle.transmission,
                          power: vehicle.power_hp,
                          location: `${vehicle.location_city}, ${vehicle.location_country}`,
                          dealer: vehicle.dealer?.company_name || 'Dealer',
                          images: vehicle.images?.map((img: any) => img.url) || [],
                          featured: vehicle.is_featured,
                          verified: vehicle.dealer?.is_verified || false
                        }}
                        onCompare={() => toggleCompare(vehicle.id)}
                        isInCompare={compareList.includes(vehicle.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vehicles.map((vehicle: any) => (
                      <Link 
                        key={vehicle.id} 
                        href={`/vehicles/${vehicle.slug}`}
                        className="bg-white rounded-lg shadow-sm p-4 flex gap-4 hover:shadow-md transition"
                      >
                        <div className="w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {vehicle.images?.[0]?.url ? (
                            <img 
                              src={vehicle.images[0].url} 
                              alt={`${vehicle.make} ${vehicle.model}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{vehicle.make} {vehicle.model}</h3>
                          <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                            <div><span className="text-gray-500">An:</span> <span className="font-semibold">{vehicle.year}</span></div>
                            <div><span className="text-gray-500">KM:</span> <span className="font-semibold">{formatMileage(vehicle.mileage)}</span></div>
                            <div><span className="text-gray-500">Combustibil:</span> <span className="font-semibold capitalize">{vehicle.fuel_type}</span></div>
                            <div><span className="text-gray-500">Transmisie:</span> <span className="font-semibold capitalize">{vehicle.transmission}</span></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-black text-blue-600">{formatPrice(vehicle.price, vehicle.currency)}</div>
                            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Vezi Detalii
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                      Pagina {page} din {pagination.last_page}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                      disabled={page === pagination.last_page}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Următorul
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
            <div className="container mx-auto flex items-center justify-between">
              <span className="font-semibold">{compareList.length} vehicule selectate</span>
              <Link 
                href={`/compare?ids=${compareList.join(',')}`}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Compară ({compareList.length})
              </Link>
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
