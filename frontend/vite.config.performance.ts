import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * Performance-optimized Vite configuration
 * This extends the base config with additional optimizations
 */
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Enable minification
    minify: 'terser',
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-hook-form'],
          
          // UI components chunk
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ],
          
          // Chart libraries
          'chart-vendor': ['recharts', 'd3'],
          
          // Utilities
          'utils': ['axios', 'clsx', 'date-fns', 'zod'],
        },
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // 1MB
    
    // Source maps for production debugging (can be disabled for smaller builds)
    sourcemap: false,
    
    // CSS code splitting
    cssCodeSplit: true,
  },
  
  // Optimize deps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      'axios',
      'clsx',
      'date-fns',
      'zod',
    ],
  },
  
  // Server configuration
  server: {
    // Enable HTTP/2
    https: false,
    
    // Pre-transform known dependencies
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/pages/Home.tsx',
        './src/pages/HomePage.tsx',
      ],
    },
  },
  
  // Preview server configuration
  preview: {
    port: 5173,
    strictPort: true,
  },
});
