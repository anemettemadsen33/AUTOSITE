'use client';

import { useTranslations } from 'next-intl';
import { useSettingsStore } from '@/stores/settingsStore';
import { useFilterStore } from '@/stores/filterStore';
import { Button, Input, Select } from '@/components/ui';
import { useState, useEffect } from 'react';
import { useVehicleSubCategories } from '@/hooks/useVehicleSubCategories';
import { VehicleClass, VehicleSubCategoryCode } from '@/lib/vehicleSubCategories';

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
  main_category?: VehicleClass;
  sub_category?: VehicleSubCategoryCode;
}

interface FiltersProps {
  onFilterChange: (filters: VehicleFilterValues) => void;
  initialFilters?: VehicleFilterValues;
}

export default function Filters({ onFilterChange, initialFilters = {} }: FiltersProps) {
  const t = useTranslations('filters');
  const tVehicle = useTranslations('vehicle');
  const { settings } = useSettingsStore();
  const { mainCategory, setMainCategory, setSubCategory } = useFilterStore();
  const [filters, setFilters] = useState<VehicleFilterValues>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get subcategory options based on selected main category
  const { mainCategoryOptions, subCategoryOptions } = useVehicleSubCategories({
    mainCategory: mainCategory || filters.main_category,
    locale: 'en', // You can make this dynamic based on user locale
  });

  const availableFilters = settings?.available_filters;

  // Sync filter store with local filters on mount
  useEffect(() => {
    if (initialFilters.main_category) {
      setMainCategory(initialFilters.main_category);
    }
    if (initialFilters.sub_category) {
      setSubCategory(initialFilters.sub_category);
    }
  }, [initialFilters.main_category, initialFilters.sub_category, setMainCategory, setSubCategory]);

  const handleChange = (key: keyof VehicleFilterValues, value: string | number | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleMainCategoryChange = (value: string) => {
    const category = value as VehicleClass | '';
    setMainCategory(category || undefined);
    setFilters((prev) => ({
      ...prev,
      main_category: category || undefined,
      sub_category: undefined, // Reset subcategory when main category changes
    }));
  };

  const handleSubCategoryChange = (value: string) => {
    const subCat = value as VehicleSubCategoryCode | '';
    setSubCategory(subCat || undefined);
    setFilters((prev) => ({ ...prev, sub_category: subCat || undefined }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    setMainCategory(undefined);
    setSubCategory(undefined);
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main Category */}
        <Select
          label="Vehicle Category"
          options={[
            { value: '', label: 'All Categories' },
            ...mainCategoryOptions.map((cat) => ({ value: cat.value, label: cat.label })),
          ]}
          value={filters.main_category || ''}
          onChange={(e) => handleMainCategoryChange(e.target.value)}
          fullWidth
        />

        {/* Sub Category - Only show when main category is selected */}
        {filters.main_category && subCategoryOptions.length > 0 && (
          <Select
            label="Sub-Category"
            options={[
              { value: '', label: 'All Sub-Categories' },
              ...subCategoryOptions.map((sub) => ({ value: sub.value, label: sub.label })),
            ]}
            value={filters.sub_category || ''}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            fullWidth
          />
        )}

        {/* Make */}
        {availableFilters?.makes && (
          <Select
            label={tVehicle('make')}
            options={[
              { value: '', label: 'All Makes' },
              ...availableFilters.makes.map((m) => ({ value: m, label: m })),
            ]}
            value={filters.make || ''}
            onChange={(e) => handleChange('make', e.target.value)}
            fullWidth
          />
        )}

        {/* Model */}
        {availableFilters?.models && (
          <Select
            label={tVehicle('model')}
            options={[
              { value: '', label: 'All Models' },
              ...availableFilters.models.map((m) => ({ value: m, label: m })),
            ]}
            value={filters.model || ''}
            onChange={(e) => handleChange('model', e.target.value)}
            fullWidth
          />
        )}

        {/* Year Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
      <div className="flex items-center gap-3 pt-4">
        <Button onClick={handleApply} variant="primary" fullWidth>
          {t('title')}
        </Button>
        <Button onClick={handleReset} variant="outline" fullWidth>
          {t('reset')}
        </Button>
      </div>
    </div>
  );
}
