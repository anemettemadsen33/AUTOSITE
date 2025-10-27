'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VehicleCard from '@/components/ui/VehicleCard';
import FilterBar from '@/components/FilterBar';
import api from '@/lib/api';
import { Vehicle } from '@/lib/types';
import { getCategory } from '@/lib/categories';

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params.category as string;
  const category = getCategory(categorySlug);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, searchParams, page]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', category?.id || '');
      params.set('page', page.toString());
      
      const response = await api.get(`/vehicles?${params.toString()}`);
      setVehicles(response.data.data || []);
      setTotal(response.data.meta?.total || 0);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categorie negăsită</h1>
          <p className="text-gray-600">Categoria solicitată nu există.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <p className="text-blue-100 text-lg">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">
              {total} anunțuri
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar category={category.id} />

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : vehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white rounded-lg border disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Pagina {page}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={vehicles.length === 0}
                className="px-4 py-2 bg-white rounded-lg border disabled:opacity-50"
              >
                Următor
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nu am găsit anunțuri
            </h3>
            <p className="text-gray-600">
              Încearcă să modifici filtrele sau verifică mai târziu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
