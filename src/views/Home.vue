<script lang="ts" setup>
import "@fontsource/architects-daughter"
import { AppIntroduction, AppSettings } from '@/components'
import { useAppearance } from '@/composables'
import { useSessionStore } from '@/store/session'
const session = useSessionStore()
const { stageSize } = useAppearance()
</script>

<template>
  <v-main>
    <div class="d-flex align-center justify-center fill-height bg-secondary">
      <v-img
        src="@/assets/images/title.png"
        :height="stageSize"
      >
        <div class="d-flex align-center justify-center fill-height">
          <v-btn
            color="success"
            variant="elevated"
            size="x-large"
            to="/scenes"
          >
            Start
          </v-btn>
        </div>
      </v-img>
    </div>
  </v-main>
  <v-footer
    app
    class="pa-0"
  >
    <v-banner
      lines="one"
      text="River Crossing Fantasy"
      color="primary"
      class="px-3 py-0"
      style="font-family: 'Architects Daughter', cursive;"
    >
      <template v-slot:actions>
        <v-btn
          @click.stop="session.state.introduction = true"
        >
          このゲームについて
        </v-btn>
        <v-btn
          @click.stop="session.state.settings = true"
        >
          設定
        </v-btn>
      </template>
    </v-banner>
  </v-footer>
  <AppIntroduction></AppIntroduction>
  <AppSettings></AppSettings>
</template>
