<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { BottomNavigation, PuzzleStage } from '@/components'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const { load } = useRecordsStore()
const scene = useSceneStore()
/** パラメータで渡されたIDのシーンを開始する */
const init = async (id: string|string[]) => {
  await load(id)
  .then(config => {
    scene.init(config)
  }).catch(() => {
    router.push({ path: '/home' })
  })
}
watch(
  () => route.params.id,
  async newId => {
    init(newId)
  }
)
onMounted(() => {
  init(route.params.id)
})
</script>

<template>
  <PuzzleStage></PuzzleStage>
  <BottomNavigation v-if="orientation === 'portrait-primary'"></BottomNavigation>
</template>