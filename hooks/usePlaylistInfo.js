import React, { useState } from 'react'
import useSpotify from './useSpotify'
import { playlistIdState } from '../atom/playlistAtom'
import { useRecoilState } from 'recoil'

function usePlaylistInfomation() {
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  React.useEffect(() => {
    const fetchPlaylistInfo = async () => {
      if (playlistId) {
        const playlistInfo = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setPlaylists(playlistInfo)
      }
    }
    fetchPlaylistInfo()
  }, [playlistId, spotifyApi])
  return playlists
}

export default usePlaylistInfomation
