<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreenOrientation } from '@vueuse/core'
import { PuzzleBottomNavigation, PuzzleNavigationDrawer, PuzzleStage, SceneResult, SceneSplash } from '@/components'
import { useAppearance } from '@/composables'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const records = useRecordsStore()
const store = useSceneStore()
const loading = ref(true)
const { navigationHeight } = useAppearance(store.scene)

onMounted(async () => {
  if(Array.isArray(route.params.id)) throw `id: ${route.params.id}`
  const id = parseInt(route.params.id)
  if(!store.scene || store.scene.id !== id) {
    const config = await records.load(id)
    if (!config) {
      router.push({ path: '/home' })
      return
    }
    await store.load(config)
    await store.init()
  }
  loading.value = false
})

onUnmounted(async () => {
  await store.unload()
})
</script>

<template>
  <template
    v-if="!loading"
  >
    <PuzzleNavigationDrawer></PuzzleNavigationDrawer>
    <v-main
      @contextmenu.prevent
    >
      <PuzzleStage></PuzzleStage>
      <PuzzleBottomNavigation
        v-show="orientation === 'portrait-primary'"
        :height="navigationHeight"
      ></PuzzleBottomNavigation>
    </v-main>
    <SceneSplash></SceneSplash>
    <SceneResult></SceneResult>
  </template>
</template>
