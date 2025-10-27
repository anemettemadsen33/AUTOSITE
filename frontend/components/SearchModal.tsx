'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import api from '@/lib/api';
import { Vehicle } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      searchVehicles();
    } else {
      setResults([]);
    }
  }, [query]);

  const searchVehicles = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vehicles?search=${query}&per_page=5`);
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/vehicles/${slug}`);
    onClose();
    setQuery('');
  };

  const handleViewAll = () => {
    router.push(`/vehicles?search=${query}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută după marcă, model sau tip..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Search Results */}
          {query.length >= 2 && (
            <div className="mt-4 bg-white rounded-lg border max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Caută...
                </div>
              ) : results.length > 0 ? (
                <div>
                  {results.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => handleResultClick(vehicle.slug)}
                      className="w-full p-4 hover:bg-gray-50 border-b last:border-b-0 flex items-center gap-4 text-left transition-colors"
                    >
                      {vehicle.images && vehicle.images[0] && (
                        <div className="w-20 h-16 relative flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={vehicle.images[0]}
                            alt={vehicle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{vehicle.title}</h4>
                        <p className="text-sm text-gray-500">
                          {vehicle.year} • {vehicle.mileage?.toLocaleString()} km
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {vehicle.price?.toLocaleString()} €
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleViewAll}
                    className="w-full p-4 text-center text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Vezi toate rezultatele →
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Niciun rezultat găsit pentru "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
