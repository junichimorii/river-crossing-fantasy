// Plugins
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        theme_color: '#00c853',
        background_color: '#69f0ae',
        display: 'standalone',
        scope: 'https://river-crossing-fantasy.netlify.app/',
        start_url: 'https://river-crossing-fantasy.netlify.app/',
        name: 'River Crossing Fantasy',
        short_name: '\u5ddd\u6e21\u308a\u30d1\u30ba\u30eb',
        description: '\u5ddd\u6e21\u308a\u30d1\u30ba\u30eb',
        icons: [{
          src: './icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }, {
          src: './icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        }, {
          src: './icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        }, {
          src: './icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  base: './',
})
