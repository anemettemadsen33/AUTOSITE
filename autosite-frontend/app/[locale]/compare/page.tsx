'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui';
import Link from 'next/link';

export default function ComparePage() {
  const t = useTranslations('common');
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Compare Vehicles
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Compare up to 3 vehicles side by side
        </p>
      </div>

      <div className="text-center py-12">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Vehicle Comparison Tool
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select vehicles from the listings to start comparing
        </p>
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Browse Vehicles
        </Link>
      </div>
    </div>
  );
}
