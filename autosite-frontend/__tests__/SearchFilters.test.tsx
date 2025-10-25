import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchFilters from '@/components/search/SearchFilters'

describe('SearchFilters', () => {
  const mockOnFilterChange = jest.fn()

  const defaultFilters = {
    make: '',
    model: '',
    yearFrom: 2020,
    yearTo: 2024,
    priceMin: 0,
    priceMax: 100000,
    fuelType: '',
    transmission: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all filter fields', () => {
    render(<SearchFilters filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    expect(screen.getByLabelText(/make/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/year from/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/year to/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument()
  })

  it('calls onFilterChange when make is selected', async () => {
    render(<SearchFilters filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const makeSelect = screen.getByLabelText(/make/i)
    fireEvent.change(makeSelect, { target: { value: 'Toyota' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        make: 'Toyota',
      })
    })
  })

  it('resets filters when reset button is clicked', async () => {
    render(<SearchFilters filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const resetButton = screen.getByRole('button', { name: /reset/i })
    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(defaultFilters)
    })
  })

  it('validates price range', async () => {
    render(<SearchFilters filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const minPrice = screen.getByLabelText(/min price/i)
    const maxPrice = screen.getByLabelText(/max price/i)

    fireEvent.change(minPrice, { target: { value: '50000' } })
    fireEvent.change(maxPrice, { target: { value: '30000' } })

    await waitFor(() => {
      expect(screen.getByText(/max price must be greater/i)).toBeInTheDocument()
    })
  })
})
