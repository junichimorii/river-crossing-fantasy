<script lang="ts" setup>
import bgm from '@/assets/sounds/RiversideEnd.mp3';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const { state: settings } = storeToRefs(useSettingsStore())
const { state: session } = storeToRefs(useSessionStore())
const volume = computed(() => settings.value.sound.volume)
const icon = computed(() => isPlaying.value ? '$sound' : '$mute')
const { play, stop, isPlaying } = useSound(bgm, {
  loop: true,
  volume,
})
onUnmounted(async () => {
  stop()
})
watch(
  () => session.value.sound,
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
    @click.stop="session.sound = !session.sound"
  />
</template>
