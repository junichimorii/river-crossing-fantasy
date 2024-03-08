<script lang="ts" setup>
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
    <template #prepend>
      <v-chip
        variant="text"
        size="x-large"
        :color="color"
      >
        {{ count }}
      </v-chip>
      <v-btn
        v-if="settings.state.debug"
        variant="text"
        size="small"
        :color="btnColor"
        icon="mdi-map-search"
        @click.stop="session.state.solve = true"
      />
      <SceneSound
        :color="btnColor"
      />
      <v-app-bar-nav-icon
        v-show="isSupported && orientation === 'landscape-primary'"
        variant="text"
        size="small"
        :color="btnColor"
        @click.stop="session.state.navigation = !session.state.navigation"
      />
    </template>
    <SceneSolve
      :scene="store.scene"
    />
  </v-toolbar>
</template>