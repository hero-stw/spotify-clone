import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AdminNav from '../../components/admin/AdminNav'
import AdminSideBar from '../../components/admin/AdminSideBar'
import { Song } from '../../type/Song'
import { createSong } from '../api/axios/songs'

type Props = {}

const AddSong = (props: Props) => {
  const [imageThumb, setImage] = useState<string>('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      playlist: '',
      singer: '',
      duration: '',
      image: '',
    },
  })
  const handleCreateSong = async (data: Song) => {
    const response = await createSong(data)

    if (response.status === 201) {
    }
  }
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'fckljd3m')

      axios({
        url: 'https://api.cloudinary.com/v1_1/ecma-assignment/image/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-formendcoded',
        },
        data: formData,
      }).then((data) => {
        console.log(data)
        setImage(data.data.secure_url)
      })
    }
  }
  const onSubmit: SubmitHandler<Song> = (data) => {
    const submitData = {
      ...data,
      image: imageThumb,
    }
    return handleCreateSong(submitData)
  }
  return (
    <div className="flex items-start justify-start">
      <AdminSideBar />
      <div className="w-full">
        <AdminNav />
        <div className="grid w-full grid-cols-12 items-start justify-between p-10">
          <form
            className="col-span-8 w-full p-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-[2rem] text-[1.5rem] font-bold">Create songs</h1>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="text"
                id="floating_repeat_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
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
                  id="floating_first_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register('playlist', {
                    required: {
                      value: true,
                      message: 'Playlist is required',
                    },
                  })}
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
                  id="floating_last_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register('singer', {
                    required: {
                      value: true,
                      message: 'Artist is required',
                    },
                  })}
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
                  type="text"
                  id="floating_phone"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  {...register('duration', {
                    required: {
                      value: true,
                      message: 'Duration is required',
                    },
                  })}
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
                  type="file"
                  id="floating_company"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) => uploadToClient(e)}
                  // {...register('image')}
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
          <div className="col-span-3">
            <img
              src={
                imageThumb
                  ? imageThumb
                  : 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
              }
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSong
function setImage(i: any) {
  throw new Error('Function not implemented.')
}

function setCreateObjectURL(arg0: string) {
  throw new Error('Function not implemented.')
}
