'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getVehicles, type Vehicle } from '@/lib/vehicles';
import { getPublicSettings } from '@/lib/settings';
import { useSettingsStore } from '@/stores/settingsStore';
import { Spinner, VehicleCardSkeleton } from '@/components/ui';
import { categories } from '@/lib/categories';

// Lazy load VehicleCard component with skeleton
const VehicleCard = dynamic(() => import('@/components/VehicleCard'), {
  loading: () => <VehicleCardSkeleton />,
});

export default function Home() {
  const t = useTranslations('common');
  const router = useRouter();
  const { settings, setSettings } = useSettingsStore();

  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({
    category: '',
    make: '',
    priceMax: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settingsData, vehiclesData] = await Promise.all([
          getPublicSettings(),
          getVehicles({ page: 1, per_page: 6, featured: true }),
        ]);
        setSettings(settingsData);
        setFeaturedVehicles(vehiclesData.data);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setSettings]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.category) params.set('category', searchQuery.category);
    if (searchQuery.make) params.set('make', searchQuery.make);
    if (searchQuery.priceMax) params.set('price_max', searchQuery.priceMax);
    router.push(`/category/all?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 md:py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {t('findPerfectVehicle') || 'Find Your Perfect Vehicle'}
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              {t('heroSubtitle') || 'Browse thousands of quality vehicles from trusted dealers across Europe'}
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-4 md:p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={searchQuery.category}
                onChange={(e) => setSearchQuery({ ...searchQuery, category: e.target.value })}
                className="px-3 py-2 rounded border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('allCategories') || 'All Categories'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder={t('makeModel') || 'Make / Model'}
                value={searchQuery.make}
                onChange={(e) => setSearchQuery({ ...searchQuery, make: e.target.value })}
                className="px-3 py-2 rounded border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <input
                type="number"
                placeholder={t('maxPrice') || 'Max Price'}
                value={searchQuery.priceMax}
                onChange={(e) => setSearchQuery({ ...searchQuery, priceMax: e.target.value })}
                className="px-3 py-2 rounded border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
              >
                {t('search') || 'Search'}
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold">10,000+</div>
              <div className="text-blue-200 text-xs md:text-sm mt-1">{t('vehicles') || 'Vehicles'}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">500+</div>
              <div className="text-blue-200 text-xs md:text-sm mt-1">{t('dealers') || 'Dealers'}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">25+</div>
              <div className="text-blue-200 text-xs md:text-sm mt-1">{t('countries') || 'Countries'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('browseCategories') || 'Browse by Category'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-2 text-center group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  {category.count || 0} {t('listings') || 'listings'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('featuredVehicles') || 'Featured Vehicles'}
            </h2>
            <Link
              href="/category/all"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              {t('viewAll') || 'View All'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('dealerCTA') || 'Are you a dealer?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('dealerCTAText') || 'Join thousands of dealers selling vehicles on our platform. Reach millions of buyers across Europe.'}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              {t('viewPricing') || 'View Pricing'}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-800 transition border-2 border-white"
            >
              {t('contactUs') || 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
