import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Increase header size limit to 32KB
      'X-Header-Size-Limit': '32768' 
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Add these proxy settings
        cookieDomainRewrite: 'localhost',
        protocolRewrite: 'http'
      }
    }
  }
})
