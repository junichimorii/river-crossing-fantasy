<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleNavigation, PuzzleStage } from '@/components'
import type { Category } from '@/types/records'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const scene = useSceneStore()
/** パラメータで渡されたIDのシーンを開始する */
const load = async (id: string|string[]) => {
  if(Array.isArray(id)) throw false
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
  () => scene.activities,
  (activities) => {
    /** scene.activities の値を records.obtain に追加する */
    activities.forEach(activity => records.obtain(activity))
    /** ステージクリア */
    if (activities.has('completed')) records.report(
      scene.state.id,
      scene.state.category as Category,
      scene.isExceeded ? 1 : 2
    )
  },
  { deep: true }
)
</script>

<template>
  <div v-if="scene.state">
    <PuzzleStage></PuzzleStage>
    <PuzzleNavigation v-show="orientation === 'portrait-primary'"></PuzzleNavigation>
  </div>
</template>