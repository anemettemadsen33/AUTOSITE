'use client';

import { useState } from 'react';
import { HeartIcon, ShareIcon, PrinterIcon, FlagIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import VehicleImageGallery from '@/components/VehicleImageGallery';
import VehicleSpecsTable from '@/components/VehicleSpecsTable';
import ContactDealerForm from '@/components/ContactDealerForm';
import TestDriveForm from '@/components/TestDriveForm';
import SimilarVehicles from '@/components/SimilarVehicles';
import BuyNowModal from '@/components/BuyNowModal';
import LeasingModal from '@/components/LeasingModal';

export default function VehicleDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [showLeasing, setShowLeasing] = useState(false);

  // Mock data
  const vehicle = {
    id: 1,
    name: 'BMW Seria 5 530d xDrive',
    price: 35000,
    year: 2020,
    images: ['1', '2', '3', '4', '5'],
  };

  const specs = {
    general: [
      { label: 'An Fabricație', value: '2020' },
      { label: 'Kilometraj', value: '45,000 km' },
      { label: 'Combustibil', value: 'Diesel' },
      { label: 'Transmisie', value: 'Automată' },
      { label: 'Culoare Exterioară', value: 'Negru Metalic' },
      { label: 'Culoare Interioară', value: 'Bej' },
    ],
    technical: [
      { label: 'Motor', value: '3.0L 6-Cilindri' },
      { label: 'Putere', value: '265 CP' },
      { label: 'Cuplu', value: '620 Nm' },
      { label: 'Tracțiune', value: '4x4 (xDrive)' },
      { label: 'Consum Mediu', value: '5.5 L/100km' },
      { label: '0-100 km/h', value: '5.7 secunde' },
    ],
    features: [
      { value: 'Pilot Automat' },
      { value: 'Scaune Încălzite' },
      { value: 'Sistem Navigație' },
      { value: 'Camera 360°' },
      { value: 'Head-Up Display' },
      { value: 'Trapa Panoramică' },
      { value: 'Keyless Entry' },
      { value: 'LED Matrix' },
      { value: 'Harman Kardon' },
    ],
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.name,
        text: `Vezi acest ${vehicle.name} pe AutoSite!`,
        url: window.location.href,
      });
    } else {
      alert('Link copiat în clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Acasă</a>
            <span>/</span>
            <a href="/vehicles" className="hover:text-blue-600">Vehicule</a>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{vehicle.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-2">{vehicle.name}</h1>
                  <p className="text-gray-600">An {vehicle.year} • 45,000 km • Diesel</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 rounded-lg transition"
                  >
                    {isFavorite ? (
                      <HeartSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-50 rounded-lg transition"
                  >
                    <ShareIcon className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-50 rounded-lg transition">
                    <PrinterIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <div className="text-4xl font-black text-blue-600">€{vehicle.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500 line-through">€38,000</div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  -8% Reducere
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowBuyNow(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg"
                >
                  🛒 Cumpără Acum
                </button>
                <button
                  onClick={() => setShowLeasing(true)}
                  className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
                >
                  💳 Calculator Leasing
                </button>
                <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition flex items-center gap-2">
                  <ScaleIcon className="w-5 h-5" />
                  Compară
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <VehicleImageGallery images={vehicle.images} vehicleName={vehicle.name} />

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Descriere</h2>
              <p className="text-gray-700 leading-relaxed">
                BMW Seria 5 530d xDrive în stare impecabilă, întreținere completă la zi. 
                Vehiculul beneficiază de toate dotările premium: pilot automat adaptiv, 
                scaune ventilate și încălzite, sistem audio Harman Kardon, head-up display, 
                trapa panoramică și multe altele. Istoric de service complet la dealer autorizat BMW.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-green-700">Vehicul Verificat</span>
              </div>
            </div>

            {/* Specs Table */}
            <VehicleSpecsTable specs={specs} />

            {/* Similar Vehicles */}
            <SimilarVehicles currentVehicleId={vehicle.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dealer Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  PM
                </div>
                <h3 className="text-xl font-bold text-gray-900">Premium Motors</h3>
                <p className="text-sm text-gray-600">Dealer Verificat ✓</p>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold">⭐ 4.8/5 (234 recenzii)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicule:</span>
                  <span className="font-semibold">45 active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Locație:</span>
                  <span className="font-semibold">București</span>
                </div>
              </div>
              <a
                href="/dealers/premium-motors"
                className="block w-full px-4 py-2 bg-gray-100 text-gray-900 text-center rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Vezi Profil Dealer
              </a>
            </div>

            {/* Test Drive Form */}
            <TestDriveForm />

            {/* Contact Form */}
            <ContactDealerForm />

            {/* Report */}
            <button className="w-full px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition flex items-center justify-center gap-2">
              <FlagIcon className="w-4 h-4" />
              Raportează anunțul
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBuyNow && (
        <BuyNowModal vehicle={vehicle} onClose={() => setShowBuyNow(false)} />
      )}
      {showLeasing && (
        <LeasingModal vehicle={vehicle} onClose={() => setShowLeasing(false)} />
      )}
    </div>
  );
}
