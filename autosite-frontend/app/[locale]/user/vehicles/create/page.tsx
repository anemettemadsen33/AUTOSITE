'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import api from '@/lib/api';

interface CreateVehicleFormData {
  // Step 1: Basic Info
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  
  // Step 2: Specifications
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  vin: string;
  
  // Location
  country: string;
  city: string;
  
  // SEO
  meta_title: string;
  meta_description: string;
}

export default function CreateVehiclePage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CreateVehicleFormData>({
    defaultValues: {
      currency: 'EUR',
      fuel_type: 'diesel',
      transmission: 'manual',
    },
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof CreateVehicleFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ['make', 'model', 'year', 'price', 'currency'];
    } else if (step === 2) {
      fieldsToValidate = ['mileage', 'fuel_type', 'transmission', 'body_type', 'color', 'country', 'city'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: CreateVehicleFormData) => {
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append vehicle data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      
      // Append images
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      
      // Submit to API
      await api.post('/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Vehicle created successfully!');
      router.push('/user/vehicles');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create vehicle';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('addVehicle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Fill in the details to list your vehicle
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {s}
                </div>
                <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  {s === 1 && 'Basic Info'}
                  {s === 2 && 'Specifications'}
                  {s === 3 && 'Images'}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Make"
                  placeholder="e.g., BMW"
                  error={errors.make?.message}
                  {...register('make', { required: 'Make is required' })}
                />
                <Input
                  label="Model"
                  placeholder="e.g., X5"
                  error={errors.model?.message}
                  {...register('model', { required: 'Model is required' })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Year"
                  type="number"
                  placeholder="2020"
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
                  placeholder="25000"
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
          )}

          {/* Step 2: Specifications */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Mileage (km)"
                  type="number"
                  placeholder="50000"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="e.g., SUV"
                  error={errors.body_type?.message}
                  {...register('body_type', { required: 'Body type is required' })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Color"
                  placeholder="e.g., Black"
                  error={errors.color?.message}
                  {...register('color', { required: 'Color is required' })}
                />
                <Input
                  label="VIN"
                  placeholder="Vehicle Identification Number"
                  {...register('vin')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Country"
                  placeholder="e.g., Germany"
                  error={errors.country?.message}
                  {...register('country', { required: 'Country is required' })}
                />
                <Input
                  label="City"
                  placeholder="e.g., Berlin"
                  error={errors.city?.message}
                  {...register('city', { required: 'City is required' })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vehicle Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    dark:file:bg-blue-900/20 dark:file:text-blue-400"
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            <div className="flex-1" />
            {step < 3 ? (
              <Button type="button" variant="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Create Vehicle
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
