import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'splash/*.png'],
      manifest: {
        id: '/',
        name: 'Daymark',
        short_name: 'Daymark',
        description: 'Plan a manageable day, report honestly, choose a practical next step.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f9f7f3',
        theme_color: '#f9f7f3',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      injectManifest: { globPatterns: ['**/*.{js,css,html,svg,png,woff2}'], globIgnores: ['splash/**', 'icon-1024.png', 'icon-master.svg'] },
      devOptions: { enabled: false, type: 'module' },
    }),
  ],
  server: { host: true },
  preview: { host: true },
})
