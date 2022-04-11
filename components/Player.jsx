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
import SpotifyWebPlayer, {
  STATUS,
  CallbackState,
} from 'react-spotify-web-playback'
import {
  FastForwardIcon,
  RewindIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { debounce } from 'lodash'
import { nextSong, spotifyNext } from '../pages/api/axios/player'
import axios from 'axios'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [player, setPlayer] = useState(undefined)
  const [is_active, setActive] = useState(false)
  const [URIs, setURIs] = useState(['spotify:album:51QBkcL7S3KYdXSSA0zM9R'])
  const songInfo = useSongInfomation()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Playing', data.body?.item)
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

  const handlePlayingNextSong = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
    }
    const response = await axios
      .put(
        'https://api.spotify.com/v1/me/player/play',
        {
          context_uri: 'spotify:album:0w1dwXfG5z6Xjjgj524JkD',
          offset: {
            position: 5,
          },
          position_ms: 0,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res)
      })
  }
  return (
    <div>
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
              <RewindIcon className="h-8 w-8" />
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
            <div className="flex items-center space-x-6">
              <FastForwardIcon
                className="h-8 w-8"
                onClick={() => handlePlayingNextSong()}
              />
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
    </div>
  )
}

export default Player
