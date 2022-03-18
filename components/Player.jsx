import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atom/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfomation from '../hooks/useSongInfo'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
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
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentIdTrack) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyApi, session])
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
            <button
              role="switch"
              aria-checked="false"
              aria-label="Enable shuffle"
              data-testid="control-button-shuffle"
              aria-expanded="false"
              className="button"
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path
                  d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"
                  fill="#ffffff"
                ></path>
                <path
                  d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
            <button
              aria-label="Previous"
              aria-expanded="false"
              className="button"
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path
                  d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <button
              className="button mx-6 grid h-[50px] w-[50px] place-items-center rounded-full bg-white"
              disabled=""
              aria-label="Play"
              data-testid="control-button-playpause"
              aria-expanded="false"
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path
                  d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex space-x-6">
            <button
              className="button"
              aria-label="Next"
              data-testid="control-button-skip-forward"
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path
                  d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
            <button
              className="button"
              role="checkbox"
              aria-checked="false"
              aria-label="Enable repeat"
              data-testid="control-button-repeat"
              aria-expanded="false"
            >
              <svg
                role="img"
                height="16"
                width="16"
                viewBox="0 0 16 16"
                class="Svg-sc-1bi12j5-0 hDgDGI"
              >
                <path
                  d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-1.5 w-[45%] rounded-full bg-gray-600 dark:bg-gray-300"></div>
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default Player
