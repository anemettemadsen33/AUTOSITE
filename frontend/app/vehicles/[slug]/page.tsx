'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage } from '@/lib/utils';
import {
  CalendarIcon,
  CogIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchVehicle();
    }
  }, [slug]);

  const fetchVehicle = async () => {
    try {
      const response = await api.get(`/vehicles/${slug}`);
      setVehicle(response.data.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehiculul nu a fost găsit</h1>
          <Link href="/vehicles" className="text-blue-600 hover:text-blue-700">
            Înapoi la listă
          </Link>
        </div>
      </div>
    );
  }

  const images = vehicle.images || [];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Acasă
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/vehicles" className="text-blue-600 hover:text-blue-700">
            Vehicule
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{vehicle.make} {vehicle.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative h-96 bg-gray-100">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex]?.url || 'https://placehold.co/1200x800/e2e8f0/64748b?text=No+Image'}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <img 
                      src="https://placehold.co/1200x800/e2e8f0/64748b?text=No+Image" 
                      alt="No vehicle image"
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                        currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.thumb_url}
                        alt={`${vehicle.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {vehicle.make} {vehicle.model}
              </h1>

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">An fabricație</div>
                  <div className="font-semibold text-gray-900">{vehicle.year}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Kilometraj</div>
                  <div className="font-semibold text-gray-900">{formatMileage(vehicle.mileage)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Combustibil</div>
                  <div className="font-semibold text-gray-900 capitalize">{vehicle.fuel_type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Transmisie</div>
                  <div className="font-semibold text-gray-900 capitalize">{vehicle.transmission}</div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Descriere</h2>
                <p className="text-gray-700 whitespace-pre-line">{vehicle.description}</p>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specificații Tehnice</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Caroserie</span>
                  <span className="font-semibold text-gray-900 capitalize">{vehicle.body_type}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Stare</span>
                  <span className="font-semibold text-gray-900 capitalize">{vehicle.condition}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Capacitate motor</span>
                  <span className="font-semibold text-gray-900">{vehicle.engine_capacity}L</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Putere</span>
                  <span className="font-semibold text-gray-900">{vehicle.power_hp} CP</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Locație</span>
                  <span className="font-semibold text-gray-900">
                    {vehicle.location_city}, {vehicle.location_country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-20">
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {formatPrice(vehicle.price, vehicle.currency)}
              </div>

              {/* Dealer Info */}
              {vehicle.dealer && (
                <div className="border-t pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Dealer</h3>
                    {vehicle.dealer.is_verified && (
                      <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-900 font-semibold mb-4">
                    {vehicle.dealer.company_name}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {vehicle.dealer.location_city}, {vehicle.dealer.location_country}
                    </div>
                    {vehicle.dealer.phone && (
                      <a
                        href={`tel:${vehicle.dealer.phone}`}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {vehicle.dealer.phone}
                      </a>
                    )}
                    {vehicle.dealer.email && (
                      <a
                        href={`mailto:${vehicle.dealer.email}`}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        {vehicle.dealer.email}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  Trimite Mesaj
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition">
                  Programează Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
