<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleDialog, PuzzleNavigation, PuzzleStage, PuzzleResult, PuzzleSnackbar } from '@/components'
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
</script>

<template>
  <div v-if="loaded">
    <PuzzleStage></PuzzleStage>
    <PuzzleNavigation v-if="orientation === 'portrait-primary'"></PuzzleNavigation>
    <PuzzleSnackbar></PuzzleSnackbar>
    <PuzzleResult></PuzzleResult>
  </div>
</template>