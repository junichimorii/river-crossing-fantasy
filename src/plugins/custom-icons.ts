import {
  mdiAccountMultiple,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowUp,
  mdiBookOpenPageVariant,
  mdiChatAlert,
  mdiCog,
  mdiHistory,
  mdiHome,
  mdiInformation,
  mdiLockOpen,
  mdiMapSearch,
  mdiMusic,
  mdiMusicOff,
  mdiSwapVertical,
  mdiVolumeHigh,
} from '@mdi/js'
const aliases: {
  [name: string]: string
}
 = {
  casts: mdiAccountMultiple,
  conditions: mdiLockOpen,
  home: mdiHome,
  inbound: mdiArrowUp,
  introduction: mdiInformation,
  left: mdiArrowLeft,
  moves: mdiHistory,
  mute: mdiMusicOff,
  outbound: mdiArrowDown,
  right: mdiArrowRight,
  settings: mdiCog,
  solve: mdiMapSearch,
  sound: mdiMusic,
  story: mdiBookOpenPageVariant,
  transportation: mdiSwapVertical,
  tips: mdiChatAlert,
  volume: mdiVolumeHigh,
}

export default aliases
