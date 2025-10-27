'use client';

import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useCompareStore } from '@/stores/compareStore';
import { mockVehicles } from '@/lib/mockData';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompareStore();
  
  const vehicles = mockVehicles.filter(v => compareList.includes(v.id));

  const specs = [
    { label: 'Preț', key: 'price', format: (v: any) => `€${v.price.toLocaleString('ro-RO')}` },
    { label: 'An', key: 'year' },
    { label: 'Kilometraj', key: 'mileage', format: (v: any) => `${v.mileage.toLocaleString('ro-RO')} km` },
    { label: 'Combustibil', key: 'fuel' },
    { label: 'Putere', key: 'power', format: (v: any) => `${v.power} CP` },
    { label: 'Capacitate motor', key: 'engineSize', format: (v: any) => `${v.engineSize} cc` },
    { label: 'Transmisie', key: 'transmission' },
    { label: 'Caroserie', key: 'bodyType' },
    { label: 'Culoare', key: 'color' },
    { label: 'Număr uși', key: 'doors' },
    { label: 'Locuri', key: 'seats' },
    { label: 'Stare', key: 'condition', format: (v: any) => v.condition === 'new' ? 'Nou' : 'Second hand' },
  ];

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Lista de comparație este goală
          </h1>
          <p className="text-gray-600 mb-6">
            Adaugă vehicule din listă pentru a le compara specificațiile
          </p>
          <Link
            href="/vehicles"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Caută vehicule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Compară vehicule
              </h1>
              <p className="text-sm text-gray-600">
                {vehicles.length} {vehicles.length === 1 ? 'vehicul selectat' : 'vehicule selectate'} (max 4)
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/vehicles"
                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
              >
                Adaugă vehicule
              </Link>
              {vehicles.length > 1 && (
                <button
                  onClick={clearCompare}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm"
                >
                  Șterge toate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Comparison Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="sticky left-0 bg-gray-50 p-4 text-left font-bold text-gray-900 min-w-[200px]">
                    Specificații
                  </th>
                  {vehicles.map((vehicle) => (
                    <th key={vehicle.id} className="bg-white p-4 min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(vehicle.id)}
                          className="absolute top-0 right-0 p-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                          aria-label="Elimină"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                        
                        <div className="mb-3">
                          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={vehicle.images[0]}
                              alt={vehicle.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <Link href={`/vehicles/${vehicle.slug}`}>
                            <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors mb-1">
                              {vehicle.title}
                            </h3>
                          </Link>
                          <div className="text-sm text-gray-600">{vehicle.location}</div>
                          <div className="text-2xl font-black text-blue-600 mt-2">
                            €{vehicle.price.toLocaleString('ro-RO')}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {specs.map((spec, idx) => (
                  <tr key={spec.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="sticky left-0 bg-inherit p-4 font-semibold text-gray-700">
                      {spec.label}
                    </td>
                    {vehicles.map((vehicle) => (
                      <td key={vehicle.id} className="p-4 text-gray-900">
                        {spec.format ? spec.format(vehicle) : (vehicle as any)[spec.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Features Row */}
                <tr className="bg-white">
                  <td className="sticky left-0 bg-white p-4 font-semibold text-gray-700 border-t align-top">
                    Dotări
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="p-4 border-t align-top">
                      <ul className="space-y-1">
                        {vehicle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                
                {/* CTA Row */}
                <tr className="bg-gray-50">
                  <td className="sticky left-0 bg-gray-50 p-4"></td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="p-4">
                      <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className="block w-full px-4 py-3 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Vezi detalii
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Warning */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg md:hidden">
          <p className="text-sm text-blue-900">
            💡 <strong>Sfat:</strong> Pentru o experiență mai bună, vizualizează comparația pe desktop sau rotește dispozitivul în modul landscape.
          </p>
        </div>
      </div>
    </div>
  );
}
