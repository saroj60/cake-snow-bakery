import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo-transparent.png'],
      manifest: {
        name: 'Cake Snow Bakery',
        short_name: 'Cake Snow',
        description: 'Order custom cakes, pastries, and gifts',
        theme_color: '#2A0845',
        background_color: '#FDFBF7',
        display: 'standalone',
        icons: [
          {
            src: '/logo-transparent.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-transparent.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/logo-transparent.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
