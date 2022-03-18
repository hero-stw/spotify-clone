import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";
const scopes = [
    "user-read-email",
    "user-read-private",
    "streaming",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-follow-read",
    "user-top-read",
    "user-read-recently-played"

].join(",")

const params = {
    scope : scopes,
}

const querryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${querryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})
export default spotifyApi;
export {LOGIN_URL};