<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { useScreenOrientation } from '@vueuse/core'
import { useMoves } from '@/composables'
import { SceneCasts, SceneConditions, SceneController, SceneMoves } from '@/components'
import { useSceneStore } from '@/store/scene'
const { isSupported, orientation } = useScreenOrientation()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const conditions = ref(false)
const casts = ref(false)
const moves = ref(false)
const controller = ref(false)
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
          v-model="conditions"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneConditions></SceneConditions>
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
          v-model="casts"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneCasts></SceneCasts>
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
          v-model="moves"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneMoves></SceneMoves>
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
          v-model="controller"
          activator="parent"
          width="auto"
          close-on-content-click
        >
          <v-card width="50vw">
            <SceneController></SceneController>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
  </v-toolbar>
</template>