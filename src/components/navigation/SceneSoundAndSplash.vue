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
          <v-row
            justify="center"
            no-gutters
          >
            <v-col
              cols="12"
              md="6"
              xl="4"
            >
              <v-btn
                block
                variant="elevated"
                color="success"
                size="x-large"
                @click.stop="dialog = false; play()"
              >
                Start
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>
    </SceneNavigation>
  </v-dialog>
</template>
