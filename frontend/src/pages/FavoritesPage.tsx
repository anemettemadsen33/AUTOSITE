import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth'
import { useApiFavorites } from '@/hooks/use-api-favorites'
import { Heart, Trash, CircleNotch } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface FavoritesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { user } = useAuth()
  const { favorites, loading, toggleFavorite } = useApiFavorites()

  const handleRemove = async (vehicleId: number) => {
    try {
      await toggleFavorite(vehicleId)
      toast.success('Removed from favorites')
    } catch (error) {
      toast.error('Failed to remove from favorites')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <Heart size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Sign in to view favorites</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to access your favorites</p>
          <Button onClick={() => onNavigate('login')}>Sign In</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-primary-foreground/80">{favorites.length} saved vehicles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {loading ? (
          <Card className="p-12 text-center">
            <CircleNotch size={64} className="animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading favorites...</p>
          </Card>
        ) : favorites.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start saving vehicles you're interested in</p>
            <Button onClick={() => onNavigate('home')}>
              Browse Vehicles
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <FavoriteCard
                key={fav.id}
                vehicle={fav.vehicle}
                onView={() => onNavigate('listing', { id: fav.vehicle.slug })}
                onRemove={() => handleRemove(fav.vehicle.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FavoriteCard({
  vehicle,
  onView,
  onRemove
}: {
  vehicle: any
  onView: () => void
  onRemove: () => void
}) {
  const imageUrl = vehicle.images?.[0]?.url || '/placeholder-vehicle.jpg';
  
  return (
    <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all overflow-hidden">
      <div onClick={onView}>
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {vehicle.is_featured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-accent to-purple-600">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{vehicle.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {vehicle.make} {vehicle.model} - {vehicle.condition}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {vehicle.year && <Badge variant="secondary">{vehicle.year}</Badge>}
            {vehicle.mileage && <Badge variant="secondary">{vehicle.mileage.toLocaleString()} km</Badge>}
            {vehicle.fuel && <Badge variant="secondary">{vehicle.fuel}</Badge>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">
              {vehicle.currency || '€'}{vehicle.price.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </div>
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="w-full gap-2 text-destructive hover:text-destructive"
        >
          <Trash size={16} weight="duotone" />
          Remove
        </Button>
      </div>
    </Card>
  )
}
