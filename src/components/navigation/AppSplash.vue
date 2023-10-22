<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
</script>

<template>
  <v-dialog
    v-model="records.state.splash"
    persistent
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="River Crossing Puzzles"
      class="overflow-y-auto"
      style="background-color: hsla(0, 0%, 100%, 0.9)"
    >
      <v-divider></v-divider>
      <v-card-text
        class="overflow-y-auto pa-0"
      >
        <v-card-item>
          <v-card-subtitle>
            <v-icon icon="mdi-information"></v-icon>
            このゲームについて:
          </v-card-subtitle>
          <v-card-text class="py-1">
            このゲームは、川岸にいる一団を、キャラクターたちが持つ特性を考慮しつつ、条件を満たしながら対岸に渡すゲームです。
            通称「River Crossing Puzzle」（川渡りパズル）と呼ばれています。
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>
            <v-icon icon="mdi-tablet-cellphone"></v-icon>
            推奨環境:
          </v-card-subtitle>
          <v-card-text class="py-1">
            スマートフォンまたはタブレットの縦向きでのプレイを推奨します。
            横向き、PCでもプレイは可能ですが、各種メニューが表示されません。また意図しない動きをする可能性があります。
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>
            <v-icon icon="mdi-script-text"></v-icon>
            開発環境:
          </v-card-subtitle>
          <v-card-text class="py-1">
            このアプリケーションは
            <a
              href="https://vuetifyjs.com/"
              target="_blank"
              class="text-decoration-none"
            >
              Vuetify 3
            </a>
            で開発しています。
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>
            <v-icon icon="mdi-account"></v-icon>
            作者:
          </v-card-subtitle>
          <v-card-text class="py-1">
            <a
              href="https://github.com/8amjp"
              target="_blank"
              class="text-decoration-none"
            >
              8amjp
            </a>
          </v-card-text>
        </v-card-item>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          color="green"
          variant="elevated"
          @click="records.state.splash = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>