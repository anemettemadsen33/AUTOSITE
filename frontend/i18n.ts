// i18n.ts
// 🌍 Internationalization configuration for AUTOSITE (Next.js + next-intl)

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define the supported locales for your app
const locales = ['en', 'ro'];

// Export configuration for Next Intl
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined, fallback to 'en' if undefined
  const validLocale = locale || 'en';
  
  // Check if locale exists
  if (!locales.includes(validLocale)) notFound();

  // Load messages dynamically based on the selected locale
  const messages = (await import(`./messages/${validLocale}.json`)).default;

  // Return the full RequestConfig object
  return {
    locale: validLocale, // ✅ required by next-intl
    messages,
    timeZone: 'Europe/Bucharest',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      },
      number: {
        currency: {
          style: 'currency',
          currency: validLocale === 'ro' ? 'RON' : 'EUR' // adapt automatically
        }
      }
    }
  };
});
