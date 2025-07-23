import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'android/*.png',
        'ios/*.png',
        'screenshots/*.png'
      ],
      manifest: {
        name: "Rick & Morty App",
        short_name: "R&M",
        description: "Explore Rick and Morty universe",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "",
        background_color: "#121212",
        theme_color: "#42b983",
        icons: [
          {
            src: "/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/ios/180.png",
            sizes: "180x180",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Desktop View"
          }
        ]
      },
      injectManifest: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp}'
        ],
        maximumFileSizeToCacheInBytes: 5000000,
        
      }
    })
  ]
});