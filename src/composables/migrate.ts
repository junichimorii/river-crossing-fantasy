/** 新旧対照表 */
const comp = [
  [1, 1], [2, 2], [3, 3], [6, 11], [7, 12], [8, 13], [9, 14], [12, 15], [13, 16], [14, 17], [4, 21], [15, 22], [16, 23], [11, 31], [17, 32], [20, 33], [10, 41], [18, 42], [22, 43], [27, 44],
  [19, 51], [21, 52], [23, 53], [25, 54], [26, 55], [28, 56], [29, 57], [31, 58], [32, 61], [33, 62], [34, 63], [35, 64], [5, 71], [24, 72], [30, 73],
]
/** migrate */
export const migrate = () => {
  /** 旧データ */
  const orig = useStorage<Map<number, number>>(
    'RIVER_CROSSING_SCENES',
    new Map<number, number>()
  )
  /** 新データ */
  // const dest = useStorage<Map<number, number>>(
  //   'RIVER_CROSSING_FANTASY_SCENES',
  //   new Map<number, number>()
  // )
  orig.value.forEach((value, key, map) => {
    console.log(value, key, map)
  })
}
