'use client';

import { useTranslations } from 'next-intl';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button, Input, Select } from '@/components/ui';
import { useState, useCallback } from 'react';
import { debounce } from '@/lib/utils';

export interface VehicleFilterValues {
  make?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_min?: number;
  mileage_max?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  country?: string;
  city?: string;
}

interface FiltersProps {
  onFilterChange: (filters: VehicleFilterValues) => void;
  initialFilters?: VehicleFilterValues;
}

export default function Filters({ onFilterChange, initialFilters = {} }: FiltersProps) {
  const t = useTranslations('filters');
  const tVehicle = useTranslations('vehicle');
  const { settings } = useSettingsStore();
  const [filters, setFilters] = useState<VehicleFilterValues>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableFilters = settings?.available_filters;

  // Debounce filter changes to reduce API calls
  const debouncedFilterChange = useCallback(
    debounce((newFilters: VehicleFilterValues) => {
      onFilterChange(newFilters);
    }, 500),
    [onFilterChange]
  );

  const handleChange = (key: keyof VehicleFilterValues, value: string | number | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{t('title')}</h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Make */}
        {availableFilters?.makes && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {tVehicle('make')}
            </label>
            <Select
              options={[
                { value: '', label: 'All Makes' },
                ...availableFilters.makes.map((m) => ({ value: m, label: m })),
              ]}
              value={filters.make || ''}
              onChange={(e) => handleChange('make', e.target.value)}
              fullWidth
            />
          </div>
        )}

        {/* Model */}
        {availableFilters?.models && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {tVehicle('model')}
            </label>
            <Select
              options={[
                { value: '', label: 'All Models' },
                ...availableFilters.models.map((m) => ({ value: m, label: m })),
              ]}
              value={filters.model || ''}
              onChange={(e) => handleChange('model', e.target.value)}
              fullWidth
            />
          </div>
        )}

        {/* Year Range */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            {tVehicle('year')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder={t('from')}
              value={filters.year_min || ''}
              onChange={(e) => handleChange('year_min', e.target.value ? parseInt(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder={t('to')}
              value={filters.year_max || ''}
              onChange={(e) => handleChange('year_max', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('priceRange')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder={t('from')}
              value={filters.price_min || ''}
              onChange={(e) => handleChange('price_min', e.target.value ? parseInt(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder={t('to')}
              value={filters.price_max || ''}
              onChange={(e) => handleChange('price_max', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Mileage Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('mileageRange')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder={t('from')}
              value={filters.mileage_min || ''}
              onChange={(e) => handleChange('mileage_min', e.target.value ? parseInt(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder={t('to')}
              value={filters.mileage_max || ''}
              onChange={(e) => handleChange('mileage_max', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Fuel Type */}
        {availableFilters?.fuel_types && (
          <Select
            label={tVehicle('fuel')}
            options={[
              { value: '', label: 'All Fuel Types' },
              ...availableFilters.fuel_types.map((f) => ({ value: f, label: f })),
            ]}
            value={filters.fuel_type || ''}
            onChange={(e) => handleChange('fuel_type', e.target.value)}
            fullWidth
          />
        )}

        {/* Transmission */}
        {availableFilters?.transmissions && (
          <Select
            label={tVehicle('transmission')}
            options={[
              { value: '', label: 'All Transmissions' },
              ...availableFilters.transmissions.map((t) => ({ value: t, label: t })),
            ]}
            value={filters.transmission || ''}
            onChange={(e) => handleChange('transmission', e.target.value)}
            fullWidth
          />
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Body Type */}
          {availableFilters?.body_types && (
            <Select
              label={tVehicle('bodyType')}
              options={[
                { value: '', label: 'All Body Types' },
                ...availableFilters.body_types.map((b) => ({ value: b, label: b })),
              ]}
              value={filters.body_type || ''}
              onChange={(e) => handleChange('body_type', e.target.value)}
              fullWidth
            />
          )}

          {/* Color */}
          {availableFilters?.colors && (
            <Select
              label={tVehicle('color')}
              options={[
                { value: '', label: 'All Colors' },
                ...availableFilters.colors.map((c) => ({ value: c, label: c })),
              ]}
              value={filters.color || ''}
              onChange={(e) => handleChange('color', e.target.value)}
              fullWidth
            />
          )}

          {/* Country */}
          <Input
            label={tVehicle('country')}
            value={filters.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            fullWidth
          />

          {/* City */}
          <Input
            label={tVehicle('city')}
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            fullWidth
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button onClick={handleApply} size="sm" fullWidth>
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm" fullWidth>
          {t('reset')}
        </Button>
      </div>
    </div>
  );
}
