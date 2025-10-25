'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VehicleCard from '@/components/ui/VehicleCard';
import api from '@/lib/api';
import { Vehicle } from '@/lib/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFeaturedVehicles();
  }, []);

  const fetchFeaturedVehicles = async () => {
    try {
      const response = await api.get('/vehicles?is_featured=1&per_page=6');
      setFeaturedVehicles(response.data.data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/vehicles?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Găsește Mașina Perfectă
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Peste 1000+ vehicule verificate de la dealeri de încredere
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-2 flex">
                <input
                  type="text"
                  placeholder="Caută după marcă, model sau tip..."
                  className="flex-1 px-4 py-3 text-gray-900 outline-none rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Caută</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Vehicule Recomandate
              </h2>
              <p className="text-gray-600">Cele mai bune oferte selectate pentru tine</p>
            </div>
            <Link
              href="/vehicles"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Vezi toate →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
              ))}
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">Nu există vehicule recomandate momentan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Caută după Categorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Break', 'Cabrio', 'Monovolum', 'Pick-up'].map((category) => (
              <Link
                key={category}
                href={`/vehicles?body_type=${category.toLowerCase()}`}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-600 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ești dealer auto?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Alătură-te platformei noastre și vinde mai rapid
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Înregistrează-te ca Dealer
          </Link>
        </div>
      </section>
    </div>
  );
}

