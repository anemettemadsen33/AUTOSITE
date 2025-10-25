'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-surface/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="text-xl font-heading font-bold gradient-text">AUTOSITE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/listings" className="text-sm font-medium hover:text-accent transition-colors">
              Listings
            </Link>
            <Link href="/brands" className="text-sm font-medium hover:text-accent transition-colors">
              Brands
            </Link>
            <Link href="/dealers" className="text-sm font-medium hover:text-accent transition-colors">
              Dealers
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          {/* Right side - Locale & Currency selectors */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Locale Selector Placeholder */}
            <select className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-surface-dark">
              <option value="en">EN</option>
              <option value="ro">RO</option>
              <option value="de">DE</option>
              <option value="es">ES</option>
            </select>
            
            {/* Currency Selector Placeholder */}
            <select className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-surface-dark">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="RON">RON</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/listings" className="text-sm font-medium hover:text-accent transition-colors">
                Listings
              </Link>
              <Link href="/brands" className="text-sm font-medium hover:text-accent transition-colors">
                Brands
              </Link>
              <Link href="/dealers" className="text-sm font-medium hover:text-accent transition-colors">
                Dealers
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                About
              </Link>
              <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <select className="flex-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-surface-dark">
                  <option value="en">EN</option>
                  <option value="ro">RO</option>
                  <option value="de">DE</option>
                  <option value="es">ES</option>
                </select>
                <select className="flex-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-surface-dark">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="RON">RON</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
