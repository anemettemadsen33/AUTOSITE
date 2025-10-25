'use client';

import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getVehicles, type Vehicle } from '@/lib/vehicles';
import { getPublicSettings } from '@/lib/settings';
import { useSettingsStore } from '@/stores/settingsStore';
import Filters, { type VehicleFilterValues } from '@/components/Filters';
import VehicleCard from '@/components/VehicleCard';
import { Spinner } from '@/components/ui';

export default function Home() {
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings, setSettings } = useSettingsStore();

  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Parse filters from URL
  const getFiltersFromUrl = (): VehicleFilterValues => {
    const filters: VehicleFilterValues = {};
    searchParams.forEach((value, key) => {
      if (key === 'page' || key === 'per_page') return;
      if (key.includes('_min') || key.includes('_max') || key === 'year_min' || key === 'year_max') {
        filters[key as keyof VehicleFilterValues] = parseInt(value) as never;
      } else {
        filters[key as keyof VehicleFilterValues] = value as never;
      }
    });
    return filters;
  };

  const currentFilters = getFiltersFromUrl();

  // Fetch settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getPublicSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };

    if (!settings) {
      loadSettings();
    }
  }, [settings, setSettings]);

  // Load vehicles function
  const loadVehicles = useCallback(async (page: number, append: boolean = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await getVehicles({
        ...currentFilters,
        page,
        per_page: 20,
      });

      if (append) setAllVehicles(prev => [...prev, ...data.data]);
      else setAllVehicles(data.data);

      setTotalCount(data.meta.total);
      setHasMore(page < data.meta.last_page);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load vehicles');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [currentFilters]);

  // Initial load when filters change
  useEffect(() => {
    setAllVehicles([]);
    setCurrentPage(1);
    setHasMore(true);
    loadVehicles(1, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadVehicles(currentPage + 1, true);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, loading, loadingMore, currentPage, loadVehicles]);

  const handleFilterChange = (filters: VehicleFilterValues) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.set(key, String(value));
    });
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <Head>
        <title>AutoMarket | Find Your Perfect Vehicle in Europe</title>
        <meta
          name="description"
          content="Browse thousands of cars, trucks, and motorcycles from dealers across Europe. Compare prices in multiple currencies and find your perfect vehicle today."
        />
        <meta
          name="keywords"
          content="cars, vehicles, auto marketplace, European cars, used cars, new cars"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {settings?.site_name || 'AutoMarket'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find your perfect vehicle from dealers across Europe
          </p>
        </div>

        <div className="mb-8">
          <Filters onFilterChange={handleFilterChange} initialFilters={currentFilters} />
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {!loading && (
          <>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {totalCount} vehicles found
              </p>
            </div>

            {allVehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {allVehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {hasMore && (
                  <div ref={observerTarget} className="flex justify-center py-8">
                    {loadingMore && <Spinner size="md" />}
                  </div>
                )}

                {!hasMore && allVehicles.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      You&apos;ve reached the end of the results
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">{t('noResults')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
