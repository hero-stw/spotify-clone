import { Playlist } from '../../../type/Playlist'
import instance from './instance'

export const getPlaylists = () => {
  return instance.get('/playlists')
}

export const getPlaylist = (id: string) => {
  return instance.get(`/playlists/${id}`)
}
export const createPlaylist = (playlist: Playlist) => {
  return instance.post('/playlists', playlist)
}
export const updatePlaylist = (id: string, playlist: Playlist) => {
  return instance.put(`/playlists/${id}`, playlist)
}
export const deletePlaylist = (id: string) => {
  return instance.delete(`/playlists/${id}`)
}
