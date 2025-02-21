<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
import { useSceneStore } from '@/stores/scene';
const route = useRoute('/[id]')
const router = useRouter()
const { load: loadRecord } = useRecordsStore()
const { load: loadScene, init: initScene, unload: unloadScene } = useSceneStore()
const loading = ref(true)
provide('init', initScene)
onMounted(async () => {
  const config = await loadRecord(route.params.id)
  if (!config) {
    router.push({ path: '/home' })
    return
  }
  await loadScene(config)
  await initScene()
  loading.value = false
})
onUnmounted(async () => {
  await unloadScene()
})
</script>

<template>
  <v-skeleton-loader
    :loading="loading"
    type="image"
  >
    <PortraitToolbar />
    <v-main @contextmenu.prevent>
      <SceneStage />
      <PortraitMenu />
    </v-main>
    <SceneResultDialog />
  </v-skeleton-loader>
</template>
