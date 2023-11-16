<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const store = useSceneStore()
</script>

<template>
  <v-list>
    <v-list-item
      class="pa-0"
    >
      <v-btn
        block
        color="warning"
        size="large"
        prepend-icon="mdi-check-circle"
        @click.stop="store.init()"
      >
        最初から始める
      </v-btn>
    </v-list-item>
    <v-list-item
      class="pa-0"
    >
      <v-btn
        block
        color="success"
        size="large"
        prepend-icon="mdi-home"
        to="/home"
      >
        パズル一覧に戻る
      </v-btn>
    </v-list-item>
  </v-list>
</template>