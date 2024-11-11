<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { state: session } = storeToRefs(useSessionStore())
const { init } = useSceneStore()
</script>

<template>
  <v-card-actions>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        cols="12"
        md="6"
        xl="4"
        class="pa-1"
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
        md="6"
        xl="4"
        class="pa-1"
      >
        <v-btn
          block
          variant="elevated"
          color="warning"
          size="large"
          prepend-icon="$restart"
          @click.stop="init();session.navigation=false"
        >
          最初から始める
        </v-btn>
      </v-col>
    </v-row>
  </v-card-actions>
</template>
