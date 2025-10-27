'use client';

import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import VehicleCard from '@/components/VehicleCard';
import { useFavorites, useToggleFavorite } from '@/lib/hooks/useFavorites';
import { formatPrice, formatMileage } from '@/lib/utils';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function FavoritesPage() {
  const { data, isLoading } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  
  const favorites = data?.data || [];

  const handleRemove = (vehicleId: string) => {
    toggleFavorite.mutate(vehicleId);
  };

  return (
    <AuthGuard requireAuth>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <HeartIcon className="w-8 h-8 text-red-600" />
              Favorite
            </h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'vehicul salvat' : 'vehicule salvate'}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
              ))}
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((vehicle: any) => (
                <div key={vehicle.id} className="relative group">
                  <VehicleCard 
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
                  />
                  <button
                    onClick={() => handleRemove(vehicle.id)}
                    disabled={toggleFavorite.isPending}
                    className="absolute top-4 right-4 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Elimină din favorite"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <HeartIcon className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Nu ai favorite încă
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Salvează vehiculele preferate pentru a le găsi mai ușor mai târziu
              </p>
              <Link
                href="/vehicles"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                Explorează vehicule
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
