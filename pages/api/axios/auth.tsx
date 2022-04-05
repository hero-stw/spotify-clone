import instance from './instance'

export const register = (data: {}) => {
  return instance.post('/signup', data)
}
export const login = (data: {}) => {
  return instance.post('/login', data)
}
