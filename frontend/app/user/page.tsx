'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import VehicleCard from '@/components/ui/VehicleCard';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { mockVehicles } from '@/lib/mockData';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { favorites, toggleFavorite } = useFavoritesStore();

  const favoriteVehicles = mockVehicles.filter(v => favorites.includes(v.id));

  const mockUser = {
    name: 'Ion Popescu',
    email: 'ion.popescu@example.com',
    phone: '+40 721 123 456',
    memberSince: '2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  };

  const mockActivity = [
    { id: 1, type: 'favorite', vehicle: 'BMW Seria 3', date: '2024-01-15', action: 'Adăugat la favorite' },
    { id: 2, type: 'message', dealer: 'AutoElite Motors', date: '2024-01-14', action: 'Mesaj trimis' },
    { id: 3, type: 'test_drive', vehicle: 'Audi A4', date: '2024-01-12', action: 'Test drive programat' },
    { id: 4, type: 'view', vehicle: 'Mercedes C-Class', date: '2024-01-10', action: 'Vizualizat' },
  ];

  const tabs = [
    { id: 'overview', name: 'Prezentare generală', icon: UserCircleIcon },
    { id: 'favorites', name: 'Favorite', icon: HeartIcon },
    { id: 'activity', name: 'Activitate recentă', icon: ClockIcon },
    { id: 'messages', name: 'Mesaje', icon: ChatBubbleLeftRightIcon },
    { id: 'settings', name: 'Setări', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-black mb-1">Bine ai venit, {mockUser.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">Membru din {mockUser.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all mt-2">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Deconectare
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <HeartIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">{favorites.length}</div>
                        <div className="text-sm text-gray-600">Favorite</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">3</div>
                        <div className="text-sm text-gray-600">Mesaje</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TruckIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">1</div>
                        <div className="text-sm text-gray-600">Test drive</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-black text-gray-900 mb-4">Acțiuni rapide</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      href="/vehicles"
                      className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <TruckIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600">Caută vehicule</div>
                        <div className="text-sm text-gray-600">Explorează stocul complet</div>
                      </div>
                    </Link>

                    <Link
                      href="/favorites"
                      className="flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
                    >
                      <HeartIcon className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-red-600">Vezi favorite</div>
                        <div className="text-sm text-gray-600">{favorites.length} vehicule salvate</div>
                      </div>
                    </Link>

                    <Link
                      href="/compare"
                      className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                    >
                      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-purple-600">Compară vehicule</div>
                        <div className="text-sm text-gray-600">Side-by-side comparison</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-green-600">Contact suport</div>
                        <div className="text-sm text-gray-600">Avem nevoie de ajutor?</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-black text-gray-900 mb-4">Activitate recentă</h2>
                  <div className="space-y-3">
                    {mockActivity.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClockIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.action}</div>
                          <div className="text-sm text-gray-600">{item.vehicle || item.dealer}</div>
                        </div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Vehiculele tale favorite</h2>
                {favoriteVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteVehicles.map((vehicle) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Nu ai favorite încă</p>
                    <Link href="/vehicles" className="text-blue-600 font-semibold hover:text-blue-700 mt-2 inline-block">
                      Explorează vehicule →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Activitate recentă</h2>
                <div className="space-y-4">
                  {mockActivity.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.action}</div>
                        <div className="text-gray-600">{item.vehicle || item.dealer}</div>
                        <div className="text-sm text-gray-500 mt-1">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Mesaje</h2>
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Nu ai mesaje noi</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Setări cont</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nume complet</label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      defaultValue={mockUser.phone}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Salvează modificările
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
