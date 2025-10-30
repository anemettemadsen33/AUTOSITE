import { useState, useEffect } from 'react'
import { vehicleService } from '@/services/vehicleService'

export interface SearchFilters {
  search?: string
  priceFrom?: number
  priceTo?: number
  yearFrom?: number
  yearTo?: number
  make?: string
  model?: string
  condition?: string
  fuelType?: string
  transmission?: string
  mainCategory?: string
  subCategory?: string
  page?: number
  perPage?: number
}

export function useApiSearch(filters: SearchFilters) {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await vehicleService.getVehicles(filters)
        setVehicles(response.data || [])
        setTotalPages(response.meta?.last_page || 1)
        setTotalCount(response.meta?.total || 0)
      } catch (err) {
        console.error('Error fetching vehicles:', err)
        setError('Failed to fetch vehicles')
        setVehicles([])
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [JSON.stringify(filters)])

  const refetch = () => {
    const fetchVehicles = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await vehicleService.getVehicles(filters)
        setVehicles(response.data || [])
        setTotalPages(response.meta?.last_page || 1)
        setTotalCount(response.meta?.total || 0)
      } catch (err) {
        console.error('Error fetching vehicles:', err)
        setError('Failed to fetch vehicles')
        setVehicles([])
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }

  return { vehicles, loading, error, totalPages, totalCount, refetch }
}
