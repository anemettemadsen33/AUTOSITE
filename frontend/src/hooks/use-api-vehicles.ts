import { useState, useEffect } from 'react'
import { vehicleService, Vehicle, VehicleFilters } from '@/services/vehicleService'

interface UseApiVehiclesResult {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApiVehicles(filters?: VehicleFilters): UseApiVehiclesResult {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await vehicleService.getVehicles(filters)
      
      // Handle Laravel response structure
      const vehiclesData = response.data || response
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : [])
    } catch (err: any) {
      console.error('Error fetching vehicles:', err)
      setError(err.message || 'Failed to fetch vehicles')
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [JSON.stringify(filters)])

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles
  }
}
