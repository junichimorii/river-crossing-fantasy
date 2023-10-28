<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleNavigation, PuzzleStage } from '@/components'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const scene = useSceneStore()
/** パラメータで渡されたIDのシーンを開始する */
const load = async (id: string|string[]) => {
  if(Array.isArray(id)) throw `id: ${id}`
  const config = await records.load(parseInt(id))
  await scene.load(structuredClone(config))
}
onMounted(async () => {
  await load(route.params.id).catch(() => {
    router.push({ path: '/home' })
  })
})
onUnmounted(async () => {
  await scene.unload()
})
watch(
  () => scene.score,
  (score) => {
    /** ステージクリア */
    if (score !== 0) {
      records.report(scene.state.id, score)
    }
  },
  { deep: true }
)
</script>

<template>
  <v-main
    v-if="scene.state"
    @contextmenu.prevent
  >
    <PuzzleStage></PuzzleStage>
    <PuzzleNavigation v-show="orientation === 'portrait-primary'"></PuzzleNavigation>
  </v-main>
</template>
