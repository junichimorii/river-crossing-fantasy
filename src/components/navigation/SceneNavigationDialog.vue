<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
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
        <template #prepend>
          <v-chip
            rounded
            :color="store.scene.category"
          >
            Q{{ store.scene.id }}
          </v-chip>
        </template>
        <template #append>
          <v-btn
            icon="$close"
            variant="text"
            color="primary"
            @click.stop="session.state.navigation=false"
          />
        </template>
        <template #extension>
          <v-tabs
            v-model="session.state.tab"
            align-tabs="title"
            stacked
          >
            <v-tab>
              <v-icon>$help</v-icon>
              ルール
            </v-tab>
            <v-tab>
              <v-icon>$casts</v-icon>
              登場人物
            </v-tab>
            <v-tab>
              <v-icon>$moves</v-icon>
              履歴
            </v-tab>
            <v-tab>
              <v-icon>$settings</v-icon>
              オプション
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-card-text class="pa-1">
        <SceneNavigationWindows />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>