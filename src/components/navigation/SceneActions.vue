<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { state: session } = storeToRefs(useSessionStore())
const { init } = useSceneStore()
</script>

<template>
  <v-card-actions class="d-flex justify-center">
    <v-btn
      color="success"
      size="large"
      prepend-icon="$prev"
      to="/home"
    >
      パズル一覧に戻る
    </v-btn>
    <v-btn
      color="warning"
      size="large"
      prepend-icon="$restart"
      @click.stop="init();session.navigation=false"
    >
      最初から始める
    </v-btn>
  </v-card-actions>
</template>
