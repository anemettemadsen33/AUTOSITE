'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Dealer, Vehicle } from '@/lib/types';
import VehicleCard from '@/components/ui/VehicleCard';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function DealerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDealer();
    }
  }, [id]);

  const fetchDealer = async () => {
    try {
      const response = await api.get(`/dealers/${id}`);
      setDealer(response.data.data);
      
      const vehiclesResponse = await api.get(`/vehicles?dealer_id=${id}`);
      setVehicles(vehiclesResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching dealer:', error);
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

  if (!dealer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dealerul nu a fost găsit</h1>
          <Link href="/dealers" className="text-blue-600 hover:text-blue-700">
            Înapoi la dealeri
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-700">Acasă</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/dealers" className="text-blue-600 hover:text-blue-700">Dealeri</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{dealer.company_name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {dealer.company_name}
              </h1>
              {dealer.is_verified && (
                <div className="flex items-center text-green-600">
                  <CheckBadgeIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Dealer Verificat</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Informații Contact</h3>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-3" />
                <span>{dealer.location_city}, {dealer.location_country}</span>
              </div>
              {dealer.phone && (
                <a href={`tel:${dealer.phone}`} className="flex items-center text-blue-600 hover:text-blue-700">
                  <PhoneIcon className="w-5 h-5 mr-3" />
                  <span>{dealer.phone}</span>
                </a>
              )}
              {dealer.email && (
                <a href={`mailto:${dealer.email}`} className="flex items-center text-blue-600 hover:text-blue-700">
                  <EnvelopeIcon className="w-5 h-5 mr-3" />
                  <span>{dealer.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Vehicule disponibile ({vehicles.length})
          </h2>
          
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Acest dealer nu are vehicule momentan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
