import { useState, useEffect } from 'react'
import { vehicleService, Vehicle } from '@/services/vehicleService'

interface UseApiVehicleDetailResult {
  vehicle: Vehicle | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApiVehicleDetail(slug: string): UseApiVehicleDetailResult {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicle = async () => {
    if (!slug) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await vehicleService.getVehicle(slug)
      setVehicle(data)
    } catch (err: any) {
      console.error('Error fetching vehicle:', err)
      setError(err.message || 'Failed to fetch vehicle details')
      setVehicle(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [slug])

  return {
    vehicle,
    loading,
    error,
    refetch: fetchVehicle
  }
}
