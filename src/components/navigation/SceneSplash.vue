<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useSceneStore } from '@/store/scene'
import { SceneCasts, SceneConditions } from '@/components'
const scene = useSceneStore()
const dialog = ref(false)
/** 初回実行時にダイアログを表示 */
onMounted(async () => {
  dialog.value = (scene.count === 0)
})
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
      :title="scene.state.title"
      class="overflow-y-auto"
      style="background-color: hsla(0, 0%, 100%, 0.95)"
    >
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="scene.state.category"
        >
          Q{{scene.state.id}}
        </v-chip>
      </template>
      <v-divider class="mt-3"></v-divider>
      <v-card-text
        class="pa-1"
      >
        <SceneConditions></SceneConditions>
        <SceneCasts></SceneCasts>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          color="green"
          variant="elevated"
          @click="dialog = false"
        >
          Start
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>