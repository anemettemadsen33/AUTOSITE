'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSettingsStore } from '@/stores/settingsStore';
import FavoriteButton from './FavoriteButton';
import type { Vehicle } from '@/lib/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const t = useTranslations('vehicle');
  const { selectedCurrency, getExchangeRate } = useSettingsStore();

  // Get converted price
  const getConvertedPrice = () => {
    if (vehicle.price.currency === selectedCurrency) {
      return vehicle.price.amount;
    }
    
    const rate = getExchangeRate(vehicle.price.currency, selectedCurrency);
    return Math.round(vehicle.price.amount * rate);
  };

  const convertedPrice = getConvertedPrice();
  const firstImage = vehicle.images?.[0]?.url || '/placeholder-car.jpg';
  const vehicleTitle = typeof vehicle.title === 'object' 
    ? Object.values(vehicle.title)[0] 
    : vehicle.title || `${vehicle.make} ${vehicle.model}`;

  return (
    <Link href={`/vehicle/${vehicle.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer relative">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
          <Image
            src={firstImage}
            alt={vehicleTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {vehicle.status && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {vehicle.status}
            </div>
          )}
          {/* Favorite button */}
          <div 
            className="absolute top-2 left-2 z-10" 
            onClick={(e) => e.preventDefault()}
          >
            <FavoriteButton vehicleId={vehicle.id} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 truncate">
            {vehicleTitle}
          </h3>

          {/* Make & Model */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {vehicle.make} {vehicle.model} • {vehicle.year}
          </p>

          {/* Price */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {convertedPrice.toLocaleString()} {selectedCurrency}
            </span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>

            {vehicle.fuel_type && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-5-4H9a2 2 0 01-2-2V4a2 2 0 012-2h6a2 2 0 012 2v4z" />
                </svg>
                <span>{vehicle.fuel_type}</span>
              </div>
            )}

            {vehicle.transmission && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>{vehicle.transmission}</span>
              </div>
            )}

            {vehicle.location?.city && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{vehicle.location.city}</span>
              </div>
            )}
          </div>

          {/* View Details */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              {t('viewDetails')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
