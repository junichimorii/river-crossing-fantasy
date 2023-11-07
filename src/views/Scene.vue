<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { PuzzleNavigation, PuzzleStage } from '@/components'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const store = useSceneStore()
const loading = ref(true)

onMounted(async () => {
  if(Array.isArray(route.params.id)) throw `id: ${route.params.id}`
  const id = parseInt(route.params.id)
  if(store.scene.id !== id) {
    const config = await records.load(id)
    await store.load(config).catch(() => {
      router.push({ path: '/home' })
    })
    await store.init()
  }
  loading.value = false
})

onUnmounted(async () => {
  await store.unload()
})
</script>

<template>
  <v-main
    v-if="!loading"
    @contextmenu.prevent
  >
    <PuzzleStage></PuzzleStage>
    <PuzzleNavigation
      v-show="orientation === 'portrait-primary'"
    ></PuzzleNavigation>
  </v-main>
</template>
