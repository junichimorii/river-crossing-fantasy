<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
const dialog = ref(false)
/** 初回実行時にダイアログを表示 */
onMounted(async () => {
  dialog.value = true
})
const start = () => {
  dialog.value = false
  session.state.sound = true
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
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
        <SceneRules
          :scene="store.scene"
        ></SceneRules>
        <SceneCasts
          :casts="store.scene.casts"
        ></SceneCasts>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          color="success"
          @click.stop="start()"
        >
          Start
        </v-btn>
      </v-card-actions>
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="store.scene.category"
        >
          Q{{store.scene.id}}
        </v-chip>
      </template>
    </v-card>
  </v-dialog>
</template>