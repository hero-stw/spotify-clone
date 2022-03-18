import { ChevronDownIcon } from '@heroicons/react/outline';
import Songs from "./Songs"
import AlbumController from './AlbumController';
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../atom/playlistAtom';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';

const colors = [
    "from-indigo-500",
    "from-purple-500",
    "from-pink-500",
    "from-red-500",
    "from-yellow-500",
    "from-green-500",
    "from-teal-500",
    "from-blue-500",
];
const Center = () => {
const {data: session}  = useSession();
const spotifyApi = useSpotify();
const [color, setColor] = useState();
const [playlist, setPlaylist] = useRecoilState(playlistState);
const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

useEffect(() => {
  setColor(shuffle(colors).pop()) 
}, [playlistId]);

useEffect(() => {
  if(spotifyApi.getAccessToken()) {
    spotifyApi.getPlaylist(playlistId).then(data => {
      setPlaylist(data.body);
    }).catch((error)=> {
      console.log(error);
    });
  }
}, [spotifyApi, playlistId]);
// console.log(playlist); 
  return (
    <div className='flex-grow relative h-screen overflow-y-scroll scrollbar-hide'>
        <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2' onClick={signOut}>
                <img className='rounded-full w-10 h-10 object-cover border-[0.1px] border-gray-400 border-solid' src={session?.user.image? session?.user.image :"https://openclipart.org/download/247319/abstract-user-flat-3.svg"} alt="" />
                <h2 className='text-white'>{session?.user.name}</h2>
                <ChevronDownIcon className='h5 w-5 text-white'/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 w-full text-white pl-5 pt-[4rem] pr-5`}>
          <img className='h-[250px] w-[250px] shadow-2xl' src={playlist?.images[0]?.url} alt="" />
          <div>
            <p className='text-sm mb-3'>PLAYLIST</p>
            <h1 className='text-2xl md:text-3xl xl:text-8xl font-bold'>{playlist?.name}</h1>
            <p className='font-3 opacity-70 mt-4 text-white font-light italic text-sm'>{playlist?.description}</p>
            <p className='flex gap-1 items-center justify-start text-sm mt-2'><span>{playlist?.owner.display_name}</span>•<span>{playlist?.followers?.total} followers</span>•<span>{playlist?.tracks.total} songs</span> </p>
          </div>
        </section>
        <AlbumController />
        <div className='h-[1px] bg-gray-500 w-[95%] mx-auto'></div>
        <Songs/>
    </div>
  )
}

export default Center