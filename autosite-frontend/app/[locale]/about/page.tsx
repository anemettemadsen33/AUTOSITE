'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('common');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          About AutoMarket
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Trusted European Auto Marketplace
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AutoMarket is a leading online platform connecting car buyers and sellers across Europe. 
              We provide a transparent, secure, and efficient marketplace for quality vehicles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Verified dealers across Europe</li>
              <li>Transparent pricing in multiple currencies</li>
              <li>Advanced search and filtering options</li>
              <li>Secure messaging system</li>
              <li>Multi-language support</li>
              <li>Mobile-friendly platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              To make car buying and selling simple, transparent, and accessible to everyone across Europe.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
