<script lang="ts" setup>
import { useSound } from '@vueuse/sound'
import { computed, onUnmounted, watch } from 'vue'
import bgm from '@/assets/sounds/White_River.mp3'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
import { useSettingsStore } from '@/store/settings'
const store = useSceneStore()
const settings = useSettingsStore()
const session = useSessionStore()
const volume = computed(() => settings.state.sound.volume)
const color = computed(() => store.scene.landscape?.night ? 'grey-lighten-2' : 'grey-darken-2')
const icon = computed(() => isPlaying.value ? 'mdi-music' : 'mdi-music-off')
const { play, stop, isPlaying } = useSound(bgm, {
  loop: true,
  volume,
})
onUnmounted(async () => {
  stop()
})
watch(
  () => session.state.sound,
  async (sound) => {
    if (sound){
      play()
    } else {
      stop()
    }
  }
)
</script>

<template>
  <v-btn
    :icon=icon
    :color=color
    size="small"
    @click.stop="session.state.sound = !session.state.sound"
  >
  </v-btn>
</template>