import instance from './instance'

export const getAllSongs = () => {
  return instance.get('/songs')
}

export const getSongById = (id: string | undefined | string[]) => {
  return instance.get(`/song/${id}`)
}
export const createSong = (data: {}) => {
  return instance.post('/songs', data)
}

export const updateSong = (id: string | undefined | string[], data: {}) => {
  return instance.put(`/songs/${id}`, data)
}

export const deleteSong = (id: string | undefined) => {
  return instance.delete(`/songs/${id}`)
}
