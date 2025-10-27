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
  {
    id: 'cars',
    name: 'Mașini',
    route: '/vanzari/masini',
    description: 'Autoturisme',
    count: '450+',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18" />
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
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'trucks',
    name: 'Camioane',
    route: '/vanzari/camioane',
    description: 'Transport marfă',
    count: '80+',
    icon: (
      <TruckIcon className="w-12 h-12" />
    )
  },
  {
    id: 'vans',
    name: 'Utilitare',
    route: '/vanzari/utilitare',
    description: 'Vehicule comerciale',
    count: '150+',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Găsește Mașina Perfectă
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Peste 1000+ vehicule verificate • Dealeri de încredere • Livrare rapidă
            </p>

            {/* Compact Search Bar */}
            <div className="bg-white rounded-xl shadow-2xl p-3 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <select className="px-4 py-2.5 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm">
                  <option value="">Marcă</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                  <option>Volkswagen</option>
                </select>
                <select className="px-4 py-2.5 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm">
                  <option value="">Categorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Preț max (EUR)"
                  className="px-4 py-2.5 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                />
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Caută
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl md:text-3xl font-black mb-1">1000+</div>
                <div className="text-blue-200 text-xs md:text-sm">Vehicule</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black mb-1">100+</div>
                <div className="text-blue-200 text-xs md:text-sm">Dealeri</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black mb-1">500+</div>
                <div className="text-blue-200 text-xs md:text-sm">Clienți</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Categorii Vehicule
            </h2>
            <p className="text-gray-600">
              Găsește vehiculul perfect pentru nevoile tale
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.route}
                className="group bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {category.description}
                </p>
                <span className="text-xs font-semibold text-blue-600">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              De Ce AutoSite?
            </h2>
            <p className="text-gray-600">
              Platformă premium pentru pasionații de automobile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Verificate</h3>
              <p className="text-gray-600 text-sm">Toate vehiculele verificate</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TruckIcon className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Livrare</h3>
              <p className="text-gray-600 text-sm">În toată țara max 7 zile</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Garanție</h3>
              <p className="text-gray-600 text-sm">Garanție extinsă inclusă</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Echipa ta ajută oricând</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for Dealers */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ești Dealer Auto?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Alătură-te platformei și vinde mai mult
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                <div className="text-2xl font-black mb-1 text-cyan-400">0%</div>
                <p className="text-sm">Comision prima lună</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                <div className="text-2xl font-black mb-1 text-cyan-400">1M+</div>
                <p className="text-sm">Vizitatori lunar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                <div className="text-2xl font-black mb-1 text-cyan-400">24/7</div>
                <p className="text-sm">Suport dedicat</p>
              </div>
            </div>

            <Link
              href="/register?type=dealer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Începe Acum Gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Găsește Mașina Perfectă
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12">
              Peste 1000+ vehicule verificate • Dealeri de încredere • Livrare rapidă
            </p>

            {/* Compact Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <select className="px-4 py-3 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                  <option value="">Toate mărcile</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                  <option>Volkswagen</option>
                </select>
                <select className="px-4 py-3 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                  <option value="">Toate categoriile</option>
                  {vehicleCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Preț max (EUR)"
                  className="px-4 py-3 bg-gray-50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Caută
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">1000+</div>
                <div className="text-blue-200 text-sm md:text-base">Vehicule</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">100+</div>
                <div className="text-blue-200 text-sm md:text-base">Dealeri</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">500+</div>
                <div className="text-blue-200 text-sm md:text-base">Clienți Mulțumiți</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Explorează Categoriile
            </h2>
            <p className="text-lg text-gray-600">
              Găsește vehiculul perfect pentru nevoile tale
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {vehicleCategories.map((category) => (
              <Link
                key={category.id}
                href={category.route}
                className="group relative bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent overflow-hidden transform hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {category.description}
                  </p>
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              De Ce AutoSite?
            </h2>
            <p className="text-lg text-gray-600">
              Platformă premium pentru pasionații de automobile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Verificate</h3>
              <p className="text-gray-600 text-sm">Toate vehiculele sunt verificate și autentice</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Livrare Rapidă</h3>
              <p className="text-gray-600 text-sm">Livrăm în toată țara în max 7 zile</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Garanție</h3>
              <p className="text-gray-600 text-sm">Garanție extinsă pentru toate vehiculele</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Echipa noastră te ajută oricând</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for Dealers */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ești Dealer Auto?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Alătură-te platformei și vinde mai mult cu AutoSite Premium
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-3xl font-black mb-2 text-cyan-400">0%</div>
                <p className="text-sm">Comision prima lună</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-3xl font-black mb-2 text-cyan-400">1M+</div>
                <p className="text-sm">Vizitatori lunar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-3xl font-black mb-2 text-cyan-400">24/7</div>
                <p className="text-sm">Suport dedicat</p>
              </div>
            </div>

            <Link
              href="/register?type=dealer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105"
            >
              Începe Acum Gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
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
              { name: 'Mașini', icon: '🚗', slug: 'masini', gradient: 'from-blue-500 to-cyan-400' },
              { name: 'Motociclete', icon: '🏍️', slug: 'motociclete', gradient: 'from-purple-500 to-pink-400' },
              { name: 'Camioane', icon: '🚚', slug: 'camioane', gradient: 'from-orange-500 to-red-400' },
              { name: 'Utilitare', icon: '🚐', slug: 'utilitare', gradient: 'from-green-500 to-emerald-400' },
              { name: 'Rulote', icon: '🚙', slug: 'rulote', gradient: 'from-indigo-500 to-blue-400' },
              { name: 'Piese Auto', icon: '🔧', slug: 'piese', gradient: 'from-pink-500 to-rose-400' },
              { name: 'Agricole', icon: '🚜', slug: 'agricole', gradient: 'from-teal-500 to-cyan-400' },
              { name: 'Construcții', icon: '🏗️', slug: 'constructii', gradient: 'from-amber-500 to-yellow-400' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/vanzari/${category.slug}`}
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

