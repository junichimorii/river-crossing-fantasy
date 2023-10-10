<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleDialog, PuzzleNavigation, PuzzleStage, PuzzleResult } from '@/components'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const scene = useSceneStore()
const loaded = ref(false)
/** パラメータで渡されたIDのシーンを開始する */
const load = async (id: string|string[]) => {
  if(Array.isArray(id)) throw false
  const config = await records.load(parseInt(id))
  await scene.load(structuredClone(config))
  loaded.value = true
}
onMounted(async () => {
  await load(route.params.id).catch(() => {
    router.push({ path: '/home' })
  })
})
onUnmounted(async () => {
  await scene.unload()
})
onBeforeRouteLeave(async (to, from) => {
})
onBeforeRouteUpdate(async (to, from) => {
  await load(to.params.id).catch(() => {
    router.push({ path: '/home' })
  })
})
</script>

<template>
  <div v-if="loaded">
    <PuzzleStage></PuzzleStage>
    <PuzzleNavigation v-if="orientation === 'portrait-primary'"></PuzzleNavigation>
    <PuzzleDialog></PuzzleDialog>
    <PuzzleResult></PuzzleResult>
  </div>
</template>