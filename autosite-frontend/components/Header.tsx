'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useState, useEffect } from 'react';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'ro', name: 'Română' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'pl', name: 'Polski' },
  { code: 'hu', name: 'Magyar' },
];

export default function Header() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const { settings, selectedCurrency, setCurrency } = useSettingsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is intentional for theme hydration to prevent flash of wrong theme
    setMounted(true);
  }, []);

  const currentLocale = pathname.split('/')[1] || 'en';

  const handleLocaleChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const handleLogout = async () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">AM</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {settings?.site_name || 'AutoMarket'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t('home')}
            </Link>
            <Link href="/vehicles" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t('vehicles')}
            </Link>
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t('contact')}
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <select
              value={currentLocale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select language"
            >
              {locales.map((locale) => (
                <option key={locale.code} value={locale.code}>
                  {locale.name}
                </option>
              ))}
            </select>

            {/* Currency Selector */}
            {settings?.currencies && (
              <select
                value={selectedCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select currency"
              >
                {settings.currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )
              )}
            </button>

            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/user/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  href="/user/favorites"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  title="My Favorites"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <Link
                  href="/user/messages"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  title="Messages"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </Link>
                <Link
                  href="/user/subscriptions"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  title="My Subscriptions"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('home')}
              </Link>
              <Link href="/vehicles" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('vehicles')}
              </Link>
              <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Pricing
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('about')}
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('contact')}
              </Link>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="mobile-locale-select">
                    Language
                  </label>
                  <select
                    id="mobile-locale-select"
                    value={currentLocale}
                    onChange={(e) => handleLocaleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
                  >
                    {locales.map((locale) => (
                      <option key={locale.code} value={locale.code}>
                        {locale.name}
                      </option>
                    ))}
                  </select>
                </div>

                {settings?.currencies && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="mobile-currency-select">
                      Currency
                    </label>
                    <select
                      id="mobile-currency-select"
                      value={selectedCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
                    >
                      {settings.currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center space-x-2"
                  >
                    {mounted && (
                      <>
                        {theme === 'dark' ? (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                            </svg>
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            <span>Dark Mode</span>
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {t('dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center"
                    >
                      {t('register')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
