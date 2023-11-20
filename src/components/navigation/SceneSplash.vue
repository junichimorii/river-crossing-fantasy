<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { SceneCasts, SceneConditions } from '@/components'
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
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="store.scene.category"
        >
          Q{{store.scene.id}}
        </v-chip>
      </template>
      <v-divider class="mt-3"></v-divider>
      <v-card-text
        class="pa-1"
      >
        <v-card-subtitle>
          <v-icon>mdi-help</v-icon>
          条件
        </v-card-subtitle>
        <SceneConditions
          :scene="store.scene"
        ></SceneConditions>
        <v-card-subtitle>
          <v-icon>mdi-account-multiple</v-icon>
          登場人物
        </v-card-subtitle>
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
    </v-card>
  </v-dialog>
</template>