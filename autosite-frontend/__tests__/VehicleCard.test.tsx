import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import VehicleCard from '@/components/vehicles/VehicleCard'
import { useFavoritesStore } from '@/stores/favoritesStore'

jest.mock('@/stores/favoritesStore')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('VehicleCard', () => {
  const mockVehicle = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 25000,
    mileage: 15000,
    fuel_type: 'Hybrid',
    transmission: 'Automatic',
    status: 'available',
    featured: false,
    image: '/images/camry.jpg',
  }

  const mockToggleFavorite = jest.fn()

  beforeEach(() => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: mockToggleFavorite,
      isFavorite: jest.fn(() => false),
    })
  })

  it('renders vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />)
    
    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument()
    expect(screen.getByText(/2024/)).toBeInTheDocument()
    expect(screen.getByText(/\$25,000/)).toBeInTheDocument()
    expect(screen.getByText(/15,000 km/)).toBeInTheDocument()
  })

  it('displays featured badge for featured vehicles', () => {
    const featuredVehicle = { ...mockVehicle, featured: true }
    render(<VehicleCard vehicle={featuredVehicle} />)
    
    expect(screen.getByText(/featured/i)).toBeInTheDocument()
  })

  it('toggles favorite when heart icon is clicked', async () => {
    render(<VehicleCard vehicle={mockVehicle} />)
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    fireEvent.click(favoriteButton)

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(mockVehicle.id)
    })
  })

  it('shows filled heart for favorited vehicles', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [1],
      toggleFavorite: mockToggleFavorite,
      isFavorite: jest.fn(() => true),
    })

    render(<VehicleCard vehicle={mockVehicle} />)
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    expect(favoriteButton).toHaveClass('text-red-500') // Favorited state
  })

  it('navigates to vehicle detail on card click', () => {
    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    render(<VehicleCard vehicle={mockVehicle} />)
    
    const card = screen.getByTestId('vehicle-card')
    fireEvent.click(card)

    expect(mockPush).toHaveBeenCalledWith(`/vehicles/${mockVehicle.id}`)
  })
})
