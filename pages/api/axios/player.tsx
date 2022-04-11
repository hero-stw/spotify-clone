import instance from './spotify'

export const spotifyNext = async () => {
  return await instance.post('/next')
}
