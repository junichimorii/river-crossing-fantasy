<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { scene } = storeToRefs(useSceneStore())
const { state: session } = storeToRefs(useSessionStore())
const dialog = ref(false)
const start = () => {
  dialog.value = false
  session.value.sound = true
}
/** 初回実行時にダイアログを表示 */
onMounted(async () => {
  dialog.value = true
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
      :title="scene.title"
      class="overflow-y-auto opacity-90 my-4"
    >
      <v-divider />
      <v-card-text class="pa-1">
        <SceneRules />
        <SceneCasts />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            cols="12"
            md="6"
            xl="4"
          >
            <v-btn
              block
              variant="elevated"
              color="success"
              size="x-large"
              @click.stop="start()"
            >
              Start
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
