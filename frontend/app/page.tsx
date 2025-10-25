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
    if (searchQuery.trim()) {
      window.location.href = `/vehicles?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                #1 Platformă Auto Premium
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Găsește Mașina
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Perfectă
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100/90 font-light">
              Peste <span className="font-bold text-cyan-300">1000+</span> vehicule premium de la dealeri verificați
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Caută după marcă, model sau tip..."
                  className="flex-1 px-6 py-4 text-gray-900 text-lg outline-none rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  <span>Caută Acum</span>
                </button>
              </div>
            </form>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-300 mb-1">1000+</div>
                <div className="text-sm text-blue-200/70">Vehicule</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl font-black text-cyan-300 mb-1">100+</div>
                <div className="text-sm text-blue-200/70">Dealeri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-300 mb-1">24/7</div>
                <div className="text-sm text-blue-200/70">Suport</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ⭐ Premium Selection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Vehicule <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Recomandate</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cele mai bune oferte selectate special pentru tine de experții noștri
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-[420px] animate-pulse"></div>
              ))}
            </div>
          ) : featuredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span>Vezi Toate Vehiculele</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-lg">Nu există vehicule recomandate momentan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Caută după <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Categorie</span>
            </h2>
            <p className="text-gray-600 text-lg">Alege tipul de vehicul care ți se potrivește</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'SUV', icon: '🚙', gradient: 'from-blue-500 to-cyan-400' },
              { name: 'Sedan', icon: '🚗', gradient: 'from-purple-500 to-pink-400' },
              { name: 'Hatchback', icon: '🚕', gradient: 'from-orange-500 to-red-400' },
              { name: 'Coupe', icon: '🏎️', gradient: 'from-green-500 to-emerald-400' },
              { name: 'Break', icon: '🚐', gradient: 'from-indigo-500 to-blue-400' },
              { name: 'Cabrio', icon: '🏁', gradient: 'from-pink-500 to-rose-400' },
              { name: 'Monovolum', icon: '🚌', gradient: 'from-teal-500 to-cyan-400' },
              { name: 'Pick-up', icon: '🛻', gradient: 'from-amber-500 to-yellow-400' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/vehicles?body_type=${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${category.gradient} mx-auto rounded-full transition-all duration-500`}></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full text-sm font-bold">
                💼 Pentru Dealeri
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ești dealer auto?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-2">
                Alătură-te Platformei!
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-10 text-blue-100/90 max-w-2xl mx-auto">
              Peste <span className="font-bold text-cyan-300">10,000+</span> potențiali clienți te așteaptă.
              Vinde mai rapid, mai eficient.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { icon: '📈', title: 'Vânzări Mai Rapide', desc: 'Expunere maximă' },
                { icon: '✅', title: 'Verificare Gratuită', desc: 'Badge verificat' },
                { icon: '💰', title: 'Comision 0%', desc: '3 luni gratuit' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-blue-200/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="inline-flex items-center space-x-3 bg-white text-blue-900 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 group"
            >
              <span>Înregistrează-te Gratuit</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="mt-6 text-sm text-blue-200/70">
              Nu este necesară metoda de plată • Activare imediată
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

