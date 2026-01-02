import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// Hapus baris ini jika pakai Tailwind v3 standar:
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Aktifkan hanya jika pakai v4 plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Sesuaikan port backend Anda
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      }
    }
  }
})
