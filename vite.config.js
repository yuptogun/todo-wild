import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'script-defer',
      registerType: 'autoUpdate',
      includeAssets: ["/favicon.ico", "/icon-192.png", "/icon-512.png", "/icon-192-maskable.png", "/icon-512-maskable.png"],
      manifest: {
        "short_name": "To Do Wild",
        "name": "To Do Wild: offline todo app",
        "description": "An offline PWA exercise by yuptogun.",
        "icons": [
          { "src": "/favicon.ico", "type": "image/x-icon", "sizes": "32x32" },
          { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
          { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
          { "src": "/icon-192-maskable.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
          { "src": "/icon-512-maskable.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
        ],
        "id": "/?source=pwa",
        "start_url": "/?source=pwa",
        "background_color": "#ffffff",
        "theme_color": "#9e9e9e",
        "display": "standalone",
        "scope": "/",
        "orientation": "portrait-primary"
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,woff2,png,svg}']
      }
    }),
  ],
})
