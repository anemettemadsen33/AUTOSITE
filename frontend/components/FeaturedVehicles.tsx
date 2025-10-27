'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useVehicles } from '@/lib/hooks/useVehicles';

export default function FeaturedVehicles() {
  const { data: vehiclesResponse, isLoading } = useVehicles({ 
    sort: 'newest',
    per_page: 8 
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
            Vehicule Recomandate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const vehicles = vehiclesResponse?.data || [];

  if (vehicles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
          Vehicule Recomandate
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {vehicles.map((vehicle) => {
            const primaryImage = vehicle.images?.find(img => img.is_primary) || vehicle.images?.[0];
            
            return (
              <Link
                key={vehicle.id}
                href={`/vehicles/${vehicle.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-200">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  
                  <div className="text-xs text-gray-600 mb-3 space-y-1">
                    <div>{vehicle.year} • {vehicle.mileage.toLocaleString()} km</div>
                    <div>{vehicle.fuel_type} • {vehicle.transmission}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-blue-600">
                      €{vehicle.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {vehicle.dealer?.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/vehicles"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Vezi Toate Vehiculele
          </Link>
        </div>
      </div>
    </section>
  );
}
