'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import { formatPrice, formatNumber } from '@/lib/utils';
import { useCurrency } from '@/lib/stores/useCurrency';
import { useFavorites } from '@/lib/stores/useFavorites';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { currency, convert } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const displayPrice = convert(vehicle.price, vehicle.currency as any, currency);
  const favorite = isFavorite(vehicle.id);

  return (
    <div className="card card-hover group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.images[0] || '/images/placeholder-car.jpg'}
          alt={vehicle.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {vehicle.isFeatured && (
            <span className="px-2 py-1 text-xs font-medium bg-accent text-white rounded-md">
              Featured
            </span>
          )}
          {vehicle.isVerified && (
            <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-md">
              Verified
            </span>
          )}
          {vehicle.condition === 'new' && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-md">
              New
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(vehicle.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <Link href={`/listings/${vehicle.slug}`} className="block p-4">
        <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
          {vehicle.title}
        </h3>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-accent">
            {formatPrice(displayPrice, currency)}
          </span>
          {vehicle.currency !== currency && (
            <span className="ml-2 text-sm text-gray-500">
              ({formatPrice(vehicle.price, vehicle.currency)})
            </span>
          )}
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{formatNumber(vehicle.mileage)} km</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span>{vehicle.fuel}</span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{vehicle.location.city}, {vehicle.location.country}</span>
        </div>
      </Link>
    </div>
  );
}
