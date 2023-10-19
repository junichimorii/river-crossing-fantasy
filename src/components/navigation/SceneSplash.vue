<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { SceneConditions } from '@/components'
const records = useRecordsStore()
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
    persistent
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <SceneConditions
      style="background-color: hsla(0, 0%, 100%, 0.9)"
    >
      <template v-slot:actions>
        <v-card-actions
          class="d-flex justify-center"
        >
          <v-btn
            size="large"
            color="green"
            variant="elevated"
            @click="dialog = false"
          >
            Start
          </v-btn>
        </v-card-actions>
      </template>
    </SceneConditions>
  </v-dialog>
</template>