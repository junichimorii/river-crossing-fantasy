<script lang="ts" setup>
import { useSolve } from '@/composables';
import { useSettingsStore } from '@/stores/settings';
import type { Scene } from '@/types';
const { state: settings } = storeToRefs(useSettingsStore())
const props = defineProps<{
  scene: Scene
}>()
const { scene } = toRefs(props)
const { solutions, solved, isNight, solve } = useSolve(scene)
const dialog = ref(false)
</script>

<template>
  <v-btn
    v-if="settings.debug"
    icon="$solve"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="dialog = true"
  />
  <v-dialog
    v-model="dialog"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="ルート探索"
    >
      <template #prepend>
        <v-icon icon="$solve" />
      </template>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          prepend-icon="$solve"
          color="info"
          @click.stop="solve()"
        >
          探索開始
        </v-btn>
        <v-btn
          prepend-icon="$close"
          color="error"
          @click.stop="dialog = false"
        >
          閉じる
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="!solved"
        type="error"
        title="Failed."
      />
      <v-card-text class="pa-0">
        <v-card-item
          v-for="(moves, i) in solutions"
          :key="i"
          class="px-0"
        >
          <v-card-subtitle class="px-3">
            回数: {{ moves.size }}
            <span v-if="isNight">
              / 時間: {{ Array.from(moves).reduce((a, b) => a + b.value, 0) }}
            </span>
          </v-card-subtitle>
          <v-row no-gutters>
            <v-col
              v-for="(move, j) in moves"
              :key="j"
              cols="12"
              md="6"
              xl="4"
            >
              <v-list-item>
                <v-list-item-title>
                  <v-icon :icon="move.origin < move.destination ? '$inbound' : '$outbound'" />
                  <v-chip
                    v-for="cast in move.casts"
                    :key="cast.id"
                    variant="text"
                    class="pa-2"
                  >
                    <v-avatar
                      start
                      size="small"
                    >
                      <PuzzleCastAvatar :state="cast" />
                    </v-avatar>
                    <span class="text-caption">{{ cast.name }}</span>
                  </v-chip>
                </v-list-item-title>
                <template #prepend>
                  <v-chip
                    rounded
                    color="primary"
                  >
                    {{ i + 1 }}
                  </v-chip>
                </template>
                <template #append>
                  <span v-if="scene.landscape?.night">
                    + {{ move.value }} min
                  </span>
                </template>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
