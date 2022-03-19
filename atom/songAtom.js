import { atom } from 'recoil'

export const currentTrackIdState = atom({
  key: 'currentIdState',
  default: null,
})

export const isPlayingState = atom({
  key: 'isPlaying',
  default: false,
})
