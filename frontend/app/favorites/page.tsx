'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/ui/VehicleCard';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [favorites, setFavorites] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setTimeout(() => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setLoading(false);
    }, 500);
  }, [isAuthenticated]);

  const removeFavorite = (vehicleId: number) => {
    const newFavorites = favorites.filter(v => v.id !== vehicleId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Favorite
          </h1>
          <p className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'vehicul salvat' : 'vehicule salvate'}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((vehicle) => (
              <div key={vehicle.id} className="relative">
                <VehicleCard vehicle={vehicle} />
                <button
                  onClick={() => removeFavorite(vehicle.id)}
                  className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  <HeartIcon className="w-5 h-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <HeartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nu ai favorite încă
            </h2>
            <p className="text-gray-600 mb-6">
              Salvează vehiculele preferate pentru a le găsi mai ușor
            </p>
            <a
              href="/vehicles"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explorează vehicule
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
