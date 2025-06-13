import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://resume-analyzer-tool-backend-azz8.onrender.com',
        // target: 'http://localhost:3000', // LOCAL backend during dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // server: {
  //   host: '0.0.0.0',
  // },
  preview: {
    allowedHosts: ['resume-analyzer-tool.onrender.com']
  }
})
