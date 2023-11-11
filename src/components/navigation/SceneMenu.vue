<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const store = useSceneStore()
</script>

<template>
  <v-list>
    <v-list-subheader>
      <v-icon icon="mdi-cog"></v-icon>
      オプション
    </v-list-subheader>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-list-item>
          <v-btn
            block
            color="warning"
            size="large"
            prepend-icon="mdi-check-circle"
            @click="store.init()"
          >
            最初から始める
          </v-btn>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-list-item>
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
      </v-col>
    </v-row>
  </v-list>
</template>