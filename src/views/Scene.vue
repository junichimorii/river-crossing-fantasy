<script lang="ts" setup>
import { useScreenOrientation } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PuzzleBottomMenu, PuzzleStage, SceneNavigationDialog, SceneResult, SceneSplash } from '@/components'
import { useAppearance } from '@/composables'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { useSettingsStore } from '@/store/settings'
const route = useRoute()
const router = useRouter()
const { isSupported, orientation } = useScreenOrientation()
const settings = useSettingsStore()
const records = useRecordsStore()
const store = useSceneStore()
const loading = ref(true)
const { navigationHeight } = useAppearance()
onMounted(async () => {
  if(Array.isArray(route.params.id)) throw `id: ${route.params.id}`
  const id = parseInt(route.params.id)
  if(!store.scene || store.scene.id !== id) {
    const config = await records.load(id)
    if (!config || (!settings.state.debug && !records.isQualified(config.level))) {
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
    <v-app-bar
      v-if="isSupported && orientation === 'portrait-primary'"
      :title="store.scene.title"
      :elevation="4"
    >
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="store.scene.category"
        >
          Q{{store.scene.id}}
        </v-chip>
      </template>
    </v-app-bar>
    <v-main
      @contextmenu.prevent
    >
      <PuzzleStage></PuzzleStage>
      <PuzzleBottomMenu
        v-if="isSupported && orientation === 'portrait-primary'"
        :height="navigationHeight"
      ></PuzzleBottomMenu>
    </v-main>
    <SceneNavigationDialog></SceneNavigationDialog>
    <SceneSplash></SceneSplash>
    <SceneResult></SceneResult>
  </template>
</template>
