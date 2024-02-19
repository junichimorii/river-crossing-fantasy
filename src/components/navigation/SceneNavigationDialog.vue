<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-dialog
    v-model="session.state.navigation"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      class="overflow-y-auto"
      style="background-color: hsla(0, 0%, 100%, 0.95)"
    >
      <v-toolbar
        :title="store.scene.title"
        class="bg-transparent"
      >
        <template v-slot:prepend>
          <v-chip
            rounded
            :color="store.scene.category"
          >
            Q{{store.scene.id}}
          </v-chip>
        </template>
        <template v-slot:append>
          <v-btn
            icon="mdi-close-box"
            variant="text"
            color="primary"
            @click.stop="session.state.navigation=false"
          ></v-btn>
        </template>
        <template v-slot:extension>
          <v-tabs
            v-model="session.state.tab"
            align-tabs="title"
            stacked
          >
            <v-tab>
              <v-icon>mdi-help</v-icon>
              ルール
            </v-tab>
            <v-tab>
              <v-icon>mdi-account-multiple</v-icon>
              登場人物
            </v-tab>
            <v-tab>
              <v-icon>mdi-history</v-icon>
              履歴
            </v-tab>
            <v-tab>
              <v-icon>mdi-cog</v-icon>
              オプション
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-card-text class="pa-1">
        <SceneNavigationWindows></SceneNavigationWindows>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>