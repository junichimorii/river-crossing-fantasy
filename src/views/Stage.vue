<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleDialog, PuzzleNavigation, PuzzleStage } from '@/components'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const scene = useSceneStore()
/** パラメータで渡されたIDのシーンを開始する */
const load = async (id: string|string[]) => {
  if(Array.isArray(id)) throw false
  await scene.load(parseInt(id))
}
watch(
  () => route.params.id,
  async newId => {
    await load(newId).catch(() => {
      router.push({ path: '/home' })
    })
  },
  { immediate: true }
)
</script>

<template>
  <PuzzleStage></PuzzleStage>
  <PuzzleNavigation v-if="orientation === 'portrait-primary'"></PuzzleNavigation>
  <PuzzleDialog></PuzzleDialog>
</template>