import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import AdminNav from '../../components/admin/AdminNav'
import AdminSideBar from '../../components/admin/AdminSideBar'
import { Song } from '../../type/Song'
import { createSong, getSongById, updateSong } from '../api/axios/songs'

type Props = {}

const SongDetail = (props: Props) => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} })
  const handleCreateSong = async (data: Song) => {
    const response = await createSong(data)

    if (response.status === 201) {
    }
  }

  const handleUpdateSong = async (data: Song) => {
    const response = await updateSong(id, data)

    if (response.status === 200) {
    }
  }

  const handleGetSong = async (id: string) => {
    const response = await getSongById(id)
    if (response.status === 200) {
      reset(response.data)
    }
  }
  useEffect(() => {
    if (id) {
      handleGetSong(id)
    }
  }, [id])
  return (
    <div className="flex items-start justify-start">
      <AdminSideBar />
      <div className="w-full">
        <AdminNav />
        <div className="flex w-full items-start justify-between p-10">
          <form className="w-full p-10">
            <h1 className="mb-[2rem] text-[1.5rem] font-bold">Edit songs</h1>

            <div className="group relative z-0 mb-6 w-full">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
              />
              <label
                htmlFor="floating_repeat_password"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Name
              </label>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_first_name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Playlist
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_last_name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Artist
                </label>
              </div>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_phone"
                  id="floating_phone"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_phone"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Duration
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="floating_company"
                  id="floating_company"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_company"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Thumbnail
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Submit
            </button>
          </form>
          <div className="">
            <img src="https://source.unsplash.com/random?song" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongDetail
