'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        loadingTimeout: 3000,
        focusThrottleInterval: 5000,
        onError: (error, key) => {
          console.error(`SWR Error for ${key}:`, error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
