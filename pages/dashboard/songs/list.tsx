import Link from 'next/link'
import React from 'react'
import { getAllSongs } from '../../api/axios/songs'
export type SongType = {
  _id: string | number
  name: string
  singer: string
  playlist: string
  duration: number
}
export type Songs = SongType[]

const SongList = () => {
  const [songsList, setSongs] = React.useState<Songs>([])

  const getSongs = async () => {
    const res = await getAllSongs()
    setSongs(res.data)
  }
  React.useEffect(() => {
    getSongs()
  }, [])

  return (
    <div className="relative m-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Playlist
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {songsList.map((song, index) => {
            return (
              <tr
                key={song._id}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {song.name}
                </th>
                <td className="px-6 py-4">{song.playlist}</td>
                <td className="px-6 py-4">{song.singer}</td>
                <td className="px-6 py-4">{song.duration}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={{
                      pathname: '/songs/[...detail]',
                      query: { id: song._id },
                    }}
                  >
                    <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SongList
