'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getVehicles, type Vehicle } from '@/lib/vehicles';
import { getCategoryById, getCategoryName, type CategoryId } from '@/lib/categories';
import VehicleCard from '@/components/VehicleCard';
import { Spinner } from '@/components/ui';

export default function CategoryPage({ params }: { params: { category: string; locale: string } }) {
  const t = useTranslations('common');
  const category = getCategoryById(params.category);
  const categoryName = category ? getCategoryName(params.category as CategoryId, params.locale) : params.category;
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await getVehicles({ category: params.category, per_page: 20 });
        setVehicles(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, [params.category]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <a href="/" className="text-blue-600">← Back to Home</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <span>{category.icon}</span>
        {categoryName}
      </h1>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          No {categoryName.toLowerCase()} found
        </div>
      )}
    </div>
  );
}
