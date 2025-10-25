'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button, Input, Spinner } from '@/components/ui';
import api from '@/lib/api';

interface EditVehicleFormData {
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  vin: string;
  country: string;
  city: string;
  status: string;
}

export default function EditVehiclePage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditVehicleFormData>();

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const { data } = await api.get(`/vehicles/${vehicleId}`);
        reset({
          make: data.make,
          model: data.model,
          year: data.year,
          price: data.price.amount,
          currency: data.price.currency,
          mileage: data.mileage,
          fuel_type: data.fuel_type,
          transmission: data.transmission,
          body_type: data.body_type,
          color: data.color,
          vin: data.vin || '',
          country: data.country,
          city: data.city,
          status: data.status,
        });
      } catch {
        toast.error('Failed to load vehicle');
        router.push('/user/vehicles');
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [vehicleId, reset, router]);

  const onSubmit = async (data: EditVehicleFormData) => {
    setIsSubmitting(true);

    try {
      await api.put(`/vehicles/${vehicleId}`, data);
      toast.success('Vehicle updated successfully!');
      router.push('/user/vehicles');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update vehicle';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('editVehicle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Update your vehicle details
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/user/vehicles')}>
          Cancel
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Make"
                error={errors.make?.message}
                {...register('make', { required: 'Make is required' })}
              />
              <Input
                label="Model"
                error={errors.model?.message}
                {...register('model', { required: 'Model is required' })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input
                label="Year"
                type="number"
                error={errors.year?.message}
                {...register('year', {
                  required: 'Year is required',
                  min: { value: 1900, message: 'Invalid year' },
                  max: { value: new Date().getFullYear() + 1, message: 'Invalid year' },
                })}
              />
              <Input
                label="Price"
                type="number"
                error={errors.price?.message}
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register('currency')}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="RON">RON</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Mileage (km)"
                type="number"
                error={errors.mileage?.message}
                {...register('mileage', {
                  required: 'Mileage is required',
                  min: { value: 0, message: 'Mileage must be positive' },
                })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fuel Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register('fuel_type')}
                >
                  <option value="diesel">Diesel</option>
                  <option value="petrol">Petrol</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Transmission
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register('transmission')}
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>
              <Input
                label="Body Type"
                error={errors.body_type?.message}
                {...register('body_type', { required: 'Body type is required' })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Color"
                error={errors.color?.message}
                {...register('color', { required: 'Color is required' })}
              />
              <Input
                label="VIN"
                {...register('vin')}
              />
            </div>
          </div>

          {/* Location & Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Location & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Country"
                error={errors.country?.message}
                {...register('country', { required: 'Country is required' })}
              />
              <Input
                label="City"
                error={errors.city?.message}
                {...register('city', { required: 'City is required' })}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                {...register('status')}
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/user/vehicles')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
