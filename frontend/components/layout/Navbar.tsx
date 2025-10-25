'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { MagnifyingGlassIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AutoSite</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vehicles" className="text-gray-700 hover:text-blue-600 transition">
              Vehicule
            </Link>
            <Link href="/dealers" className="text-gray-700 hover:text-blue-600 transition">
              Dealeri
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Link href="/vehicles" className="p-2 text-gray-600 hover:text-blue-600 transition">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/favorites" className="p-2 text-gray-600 hover:text-blue-600 transition">
                  <HeartIcon className="w-6 h-6" />
                </Link>
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                    <UserIcon className="w-6 h-6" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-red-600 transition"
                  >
                    Ieșire
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Autentificare
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Înregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
