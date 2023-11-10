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
interface ExtendedState extends State {
  count: number
}
const route = useRoute()
const records = useRecordsStore()
const store = useSceneStore()
const state = ref<ExtendedState>({
  carriers: [] as CarrierState[],
  casts: [] as CastState[],
  count: 0,
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
const solved = ref(true)
const { isReady } = useCarrier(state, scene)
const { isPeaceable } = useCasts(state, scene)
const { pickUp, leave, arrive, safetyConfirmation } = useScene(state, scene)
const { init: initScene } = useScene(state, scene)

const start = async () => {
  const history = await search()
  if (history.size > 0) {
    await lookBack(history)
  } else {
    solved.value = false
  }
}

const search = async () => {
  const history = new Set<string[]>()
  const visited = new Set<string>()
  const queue: ExtendedState[] = [state.value]
  history.add([parseState(state)])
  visited.add(parseState(state))

  while (queue.length > 0) {
    const currentState = queue.shift() as ExtendedState
    const nextMoves = await generateMoves()
    for await (const move of nextMoves) {
      state.value = restore(currentState)
      const isAllPickedUp = await Promise.all(move.map(async cast => await pickUp(cast)))
      .then(results => !results.includes(false))
      if (!isAllPickedUp) continue
      await safetyConfirmation()
      if (!isPeaceable.value) continue
      const isAllReady = scene.value.carriers.every(carrier => isReady(carrier))
      if (!isAllReady) continue
      const increment = await Promise.all(scene.value.carriers.map(async carrier =>
        await leave(carrier)
        .then(() => arrive(carrier))
      )).then(moves => !moves.includes(undefined)
        ? Array.from(moves as Move[]).reduce((a, b) => a + b.value, 0)
        : false
      )
      if (!increment) continue
      await safetyConfirmation()
      if (!isPeaceable.value) continue
      state.value.count = scene.value.category === 'time-limited'
        ? state.value.count + increment
        : 0
      if (!visited.has(parseState(state))) {
        queue.push(state.value)
        history.add([parseState(state), parseMove(move), parsePrev(state, move)])
        visited.add(parseState(state))
        console.log(parseState(state), parseMove(move), parsePrev(state, move))
      }
    }
    if (state.value.count > 60) break
  }
  return history
}

const lookBack = async (
  history: Set<string[]>
) => {
  const solution: string[][] = []
  const list: string[][] = Array.from(history)
  const finalStates = list.filter(item => {
    const parsed = JSON.parse(item[0])
    const carriers: number[] = parsed[0]
    const casts: number[] = parsed[1]
    return carriers.every(n => n === 1) && casts.every(n => n === 1)
  })
  if (finalStates.length === 0) return
  const finalState = finalStates.reduce((a, b) => {
    const countA: number = JSON.parse(a[0])[2]
    const countB: number = JSON.parse(b[0])[2]
    return countA < countB ? a : b
  })
  solution.push(finalState)
  while (true) {
    const latest = solution.slice(-1)[0][2]
    if (!latest) break
    const target = list.find(item => item[0] === latest)
    if (!target) break
    solution.push(target)
  }
  solution.reverse().slice(1).forEach(item => {
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
  state: Ref<ExtendedState>
) => JSON.stringify([
  state.value.carriers.map(state => state.isCrossed ? 1 : 0),
  state.value.casts.map(state => state.isCrossed ? 1 : 0),
  state.value.count,
])

const parseMove = (
  move: Cast[]
) => JSON.stringify(move.map(cast => cast.id))

const parsePrev = (
  state: Ref<ExtendedState>,
  move: Cast[]
) => {
  const carriers = state.value.carriers.map(state => state.isCrossed ? 0 : 1)
  const casts = state.value.casts.map(state => state.isCrossed ? 1 : 0)
  move.forEach(cast => {
    casts[cast.id] = casts[cast.id] === 1 ? 0 : 1
  })
  const count = scene.value.category === 'time-limited'
    ? state.value.count - Math.max(...move.map(cast => cast.role.duration || 1))
    : 0
  return JSON.stringify([carriers, casts, count])
}

const restore  = (
  currentState: ExtendedState
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
    }),
    count: currentState.count
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
}

onMounted(async () => {
  load()
})

watch(
  () => route.params.id,
  async () => {
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
        <v-btn
          block
          @click="start()"
        >
          探索
        </v-btn>
        <v-divider></v-divider>
        <SceneMoves
          v-if="solved"
          :moves="moves"
          :category="scene.category"
        ></SceneMoves>
        <v-alert
          v-if="!solved"
          type="error"
          title="Failed"
        ></v-alert>
      </v-card-text>
    </v-card>
  </v-main>
</template>
