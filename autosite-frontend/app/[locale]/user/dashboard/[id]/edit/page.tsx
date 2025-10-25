'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getVehicle, type Vehicle } from '@/lib/vehicles';
import VehicleForm from '@/components/VehicleForm';
import { Spinner } from '@/components/ui';

export default function EditVehiclePage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadVehicle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getVehicle(id);
      setVehicle(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error || 'Vehicle not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Vehicle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update the details of your vehicle listing
        </p>
      </div>

      <VehicleForm vehicle={vehicle} mode="edit" />
    </div>
  );
}
