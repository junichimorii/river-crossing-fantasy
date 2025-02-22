// Plugins
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Fonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
        {
          '@vueuse/core': [ 'usePointerSwipe', 'useScreenOrientation', 'useStorage', 'useSwipe', 'useToNumber', 'useTransition', 'useWindowSize', 'TransitionPresets' ],
        },
        {
          '@vueuse/sound': [ 'useSound' ]
        },
        {
          pinia: [ 'defineStore', 'storeToRefs' ],
        },
        {
          vuetify: [ 'useGoTo' ],
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      google: {
        families: [ {
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
        short_name: '川渡りパズル',
        description: '川渡りパズル',
        icons: [{
          src: './icon-192x192.webp',
          sizes: '192x192',
          type: 'image/webp'
        }, {
          src: './icon-256x256.webp',
          sizes: '256x256',
          type: 'image/webp'
        }, {
          src: './icon-384x384.webp',
          sizes: '384x384',
          type: 'image/webp'
        }, {
          src: './icon-512x512.webp',
          sizes: '512x512',
          type: 'image/webp'
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
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  base: './',
})
