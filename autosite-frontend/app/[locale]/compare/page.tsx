'use client';

import { useTranslations } from 'next-intl';
import { useCompareStore } from '@/stores/compareStore';
import CompareTable from '@/components/CompareTable';
import Link from 'next/link';

export default function ComparePage() {
  const t = useTranslations('compare');
  const { vehicles, removeVehicle, clearAll } = useCompareStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>
        
        {vehicles.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
          >
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* Comparison Info */}
      {vehicles.length > 0 && vehicles.length < 3 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            {t('addMoreVehicles', { count: 3 - vehicles.length })}
          </p>
        </div>
      )}

      {/* Comparison Table */}
      <CompareTable vehicles={vehicles} onRemove={removeVehicle} />

      {/* Back to Browse */}
      {vehicles.length === 0 && (
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToBrowse')}
          </Link>
        </div>
      )}
    </div>
  );
}
