<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-dialog
    v-model="session.settings"
    persistent
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      title="設定"
      class="overflow-y-auto opacity-90"
    >
      <v-divider />
      <v-card-text class="overflow-y-auto">
        <v-list>
          <AppSettingsVolume />
          <v-divider class="my-4" />
          <AppSettingsClear />
        </v-list>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-center">
        <v-btn @click.stop="session.settings = false">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
