'use client';

import { useTranslations } from 'next-intl';
import type { Vehicle } from '@/lib/vehicles';
import Link from 'next/link';

interface CompareTableProps {
  vehicles: Vehicle[];
  onRemove: (vehicleId: number) => void;
}

export default function CompareTable({ vehicles, onRemove }: CompareTableProps) {
  const t = useTranslations('compare');

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t('noVehicles')}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {t('browseVehicles')}
        </Link>
      </div>
    );
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTitle = (vehicle: Vehicle): string => {
    if (typeof vehicle.title === 'object') {
      return Object.values(vehicle.title)[0] || `${vehicle.make} ${vehicle.model}`;
    }
    return `${vehicle.make} ${vehicle.model}`;
  };

  const specifications = [
    { key: 'price', label: t('price') },
    { key: 'year', label: t('year') },
    { key: 'mileage', label: t('mileage') },
    { key: 'fuel_type', label: t('fuelType') },
    { key: 'transmission', label: t('transmission') },
    { key: 'body_type', label: t('bodyType') },
    { key: 'color', label: t('color') },
    { key: 'location', label: t('location') },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-100 dark:bg-gray-800 p-4 text-left font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
              {t('specification')}
            </th>
            {vehicles.map((vehicle) => (
              <th
                key={vehicle.id}
                className="bg-gray-100 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 min-w-[250px]"
              >
                <div className="space-y-3">
                  {/* Vehicle Image */}
                  {vehicle.images && vehicle.images.length > 0 && (
                    <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={vehicle.images[0].url}
                        alt={getTitle(vehicle)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Vehicle Title */}
                  <Link
                    href={`/vehicle/${vehicle.slug}`}
                    className="block font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {getTitle(vehicle)}
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemove(vehicle.id)}
                    className="w-full px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                  >
                    {t('remove')}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={spec.key} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
              <td className="p-4 font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {spec.label}
              </td>
              {vehicles.map((vehicle) => (
                <td
                  key={vehicle.id}
                  className="p-4 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {spec.key === 'price' && (
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {formatPrice(vehicle.price.amount, vehicle.price.currency)}
                    </span>
                  )}
                  {spec.key === 'year' && vehicle.year}
                  {spec.key === 'mileage' && vehicle.mileage && (
                    <>{vehicle.mileage.toLocaleString()} km</>
                  )}
                  {spec.key === 'fuel_type' && (vehicle.fuel_type || '—')}
                  {spec.key === 'transmission' && (vehicle.transmission || '—')}
                  {spec.key === 'body_type' && (vehicle.body_type || '—')}
                  {spec.key === 'color' && (vehicle.color || '—')}
                  {spec.key === 'location' && vehicle.location && (
                    <>{[vehicle.location.city, vehicle.location.country].filter(Boolean).join(', ') || '—'}</>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
