<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const route = useRoute('/[id]')
const router = useRouter()
const { load, init, unload } = useSceneStore()
const loading = ref(true)
provide('init', init)
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
