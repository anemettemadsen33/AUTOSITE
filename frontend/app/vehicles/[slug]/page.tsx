import { Metadata } from 'next';
import VehicleSchema from '@/components/seo/VehicleSchema';

interface VehiclePageProps {
  params: {
    slug: string;
  };
}

// Mock function - in production, this would fetch from API
async function getVehicle(slug: string) {
  // This would be replaced with actual API call
  // For now, return mock data
  return {
    slug,
    make: 'BMW',
    model: 'X5',
    year: 2023,
    price: 55000,
    currency: 'EUR',
    mileage: 15000,
    fuel: 'diesel',
    transmission: 'automatic',
    bodyType: 'SUV',
    condition: 'used',
    description: 'Luxury SUV in excellent condition',
    images: ['/images/vehicle-placeholder.jpg'],
    vin: 'WBA1234567890',
    color: 'Black',
  };
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.slug);
  
  return {
    title: `${vehicle.make} ${vehicle.model} ${vehicle.year} - AUTOSITE`,
    description: vehicle.description || `${vehicle.make} ${vehicle.model} ${vehicle.year} for sale`,
    openGraph: {
      title: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
      description: vehicle.description || `${vehicle.make} ${vehicle.model} ${vehicle.year} for sale`,
      images: vehicle.images,
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const vehicle = await getVehicle(params.slug);

  return (
    <>
      <VehicleSchema vehicle={vehicle} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {vehicle.make} {vehicle.model} {vehicle.year}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="bg-gray-200 aspect-video rounded-lg mb-4">
                {/* Vehicle image would go here */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  Vehicle Image
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {vehicle.currency} {vehicle.price.toLocaleString()}
                </div>
                
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="font-semibold">Mileage:</dt>
                    <dd>{vehicle.mileage.toLocaleString()} km</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Fuel:</dt>
                    <dd className="capitalize">{vehicle.fuel}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Transmission:</dt>
                    <dd className="capitalize">{vehicle.transmission}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Body Type:</dt>
                    <dd className="capitalize">{vehicle.bodyType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Condition:</dt>
                    <dd className="capitalize">{vehicle.condition}</dd>
                  </div>
                  {vehicle.vin && (
                    <div className="flex justify-between">
                      <dt className="font-semibold">VIN:</dt>
                      <dd>{vehicle.vin}</dd>
                    </div>
                  )}
                </dl>
                
                <button 
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label={`Contact seller about ${vehicle.make} ${vehicle.model}`}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">{vehicle.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}
