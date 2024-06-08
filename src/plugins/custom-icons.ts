import {
  mdiAccountMultiple,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowUp,
  mdiChatAlert,
  mdiCog,
  mdiHelp,
  mdiHistory,
  mdiHome,
  mdiLockOpen,
  mdiMapSearch,
  mdiMusic,
  mdiMusicOff,
  mdiSpeedometer,
  mdiSwapVertical,
  mdiVolumeHigh,
} from '@mdi/js'
const aliases: {
  [name: string]: string
}
 = {
  casts: mdiAccountMultiple,
  conditions: mdiLockOpen,
  help: mdiHelp,
  home: mdiHome,
  inbound: mdiArrowUp,
  left: mdiArrowLeft,
  level: mdiSpeedometer,
  moves: mdiHistory,
  mute: mdiMusicOff,
  outbound: mdiArrowDown,
  right: mdiArrowRight,
  settings: mdiCog,
  solve: mdiMapSearch,
  sound: mdiMusic,
  transportation: mdiSwapVertical,
  tips: mdiChatAlert,
  volume: mdiVolumeHigh,
}

export default aliases