import { ref } from 'vue'
import { useCarrierState, useCarrier, useCasts, useScene } from '@/composables'
import type { Ref } from 'vue'
import type { Carrier, Cast, Scene, State, Move } from '@/types'
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
  const { coord, leave } = useCarrierState(state)
  const { isReady } = useCarrier(state, scene)
  const { isPeaceable } = useCasts(state, scene)
  const { pickUp, arrive, safetyConfirmation } = useScene(state, scene)
  const { init: initScene } = useScene(state, scene)

  const solve = async () => {
    await initScene()
    moves.value.clear()
    const history = await search()
    if (history.size > 0) {
      await lookBack(history)
    } else {
      console.error('failed.')
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
        state.value = restore(currentState) as ExtendedState
        const isAllPickedUp = await Promise.all(move.map(async cast => await pickUp(cast)))
        .then(results => !results.includes(false))
        if (!isAllPickedUp) continue
        await safetyConfirmation()
        if (!isPeaceable.value) continue
        const isAllReady = scene.value.carriers.every(carrier => isReady(carrier))
        if (!isAllReady) continue
        const parsedPreviousState = parseState(state)
        for await (const carrier of scene.value.carriers) {
          const destinations = getDestinations(carrier)
          for await (const destination of destinations) {
            const move = await leave(carrier, destination).then(() => arrive(carrier))
            if (!move) continue
            await safetyConfirmation()
            if (!isPeaceable.value) continue
            state.value.count = scene.value.category === 'time-limited'
              ? state.value.count + move.value
              : 0
            const parsedCurrentState = parseState(state)
            const parsedCurrentMove = parseMove(move)
            if (!visited.has(parsedCurrentState)) {
              queue.push(state.value)
              history.add([parsedCurrentState, parsedCurrentMove, parsedPreviousState])
              visited.add(parsedCurrentState)
              console.log(parsedCurrentState, parsedCurrentMove, parsedPreviousState)
            }
          }
        }
      }
      if (state.value.count > 99) break
    }
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
      const previousStates: number[][] = JSON.parse(item[2])
      const casts: Cast[] = ids.map(id => scene.value.casts[id])
      const value: number = Math.max(...casts.map(cast => cast.role.duration || 1))
      const bound: Bound = states[0][0] > previousStates[0][0] ? 'inbound' : 'outbound'
      const move: Move = {
        casts: casts,
        bound: bound,
        value: value
      }
      moves.value.add(move)
    })
  }

  const getDestinations = (
    carrier: Carrier,
  ) => scene.value.category === 'escorting-celebrity-island'
    ? coord(carrier) === 0
      ? [1, -1]
      : [0]
    : [-coord(carrier)]

  const parseState = (
    state: Ref<ExtendedState>
  ) => JSON.stringify([
    state.value.carriers.map(state => state.coord ),
    state.value.casts.map(state => state.coord),
    state.value.count,
  ])

  const parseMove = (
    move: Move
  ) => JSON.stringify(move.casts.map(cast => cast.id))

  const restore  = (
    currentState: ExtendedState
  ) => {
    return {
      carriers: currentState.carriers.map(state => {
        return {
          coord: state.coord,
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
    solve,
  }
}
export default useSolve
export type UseSolveReturn = ReturnType<typeof useSolve>