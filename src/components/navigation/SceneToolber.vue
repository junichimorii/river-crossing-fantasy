<script lang="ts" setup>
import { useScreenOrientation } from '@vueuse/core'
import { toRef } from 'vue'
import { SceneSound, SceneSolve } from '@/components'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
import { useSettingsStore } from '@/store/settings'
const { isSupported, orientation } = useScreenOrientation()
const settings = useSettingsStore()
const session = useSessionStore()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const btnColor = store.scene.landscape?.night ? 'white' : 'black'
</script>

<template>
  <v-toolbar
    absolute
    density="compact"
    class="bg-transparent"
  >
    <template v-slot:prepend>
      <v-chip
        variant="text"
        size="x-large"
        :color="color"
      >
        {{ count }}
      </v-chip>
    </template>
    <template v-slot:append>
      <v-btn
        v-if="settings.state.debug"
        variant="text"
        size="small"
        :color="btnColor"
        icon="mdi-map-search"
        @click.stop="session.state.solve = true"
      ></v-btn>
      <SceneSound
        :color="btnColor"
      ></SceneSound>
      <v-app-bar-nav-icon
        variant="text"
        size="small"
        :color="btnColor"
        v-show="isSupported && orientation === 'landscape-primary'"
        @click.stop="session.state.navigation = !session.state.navigation"
      ></v-app-bar-nav-icon>
    </template>
    <SceneSolve
      :scene=store.scene
    ></SceneSolve>
  </v-toolbar>
</template>