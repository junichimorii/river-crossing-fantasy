<script lang="ts" setup>
// import { onMounted, onUnmounted } from 'vue'
// import { useRoute } from 'vue-router'
// import { useRecordsStore } from '@/store/records'
// import { isCompleted, toGetOn } from '@/composables/use-puzzle'
// import type { Scene, Queue } from '@/types/scene'
// import type { Carrier } from '@/types/carrier'
// import type { Cast } from '@/types/cast'
// const route = useRoute()
// const records = useRecordsStore()
// /** パラメータで渡されたIDのシーンを開始する */
// const load = async (id: string|string[]) => {
//   if(Array.isArray(id)) throw `id: ${id}`
//   const config = await records.load(parseInt(id))
//   const result = await search(config)
//   console.log('result:', result)
// }

// const search = async (
//   state: Scene
// ) => {
//   const visited = new Set()
//   const queue = [state]
//   while (queue.length > 0) {
//     const currentState = queue.shift() as Scene
//     visited.add(currentState)
//     if (isCompleted(currentState)) return currentState
//     const moves = await generateMoves(currentState)
//     moves.forEach(async move => {
//       move.forEach(async cast => {
//         await toGetOn(currentState, cast)
//       })
//       const isEmergency = scene.isEmergency
//       console.log(move.map(cast => cast.id), 'isEmergency', isEmergency)
//       if (isEmergency) return
//       const isReady = scene.getCarrierStatus(currentState.carriers[0]).isReady
//       console.log(move.map(cast => cast.id), 'isReady', isReady)
//       if (!isReady) return
//       const isArrived = await scene.arrive(currentState.carriers[0])
//       console.log(move.map(cast => cast.id), 'isArrived', isArrived)
//       if (!isArrived) return
//       if (!visited.has(currentState)) {
//         queue.push(currentState)
//         visited.add(currentState)
//       }
//     })
//   }
// }

// const generateMoves = async (
//   state: Scene
// ) => {
//   const activeCasts = state.casts.filter(cast => cast.status.isCrossed === state.carriers[0].status.isCrossed)
//   const combinations = await Promise.all(new Array(state.carriers[0].capacity).fill(0).map(async (n, i) => {
//     return await getCombinations(activeCasts, i + 1)
//   }))
//   .then(combinations => combinations.flat())
//   return combinations
// }

// const getCombinations = async (
//   arr: Cast[],
//   len: number
// ) => {
//   const result: Cast[][] = []
//   const combine = (
//     current: Cast[],
//     start: number
//   ) => {
//     if (current.length === len) {
//       result.push(current.slice())
//       return
//     }
//     for (let i = start; i < arr.length; i++) {
//       current.push(arr[i])
//       combine(current, i + 1)
//       current.pop()
//     }
//   }
//   combine([], 0)
//   return result
// }

// onMounted(async () => {
//   await load(route.params.id)
// })
// onUnmounted(async () => {
//   await scene.unload()
// })
</script>

<template>
  <v-main
  >
  </v-main>
</template>
