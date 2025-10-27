'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { useCreateVehicle } from '@/lib/hooks/useVehicles';
import {
  TruckIcon,
  PhotoIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function CreateVehiclePage() {
  const router = useRouter();
  const createVehicle = useCreateVehicle();
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    currency: 'EUR',
    mileage: '',
    fuel_type: 'petrol',
    transmission: 'manual',
    body_type: 'sedan',
    power_hp: '',
    doors: 4,
    seats: 5,
    engine_capacity: '',
    exterior_color: '',
    interior_color: '',
    condition: 'used',
    location_city: '',
    location_country: 'RO',
    description: '',
    vin: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);
      
      // Create preview URLs
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert form data
      const vehicleData = {
        ...formData,
        year: parseInt(formData.year.toString()),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        power_hp: parseInt(formData.power_hp),
        engine_capacity: parseFloat(formData.engine_capacity),
        doors: parseInt(formData.doors.toString()),
        seats: parseInt(formData.seats.toString()),
        is_published: true,
      };

      await createVehicle.mutateAsync({
        ...vehicleData,
        images,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };

  return (
    <AuthGuard requireAuth requireRole="dealer">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <TruckIcon className="w-8 h-8 text-blue-600" />
              Adaugă Vehicul Nou
            </h1>
            <p className="text-gray-600">
              Completează toate detaliile vehiculului pentru a-l publica
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Cog6ToothIcon className="w-6 h-6" />
                Informații Principale
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Marcă *
                  </label>
                  <input
                    type="text"
                    name="make"
                    required
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="BMW, Mercedes, Audi..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Seria 5, C-Class, A4..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    An Fabricație *
                  </label>
                  <input
                    type="number"
                    name="year"
                    required
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    VIN (optional)
                  </label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="17 caractere"
                    maxLength={17}
                  />
                </div>
              </div>
            </div>

            {/* Price & Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CurrencyDollarIcon className="w-6 h-6" />
                Preț și Specificații
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preț *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="100"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="RON">RON</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kilometraj *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    required
                    min="0"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="km"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Combustibil *
                  </label>
                  <select
                    name="fuel_type"
                    required
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="petrol">Benzină</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hibrid</option>
                    <option value="electric">Electric</option>
                    <option value="lpg">GPL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transmisie *
                  </label>
                  <select
                    name="transmission"
                    required
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="manual">Manuală</option>
                    <option value="automatic">Automată</option>
                    <option value="semi-automatic">Semi-automată</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Caroserie *
                  </label>
                  <select
                    name="body_type"
                    required
                    value={formData.body_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="suv">SUV</option>
                    <option value="coupe">Coupe</option>
                    <option value="wagon">Break</option>
                    <option value="van">Van</option>
                    <option value="convertible">Cabrio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Putere (CP) *
                  </label>
                  <input
                    type="number"
                    name="power_hp"
                    required
                    min="0"
                    value={formData.power_hp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacitate Motor (L)
                  </label>
                  <input
                    type="number"
                    name="engine_capacity"
                    step="0.1"
                    value={formData.engine_capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="1.6, 2.0, 3.0..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Uși
                  </label>
                  <select
                    name="doors"
                    value={formData.doors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    {[2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Locuri
                  </label>
                  <select
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    {[2, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Culoare Exterioară
                  </label>
                  <input
                    type="text"
                    name="exterior_color"
                    value={formData.exterior_color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Alb, Negru, Gri..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stare *
                  </label>
                  <select
                    name="condition"
                    required
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="new">Nou</option>
                    <option value="used">Second Hand</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                Locație
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Oraș *
                  </label>
                  <input
                    type="text"
                    name="location_city"
                    required
                    value={formData.location_city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="București, Cluj, Timișoara..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Țară *
                  </label>
                  <select
                    name="location_country"
                    required
                    value={formData.location_country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="RO">România</option>
                    <option value="DE">Germania</option>
                    <option value="FR">Franța</option>
                    <option value="IT">Italia</option>
                    <option value="ES">Spania</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Descriere</h2>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Descriere detaliată a vehiculului, istoric, dotări suplimentare..."
              />
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PhotoIcon className="w-6 h-6" />
                Imagini
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <PhotoIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click pentru a încărca imagini
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG până la 10MB fiecare
                    </p>
                  </label>
                </div>

                {/* Preview */}
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Principală
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={createVehicle.isPending}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {createVehicle.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Se publică...
                  </div>
                ) : (
                  'Publică Vehicul'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition"
              >
                Anulează
              </button>
            </div>

            {createVehicle.error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {createVehicle.error.message || 'Eroare la publicarea vehiculului'}
              </div>
            )}
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
