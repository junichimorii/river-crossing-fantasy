<script lang="ts" setup>
import bgm from '@/assets/sounds/RiversideEnd.mp3'
import { useSessionStore } from '@/stores/session'
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()
const session = useSessionStore()
const volume = computed(() => settings.state.sound.volume)
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
    :icon="icon"
    size="small"
    color="primary"
    @click.stop="session.state.sound = !session.state.sound"
  />
</template>