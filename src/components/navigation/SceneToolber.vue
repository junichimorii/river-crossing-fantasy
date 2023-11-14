<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { useScreenOrientation } from '@vueuse/core'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const { isSupported, orientation } = useScreenOrientation()
const session = useSessionStore()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const btnColor = store.scene.category === 'time-limited' ? 'white' : 'black'
</script>

<template>
  <v-toolbar
    absolute
    class="bg-transparent"
  >
    <template v-slot:prepend>
      <v-chip
        variant="text"
        :color="color"
        style="font-size: 4.5vmin;"
      >
        {{ count }}
      </v-chip>
    </template>
    <template v-slot:append>
      <v-app-bar-nav-icon
        variant="text"
        :color="btnColor"
        v-show="orientation === 'landscape-primary'"
        @click.stop="session.state.drawer = !session.state.drawer"
      ></v-app-bar-nav-icon>
    </template>
  </v-toolbar>
</template>