<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
import { useSessionStore } from '@/stores/session';
const { state: records } = storeToRefs(useRecordsStore())
const { clear } = useRecordsStore()
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
          <v-list-item>
            <v-btn
              block
              color="warning"
              size="large"
              prepend-icon="$clear"
              :disabled="records.scenes.size === 0"
              @click.stop="clear()"
            >
              記録を消去する
            </v-btn>
          </v-list-item>
          <v-divider class="my-4" />
          <v-card-subtitle>
            <v-icon>$settings</v-icon>
            設定
          </v-card-subtitle>
          <PuzzleSettingsVolume />
        </v-list>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-center">
        <v-btn @click.stop="session.settings = false" >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
