import { DiscoveryModule } from '@nestjs/core'
import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import AdminSideBar from '../../components/admin/AdminSideBar'
import { deleteSong, getAllSongs } from '../api/axios/songs'
import { Song } from '../../type/Song'
import { millisToMinutesAndSeconds } from '../../lib/time'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Props = {}
function Dashboard(props: Props) {
  const MySwal = withReactContent(Swal)
  const [songs, setSongs] = React.useState([])
  const [albums, setAlbums] = React.useState([])

  const handleGetSongs = async () => {
    const { data } = await getAllSongs()
    setSongs(data)
  }
  const handleDeleteSong = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setSongs(songs.filter((song) => song._id !== id))
        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  React.useEffect(() => {
    handleGetSongs()
  }, [])
  console.log(songs)

  return (
    <div className="flex items-start justify-start">
      <AdminSideBar />
      <div className="w-full">
        <AdminNav />
        <div className="relative mx-10 my-10 overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start space-x-5 ">
              <h2 className="p-4 text-[1.5rem] font-bold">Song list</h2>
              <Link href="/dashboard/add">
                <button>
                  <PlusCircleIcon className="h-8 w-8" />
                </button>
              </Link>
            </div>

            <div className="p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
          </div>

          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Song
                </th>
                <th scope="col" className="px-6 py-3">
                  Artists
                </th>
                <th scope="col" className="px-6 py-3">
                  Playlists
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song: Song) => (
                <tr
                  key={song._id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    <img src={song.image} alt="" className="h-10 w-10" />
                    {song.name}
                  </th>
                  <td className="px-6 py-4">{song.singer}</td>
                  <td className="px-6 py-4">{song.playlist}</td>
                  <td className="px-6 py-4">
                    {millisToMinutesAndSeconds(song.duration)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`dashboard/${song._id}`}>
                      <button className="px-4 font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => handleDeleteSong(song._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
