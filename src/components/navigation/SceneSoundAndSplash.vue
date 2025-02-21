<script lang="ts" setup>
import bgm from '@/assets/sounds/RiversideEnd.mp3';
import { useSettingsStore } from '@/stores/settings';
const { state: settings } = storeToRefs(useSettingsStore())
const dialog = ref(false)
const volume = computed(() => settings.value.sound.volume)
const icon = computed(() => isPlaying.value ? '$sound' : '$mute')
const { play, stop, isPlaying } = useSound(bgm, {
  loop: true,
  volume,
})
/** 初回実行時にダイアログを表示 */
onMounted(async () => {
  dialog.value = true
})
onUnmounted(async () => {
  stop()
})
</script>

<template>
  <v-btn
    :icon="icon"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="isPlaying ? stop() : play()"
  />
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <SceneNavigation class="opacity-90">
      <template #bottom-action>
        <v-card-actions>
          <v-btn
            block
            variant="elevated"
            color="success"
            @click.stop="dialog = false; play()"
          >
            Start
          </v-btn>
        </v-card-actions>
      </template>
    </SceneNavigation>
  </v-dialog>
</template>
