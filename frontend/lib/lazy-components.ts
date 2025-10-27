// Optimized lazy loading utility
import dynamic from 'next/dynamic'

// Heavy components that should be loaded lazily
export const DynamicSearchModal = dynamic(
  () => import('@/components/SearchModal'),
  {
    loading: () => {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    },
    ssr: false,
  }
)

// Example: Lazy load vehicle comparison
export const DynamicVehicleComparison = dynamic(
  () => import('@/components/VehicleComparison'),
  {
    loading: () => <div className="text-center p-4">Loading comparison...</div>,
    ssr: false,
  }
)

// Example: Lazy load chart/analytics
export const DynamicAnalytics = dynamic(
  () => import('@/components/Analytics'),
  {
    loading: () => <div className="text-center p-4">Loading analytics...</div>,
    ssr: false,
  }
)

export default {
  DynamicSearchModal,
  DynamicVehicleComparison,
  DynamicAnalytics,
}
