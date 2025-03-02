import { useCarrier, useCarrierState, useCrews, useScene } from '@/composables'
import type { Carrier, CarrierState, Crew, CrewState, Move, Scene, State } from '@/types'
interface ExtendedState extends State {
  count: number
}

/**
 * 川渡りパズルの経路探索
 */
const useSolve = (
  scene: Ref<Scene>,
) => {
  const solved = ref<boolean>(true)
  const solutions = ref<Set<Move>[]>([])
  const state = ref<ExtendedState>({
    carriers: [] as CarrierState[],
    crews: [] as CrewState[],
    count: 0,
  })
  const { coord, leave } = useCarrierState(state)
  const { isOperable } = useCarrier(state, scene)
  const { isPeaceable, unreachers, reachers, halfways } = useCrews(state, scene)
  const { init, pickUp, arrive, safetyConfirmation } = useScene(state, scene)
  // 時間制限のあるパズルかどうか
  const isNight = scene.value.landscape?.night

  /**
   * パズルを解く
   */
  const solve = async () => {
    await init()
    solutions.value = []
    const history = await search()
    solved.value = await lookBack(history)
  }

  /**
   * 幅優先探索を開始
   */
  const search = async () => {
    console.info('search:') ////
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
        const isAllPickedUp = await Promise.all(move.map(async crew => await pickUp(crew)))
        .then(results => !results.includes(false))
        if (!isAllPickedUp) continue
        if (!isNight) {
          await safetyConfirmation()
          if (!isPeaceable.value) continue
        }
        const isReady = scene.value.carriers.some(carrier => isOperable(carrier))
        if (!isReady) continue
        const parsedPreviousState = parseState(state)
        const beforeCarriersState = state.value
        for await (const carrier of scene.value.carriers) {
          state.value = restore(beforeCarriersState) as ExtendedState
          const destinations = getDestinations(carrier)
          const beforeDestinationsState = state.value
          destinations:
          for await (const destination of destinations) {
            state.value = restore(beforeDestinationsState) as ExtendedState
            const move = await leave(carrier, destination).then(() => arrive(carrier))
            if (!move) continue destinations
            if (!isNight) {
              await safetyConfirmation()
              if (!isPeaceable.value) continue destinations
            }
            if (isNight) state.value.count += move.value
            const parsedCurrentState = parseState(state)
            const parsedCurrentMove = parseMove(move)
            const parsedDistribution = parseDistribution(unreachers, reachers, halfways)
            if (!visited.has(parsedCurrentState)) {
              queue.push(state.value)
              history.add([parsedCurrentState, parsedCurrentMove, parsedPreviousState, parsedDistribution])
              visited.add(parsedCurrentState)
              console.info(parsedCurrentState, parsedCurrentMove, parsedDistribution) ////
            }
          }
        }
      }
      if (isNight && state.value.count > 99) break
    }
    return history
  }

  /**
   * 探索結果から手順を算出
   */
  const lookBack = async (
    history: Set<string[]>
  ) => {
    console.info('--------') ////
    console.info('solution:') ////
    if (history.size === 0) return false
    const list: string[][] = Array.from(history)
    const finalStateList = list.filter(item => {
      const states: number[][] = JSON.parse(item[0])
      const crews: number[] = states[1]
      return crews.every((n, i) => n === -(scene.value.crews[i].coord || -1))
    })
    if (finalStateList.length === 0) return false
    const min = Math.min(...finalStateList.map(state => JSON.parse(state[0])[2]))
    const finalStates = finalStateList.filter(state => JSON.parse(state[0])[2] === min)
    for await (const finalState of finalStates) {
      const moves: Set<Move> = new Set<Move>
      const solution: string[][] = []
      solution.push(finalState)
      for (;;) {
        const latest = solution.slice(-1)[0][2]
        if (!latest) break
        const target = list.find(item => item[0] === latest)
        if (!target) break
        solution.push(target)
      }
      solution.reverse().slice(1).forEach(item => {
        const states: number[][] = JSON.parse(item[0])
        const crews: number[] = JSON.parse(item[1])
        const previousStates: number[][] = JSON.parse(item[2])
        const distribution: number[][] = JSON.parse(item[3])
        const move: Move = {
          crews,
          origin: previousStates[0][0],
          destination: states[0][0],
          value: Math.max(...crews.map(id => scene.value.crews[id].role.duration || 1))
        }
        moves.add(move)
        console.info(JSON.stringify({
          u: distribution[0],
          r: distribution[1],
          h: distribution[2],
        })) ////
      })
      solutions.value.push(moves)
    }
    return true
  }

  /**
   * 行先の選択肢を算出
   */
  const getDestinations = (
    carrier: Carrier,
  ) => scene.value.landscape?.island
    ? coord(carrier) === 0
      ? [1, -1]
      : [0]
    : [-coord(carrier)]

  const parseState = (
    state: Ref<ExtendedState>
  ) => JSON.stringify([
    state.value.carriers.map(state => state.coord),
    state.value.crews.map(state => state.coord),
    state.value.count,
  ])

  const parseMove = (
    move: Move
  ) => JSON.stringify(move.crews)

  const parseDistribution = (
    unreachers: Ref<Crew[]>,
    reachers: Ref<Crew[]>,
    halfways: Ref<Crew[]>
  ) => JSON.stringify([
    unreachers.value.map(crew => crew.id),
    reachers.value.map(crew => crew.id),
    halfways.value.map(crew => crew.id)
  ])

  const restore  = (
    currentState: ExtendedState
  ) => {
    return {
      carriers: currentState.carriers.map(state => {
        return {
          coord: state.coord,
        }
      }),
      crews: currentState.crews.map(state => {
        return {
          coord: state.coord,
          boarding: state.boarding,
          emotions: state.emotions,
          diseased: state.diseased
        }
      }),
      count: currentState.count
    }
  }

  const generateMoves = async () => {
    const capacity = scene.value.carriers.reduce((n, carrier) => n += carrier.capacity, 0)
    const combinations = await Promise.all(new Array(capacity).fill(0).map(async (n, i) => {
      return await getCombinations(scene.value.crews, i + 1)
    }))
    .then(combinations => combinations.flat())
    return combinations
  }

  const getCombinations = async (
    arr: Crew[],
    len: number
  ) => {
    const result: Crew[][] = []
    const combine = (
      current: Crew[],
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
    solutions,
    solved,
    isNight,
    solve,
  }
}
export default useSolve
export type UseSolveReturn = ReturnType<typeof useSolve>
