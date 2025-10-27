'use client';

interface Vehicle {
  id: number;
  name: string;
  price: number;
  year: number;
  km: number;
}

interface SimilarVehiclesProps {
  currentVehicleId: number;
}

export default function SimilarVehicles({ currentVehicleId }: SimilarVehiclesProps) {
  const vehicles: Vehicle[] = [
    { id: 1, name: 'BMW Seria 5 2021', price: 38000, year: 2021, km: 35000 },
    { id: 2, name: 'Mercedes C-Class 2020', price: 35000, year: 2020, km: 42000 },
    { id: 3, name: 'Audi A6 2021', price: 40000, year: 2021, km: 30000 },
    { id: 4, name: 'BMW Seria 3 2020', price: 32000, year: 2020, km: 45000 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Vehicule Similare</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-600 transition group">
            <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{vehicle.name}</h3>
            <div className="text-2xl font-black text-blue-600 mb-3">€{vehicle.price.toLocaleString()}</div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>An: {vehicle.year}</span>
              <span>KM: {vehicle.km.toLocaleString()}</span>
            </div>
            <a
              href={`/vehicles/${vehicle.id}`}
              className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Vezi Detalii
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
