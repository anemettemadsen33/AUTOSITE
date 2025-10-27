'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import VehicleCard from '@/components/ui/VehicleCard';
import { mockVehicles } from '@/lib/mockData';
import { useFavoritesStore } from '@/stores/favoritesStore';

const mockDealers = [
  {
    id: 1,
    name: 'AutoElite Motors',
    slug: 'autoelite-motors',
    city: 'București',
    address: 'Șos. Pipera nr. 42',
    phone: '+40 721 234 567',
    email: 'contact@autoelite.ro',
    rating: 4.8,
    reviews: 156,
    vehiclesCount: 45,
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=1200&h=400&fit=crop',
    description: 'Dealer autorizat de mărci premium. Peste 15 ani de experiență în vânzarea de vehicule second-hand certificate.',
    longDescription: 'AutoElite Motors este unul dintre cei mai de încredere dealeri auto din București. Cu o experiență de peste 15 ani în domeniu, ne-am construit o reputație solidă bazată pe profesionalism, transparență și calitate. Oferim doar vehicule certificate, verificate tehnic și cu istoric complet documentat.',
    brands: ['BMW', 'Mercedes-Benz', 'Audi'],
    verified: true,
    features: [
      'Vehicule certificate RAR',
      'Garanție extinsă disponibilă',
      'Service autorizat',
      'Finanțare și leasing',
      'Test drive gratuit',
      'Trade-in evaluat corect',
    ],
    schedule: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: '10:00 - 14:00',
      sunday: 'Închis',
    },
  },
];

export default function DealerPage({ params }: { params: { slug: string } }) {
  const dealer = mockDealers.find(d => d.slug === params.slug);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (!dealer) {
    notFound();
  }

  const dealerVehicles = mockVehicles.filter(v => v.dealerId === dealer.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gray-900">
        <Image
          src={dealer.coverImage}
          alt={dealer.name}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Dealer Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 pb-6">
            <div className="w-32 h-32 bg-white rounded-xl overflow-hidden shadow-xl flex-shrink-0 border-4 border-white">
              <Image
                src={dealer.logo}
                alt={dealer.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-black text-gray-900">{dealer.name}</h1>
                    {dealer.verified && (
                      <CheckBadgeIcon className="w-7 h-7 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{dealer.rating}</span>
                      <span className="text-gray-500">({dealer.reviews} recenzii)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPinIcon className="w-5 h-5" />
                      <span>{dealer.city}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 max-w-2xl">{dealer.description}</p>
                </div>

                <Link
                  href="#contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Contactează
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {dealer.brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Despre noi</h2>
              <p className="text-gray-600 leading-relaxed">{dealer.longDescription}</p>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">Ce oferim:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dealer.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckBadgeIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">
                  Vehicule disponibile ({dealerVehicles.length})
                </h2>
                <Link
                  href={`/vehicles?dealer=${dealer.id}`}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Vezi toate →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dealerVehicles.slice(0, 4).map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={isFavorite(vehicle.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4" id="contact">
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Adresă</div>
                    <div className="font-semibold text-gray-900">{dealer.address}</div>
                    <div className="text-gray-600">{dealer.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Telefon</div>
                    <a href={`tel:${dealer.phone}`} className="font-semibold text-blue-600 hover:text-blue-700">
                      {dealer.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a href={`mailto:${dealer.email}`} className="font-semibold text-blue-600 hover:text-blue-700">
                      {dealer.email}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-900">Program</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    {Object.entries(dealer.schedule).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{day}:</span>
                        <span className="font-semibold text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg">
                  Trimite mesaj
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistici</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-black text-blue-600">{dealer.vehiclesCount}</div>
                  <div className="text-sm text-gray-600">Vehicule active</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-green-600">{dealer.rating}</div>
                  <div className="text-sm text-gray-600">Rating mediu</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-600">{dealer.reviews}</div>
                  <div className="text-sm text-gray-600">Recenzii clienți</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
