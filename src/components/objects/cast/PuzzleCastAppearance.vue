<script lang="ts" setup>
import { computed, toRef } from 'vue'
import type { Cast } from '@/types'
import {
  beasttamer1, beasttamer2, beasttamer3, beasttamer4, beasttamer5, fighter1,
  knight11, knight12, knight21, knight22, knight31, knight32, knight41, knight42,
  mage1, priest1,
  princess11, princess12, princess13, princess21, princess22, princess23,
  princess31, princess32, princess33, princess41, princess42, princess43,
  therianthropy1, therianthropy2, therianthropy3, therianthropy4, therianthropy5,
  thief1, villager1, villager2, villager3,
} from '@/assets/images/casts'
import { useCastAppearance, useCastState } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Cast
}>()
const sprites: {
  [key:string]: string
} = {
  beasttamer1,
  beasttamer2,
  beasttamer3,
  beasttamer4,
  beasttamer5,
  fighter1,
  knight11,
  knight12,
  knight21,
  knight22,
  knight31,
  knight32,
  knight41,
  knight42,
  mage1,
  priest1,
  princess11,
  princess12,
  princess13,
  princess21,
  princess22,
  princess23,
  princess31,
  princess32,
  princess33,
  princess41,
  princess42,
  princess43,
  therianthropy1,
  therianthropy2,
  therianthropy3,
  therianthropy4,
  therianthropy5,
  thief1,
  villager1,
  villager2,
  villager3,
}
const store = useSceneStore()
const { coord } = useCastState(toRef(store.state))
const { width, height, aspectRatio } = useCastAppearance(store.scene)

/**
 * v-imgに適用するCSS transformプロパティ
 */
const transform = computed(() => {
  const ratio = props.state.appearance.ratio || 1
  return `scale(${coord(props.state) > 0 ? -ratio : ratio}, ${ratio})`
})
</script>

<template>
  <v-img
    :src="sprites[state.appearance.sprite]"
    :width="width"
    :height="height"
    :aspect-ratio="aspectRatio"
    :style="{ transform: transform }"
    style="transform-origin: bottom center;"
  >
    <div class="d-flex justify-center align-end fill-height"></div>
  </v-img>
</template>
