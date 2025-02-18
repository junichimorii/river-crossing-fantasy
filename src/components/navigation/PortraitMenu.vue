<script lang="ts" setup>
import { useAppearance } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { navigationHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
const { init } = useSceneStore()
</script>

<template>
  <SceneNavigation
    v-show="isSupported && orientation === 'portrait-primary'"
    :height="navigationHeight"
  >
    <template #top-action>
      <v-card-actions>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              variant="elevated"
              color="success"
              size="large"
              prepend-icon="$prev"
              to="/home"
            >
              パズル一覧に戻る
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              variant="elevated"
              color="warning"
              size="large"
              prepend-icon="$restart"
              @click.stop="init()"
            >
              最初から始める
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </template>
  </SceneNavigation>
</template>
