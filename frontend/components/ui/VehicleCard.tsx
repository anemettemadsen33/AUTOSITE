import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage } from '@/lib/utils';
import { MapPinIcon, CalendarIcon, CogIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = vehicle.images?.[0]?.thumb_url || 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';

  return (
    <Link href={`/vehicles/${vehicle.slug}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={imageUrl}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {vehicle.is_featured && (
              <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/50 animate-pulse">
                <SparklesIcon className="w-4 h-4" />
                <span>Premium</span>
              </div>
            )}
            {vehicle.condition === 'new' && (
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/50">
                Nou
              </div>
            )}
          </div>
          
          {/* Dealer badge */}
          {vehicle.dealer?.is_verified && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-600 shadow-lg flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verificat</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
            {vehicle.make} {vehicle.model}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">{vehicle.year} • {vehicle.fuel_type}</p>

          {/* Price */}
          <div className="mb-4">
            <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {formatPrice(vehicle.price, vehicle.currency)}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">{vehicle.year}</span>
            </div>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <CogIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">{formatMileage(vehicle.mileage)}</span>
            </div>
          </div>

          {/* Location & Transmission */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span>{vehicle.location_city}</span>
            </div>
            <span className="capitalize bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-semibold">
              {vehicle.transmission}
            </span>
          </div>

          {/* Dealer */}
          {vehicle.dealer && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">{vehicle.dealer.company_name}</p>
            </div>
          )}
        </div>

        {/* Hover effect bar */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
}
