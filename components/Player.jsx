import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atom/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfomation from '../hooks/useSongInfo'
import Previous from './icons/Previous'
import Switch from './icons/Switch'
import NextButton from './icons/Next'
import Repeat from './icons/Repeat'
import Play from './icons/Play'
import Pause from './icons/Pause'
import { VolumeUpIcon } from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { debounce } from 'lodash'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [player, setPlayer] = useState(undefined)
  const [is_active, setActive] = useState(false)
  const songInfo = useSongInfomation()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        // console.log('Playing', data.body?.item)
        setCurrentIdTrack(data.body?.item.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => spotifyApi.setVolume(volume), 100),
    []
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentIdTrack) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => cb(session.user?.accessToken),
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        setCurrentIdTrack(state.track_window.current_track)
        setIsPlaying(data.body?.is_playing)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
  }, [])
  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-br from-black to-gray-800 px-2 text-xs text-white opacity-95 md:px-8 md:text-base">
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-12 w-12 md:inline"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className="mt-1 text-xs text-gray-400">
            {songInfo?.artists
              ?.map((artist) => (artist ? artist.name : ''))
              .join(' & ')}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto flex items-center">
          <div className="flex space-x-6">
            <Switch />
            <Previous onClick />
          </div>
          <div>
            <button
              className="button mx-6 grid h-[35px] w-[35px] place-items-center rounded-full bg-white"
              disabled=""
              aria-label="Play"
              data-testid="control-button-playpause"
              aria-expanded="false"
              onClick={handlePlayPause}
            >
              {!isPlaying ? <Play /> : <Pause />}
            </button>
          </div>
          <div className="flex space-x-6">
            <NextButton />
            <Repeat />
          </div>
        </div>
        <input
          type="range"
          name=""
          id=""
          className="mt-4 h-1 w-full cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button h-6 w-6"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          className="h-1 w-14 md:w-28"
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button h-6 w-6"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
