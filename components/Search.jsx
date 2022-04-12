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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

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
const SearchPage = () => {
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState()
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [newRelease, setNewRelease] = useState([])
  const [reccommend, setReccommend] = useState([])
  const [artist, setArtist] = useState()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  const getNewReleases = async () => {
    const response = await spotifyApi.getNewReleases().then((data) => {
      setNewRelease(data.body.albums.items)
    })
  }
  const getRecommendations = async () => {
    const res = await spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body
          console.log(recommendations)
        },
        function (err) {
          console.log('Something went wrong!', err)
        }
      )
  }
  const getArtistInfo = async () => {
    const response = await spotifyApi
      .getArtist('6mfK6Q2tzLMEchAr0e9Uzu')
      .then((data) => {
        console.log('Artist: ', data.body)
        setArtist(data.body)
      })
  }
  useEffect(() => {
    getNewReleases()
    getRecommendations()
    getArtistInfo()
  }, [])

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <Header />
      <section
        className={`flex flex-wrap items-end bg-gradient-to-b to-black ${color} h-80 w-full pl-5 pt-[4rem] pr-5 text-white`}
      >
        <img
          className="mr-4 h-[150px] w-[150px] shadow-2xl"
          src={artist?.images[1]?.url}
          alt=""
        />

        <div>
          <p className="mb-3 text-sm">Featured Artist</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-8xl">
            {artist?.name}
          </h1>
        </div>
      </section>
      <section
        className={`flex h-80 w-full  flex-wrap items-end pl-5 pt-[3rem] pr-5 text-white`}
      >
        <h1 className="mb-4 text-[1.5rem] font-bold">New Releases:</h1>
        <Swiper spaceBetween={20} slidesPerView={4} className="w-full">
          {newRelease.map((item) => (
            <SwiperSlide
              key={item.id}
              className=" flex max-w-[200px] flex-col flex-wrap items-center justify-center space-y-2 truncate"
            >
              <img
                src={item.images[0].url}
                alt=""
                className="h-full w-full object-cover"
              />
              <p className="text-md truncate text-white">{item.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default SearchPage
