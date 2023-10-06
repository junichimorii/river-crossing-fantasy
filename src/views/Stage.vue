<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useSettingStore } from '@/store/setting'
import { useSceneStore } from '@/store/scene'
import { BottomNavigation, PuzzleStage } from '@/components'
const { id } = defineProps<{
  id: string
}>()
const { isSupported, orientation } = useScreenOrientation()
const { load } = useSettingStore()
const scene = useSceneStore()
await load(id)
.then(setting => {
  scene.init(setting)
}).catch(() => {
  useRouter().push({ path: '/home' })
})
</script>

<template>
  <PuzzleStage></PuzzleStage>
  <BottomNavigation v-if="orientation === 'portrait-primary'"></BottomNavigation>
</template>