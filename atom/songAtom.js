import { atom } from 'recoil'

export const currentTrackIdState = atom({
  key: 'currenttrackIdState',
  default: null,
})

export const isPlayingState = atom({
  key: 'isPlaying',
  default: false,
})
