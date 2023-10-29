<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { SceneHistory, PuzzleStage } from '@/components'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
const route = useRoute()
const records = useRecordsStore()
const scene = useSceneStore()
/** パラメータで渡されたIDのシーンを開始する */
const load = async (id: string|string[]) => {
  if(Array.isArray(id)) throw `id: ${id}`
  const config = await records.load(parseInt(id))
  await scene.load(structuredClone(config))
  const result = await search()
  console.log('result:', result)
}

const search = async () => {
  const carrier = scene.state.carriers[0]
  const visited = new Set()
  const initialState: Cast[] = scene.state.casts
  const queue = [initialState]
  while (queue.length > 0) {
    const currentState = queue.shift() as Cast[]
    visited.add(JSON.stringify(parse(currentState)))
    if (scene.isCompleted) return currentState
    const moves = await generateMoves(currentState, carrier)
    moves.forEach(async move => {
      console.log('move:', move)
      for (const cast of move) {
        const isGotOn = await scene.getOn(cast)
        if (!isGotOn) return
      }
      const isReady = scene.getCarrierStatus(carrier).isReady
      if (!isReady) return
      const isArrived = await scene.arrive(carrier)
      if (!isArrived) return
      if (!visited.has(JSON.stringify(move))) {
        queue.push(move)
        visited.add(JSON.stringify(move))
        console.log('move:', move, 'success')
      }
    })
    console.log('queue:', queue)
  }
}

const generateMoves = async (
  casts: Cast[],
  carrier: Carrier
) => {
  const activeCasts = casts.filter(cast => cast.status.isCrossed === carrier.status.isCrossed)
  const combinations = await Promise.all(new Array(carrier.capacity).fill(0).map(async (n, i) => {
    return await getCombinations(activeCasts, i + 1)
  }))
  .then(combinations => combinations.flat())
  return combinations
}

const getCombinations = async (
  arr: Cast[],
  len: number
) => {
  const result: Cast[][] = []
  const combine = (
    current: Cast[],
    start: number
  ) => {
    if (current.length === len) {
      result.push(current.slice())
      return
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i])
      combine(current, i + 1)
      current.pop()
    }
  }
  combine([], 0)
  return result
}

const parse = (
  state: Cast[]
) => JSON.stringify(state.map(cast => [cast.id, cast.status.isCrossed]))

onMounted(async () => {
  await load(route.params.id)
})
onUnmounted(async () => {
  await scene.unload()
})
</script>

<template>
  <v-main
    v-if="scene.state"
  >
    <SceneHistory></SceneHistory>
  </v-main>
</template>
