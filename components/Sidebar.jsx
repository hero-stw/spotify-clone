import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import useSpotify from '../hooks/useSpotify'
import { playlistIdState } from '../atom/playlistAtom'
import { useRecoilState } from 'recoil'
function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])
  return (
    <div className="hidden h-screen space-y-4 overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:block lg:block lg:max-w-[15rem] lg:text-sm">
      <Link href={'/'} className="duration-300 hover:text-white">
        <div className="flex items-center space-x-2">
          <HomeIcon className="h-[24px] w-[24px]" />
          <span>Home</span>
        </div>
      </Link>
      <Link href={'/search'} className="duration-300 hover:text-white">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-[24px] w-[24px]" />
          <span>Search</span>
        </div>
      </Link>
      <button className="flex items-center space-x-2 duration-300 hover:text-white">
        <LibraryIcon className="h-[24px] w-[24px]" />
        <p>Your Collection</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
      <button className="flex items-center space-x-2 duration-300 hover:text-white">
        <HeartIcon className="h-[24px] w-[24px] text-blue-500" />
        <p>Liked</p>
      </button>
      <button className="flex items-center space-x-2 duration-300 hover:text-white">
        <RssIcon className="h-[24px] w-[24px] text-green-500" />
        <p>Your Eps</p>
      </button>
      <button className="flex items-center space-x-2 duration-300 hover:text-white">
        <PlusCircleIcon className="h-[24px] w-[24px]" />
        <p>Create playlist</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />

      {/* Playlist custom */}
      {playlists.map((playlist) => (
        <p
          key={playlist.id}
          onClick={() => setPlaylistId(playlist.id)}
          className="cursor-pointer duration-300 hover:text-white"
        >
          {playlist.name}
        </p>
      ))}
    </div>
  )
}

export default Sidebar
