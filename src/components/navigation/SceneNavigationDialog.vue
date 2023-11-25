<script lang="ts" setup>
import { SceneNavigationTabs, SceneNavigationWindows } from '@/components'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-dialog
    v-model="session.state.navigation"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      :title="store.scene.title"
      class="overflow-y-auto"
      style="background-color: hsla(0, 0%, 100%, 0.95)"
    >
      <v-divider class="my-3"></v-divider>
      <v-card-text class="pa-1">
        <SceneNavigationTabs></SceneNavigationTabs>
        <SceneNavigationWindows></SceneNavigationWindows>
      </v-card-text>
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="store.scene.category"
        >
          Q{{store.scene.id}}
        </v-chip>
      </template>
      <template v-slot:append>
        <v-btn
          icon="mdi-close-box"
          variant="text"
          @click.stop="session.state.navigation=false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>