import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import spotifyApi from '../lib/spotify';

function useSpotify() {
 const { data: session, status} = useSession();
 useEffect(() => {
   if(session) {
        //    If refresh token fails, direct user to login page
       if (session.error === 'RefreshAccessTokenError') {
         signIn();
       }
    //    If ok
       spotifyApi.setAccessToken(session.user.accessToken);
   }
 }, [session]);

  return spotifyApi; 
}

export default useSpotify;