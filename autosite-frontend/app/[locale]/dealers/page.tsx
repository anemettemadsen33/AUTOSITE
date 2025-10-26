'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui';

export default function DealersPage() {
  const t = useTranslations('common');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Trusted Dealers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse verified auto dealers across Europe
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Dealer listings coming soon
          </p>
        </div>
      )}
    </div>
  );
}
