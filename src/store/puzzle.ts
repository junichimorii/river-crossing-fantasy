import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { carrierStatus, castStatus } from '@/store/statuses'
import type { Scene } from '@/types/scene'
import type { Queue } from '@/types/queue'

/**
 * シーン（ステージ）管理
 */
export const usePuzzleStore = defineStore('puzzle', () => {
  /** シーンの設定・状態 */
  const scene = useStorage<Scene>(
    'RIVER_CROSSING_SCENE',
    {
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
    },
    sessionStorage
  )

  /** シーンの行動履歴 */
  const queue = useStorage<Set<Queue>>(
    'RIVER_CROSSING_QUEUE',
    new Set<Queue>(),
    sessionStorage,
  )

  /** 操作の有効／無効 */
  const enabled = ref(true)

  /** カウンター */
  const count = computed(() => Array.from(queue.value).reduce((a, b) => a + b.value, 0))

  /** シーンを読み込む */
  const load = async (
    config: Scene
  ) => {
    scene.value = config
    queue.value = new Set<Queue>()
  }

  /** シーンの状態を消去 */
  const unload = async () => {
    scene.value = null
    queue.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    scene.value.carriers.forEach(carrier => {
      carrier.status = structuredClone(carrierStatus)
    })
    scene.value.casts.forEach(cast => {
      cast.status = structuredClone(castStatus)
    })
  }

  /** 操作を無効にする */
  const pause = async () => {
    enabled.value = false
  }

  /** 操作を有効にする */
  const resume = async () => {
    enabled.value = true
  }

  return {
    scene,
    queue,
    enabled,
    count,
    load,
    unload,
    init,
    pause,
    resume,
  }
})