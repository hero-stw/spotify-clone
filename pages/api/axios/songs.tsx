import instance from './instance'

export const getAllSongs = () => {
  return instance.get('/songs')
}

export const getSongById = (id: string | undefined) => {
  return instance.get(`/songs/${id}`)
}
export const createSong = (data: {}) => {
  return instance.post('/songs', data)
}

export const updateSong = (id: string | undefined, data: {}) => {
  return instance.put(`/songs/${id}`, data)
}

export const deleteSong = (id: string | undefined) => {
  return instance.delete(`/songs/${id}`)
}
