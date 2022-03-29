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
  const [isActive, setActive] = useState(false)
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

  const getNewReleases = async () => {
    const response = await spotifyApi.getNewReleases()
    console.log(response)
  }
  useEffect(() => {
    getNewReleases()
  })

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80"
          onClick={() => setActive(!isActive)}
        >
          <img
            className="h-10 w-10 rounded-full border-[0.1px] border-solid border-gray-400 object-cover"
            src={
              session?.user.image
                ? session?.user.image
                : 'https://www.shoptiu.com/upload/users/user-avatar.png'
            }
            alt=""
          />
          <h2 className="text-white">{session?.user.name}</h2>
          <ChevronDownIcon className="h5 w-5 text-white" />
        </div>
        <div
          id="dropdown"
          className={`z-10  ${
            isActive ? 'block' : 'hidden'
          } w-full divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <Link href={'/dashboard'}>
                <div
                  href="/dashboard"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <button
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </header>
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
