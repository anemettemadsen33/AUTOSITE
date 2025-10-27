'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, UserIcon, HeartIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { useCompareStore } from '@/stores/compareStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import SearchModal from '@/components/SearchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Zustand stores
  const compareList = useCompareStore(state => state.compareList);
  const favorites = useFavoritesStore(state => state.favorites);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hidden md:block">
              AutoSite
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/vehicles" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Toate vehiculele
            </Link>
            <Link 
              href="/dealers" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Dealeri
            </Link>
              Dealeri
            </Link>
          </div>

          {/* Right Side - Search & Auth */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors hidden md:block"
              aria-label="Favorites"
            >
              <HeartIcon className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors hidden md:block"
              aria-label="Compară"
            >
              <ScaleIcon className="w-6 h-6" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* User Menu / Auth Buttons */}
            <Link
              href="/user"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors hidden md:block"
              aria-label="Contul meu"
            >
              <UserIcon className="w-6 h-6" />
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg hidden md:block"
            >
              Login / Register
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              href="/vanzari/masini" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mașini
            </Link>
            <Link 
              href="/vanzari/motociclete" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Motociclete
            </Link>
            <Link 
              href="/vanzari/camioane" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Camioane
            </Link>
            <Link 
              href="/dealers" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dealeri
            </Link>
            <div className="pt-2 border-t space-y-2">
              <Link
                href="/favorites"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Favorite
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-center font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Înregistrează-te
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
