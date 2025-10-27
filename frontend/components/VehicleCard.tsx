'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HeartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface VehicleCardProps {
  vehicle: {
    id: number;
    slug?: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage?: number;
    fuel_type?: string;
    transmission?: string;
    image?: string;
    images?: string[];
    location?: string;
    dealer?: {
      name: string;
      verified?: boolean;
    };
  };
  onFavoriteToggle?: (id: number) => void;
  isFavorite?: boolean;
}

export default function VehicleCard({ vehicle, onFavoriteToggle, isFavorite = false }: VehicleCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const vehicleSlug = vehicle.slug || `${vehicle.make}-${vehicle.model}-${vehicle.id}`.toLowerCase();
  const vehicleImage = vehicle.image || vehicle.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    onFavoriteToggle?.(vehicle.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('ro-RO').format(mileage) + ' km';
  };

  return (
    <Link href={`/vehicles/${vehicleSlug}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
        {/* Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={vehicleImage}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md"
            aria-label="Add to favorites"
          >
            {favorite ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {formatPrice(vehicle.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {vehicle.make} {vehicle.model}
          </h3>

          {/* Details */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <span className="font-medium">{vehicle.year}</span>
            </span>
            {vehicle.mileage && (
              <>
                <span>•</span>
                <span>{formatMileage(vehicle.mileage)}</span>
              </>
            )}
          </div>

          {/* Specs */}
          <div className="flex items-center gap-2 mb-3">
            {vehicle.fuel_type && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                {vehicle.fuel_type}
              </span>
            )}
            {vehicle.transmission && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                {vehicle.transmission}
              </span>
            )}
          </div>

          {/* Dealer */}
          {vehicle.dealer && (
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">{vehicle.dealer.name}</span>
              {vehicle.dealer.verified && (
                <span className="text-xs text-blue-600">✓ Verificat</span>
              )}
            </div>
          )}

          {/* Location */}
          {vehicle.location && (
            <div className="text-xs text-gray-500 mt-2">
              📍 {vehicle.location}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
