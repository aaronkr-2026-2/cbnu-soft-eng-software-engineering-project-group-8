import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Keep the local authentication and study planner APIs behind the frontend origin.
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/prediction': { target: 'http://127.0.0.1:5000', changeOrigin: true },
      '/api/auth': { target: 'http://127.0.0.1:3001', changeOrigin: true },
      '/api/study-planner': { target: 'http://127.0.0.1:3002', changeOrigin: true },
    },
  },
})
