'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  vehicleId: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showToast?: boolean;
}

export default function FavoriteButton({
  vehicleId,
  className,
  size = 'md',
  showToast = true,
}: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite } = useFavoritesStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const favorited = isMounted ? isFavorited(vehicleId) : false;

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    const newState = await toggleFavorite(vehicleId);

    if (showToast) {
      // You can add toast notification here
      console.log(newState ? 'Added to favorites!' : 'Removed from favorites!');
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  if (!isMounted) {
    return (
      <button
        className={cn(
          'rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center transition-all',
          sizeClasses[size],
          className
        )}
        disabled
      >
        <Heart size={iconSizes[size]} className="text-gray-400" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'rounded-full backdrop-blur-sm shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95',
        favorited
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-white/80 hover:bg-white',
        isAnimating && 'animate-bounce',
        sizeClasses[size],
        className
      )}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(
          'transition-all',
          favorited ? 'fill-white text-white' : 'text-gray-600'
        )}
      />
    </button>
  );
}
