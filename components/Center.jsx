import { ChevronDownIcon } from '@heroicons/react/outline'
import Songs from './Songs'
import AlbumController from './AlbumController'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../atom/playlistAtom'
import { useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import Link from 'next/link'
import Header from './Header'

const colors = [
  'from-indigo-500',
  'from-purple-500',
  'from-pink-500',
  'from-red-500',
  'from-yellow-500',
  'from-green-500',
  'from-teal-500',
  'from-blue-500',
]
const Center = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState()
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [spotifyApi, playlistId])

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <Header />
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 w-full pl-5 pt-[4rem] pr-5 text-white`}
      >
        <img
          className="h-[250px] w-[250px] shadow-2xl"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div>
          <p className="mb-3 text-sm">PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-8xl">
            {playlist?.name}
          </h1>
          <p className="font-3 mt-4 text-sm font-light italic text-white opacity-70">
            {playlist?.description}
          </p>
          <p className="mt-2 flex items-center justify-start gap-1 text-sm">
            <span>{playlist?.owner.display_name}</span>•
            <span>{playlist?.followers?.total} followers</span>•
            <span>{playlist?.tracks.total} songs</span>{' '}
          </p>
        </div>
      </section>
      <AlbumController />
      <div className="mx-auto h-[1px] w-[95%] bg-gray-500"></div>
      <Songs />
    </div>
  )
}

export default Center
