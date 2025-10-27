'use client';

// Simple loading skeletons for lazy loaded components

export function ImageCarouselSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg">
      <div className="h-96 md:h-[500px] w-full rounded-lg"></div>
      <div className="flex gap-2 mt-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 w-16 md:h-20 md:w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
  );
}

export function ModalSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-6"></div>
    </div>
  );
}

export function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-300 dark:bg-gray-700 h-40 md:h-48"></div>
      <div className="p-3 space-y-2">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-2"></div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-1"></div>
            <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
