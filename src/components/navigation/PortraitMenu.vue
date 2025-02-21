<script lang="ts" setup>
import { useAppearance } from '@/composables';
const { navigationHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
const init = inject<() => void>('init', () => {})
</script>

<template>
  <SceneNavigation
    v-if="isSupported && orientation === 'portrait-primary'"
    :height="navigationHeight"
  >
    <template #top-action>
      <v-card-actions class="justify-center">
        <v-btn
          variant="elevated"
          color="success"
          prepend-icon="$home"
          to="/home"
        >
          パズル一覧に戻る
        </v-btn>
        <v-btn
          variant="elevated"
          color="warning"
          prepend-icon="$restart"
          @click.stop="init()"
        >
          最初から始める
        </v-btn>
      </v-card-actions>
    </template>
  </SceneNavigation>
</template>
