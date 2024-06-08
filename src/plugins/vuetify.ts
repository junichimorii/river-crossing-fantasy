/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import customAliases from './custom-icons';
import { colors } from './custom-theme';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      ...customAliases,
    },
    sets: {
      mdi,
    }
  },
  theme: {
    themes: {
      light: {
        colors: colors
      },
    },
  },
})
