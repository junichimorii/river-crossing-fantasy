<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SceneCasts, SceneMoves } from '@/components'
import { useCarrier, useCasts, useScene } from '@/composables'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import type { Ref } from 'vue'
import type { Cast, Scene, State, Move } from '@/types'
import type { CarrierState, CastState } from '@/types/state'
const route = useRoute()
const records = useRecordsStore()
const store = useSceneStore()
const state = ref<State>({
  carriers: [] as CarrierState[],
  casts: [] as CastState[],
})
const scene = ref<Scene>({
  id: 0,
  title: '',
  description: {
    conditions: '',
    transportation: '',
  },
  category: 'unconditioned',
  passing: 0,
  landscape: '',
  carriers: [],
  casts: [],
})
const moves = ref<Set<Move>>(
  new Set<Move>(),
)
const history = ref<string[][]>([])
const loading = ref(true)
const { isReady } = useCarrier(state, scene)
const { isPeaceable, isEeachEvery } = useCasts(state, scene)
const { pickUp, leave, arrive, safetyConfirmation } = useScene(state, scene)
const { init: initScene } = useScene(state, scene)

const start = async () => {
  const result = await search()
  if (result) {
    lookBack()
  } else {
    console.error('failed.')
  }
}

const search = async () => {
  const visited = new Set<string>()
  const queue: State[] = [state.value]
  visited.add(parseState(state))
  history.value.push([parseState(state)])

  while (queue.length > 0) {
    const currentState = queue.shift() as State
    state.value = currentState
    if (isEeachEvery.value) return currentState
    const nextMoves = await generateMoves()
    for await (const move of nextMoves) {
      state.value = restore(currentState)
      const isAllPickedUp = await Promise.all(move.map(async cast => {
        const pickedUp = await pickUp(cast)
        return pickedUp
      })).then(result => result.every(success => success))
      if (!isAllPickedUp) continue
      await safetyConfirmation()
      if (!isPeaceable.value) continue
      const isAllReady = scene.value.carriers.every(carrier => isReady(carrier))
      if (!isAllReady) continue
      const isAllArrived = await Promise.all(scene.value.carriers.map(async carrier =>
        await leave(carrier)
        .then(() => arrive(carrier))
        .then(result => result !== undefined)
      )).then(result => result.every(success => success))
      if (!isAllArrived) continue
      await safetyConfirmation()
      if (!isPeaceable.value) continue
      if (!visited.has(parseState(state))) {
        queue.push(state.value)
        visited.add(parseState(state))
        history.value.push([parseState(state), parseMove(move), parsePrev(state, move)])
        console.log(parseState(state), parseMove(move), queue.length)
      }
    }
  }
}

const lookBack = () => {
  const corrects: string[][] = []
  corrects.push(history.value.slice(-1)[0])
  while (true) {
    const latest = corrects.slice(-1)[0][2]
    if (!latest) break
    const target = history.value.find(item => item[0] === latest)
    if (!target) break
    corrects.push(target)
  }
  corrects.reverse().slice(1).forEach(item => {
    const ids: number[] = JSON.parse(item[1])
    const casts: Cast[] = ids.map(id => scene.value.casts[id])
    const value: number = Math.max(...casts.map(cast => cast.role.duration || 1))
    const move: Move = {
      casts: casts,
      value: value
    }
    moves.value.add(move)
  })
}

const parseState = (
  state: Ref<State>
) => JSON.stringify([
  state.value.carriers.map(state => state.isCrossed ? 1 : 0),
  state.value.casts.map(state => state.isCrossed ? 1 : 0)
])

const parseMove = (
  move: Cast[]
) => JSON.stringify(move.map(cast => cast.id))

const parsePrev = (
  state: Ref<State>,
  move: Cast[]
) => {
  const carriers = state.value.carriers.map(state => state.isCrossed ? 0 : 1)
  const casts = state.value.casts.map(state => state.isCrossed ? 1 : 0)
  move.forEach(cast => {
    casts[cast.id] = casts[cast.id] === 1 ? 0 : 1
  })
  return JSON.stringify([carriers, casts])
}

const restore  = (
  currentState: State
) => {
  return {
    carriers: currentState.carriers.map(state => {
      return {
        isCrossed: state.isCrossed
      }
    }),
    casts: currentState.casts.map(state => {
      return {
        isCrossed: state.isCrossed,
        boarding: state.boarding,
        emotions: state.emotions
      }
    })
  }
}

const generateMoves = async () => {
  const capacity = scene.value.carriers.reduce((n, carrier) => n += carrier.capacity, 0)
  const combinations = await Promise.all(new Array(capacity).fill(0).map(async (n, i) => {
    return await getCombinations(scene.value.casts, i + 1)
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

const load = async () => {
  if(Array.isArray(route.params.id)) throw `id: ${route.params.id}`
  const id = parseInt(route.params.id)
  const config = await records.load(id)
  await store.load(config)
  await store.init()
  scene.value = config
  await initScene()
  moves.value.clear()
  history.value = []
  loading.value = false
  start()
}

onMounted(async () => {
  load()
})

watch(
  () => route.params.id,
  async newId => {
    load()
  }
)
</script>

<template>
  <v-main
    @contextmenu.prevent
  >
    <v-card
      flat
      :title="scene.title"
      class="overflow-y-auto"
    >
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="scene.category"
        >
          Q{{scene.id}}
        </v-chip>
      </template>
      <template v-slot:append>
        <v-chip>
          {{scene.passing}}
        </v-chip>
      </template>
      <v-divider></v-divider>
      <v-card-text>
        <SceneCasts
          :casts="scene.casts"
        ></SceneCasts>
        <v-divider></v-divider>
        <SceneMoves
          :moves="moves"
          :category="scene.category"
        ></SceneMoves>
      </v-card-text>
    </v-card>
  </v-main>
</template>
