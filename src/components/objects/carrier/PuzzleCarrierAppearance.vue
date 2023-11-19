<script lang="ts" setup>
import type { Carrier } from '@/types'
import { boat1, boat2, boat3, touch } from '@/assets/images/carriers'
import { useCarrierAppearance } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Carrier
}>()
const sprites: {
  [key:string]: string
} = {
  boat1,
  boat2,
  boat3,
  touch,
}
const store = useSceneStore()
const { width, height, aspectRatio } = useCarrierAppearance(store.scene, props.state)
</script>

<template>
  <v-img
    :src="sprites[state.appearance.sprite]"
    :width="width"
    :aspect-ratio="aspectRatio"
    :height="height"
    >
      <slot></slot>
  </v-img>
</template>

