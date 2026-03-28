import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Source maps pour Lighthouse + debug production
    sourcemap: true,

    // Alerte si un chunk dépasse 500 KiB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          // React core séparé du code applicatif
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})