'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getVehicles, deleteVehicle, type Vehicle } from '@/lib/vehicles';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button, Spinner } from '@/components/ui';

export default function MyVehiclesPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCurrency, getExchangeRate } = useSettingsStore();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadVehicles();
    
    // Check if we should open create form
    const action = searchParams.get('action');
    if (action === 'create') {
      router.push('/user/vehicles/create');
    }
  }, [searchParams, router]);

  const loadVehicles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Backend should filter by authenticated user
      const response = await getVehicles({ per_page: 100 });
      setVehicles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    
    try {
      await deleteVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
      setDeleteId(null);
      toast.success(t('vehicleDeleted'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('vehicleDeleteError');
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const getConvertedPrice = (vehicle: Vehicle) => {
    if (vehicle.price.currency === selectedCurrency) {
      return vehicle.price.amount;
    }
    const rate = getExchangeRate(vehicle.price.currency, selectedCurrency);
    return Math.round(vehicle.price.amount * rate);
  };

  const getVehicleTitle = (vehicle: Vehicle): string => {
    if (typeof vehicle.title === 'string') return vehicle.title;
    if (typeof vehicle.title === 'object' && vehicle.title !== null) {
      const titles = Object.values(vehicle.title);
      return titles[0] || 'Untitled Vehicle';
    }
    return 'Untitled Vehicle';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('myVehicles')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your vehicle listings
          </p>
        </div>
        <Link href="/user/vehicles/create">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('addVehicle')}
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Vehicles List */}
      {vehicles.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No vehicles yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start by adding your first vehicle listing
          </p>
          <Link href="/user/vehicles/create">
            <Button variant="primary">{t('addVehicle')}</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {vehicles.map((vehicle) => {
                  const title = getVehicleTitle(vehicle);
                  const convertedPrice = getConvertedPrice(vehicle);
                  
                  return (
                    <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {vehicle.images && vehicle.images.length > 0 ? (
                            <Image
                              src={typeof vehicle.images[0] === 'string' ? vehicle.images[0] : vehicle.images[0].url}
                              alt={title}
                              width={64}
                              height={48}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {vehicle.year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedCurrency} {convertedPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vehicle.status === 'available'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : vehicle.status === 'sold'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {vehicle.mileage?.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/user/vehicles/${vehicle.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteId(vehicle.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {vehicles.map((vehicle) => {
              const title = getVehicleTitle(vehicle);
              const convertedPrice = getConvertedPrice(vehicle);
              
              return (
                <div key={vehicle.id} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <Image
                        src={typeof vehicle.images[0] === 'string' ? vehicle.images[0] : vehicle.images[0].url}
                        alt={title}
                        width={80}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-20 h-15 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center shrink-0">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {title}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {selectedCurrency} {convertedPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {vehicle.year} • {vehicle.mileage?.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vehicle.status === 'available'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : vehicle.status === 'sold'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {vehicle.status}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/user/vehicles/${vehicle.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => setDeleteId(vehicle.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('confirmDelete')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. The vehicle will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDelete(deleteId)}
                isLoading={deleting}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
