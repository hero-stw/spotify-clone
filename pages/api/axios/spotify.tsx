import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/me/player',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
