import { useSession } from 'next-auth/react';
import React from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atom/songAtom';
import useSpotify from '../hooks/useSpotify';

function Player() {
    const spotifyApi = useSpotify();
    const {data:session, status} = useSession();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = React.useState(50);

    return (
        <div>
            <div>
                <img className='hidden md:inline h-12 w-12' 
                src={songInfo?.album.images?.[0]?.url} alt="" />
            </div>
        </div>
  )
}

export default Player