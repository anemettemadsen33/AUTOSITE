'use client';

import { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, CheckCircleIcon, TruckIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

// Memoized Category Card Component pentru performance
const CategoryCard = memo(({ category }: { category: any }) => (
  <Link
    href={category.route}
    className="group bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-0.5"
  >
    <div className="text-blue-600 mb-2 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
      {category.icon}
    </div>
    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
      {category.name}
    </h3>
    <p className="text-xs text-gray-500 mb-1">
      {category.description}
    </p>
    <span className="text-xs font-semibold text-blue-600">
      {category.count}
    </span>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

// Memoized Feature Card Component
const FeatureCard = memo(({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
      {icon}
    </div>
    <h3 className="font-bold text-base mb-1">{title}</h3>
    <p className="text-gray-600 text-xs">{description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

// Categories data
const categories = [
  {
    id: 'cars',
    name: 'Mașini',
    route: '/vanzari/masini',
    description: 'Autoturisme',
    count: '450+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4M3 10h18M3 14h18" />
      </svg>
    )
  },
  {
    id: 'motorcycles',
    name: 'Motociclete',
    route: '/vanzari/motociclete',
    description: 'Moto & Scutere',
    count: '120+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="17" r="3" />
      </svg>
    )
  },
  {
    id: 'trucks',
    name: 'Camioane',
    route: '/vanzari/camioane',
    description: 'Transport marfă',
    count: '80+',
    icon: <TruckIcon className="w-10 h-10" strokeWidth={1.5} />
  },
  {
    id: 'vans',
    name: 'Utilitare',
    route: '/vanzari/utilitare',
    description: 'Vehicule comerciale',
    count: '150+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 'caravans',
    name: 'Rulote',
    route: '/vanzari/rulote',
    description: 'Camping & Turism',
    count: '45+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: 'parts',
    name: 'Piese Auto',
    route: '/vanzari/piese',
    description: 'Componente',
    count: '1000+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 'agricultural',
    name: 'Agricole',
    route: '/vanzari/agricole',
    description: 'Utilaje agricole',
    count: '60+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'construction',
    name: 'Construcții',
    route: '/vanzari/constructii',
    description: 'Utilaje construcții',
    count: '35+',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
];

export default function Home() {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (category) params.set('category', category);
    if (maxPrice) params.set('maxPrice', maxPrice);
    
    window.location.href = `/vanzari?${params.toString()}`;
  }, [brand, category, maxPrice]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
              Găsește Mașina Perfectă
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-6">
              Peste 1000+ vehicule verificate • Dealeri de încredere
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-2.5 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <select 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-md border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                  aria-label="Selectează marca"
                >
                  <option value="">Marcă</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                  <option value="volkswagen">Volkswagen</option>
                </select>
                
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 rounded-md border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                  aria-label="Selectează categoria"
                >
                  <option value="">Categorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Preț max"
                  className="px-3 py-2 bg-gray-50 rounded-md border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                  aria-label="Preț maxim"
                  min="0"
                />
                
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  aria-label="Caută vehicule"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Caută</span>
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 max-w-xl mx-auto" role="region" aria-label="Statistici platformă">
              <div>
                <div className="text-xl md:text-2xl font-black mb-0.5">1000+</div>
                <div className="text-blue-200 text-xs">Vehicule</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black mb-0.5">100+</div>
                <div className="text-blue-200 text-xs">Dealeri</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black mb-0.5">500+</div>
                <div className="text-blue-200 text-xs">Clienți</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 id="categories-heading" className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Categorii Vehicule
            </h2>
            <p className="text-sm text-gray-600">
              Găsește vehiculul perfect pentru nevoile tale
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 id="features-heading" className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              De Ce AutoSite?
            </h2>
            <p className="text-sm text-gray-600">
              Platformă premium pentru pasionații de automobile
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <FeatureCard 
              icon={<CheckCircleIcon className="w-6 h-6 text-blue-600" />}
              title="Verificate"
              description="Vehicule verificate"
            />
            <FeatureCard 
              icon={<TruckIcon className="w-6 h-6 text-cyan-600" />}
              title="Livrare"
              description="Max 7 zile"
            />
            <FeatureCard 
              icon={<ShieldCheckIcon className="w-6 h-6 text-blue-600" />}
              title="Garanție"
              description="Garanție extinsă"
            />
            <FeatureCard 
              icon={<ClockIcon className="w-6 h-6 text-cyan-600" />}
              title="24/7"
              description="Suport oricând"
            />
          </div>
        </div>
      </section>

      {/* CTA Section for Dealers */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-black mb-3">
              Ești Dealer Auto?
            </h2>
            <p className="text-base text-gray-300 mb-6">
              Alătură-te platformei și vinde mai mult
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                <div className="text-xl font-black mb-0.5 text-cyan-400">0%</div>
                <p className="text-xs">Comision luna 1</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                <div className="text-xl font-black mb-0.5 text-cyan-400">1M+</div>
                <p className="text-xs">Vizitatori</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                <div className="text-xl font-black mb-0.5 text-cyan-400">24/7</div>
                <p className="text-xs">Suport</p>
              </div>
            </div>

            <Link
              href="/register?type=dealer"
              className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              Începe Acum Gratuit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
  