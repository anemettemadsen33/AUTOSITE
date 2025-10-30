import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, CircleNotch } from '@phosphor-icons/react';
import { useAuth } from '@/lib/auth';
import { useApiFavorites } from '@/hooks/use-api-favorites';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  vehicleId: number;
  variant?: 'default' | 'icon' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FavoriteButton({ vehicleId, variant = 'icon', size = 'md', className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useApiFavorites();
  const [isToggling, setIsToggling] = useState(false);

  const favorited = isFavorite(vehicleId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    setIsToggling(true);
    try {
      const response = await toggleFavorite(vehicleId);
      toast.success(response.message || (response.is_favorite ? 'Added to favorites' : 'Removed from favorites'));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update favorite');
    } finally {
      setIsToggling(false);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <Button
      variant={variant === 'icon' ? 'ghost' : variant}
      size="icon"
      className={`${sizeClasses[size]} ${favorited ? 'text-red-500 hover:text-red-600' : ''} ${className}`}
      onClick={handleToggle}
      disabled={isToggling}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isToggling ? (
        <CircleNotch size={iconSizes[size]} className="animate-spin" />
      ) : (
        <Heart
          size={iconSizes[size]}
          weight={favorited ? 'fill' : 'regular'}
          className="transition-all"
        />
      )}
    </Button>
  );
}
