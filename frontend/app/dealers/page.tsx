'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDealers } from '@/lib/hooks/useDealers';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CheckBadgeIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function DealersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    verified: false,
  });

  const { data, isLoading } = useDealers({
    search: searchQuery || undefined,
    country: filters.country || undefined,
    city: filters.city || undefined,
    verified: filters.verified || undefined,
  });

  const dealers = data?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
            <BuildingStorefrontIcon className="w-10 h-10 text-blue-600" />
            Dealeri Verificați
          </h1>
          <p className="text-gray-600">
            {dealers.length} dealeri de încredere în Europa
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută dealer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                Doar verificați
              </span>
            </label>
          </div>
        </div>

        {/* Dealers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : dealers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealers.map((dealer: any) => (
              <Link 
                href={`/dealers/${dealer.id}`} 
                key={dealer.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 group"
              >
                {/* Dealer Logo/Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {dealer.company_name}
                      </h3>
                      {dealer.verified && (
                        <CheckBadgeIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    {dealer.description?.en && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {dealer.description.en}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{dealer.city}, {dealer.country}</span>
                  </div>
                  {dealer.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{dealer.phone}</span>
                    </div>
                  )}
                  {dealer.email && (
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{dealer.email}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Vehicule disponibile</span>
                    <span className="font-bold text-blue-600">{dealer.vehicles_count || 0}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-1">
                    Vezi detalii
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <BuildingStorefrontIcon className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Niciun dealer găsit
            </h2>
            <p className="text-gray-600 mb-6">
              Încearcă să modifici criteriile de căutare
            </p>
            <button
              onClick={() => { setSearchQuery(''); setFilters({ country: '', city: '', verified: false }); }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Resetează filtrele
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
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
