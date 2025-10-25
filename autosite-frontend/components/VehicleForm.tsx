'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSettingsStore } from '@/stores/settingsStore';
import { createVehicle, updateVehicle, type Vehicle } from '@/lib/vehicles';
import { Button, Input, Select } from '@/components/ui';

interface VehicleFormProps {
  vehicle?: Vehicle;
  mode: 'create' | 'edit';
}

interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  price_amount: number;
  price_currency: string;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  vin?: string;
  country?: string;
  city?: string;
  status: string;
  title_en?: string;
  title_ro?: string;
  description_en?: string;
  description_ro?: string;
  meta_title?: string;
  meta_description?: string;
}

export default function VehicleForm({ vehicle, mode }: VehicleFormProps) {
  const router = useRouter();
  const { settings } = useSettingsStore();
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    vehicle?.images?.map(img => img.url) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    defaultValues: vehicle ? {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      price_amount: vehicle.price.amount,
      price_currency: vehicle.price.currency,
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      body_type: vehicle.body_type,
      color: vehicle.color,
      vin: vehicle.vin,
      country: vehicle.location?.country,
      city: vehicle.location?.city,
      status: vehicle.status,
      title_en: typeof vehicle.title === 'object' ? vehicle.title.en : '',
      title_ro: typeof vehicle.title === 'object' ? vehicle.title.ro : '',
      description_en: typeof vehicle.description === 'object' ? vehicle.description.en : '',
      description_ro: typeof vehicle.description === 'object' ? vehicle.description.ro : '',
      meta_title: vehicle.meta_title,
      meta_description: vehicle.meta_description,
    } : {
      price_currency: settings?.default_currency || 'EUR',
      status: 'available',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: VehicleFormData) => {
    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        
        // Basic fields
        formData.append('make', data.make);
        formData.append('model', data.model);
        formData.append('year', data.year.toString());
        formData.append('mileage', data.mileage.toString());
        formData.append('price_amount', data.price_amount.toString());
        formData.append('price_currency', data.price_currency);
        formData.append('status', data.status);

        // Optional fields
        if (data.fuel_type) formData.append('fuel_type', data.fuel_type);
        if (data.transmission) formData.append('transmission', data.transmission);
        if (data.body_type) formData.append('body_type', data.body_type);
        if (data.color) formData.append('color', data.color);
        if (data.vin) formData.append('vin', data.vin);
        if (data.country) formData.append('country', data.country);
        if (data.city) formData.append('city', data.city);

        // Multilingual fields (as JSON)
        const title: Record<string, string> = {};
        if (data.title_en) title.en = data.title_en;
        if (data.title_ro) title.ro = data.title_ro;
        formData.append('title', JSON.stringify(title));

        const description: Record<string, string> = {};
        if (data.description_en) description.en = data.description_en;
        if (data.description_ro) description.ro = data.description_ro;
        formData.append('description', JSON.stringify(description));

        // SEO fields
        if (data.meta_title) formData.append('meta_title', data.meta_title);
        if (data.meta_description) formData.append('meta_description', data.meta_description);

        // Images
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });

        if (mode === 'create') {
          await createVehicle(formData);
          toast.success('Vehicle created successfully!');
        } else if (vehicle) {
          await updateVehicle(vehicle.id, formData);
          toast.success('Vehicle updated successfully!');
        }

        router.push('/user/dashboard');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save vehicle';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  const currencyOptions = settings?.currencies?.map(curr => ({
    value: curr,
    label: curr,
  })) || [
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' },
    { value: 'RON', label: 'RON' },
  ];

  const fuelOptions = settings?.available_filters?.fuel_types?.map(fuel => ({
    value: fuel,
    label: fuel,
  })) || [];

  const transmissionOptions = settings?.available_filters?.transmissions?.map(trans => ({
    value: trans,
    label: trans,
  })) || [];

  const bodyTypeOptions = settings?.available_filters?.body_types?.map(body => ({
    value: body,
    label: body,
  })) || [];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'reserved', label: 'Reserved' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Basic Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Make"
            placeholder="e.g. BMW"
            error={errors.make?.message}
            fullWidth
            {...register('make', { required: 'Make is required' })}
          />

          <Input
            label="Model"
            placeholder="e.g. X5"
            error={errors.model?.message}
            fullWidth
            {...register('model', { required: 'Model is required' })}
          />

          <Input
            label="Year"
            type="number"
            placeholder="2020"
            error={errors.year?.message}
            fullWidth
            {...register('year', {
              required: 'Year is required',
              min: { value: 1900, message: 'Year must be 1900 or later' },
              max: { value: new Date().getFullYear() + 1, message: 'Invalid year' },
            })}
          />

          <Input
            label="Mileage (km)"
            type="number"
            placeholder="50000"
            error={errors.mileage?.message}
            fullWidth
            {...register('mileage', {
              required: 'Mileage is required',
              min: { value: 0, message: 'Mileage must be positive' },
            })}
          />

          <Input
            label="Price"
            type="number"
            placeholder="25000"
            error={errors.price_amount?.message}
            fullWidth
            {...register('price_amount', {
              required: 'Price is required',
              min: { value: 1, message: 'Price must be greater than 0' },
            })}
          />

          <Select
            label="Currency"
            options={currencyOptions}
            error={errors.price_currency?.message}
            fullWidth
            {...register('price_currency', { required: 'Currency is required' })}
          />

          <Select
            label="Fuel Type"
            options={[{ value: '', label: 'Select...' }, ...fuelOptions]}
            fullWidth
            {...register('fuel_type')}
          />

          <Select
            label="Transmission"
            options={[{ value: '', label: 'Select...' }, ...transmissionOptions]}
            fullWidth
            {...register('transmission')}
          />

          <Select
            label="Body Type"
            options={[{ value: '', label: 'Select...' }, ...bodyTypeOptions]}
            fullWidth
            {...register('body_type')}
          />

          <Input
            label="Color"
            placeholder="e.g. Blue"
            fullWidth
            {...register('color')}
          />

          <Input
            label="VIN"
            placeholder="Vehicle Identification Number"
            fullWidth
            {...register('vin')}
          />

          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            fullWidth
            {...register('status', { required: 'Status is required' })}
          />
        </div>
      </div>

      {/* Location */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Location
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Country"
            placeholder="e.g. Germany"
            fullWidth
            {...register('country')}
          />

          <Input
            label="City"
            placeholder="e.g. Munich"
            fullWidth
            {...register('city')}
          />
        </div>
      </div>

      {/* Multilingual Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Multilingual Content
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title (English)"
              placeholder="e.g. Luxury SUV in excellent condition"
              fullWidth
              {...register('title_en')}
            />

            <Input
              label="Title (Romanian)"
              placeholder="e.g. SUV de lux în stare excelentă"
              fullWidth
              {...register('title_ro')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (English)
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={6}
                placeholder="Detailed description in English..."
                {...register('description_en')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Romanian)
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={6}
                placeholder="Descriere detaliată în română..."
                {...register('description_ro')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          SEO Settings
        </h2>
        
        <div className="space-y-6">
          <Input
            label="Meta Title"
            placeholder="SEO optimized title"
            helperText="Recommended: 50-60 characters"
            fullWidth
            {...register('meta_title')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meta Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
              placeholder="SEO optimized description"
              {...register('meta_description')}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Recommended: 150-160 characters
            </p>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Images
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="vehicle-images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Images
            </label>
            <input
              id="vehicle-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900 dark:file:text-blue-200"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
        >
          {mode === 'create' ? 'Create Vehicle' : 'Update Vehicle'}
        </Button>
      </div>
    </form>
  );
}
