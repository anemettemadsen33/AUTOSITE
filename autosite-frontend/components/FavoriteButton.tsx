'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { toggleFavorite as apiToggleFavorite } from '@/lib/favorites';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  vehicleId: number;
  className?: string;
}

export default function FavoriteButton({ vehicleId, className = '' }: FavoriteButtonProps) {
  const { token } = useAuthStore();
  const { isFavorite, toggleFavorite: localToggle } = useFavoritesStore();
  const [loading, setLoading] = useState(false);
  const favorited = isFavorite(vehicleId);

  const handleToggle = async () => {
    if (!token) {
      toast.error('Please login to favorite vehicles');
      return;
    }

    setLoading(true);
    try {
      const result = await apiToggleFavorite(token, vehicleId);
      localToggle(vehicleId);
      toast.success(result.message);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Failed to update favorite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-all ${
        favorited
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={favorited ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
