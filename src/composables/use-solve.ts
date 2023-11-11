import { ref } from 'vue'
import { useCarrierState, useCarrier, useCasts, useScene } from '@/composables'
import type { Ref } from 'vue'
import type { Cast, Scene, State, Move } from '@/types'
import type { CarrierState, CastState, Bound } from '@/types/state'
interface ExtendedState extends State {
  count: number
}

/**
 * 川渡りパズルの経路探索
 */
const useSolve = (
  scene: Ref<Scene>,
) => {

  const state = ref<ExtendedState>({
    carriers: [] as CarrierState[],
    casts: [] as CastState[],
    count: 0,
  })
  const moves = ref<Set<Move>>(
    new Set<Move>(),
  )
  const solved = ref(true)
  const searching = ref(false)
  const { bound } = useCarrierState(state)
  const { isReady } = useCarrier(state, scene)
  const { isPeaceable } = useCasts(state, scene)
  const { pickUp, leave, arrive, safetyConfirmation } = useScene(state, scene)
  const { init: initScene } = useScene(state, scene)

  const solve = async () => {
    await initScene()
    moves.value.clear()
    const history = await search()
    if (history.size > 0) {
      await lookBack(history)
    } else {
      solved.value = false
    }
  }

  const search = async () => {
    searching.value = true
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
          await leave(carrier, bound(carrier))
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
    searching.value = false
    return history
  }

  const lookBack = async (
    history: Set<string[]>
  ) => {
    const solution: string[][] = []
    const list: string[][] = Array.from(history)
    const finalStates = list.filter(item => {
      const states: number[][] = JSON.parse(item[0])
      const carriers: number[] = states[0]
      const casts: number[] = states[1]
      return carriers.every(n => n > 0) && casts.every(n => n > 0)
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
      const states: number[][] = JSON.parse(item[0])
      const ids: number[] = JSON.parse(item[1])
      const casts: Cast[] = ids.map(id => scene.value.casts[id])
      const value: number = Math.max(...casts.map(cast => cast.role.duration || 1))
      const bound: Bound = states[1][ids[0]] > 0 ? 'inbound' : 'outbound' // TODO
      const move: Move = {
        casts: casts,
        bound: bound,
        value: value
      }
      moves.value.add(move)
    })
  }

  const parseState = (
    state: Ref<ExtendedState>
  ) => JSON.stringify([
    state.value.carriers.map(state => state.coord ),
    state.value.casts.map(state => state.coord),
    state.value.count,
  ])

  const parseMove = (
    move: Cast[]
  ) => JSON.stringify(move.map(cast => cast.id))

  const parsePrev = (
    state: Ref<ExtendedState>,
    move: Cast[]
  ) => {
    const carriers = state.value.carriers.map(state => -state.coord)
    const casts = state.value.casts.map(state => state.coord)
    move.forEach(cast => {
      casts[cast.id] = -casts[cast.id]
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
          coord: state.coord,
          bound: state.bound,
        }
      }),
      casts: currentState.casts.map(state => {
        return {
          coord: state.coord,
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
  return {
    moves,
    searching,
    solved,
    solve,
  }
}
export default useSolve
export type UseSolveReturn = ReturnType<typeof useSolve>