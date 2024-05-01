// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: './src/typed-router.d.ts'
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
        {
          '@vueuse/core': [ 'usePointerSwipe', 'useScreenOrientation', 'useStorage', 'useSwipe', 'useTransition', 'useWindowSize' ],
        },
        {
          '@vueuse/sound': [ 'useSound' ]
        },
        {
          pinia: [ 'createPinia', 'defineStore', 'storeToRefs' ],
        },
        {
          vuetify: [ 'useGoTo' ],
        },
      ],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: './src/components.d.ts'
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      // styles: {
      //   configFile: 'src/styles/settings.scss',
      // },
    }),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }, {
          name: 'Architects+Daughter',
          styles: 'wght@400',
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
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
