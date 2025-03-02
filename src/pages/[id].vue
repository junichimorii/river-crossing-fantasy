<script lang="ts" setup>
import { useScene } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const route = useRoute('/[id]')
const router = useRouter()
const { load, unload, clear } = useSceneStore()
const { state, scene } = storeToRefs(useSceneStore())
const { init: initScene } = useScene(state, scene)
const loading = ref(true)
const init = async () => {
  await initScene()
  await nextTick()
  await clear()
}
onMounted(async () => {
  await load(route.params.id).catch(() => {
    router.push({ path: '/home' })
  })
  await init()
  loading.value = false
})
onUnmounted(async () => {
  await unload()
})
provide('init', init)
</script>

<template>
  <v-skeleton-loader :loading="loading">
    <PortraitToolbar />
    <v-main @contextmenu.prevent>
      <SceneStage />
      <PortraitMenu />
    </v-main>
    <PortraitFooter />
    <SceneResultDialog />
  </v-skeleton-loader>
</template>
