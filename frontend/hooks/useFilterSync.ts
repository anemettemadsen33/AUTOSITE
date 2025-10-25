'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFilterStore } from '@/store/useFilterStore';

export function useFilterSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setFromURLParams, getURLParams } = useFilterStore();

  useEffect(() => {
    if (searchParams) {
      setFromURLParams(searchParams);
    }
  }, [searchParams, setFromURLParams]);

  const syncToURL = () => {
    const params = getURLParams();
    const newURL = `${pathname}?${params.toString()}`;
    
    if (newURL !== `${pathname}?${searchParams?.toString() || ''}`) {
      router.push(newURL, { scroll: false });
    }
  };

  return { syncToURL };
}

export function useFilterQuery() {
  const filterState = useFilterStore();

  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (filterState.search) params.set('search', filterState.search);
    if (filterState.priceMin) params.set('price_min', filterState.priceMin.toString());
    if (filterState.priceMax) params.set('price_max', filterState.priceMax.toString());
    if (filterState.make) params.set('make', filterState.make);
    if (filterState.model) params.set('model', filterState.model);
    if (filterState.yearMin) params.set('year_min', filterState.yearMin.toString());
    if (filterState.yearMax) params.set('year_max', filterState.yearMax.toString());
    if (filterState.mileageMin) params.set('mileage_min', filterState.mileageMin.toString());
    if (filterState.mileageMax) params.set('mileage_max', filterState.mileageMax.toString());
    if (filterState.bodyType) params.set('body_type', filterState.bodyType);
    if (filterState.fuelType) params.set('fuel_type', filterState.fuelType);
    if (filterState.transmission) params.set('transmission', filterState.transmission);
    if (filterState.condition) params.set('condition', filterState.condition);
    if (filterState.location) params.set('location', filterState.location);
    if (filterState.sortBy) params.set('sort', filterState.sortBy);
    if (filterState.sortOrder) params.set('order', filterState.sortOrder);
    params.set('page', filterState.page.toString());
    params.set('per_page', filterState.perPage.toString());

    return params.toString();
  };

  return { buildQueryString, filterState };
}
