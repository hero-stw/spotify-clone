import React, { useEffect, useState } from 'react'
import {HomeIcon, SearchIcon,LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from "@heroicons/react/outline"
import {useSession} from "next-auth/react";
import useSpotify from '../hooks/useSpotify';
import {playlistIdState} from "../atom/playlistAtom";
import { useRecoilState } from 'recoil';
function Sidebar() {
  const spotifyApi = useSpotify();
  const {data: session, status}  = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
      <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 space-y-4 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block lg:block'>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <HomeIcon className='w-[24px] h-[24px]'/>
          <p>Home</p>
        </button>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <SearchIcon className='w-[24px] h-[24px]'/>
          <p>Search</p>
        </button>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <LibraryIcon className='w-[24px] h-[24px]'/>
          <p>Your Collection</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'/>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <HeartIcon className='w-[24px] h-[24px]'/>
          <p>Liked</p>
        </button>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <RssIcon className='w-[24px] h-[24px]'/>
          <p>Your Eps</p>
        </button>
        <button className='flex space-x-2 items-center hover:text-white duration-300'>
          <PlusCircleIcon className='w-[24px] h-[24px]'/>
          <p>Create playlist</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'/>
        
        {/* Playlist custom */}
        {playlists.map(playlist => (
          <p key={playlist.id} onClick={()=> setPlaylistId(playlist.id)}  className='cursor-pointer hover:text-white duration-300'>{playlist.name}</p>
         ))} 
      </div>
  )
}

export default Sidebar;