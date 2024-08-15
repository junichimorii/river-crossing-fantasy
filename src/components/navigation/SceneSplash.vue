<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
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
      :title="store.scene.title"
      class="overflow-y-auto opacity-90"
    >
      <v-divider />
      <v-card-text class="pa-1">
        <SceneRules
          :scene="store.scene"
        />
        <SceneCasts
          :casts="store.scene.casts"
        />
      </v-card-text>
      <v-divider />
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
    </v-card>
  </v-dialog>
</template>
