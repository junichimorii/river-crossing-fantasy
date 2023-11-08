<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { useScreenOrientation } from '@vueuse/core'
import { useMoves } from '@/composables'
import { SceneCasts, SceneConditions, SceneMenu, SceneMoves } from '@/components'
import { useSceneStore } from '@/store/scene'
const { isSupported, orientation } = useScreenOrientation()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const showConditions = ref(false)
const showCasts = ref(false)
const showMoves = ref(false)
const showMenu = ref(false)
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
        style="font-size: 5vmin;"
      >
        {{ count }}
      </v-chip>
    </template>
    <template v-slot:append>
      <v-btn
        icon
        size="small"
        v-show="orientation === 'landscape-primary'"
      >
        <v-icon icon="mdi-help"></v-icon>
        <v-dialog
          v-model="showConditions"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneConditions
              :scene="store.scene"
            ></SceneConditions>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        icon
        size="small"
        v-show="orientation === 'landscape-primary'"
      >
        <v-icon icon="mdi-account-multiple"></v-icon>
        <v-dialog
          v-model="showCasts"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneCasts
              :casts="store.scene.casts"
            ></SceneCasts>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        icon
        size="small"
        v-show="orientation === 'landscape-primary'"
      >
        <v-icon icon="mdi-history"></v-icon>
        <v-dialog
          v-model="showMoves"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneMoves
              :moves="store.moves"
              :category="store.scene.category"
            ></SceneMoves>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        icon
        size="small"
        v-show="orientation === 'landscape-primary'"
      >
        <v-icon icon="mdi-cog"></v-icon>
        <v-dialog
          v-model="showMenu"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneMenu></SceneMenu>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
  </v-toolbar>
</template>