<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const records = useRecordsStore()
const session = useSessionStore()
const settings = useSettingsStore()
</script>

<template>
  <v-dialog
    v-model="session.state.settings"
    persistent
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="設定"
      class="overflow-y-auto"
      style="background-color: hsla(0, 0%, 100%, 0.95)"
    >
      <v-divider />
      <v-card-text
        class="overflow-y-auto pa-0"
      >
        <v-list>
          <v-list-item>
            <v-btn
              block
              color="warning"
              size="large"
              prepend-icon="$clear"
              :disabled="records.state.scenes.size === 0"
              @click.stop="records.clear()"
            >
              記録を消去する
            </v-btn>
          </v-list-item>
          <v-divider class="my-4" />
          <v-card-subtitle>
            <v-icon>$settings</v-icon>
            設定
          </v-card-subtitle>
          <v-list-subheader>
            BGM音量
          </v-list-subheader>
          <v-list-item>
            <v-slider
              v-model="settings.state.sound.volume"
              color="primary"
              :max="1"
              :min="0"
              :step="0.05"
              prepend-icon="$volume"
              class="py-1"
            />
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider />
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          @click.stop="session.state.settings = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
