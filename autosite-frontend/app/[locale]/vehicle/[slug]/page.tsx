import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getVehicle } from '@/lib/vehicles';
import type { Metadata } from 'next';

// Lazy load heavy components
const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
  ),
});

const ContactDealerButton = dynamic(() => import('@/components/ContactDealerButton'));

interface VehiclePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const response = await getVehicle(params.slug);

  if (!response || !response.data) {
    return {
      title: 'Vehicle Not Found',
    };
  }

  const vehicle = response.data;
  const vehicleTitle = typeof vehicle.title === 'object' 
    ? vehicle.title[params.locale] || Object.values(vehicle.title)[0] 
    : 'Vehicle Details';
  const vehicleDescription = typeof vehicle.description === 'object' 
    ? vehicle.description[params.locale]?.substring(0, 160) || Object.values(vehicle.description)[0]?.substring(0, 160)
    : '';

  return {
    title: vehicle.meta_title || vehicleTitle,
    description: vehicle.meta_description || vehicleDescription,
    openGraph: {
      title: vehicle.meta_title || vehicleTitle,
      description: vehicle.meta_description || vehicleDescription,
      images: vehicle.images?.length ? [vehicle.images[0].url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: vehicle.meta_title || vehicleTitle,
      description: vehicle.meta_description || vehicleDescription,
      images: vehicle.images?.length ? [vehicle.images[0].url] : [],
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const response = await getVehicle(params.slug);

  if (!response || !response.data) {
    notFound();
  }

  const vehicle = response.data;

  // Get multilingual title and description
  const vehicleTitle = typeof vehicle.title === 'object' 
    ? vehicle.title[params.locale] || Object.values(vehicle.title)[0] || 'Vehicle Details'
    : 'Vehicle Details';

  const vehicleDescription = typeof vehicle.description === 'object'
    ? vehicle.description[params.locale] || Object.values(vehicle.description)[0] || ''
    : '';

  // Format price with currency
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div>
          <ImageCarousel images={vehicle.images || []} alt={vehicleTitle} />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {vehicleTitle}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(vehicle.price.amount, vehicle.price.currency)}
              </span>
              {vehicle.status && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.status === 'available'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : vehicle.status === 'sold'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Key Specifications */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.year}</p>
              </div>
            </div>

            {vehicle.mileage && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
            )}

            {vehicle.fuel_type && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{vehicle.fuel_type}</p>
                </div>
              </div>
            )}

            {vehicle.transmission && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transmission</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{vehicle.transmission}</p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4">
            {vehicle.body_type && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Body Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{vehicle.body_type}</p>
              </div>
            )}

            {vehicle.color && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
                <p className="font-medium text-gray-900 dark:text-white">{vehicle.color}</p>
              </div>
            )}

            {vehicle.location && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vehicle.location.city}, {vehicle.location.country}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {vehicleDescription && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {vehicleDescription}
                </p>
              </div>
            </div>
          )}

          {/* Dealer Information */}
          {vehicle.dealer && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Dealer Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white font-medium">
                  {vehicle.dealer.name}
                </p>
                {vehicle.dealer.email && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: {vehicle.dealer.email}
                  </p>
                )}
                {vehicle.dealer.phone && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Phone: {vehicle.dealer.phone}
                  </p>
                )}
                {vehicle.dealer.address && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Address: {vehicle.dealer.address}
                  </p>
                )}
              </div>

              {/* Contact Dealer Button */}
              <ContactDealerButton 
                vehicleId={vehicle.id}
                vehicleTitle={vehicleTitle}
                dealerId={vehicle.dealer.id}
                className="mt-4 w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
