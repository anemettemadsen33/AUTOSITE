'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About AutoMarket
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Your Trusted European Auto Marketplace
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: '✓', text: 'Verified dealers across Europe' },
                { icon: '€', text: 'Transparent pricing in multiple currencies' },
                { icon: '🔍', text: 'Advanced search and filtering' },
                { icon: '🔒', text: 'Secure messaging system' },
                { icon: '🌍', text: 'Multi-language support' },
                { icon: '📱', text: 'Mobile-friendly platform' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-600 dark:text-gray-400 pt-1">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 md:mb-12 bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              To make car buying and selling simple, transparent, and accessible to everyone across Europe.
            </p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { number: '50K+', label: 'Vehicles' },
              { number: '10K+', label: 'Dealers' },
              { number: '25', label: 'Countries' },
              { number: '1M+', label: 'Users' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
