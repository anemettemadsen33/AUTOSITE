import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage } from '@/lib/utils';
import { MapPinIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = vehicle.images?.[0]?.thumb_url || 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';

  return (
    <Link href={`/vehicles/${vehicle.slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {vehicle.is_featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Recomandat
            </div>
          )}
          {vehicle.condition === 'new' && (
            <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Nou
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
            {vehicle.make} {vehicle.model}
          </h3>

          {/* Price */}
          <div className="text-2xl font-bold text-blue-600 mb-3">
            {formatPrice(vehicle.price, vehicle.currency)}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{vehicle.year}</span>
              <span className="mx-2">•</span>
              <span>{formatMileage(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center">
              <CogIcon className="w-4 h-4 mr-2" />
              <span className="capitalize">{vehicle.fuel_type}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{vehicle.location_city}, {vehicle.location_country}</span>
            </div>
          </div>

          {/* Dealer */}
          {vehicle.dealer && (
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">{vehicle.dealer.company_name}</span>
              {vehicle.dealer.is_verified && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Verificat
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
