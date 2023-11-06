<script lang="ts" setup>
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
// import { useRecordsStore } from '@/store/records'
// import { useScene } from '@/composables'
// import { carrierStatus, castStatus } from '@/store/statuses'
// import type { Scene } from '@/types/scene'
// import type { Cast } from '@/types/cast'
// const route = useRoute()
// const records = useRecordsStore()

// const load = async (id: string|string[]) => {
//   if(Array.isArray(id)) throw `id: ${id}`
//   const config = await records.load(parseInt(id))
//   const result = await search(config)
//   console.log('result:', result)
// }

// const search = async (
//   scene: Scene
// ) => {
//   scene.carriers.forEach(carrier => {
//     carrier.status = structuredClone(carrierStatus)
//   })
//   scene.casts.forEach(cast => {
//     cast.status = structuredClone(castStatus)
//   })
//   const { state, carriers, isEmergency, isCompleted, getOn, arrive } = useScene(scene)
//   const visited = new Set()
//   const moves = [scene]
//   const carrier = carriers.value[0]
//   while (moves.length > 0) {
//     const currentState = moves.shift() as Scene
//     visited.add(currentState)
//     if (isCompleted.value) return currentState
//     const moves = await generateMoves(currentState)
//     moves.forEach(async move => {
//       move.forEach(async cast => {
//         await getOn(cast)
//       })
//       console.log(move.map(cast => cast.id), 'isEmergency', isEmergency.value)
//       if (isEmergency.value) return
//       console.log(move.map(cast => cast.id), 'isReady', carrier.isReady)
//       if (!carrier.isReady) return
//       const isArrived = await arrive(carrier)
//       console.log(move.map(cast => cast.id), 'isArrived', isArrived)
//       if (!isArrived) return
//       if (!visited.has(currentState)) {
//         moves.push(currentState)
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
</script>

<template>
  <v-main
  >
  </v-main>
</template>
