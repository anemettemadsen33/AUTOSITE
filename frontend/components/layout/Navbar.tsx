'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { MagnifyingGlassIcon, UserIcon, HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b border-blue-800/50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-black text-2xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AutoSite
              </span>
              <span className="text-xs text-blue-300/70 -mt-1">Premium Motors</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/vehicles" 
              className="px-6 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm"
            >
              Vehicule
            </Link>
            <Link 
              href="/dealers" 
              className="px-6 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm"
            >
              Dealeri
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/vehicles" 
              className="hidden md:flex p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/favorites" 
                  className="hidden md:flex p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <HeartIcon className="w-6 h-6" />
                </Link>
                <div className="hidden md:flex items-center space-x-3">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="font-medium">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-white/70 hover:text-red-400 transition-all duration-300 px-4 py-2"
                  >
                    Ieșire
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Autentificare
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105"
                >
                  Înregistrare
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              <Link href="/vehicles" className="px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition">
                Vehicule
              </Link>
              <Link href="/dealers" className="px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition">
                Dealeri
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/favorites" className="px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition">
                    Favorite
                  </Link>
                  <Link href="/dashboard" className="px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="px-4 py-3 text-left text-red-400 hover:bg-white/10 rounded-lg transition">
                    Ieșire
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition">
                    Autentificare
                  </Link>
                  <Link href="/register" className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg transition text-center font-semibold">
                    Înregistrare
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
