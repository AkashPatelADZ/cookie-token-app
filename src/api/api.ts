import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cookie-token-server.onrender.com/',
  // baseURL: 'http://localhost:8080/',
  timeout: 30000,
  withCredentials: true,
})

export default instance
