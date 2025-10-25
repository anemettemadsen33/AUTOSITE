'use client';

import Link from 'next/link';
import { Dealer } from '@/lib/dealers';
import { useTranslations } from 'next-intl';

interface DealerCardProps {
  dealer: Dealer;
}

export default function DealerCard({ dealer }: DealerCardProps) {
  const t = useTranslations('dealers');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Dealer Logo/Header */}
      <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 flex items-center justify-center p-4">
        {dealer.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dealer.logo}
            alt={dealer.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Dealer Information */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
          {dealer.name}
        </h3>

        {/* Location */}
        {(dealer.city || dealer.country) && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm truncate">
              {[dealer.city, dealer.country].filter(Boolean).join(', ')}
            </span>
          </div>
        )}

        {/* Phone */}
        {dealer.phone && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${dealer.phone}`}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition truncate"
            >
              {dealer.phone}
            </a>
          </div>
        )}

        {/* Email */}
        {dealer.email && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${dealer.email}`}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition truncate"
            >
              {dealer.email}
            </a>
          </div>
        )}

        {/* Description */}
        {dealer.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {dealer.description}
          </p>
        )}

        {/* Vehicles Count */}
        {dealer.vehicles_count !== undefined && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {dealer.vehicles_count}
              </span>{' '}
              {dealer.vehicles_count === 1 ? t('vehicle') : t('vehicles')}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-3 flex gap-2">
          {dealer.website && (
            <a
              href={dealer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm font-medium"
            >
              {t('website')}
            </a>
          )}
          <Link
            href={`/dealers/${dealer.id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition text-sm font-medium"
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </div>
  );
}
