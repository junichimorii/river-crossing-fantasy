<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { scene, moves } = storeToRefs(useSceneStore())
const { count, color } = useMoves(moves, scene)
const dialog = ref(false)
</script>

<template>
  <v-btn
    icon
    density="compact"
    size="40"
    variant="elevated"
    :color="color"
    :text="String(count)"
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
      title="履歴"
      class="overflow-y-auto opacity-90"
    >
      <template #prepend>
        <v-icon icon="$moves" />
      </template>
      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          color="primary"
          @click.stop="dialog=false"
        />
      </template>
      <v-divider />
      <v-card-text class="pa-1">
        <v-row no-gutters>
          <v-col
            v-for="(move, i) in moves"
            :key="i"
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
