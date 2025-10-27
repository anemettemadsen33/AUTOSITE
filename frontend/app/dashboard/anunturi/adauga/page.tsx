'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { vehicleCategories, bodyTypesByCategory, fuelTypesByCategory } from '@/lib/categories';
import ImageUpload from '@/components/ImageUpload';
import api from '@/lib/api';

interface VehicleFormData {
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  location_country: string;
  location_city: string;
}

export default function AddListingPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('cars');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
    defaultValues: {
      currency: 'EUR',
      location_country: 'România',
    }
  });

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    try {
      const vehicleData = { ...data, category: selectedCategory };
      const response = await api.post('/vehicles', vehicleData);
      const vehicleId = response.data.id;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append('images[]', image));
        await api.post(`/vehicles/${vehicleId}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      router.push('/dashboard/anunturi');
    } catch (error) {
      console.error('Error:', error);
      alert('Eroare la crearea anunțului.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Adaugă Anunț Nou</h1>
          <p className="text-gray-600 mb-8">Completează informațiile despre vehicul</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Categorie *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedCategory === cat.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="text-sm font-medium">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titlu *</label>
                <input
                  {...register('title', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
                  placeholder="BMW X5 3.0d"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preț *</label>
                <div className="flex gap-2">
                  <input
                    {...register('price', { required: true })}
                    type="number"
                    className="flex-1 px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
                  />
                  <select {...register('currency')} className="px-4 py-3 rounded-lg border">
                    <option value="EUR">EUR</option>
                    <option value="RON">RON</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marcă *</label>
                <input
                  {...register('make', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Model *</label>
                <input
                  {...register('model', { required: true })}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">An *</label>
                <input
                  {...register('year', { required: true })}
                  type="number"
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descriere *</label>
              <textarea
                {...register('description', { required: true, minLength: 50 })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Imagini</label>
              <ImageUpload onImagesChange={setImages} maxImages={20} />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Se publică...' : 'Publică'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
