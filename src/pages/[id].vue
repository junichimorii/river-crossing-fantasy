<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
import { useSceneStore } from '@/stores/scene';
const route = useRoute('/[id]')
const router = useRouter()
const { load: loadRecord } = useRecordsStore()
const { scene } = storeToRefs(useSceneStore())
const { load: loadScene, init: initScene, unload: unloadScene } = useSceneStore()
const loading = ref(true)
onMounted(async () => {
  const id = parseInt(route.params.id)
  if(!scene.value || scene.value.id !== id) {
    const config = await loadRecord(id)
    if (!config) {
      router.push({ path: '/home' })
      return
    }
    await loadScene(config)
    await initScene()
  }
  loading.value = false
})
onUnmounted(async () => {
  await unloadScene()
})
</script>

<template>
  <template v-if="!loading">
    <v-main @contextmenu.prevent>
      <PortraitToolbar />
      <SceneStage />
      <PortraitMenu />
    </v-main>
    <SceneResultDialog />
  </template>
</template>
