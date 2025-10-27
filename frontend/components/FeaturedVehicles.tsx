'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FeaturedVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  year: number;
  km: number;
  fuel: string;
  dealer: string;
}

const featuredVehicles: FeaturedVehicle[] = [
  {
    id: '1',
    title: 'BMW Seria 5 520d',
    price: 28500,
    image: '/vehicles/bmw-5.jpg',
    year: 2020,
    km: 45000,
    fuel: 'Diesel',
    dealer: 'Premium Motors'
  },
  {
    id: '2',
    title: 'Mercedes-Benz C-Class',
    price: 32000,
    image: '/vehicles/merc-c.jpg',
    year: 2021,
    km: 32000,
    fuel: 'Diesel',
    dealer: 'Star Auto'
  },
  {
    id: '3',
    title: 'Audi A4 2.0 TDI',
    price: 25900,
    image: '/vehicles/audi-a4.jpg',
    year: 2019,
    km: 55000,
    fuel: 'Diesel',
    dealer: 'Audi Center'
  },
  {
    id: '4',
    title: 'Volkswagen Golf 8',
    price: 22500,
    image: '/vehicles/golf-8.jpg',
    year: 2021,
    km: 28000,
    fuel: 'Benzină',
    dealer: 'VW Premium'
  },
];

export default function FeaturedVehicles() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredVehicles.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredVehicles.length) % featuredVehicles.length);
  };

  const vehicle = featuredVehicles[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Oferte Recomandate
          </h2>
          <p className="text-gray-600">
            Cele mai bune oferte selectate special pentru tine
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-96 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Recomandat
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {vehicle.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-500 text-sm">An fabricație</div>
                      <div className="font-semibold text-gray-900">{vehicle.year}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Kilometri</div>
                      <div className="font-semibold text-gray-900">{vehicle.km.toLocaleString()} km</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Combustibil</div>
                      <div className="font-semibold text-gray-900">{vehicle.fuel}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Dealer</div>
                      <div className="font-semibold text-gray-900">{vehicle.dealer}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-gray-500 text-sm mb-1">Preț</div>
                    <div className="text-3xl font-black text-blue-600">
                      €{vehicle.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Vezi Detalii
                  </button>
                  <button className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prev}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-x-1"
              aria-label="Vehicul anterior"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {featuredVehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Vehicul ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition transform hover:translate-x-1"
              aria-label="Vehicul următor"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
