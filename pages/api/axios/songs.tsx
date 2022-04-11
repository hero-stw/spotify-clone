import instance from './instance'

export const getAllSongs = () => {
  return instance.get('/songs/paginate/1/3')
}

export const getSongById = (id: string | undefined | string[]) => {
  return instance.get(`/songs/${id}`)
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

export const searchSong = (query: string) => {
  return instance.post(`/songs/search?q=${query}`)
}
export const getSongWithPagination = (page: number, limit: number) => {
  return instance.get(`/songs/paginate/${page}/${limit}`)
}
