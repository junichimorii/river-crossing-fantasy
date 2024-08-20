<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const { isSupported, orientation } = useScreenOrientation()
const { state: settings } = storeToRefs(useSettingsStore())
const { state: session } = storeToRefs(useSessionStore())
const { scene, moves } = storeToRefs(useSceneStore())
const { count, color } = useMoves(moves, scene)
const btnColor = computed(() => scene.value.landscape?.night ? 'white' : 'black')
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
      @click.stop="session.moves = true"
    />
    <SceneSound :color="btnColor" />
    <v-app-bar-nav-icon
      v-show="isSupported && orientation === 'landscape-primary'"
      variant="text"
      size="small"
      :color="btnColor"
      @click.stop="session.navigation = !session.navigation"
    />
    <v-spacer />
    <v-btn
      v-if="settings.debug"
      icon="$solve"
      variant="text"
      size="small"
      :color="btnColor"
      @click.stop="session.solve = true"
    />
  </v-toolbar>
  <SceneSolve :scene="scene" />
</template>
