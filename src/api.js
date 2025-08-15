import axios from 'axios'
const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
export const api = axios.create({ baseURL: API })
api.interceptors.request.use(config => {
  const t = localStorage.getItem('token')
  if (t) config.headers.Authorization = 'Bearer ' + t
  return config
})
