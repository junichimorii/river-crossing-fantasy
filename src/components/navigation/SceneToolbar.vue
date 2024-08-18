<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const { isSupported, orientation } = useScreenOrientation()
const settings = useSettingsStore()
const session = useSessionStore()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const btnColor = computed(() => store.scene.landscape?.night ? 'white' : 'black')
</script>

<template>
  <v-toolbar
    absolute
    density="compact"
    class="bg-transparent"
  >
    <v-btn
      icon
      variant="text"
      density="compact"
      size="40"
      :text="String(count)"
      :color="color"
      @click.stop="session.state.moves = true"
    />
    <SceneSound :color="btnColor" />
    <v-app-bar-nav-icon
      v-show="isSupported && orientation === 'landscape-primary'"
      variant="text"
      size="small"
      :color="btnColor"
      @click.stop="session.state.navigation = !session.state.navigation"
    />
    <v-spacer />
    <v-btn
      v-if="settings.state.debug"
      icon="$solve"
      variant="text"
      size="small"
      :color="btnColor"
      @click.stop="session.state.solve = true"
    />
  </v-toolbar>
  <SceneSolve :scene="store.scene" />
</template>
