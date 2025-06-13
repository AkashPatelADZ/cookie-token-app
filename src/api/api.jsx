import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cookie-token-server.onrender.com:8080/',
  timeout: 1000,
  withCredentials: true,
})

export default instance
