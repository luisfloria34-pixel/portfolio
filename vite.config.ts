import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js intro loads on demand as a dedicated cinematic-scene chunk.
    chunkSizeWarningLimit: 550,
  },
})
