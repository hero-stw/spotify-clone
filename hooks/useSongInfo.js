import React from 'react'
import useSpotify from './useSpotify';
import { currentTrackIdState} from '../atom/songAtom';
import { useRecoilState } from 'recoil';

function useSongInfomation() {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = React.useState(null);

    React.useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then((res) => res.json());
                
                setSongInfo(trackInfo);
            }
        };
        fetchSongInfo()
    }, [currentIdTrack,spotifyApi])
    return songInfo;
}

export default useSongInfomation;