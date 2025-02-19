<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { isSupported, orientation } = useScreenOrientation()
const { init } = useSceneStore()
const dialog = ref(false)
</script>

<template>
  <v-app-bar-nav-icon
    v-if="isSupported && orientation === 'landscape-primary'"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="dialog = !dialog"
  />
  <v-dialog
    v-model="dialog"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <SceneNavigation class="opacity-90">
      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          color="primary"
          @click.stop="dialog=false"
        />
      </template>
      <template #bottom-action>
        <v-card-actions>
          <v-row justify="center">
            <v-col
              cols="12"
              sm="4"
              md="4"
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
              sm="4"
              md="4"
            >
              <v-btn
                block
                variant="elevated"
                color="warning"
                size="large"
                prepend-icon="$restart"
                @click.stop="init();dialog=false"
              >
                最初から始める
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-btn
                block
                variant="elevated"
                color="info"
                size="large"
                prepend-icon="$next"
                @click.stop="dialog=false"
              >
                再開する
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>
    </SceneNavigation>
  </v-dialog>
</template>
