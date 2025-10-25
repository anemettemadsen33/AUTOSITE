'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Dealer } from '@/lib/types';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await api.get('/dealers');
      setDealers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching dealers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dealeri Verificați
          </h1>
          <p className="text-gray-600">
            {dealers.length} dealeri de încredere
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : dealers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealers.map((dealer) => (
              <Link href={`/dealers/${dealer.id}`} key={dealer.id}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {dealer.company_name}
                    </h3>
                    {dealer.is_verified && (
                      <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      <span>{dealer.location_city}, {dealer.location_country}</span>
                    </div>
                    {dealer.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span>{dealer.phone}</span>
                      </div>
                    )}
                    {dealer.email && (
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        <span>{dealer.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-blue-600 font-semibold">
                      Vezi vehicule →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Nu există dealeri momentan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
