import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atom/playlistAtom';
import Song from "./Song"

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className='text-white p-8 pt-4 flex flex-col space-y-1 pb-28 '>
        {playlist?.tracks.items.map((track, index) => (
            <Song key={track.track.id} track={track} order={index}/> 
        ))}
    </div>
  )
}

export default Songs